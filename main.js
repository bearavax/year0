// Year0 - Conch Shell Timeline Visualization
// Based on The Fourth Turning cyclical time theory

class ConchSpiral {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Visualization settings
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.zoom = 1;
        this.rotation = 0;
        this.offsetX = 0;
        this.offsetY = 0;

        // Time cycle settings
        this.currentYear = new Date().getFullYear();
        this.baseYear = 2025; // Reference year
        this.turningLength = 20; // years per turning

        // Season colors (Spring, Summer, Autumn, Winter)
        this.seasonColors = [
            '#8BC34A', // Spring - Green
            '#FFC107', // Summer - Yellow
            '#FF5722', // Autumn - Orange/Red
            '#2196F3'  // Winter - Blue
        ];

        this.seasonNames = ['Spring (High)', 'Summer (Awakening)', 'Autumn (Unraveling)', 'Winter (Crisis)'];

        // Cycle levels (20y, 80y, 320y, 1280y, 5120y)
        this.cycleLevels = [
            { years: 20, label: '1 Turning', rings: 1 },
            { years: 80, label: '1 Saeculum', rings: 4 },
            { years: 320, label: '4 Saecula', rings: 16 },
            { years: 1280, label: '16 Saecula', rings: 64 },
            { years: 5120, label: '64 Saecula', rings: 256 }
        ];

        // Events
        this.events = [];
        this.selectedEvent = null;
        this.hoveredEvent = null;

        // Calendar system
        this.calendarConverter = new CalendarConverter();
        this.currentCalendar = 'gregorian';

        // Interaction
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.setupInteraction();
        this.updateCycleInfo();
        this.loadEvents();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    setupInteraction() {
        // Zoom slider
        const zoomSlider = document.getElementById('zoom-slider');
        zoomSlider.addEventListener('input', (e) => {
            this.zoom = parseFloat(e.target.value);
            this.draw();
        });

        // Mouse drag for panning
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const dx = e.clientX - this.lastMouseX;
                const dy = e.clientY - this.lastMouseY;
                this.offsetX += dx;
                this.offsetY += dy;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
                this.draw();
            } else {
                // Check for event hover
                this.checkEventHover(e);
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDragging = false;
        });

        // Mouse wheel for zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.zoom = Math.max(0.5, Math.min(3, this.zoom + delta));
            document.getElementById('zoom-slider').value = this.zoom;
            this.draw();
        });

        // Click for event details
        this.canvas.addEventListener('click', (e) => {
            if (!this.isDragging && this.hoveredEvent) {
                this.showEventDetail(this.hoveredEvent);
            }
        });
    }

    async loadEvents() {
        try {
            const response = await fetch('data/seed-events.json');
            this.events = await response.json();
            this.updateEventCount();
            this.draw();
        } catch (error) {
            console.error('Failed to load events:', error);
            document.getElementById('event-count').textContent = 'Failed to load events';
        }
    }

    updateEventCount() {
        const countDiv = document.getElementById('event-count');
        if (this.events && this.events.length > 0) {
            countDiv.innerHTML = `
                <p style="font-size: 1.5rem; font-weight: bold; color: var(--spring);">${this.events.length}</p>
                <p style="font-size: 0.85rem; color: var(--text-dim);">historical events</p>
            `;
        } else {
            countDiv.textContent = 'No events loaded';
        }
    }

    getEventPosition(event) {
        // Calculate the position of an event on the spiral
        const year = parseInt(event.dates.gregorian.split('-')[0]);
        const cycleStart = 1945;
        const yearsSinceCycleStart = year - cycleStart;

        // Determine which turning (season) this event belongs to
        const seasonMap = {
            'spring': 0,
            'summer': 1,
            'autumn': 2,
            'winter': 3
        };
        const season = seasonMap[event.turning];

        // Determine which ring based on the event's scale
        const scaleToLevel = {
            20: 0,
            80: 1,
            320: 2,
            1280: 3,
            5120: 4
        };
        const level = scaleToLevel[event.scale] || 1;

        // Calculate position within the ring
        const maxRadius = Math.min(this.canvas.width, this.canvas.height) * 0.4 * this.zoom;
        const baseRadius = 30 * this.zoom;
        const ringWidth = (maxRadius - baseRadius) / 5;
        const innerRadius = baseRadius + (level * ringWidth);
        const outerRadius = innerRadius + ringWidth;
        const radius = (innerRadius + outerRadius) / 2;

        // Calculate angle based on year within the turning
        const turningStart = cycleStart + (Math.floor(yearsSinceCycleStart / this.turningLength) * this.turningLength);
        const yearsIntoTurning = year - turningStart;
        const progressInTurning = yearsIntoTurning / this.turningLength;

        // Base angle for the season + progress within season
        const baseAngle = (season * Math.PI / 2) - Math.PI / 2;
        const angle = baseAngle + (progressInTurning * Math.PI / 2);

        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            radius: 6 * this.zoom,
            angle,
            level
        };
    }

    checkEventHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - this.centerX - this.offsetX;
        const mouseY = e.clientY - rect.top - this.centerY - this.offsetY;

        let foundHover = false;
        for (const event of this.events) {
            const pos = this.getEventPosition(event);
            const distance = Math.sqrt(
                Math.pow(mouseX - pos.x, 2) +
                Math.pow(mouseY - pos.y, 2)
            );

            if (distance < pos.radius + 5) {
                this.hoveredEvent = event;
                this.canvas.style.cursor = 'pointer';
                foundHover = true;
                this.draw();
                break;
            }
        }

        if (!foundHover && this.hoveredEvent) {
            this.hoveredEvent = null;
            this.canvas.style.cursor = 'move';
            this.draw();
        }
    }

    showEventDetail(event) {
        const modal = document.getElementById('event-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');

        // Build multi-calendar date display with live conversion
        let dateHTML = '<div class="event-dates">';

        // Always show Gregorian
        dateHTML += `<div><strong>Gregorian (CE):</strong> ${event.dates.gregorian}</div>`;

        // Show stored dates or convert on-the-fly
        const calendars = [
            { key: 'hebrew', name: 'Hebrew' },
            { key: 'islamic', name: 'Islamic (Hijri)' },
            { key: 'buddhist', name: 'Buddhist' },
            { key: 'hindu', name: 'Hindu (Kali Yuga)' },
            { key: 'chinese', name: 'Chinese' },
            { key: 'julian', name: 'Julian' }
        ];

        for (const cal of calendars) {
            let dateStr;
            if (event.dates[cal.key]) {
                // Use pre-stored date
                dateStr = event.dates[cal.key];
            } else {
                // Convert on-the-fly
                dateStr = this.calendarConverter.convertEventDate(event, cal.key);
            }
            dateHTML += `<div><strong>${cal.name}:</strong> ${dateStr}</div>`;
        }

        dateHTML += '</div>';

        // Build categories
        const categoriesHTML = event.categories
            .map(cat => `<span class="category-tag">${cat.replace(/_/g, ' ')}</span>`)
            .join('');

        // Build sources
        const sourcesHTML = event.sources
            .map(source => `<li><em>${source.title}</em> by ${source.author} (${source.year})</li>`)
            .join('');

        modalTitle.textContent = event.title;
        modalContent.innerHTML = `
            ${dateHTML}
            <div class="event-meta">
                <span class="turning-badge ${event.turning}">${event.turning.toUpperCase()}</span>
                <span class="significance-badge">${event.significance}</span>
            </div>
            <div class="event-categories">${categoriesHTML}</div>
            <p class="event-description">${event.description}</p>
            <div class="event-sources">
                <strong>Sources:</strong>
                <ul>${sourcesHTML}</ul>
            </div>
        `;

        modal.style.display = 'block';
    }

    getCurrentSeason(year) {
        // Determine which season (turning) we're in
        // Assuming current cycle started around 1945 (post-WWII High)
        const cycleStart = 1945;
        const yearsSinceCycleStart = year - cycleStart;
        const turningIndex = Math.floor(yearsSinceCycleStart / this.turningLength) % 4;
        return turningIndex;
    }

    getYearPosition(year, level) {
        // Calculate position of a year within the spiral
        const yearsSinceBase = year - this.baseYear;
        const cycleLength = this.cycleLevels[level].years;
        const progress = (yearsSinceBase % cycleLength) / cycleLength;
        return progress;
    }

    drawSpiral() {
        const maxRadius = Math.min(this.canvas.width, this.canvas.height) * 0.4 * this.zoom;
        const baseRadius = 30 * this.zoom;
        const ringWidth = (maxRadius - baseRadius) / 5;

        // Apply transforms
        this.ctx.save();
        this.ctx.translate(this.centerX + this.offsetX, this.centerY + this.offsetY);

        // Draw rings for each cycle level
        for (let level = 0; level < 5; level++) {
            const innerRadius = baseRadius + (level * ringWidth);
            const outerRadius = innerRadius + ringWidth;
            const cycleYears = this.cycleLevels[level].years;

            // Draw 4 segments (seasons) for each ring
            for (let season = 0; season < 4; season++) {
                const startAngle = (season * Math.PI / 2) - Math.PI / 2;
                const endAngle = ((season + 1) * Math.PI / 2) - Math.PI / 2;

                // Draw the arc segment
                this.ctx.beginPath();
                this.ctx.arc(0, 0, outerRadius, startAngle, endAngle);
                this.ctx.arc(0, 0, innerRadius, endAngle, startAngle, true);
                this.ctx.closePath();

                // Color with season
                const color = this.seasonColors[season];
                this.ctx.fillStyle = color + '40'; // Semi-transparent
                this.ctx.fill();

                // Border
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();

                // Add labels for inner rings
                if (level === 0 || level === 1) {
                    const midAngle = startAngle + (Math.PI / 4);
                    const labelRadius = (innerRadius + outerRadius) / 2;
                    const labelX = Math.cos(midAngle) * labelRadius;
                    const labelY = Math.sin(midAngle) * labelRadius;

                    this.ctx.save();
                    this.ctx.translate(labelX, labelY);
                    this.ctx.rotate(midAngle + Math.PI / 2);
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.font = `${10 * this.zoom}px sans-serif`;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(this.seasonNames[season].split(' ')[0], 0, 0);
                    this.ctx.restore();
                }
            }

            // Add cycle level label
            this.ctx.save();
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = `${12 * this.zoom}px sans-serif`;
            this.ctx.textAlign = 'center';
            const labelY = -outerRadius - 10;
            this.ctx.fillText(this.cycleLevels[level].label, 0, labelY);
            this.ctx.restore();
        }

        // Draw center point (Year 0 / reference point)
        this.ctx.beginPath();
        this.ctx.arc(0, 0, baseRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff20';
        this.ctx.fill();
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Center label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = `${14 * this.zoom}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('Year 0', 0, 0);

        // Draw current year indicator
        const currentSeason = this.getCurrentSeason(this.currentYear);
        const currentAngle = (currentSeason * Math.PI / 2) + (Math.PI / 4) - Math.PI / 2;
        const indicatorRadius = baseRadius + ringWidth * 0.5;

        this.ctx.beginPath();
        this.ctx.arc(
            Math.cos(currentAngle) * indicatorRadius,
            Math.sin(currentAngle) * indicatorRadius,
            8 * this.zoom,
            0,
            Math.PI * 2
        );
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawEvents() {
        if (!this.events || this.events.length === 0) return;

        this.ctx.save();
        this.ctx.translate(this.centerX + this.offsetX, this.centerY + this.offsetY);

        // Draw all events
        for (const event of this.events) {
            const pos = this.getEventPosition(event);
            const isHovered = this.hoveredEvent === event;

            // Get season color
            const seasonMap = {
                'spring': this.seasonColors[0],
                'summer': this.seasonColors[1],
                'autumn': this.seasonColors[2],
                'winter': this.seasonColors[3]
            };
            const color = seasonMap[event.turning] || '#ffffff';

            // Draw event marker
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, pos.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.strokeStyle = isHovered ? '#ffffff' : '#000000';
            this.ctx.lineWidth = isHovered ? 3 : 2;
            this.ctx.stroke();

            // Draw glow effect when hovered
            if (isHovered) {
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, pos.radius + 4, 0, Math.PI * 2);
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 2;
                this.ctx.globalAlpha = 0.5;
                this.ctx.stroke();
                this.ctx.globalAlpha = 1.0;

                // Draw event title near marker
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = `bold ${12 * this.zoom}px sans-serif`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    event.title,
                    pos.x,
                    pos.y - pos.radius - 10
                );
            }
        }

        this.ctx.restore();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#2d2d2d';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the spiral
        this.drawSpiral();

        // Draw events on top
        this.drawEvents();
    }

    updateCycleInfo() {
        const currentSeason = this.getCurrentSeason(this.currentYear);
        const cycleStart = 1945;
        const yearsSinceCycleStart = this.currentYear - cycleStart;
        const yearInTurning = yearsSinceCycleStart % this.turningLength;
        const yearsUntilNextTurning = this.turningLength - yearInTurning;

        const infoDiv = document.getElementById('cycle-info');

        // Get current year in selected calendar
        const currentYearInCalendar = this.currentCalendar === 'gregorian'
            ? this.currentYear
            : this.calendarConverter.convert(
                `${this.currentYear}-01-01`,
                this.currentCalendar
            ).split(' ')[0]; // Extract just the year part

        infoDiv.innerHTML = `
            <p><strong>Current Year:</strong> ${currentYearInCalendar}</p>
            <p><strong>Current Turning:</strong> ${this.seasonNames[currentSeason]}</p>
            <p><strong>Years in Turning:</strong> ${yearInTurning} / ${this.turningLength}</p>
            <p><strong>Years to Next:</strong> ${yearsUntilNextTurning}</p>
            <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #555;">
                <strong>Cycle Start:</strong> ${cycleStart} (Post-WWII)
            </p>
        `;
    }

    changeCalendar(calendar) {
        this.currentCalendar = calendar;
        this.updateCycleInfo();
        // Could add more calendar-specific UI updates here
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const spiral = new ConchSpiral('spiral-canvas');
    spiral.draw();

    // Redraw on window resize
    window.addEventListener('resize', () => {
        spiral.draw();
    });

    // Calendar system selector
    const calendarSelect = document.getElementById('calendar-select');
    calendarSelect.addEventListener('change', (e) => {
        spiral.changeCalendar(e.target.value);
        console.log('Calendar system changed to:', e.target.value);
    });

    // Modal close functionality
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});
