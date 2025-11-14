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

        // Interaction
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.setupInteraction();
        this.updateCycleInfo();
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

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#2d2d2d';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the spiral
        this.drawSpiral();
    }

    updateCycleInfo() {
        const currentSeason = this.getCurrentSeason(this.currentYear);
        const cycleStart = 1945;
        const yearsSinceCycleStart = this.currentYear - cycleStart;
        const yearInTurning = yearsSinceCycleStart % this.turningLength;
        const yearsUntilNextTurning = this.turningLength - yearInTurning;

        const infoDiv = document.getElementById('cycle-info');
        infoDiv.innerHTML = `
            <p><strong>Current Year:</strong> ${this.currentYear}</p>
            <p><strong>Current Turning:</strong> ${this.seasonNames[currentSeason]}</p>
            <p><strong>Years in Turning:</strong> ${yearInTurning} / ${this.turningLength}</p>
            <p><strong>Years to Next:</strong> ${yearsUntilNextTurning}</p>
            <p style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #555;">
                <strong>Cycle Start:</strong> ${cycleStart} (Post-WWII)
            </p>
        `;
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

    // Calendar system selector (placeholder for future implementation)
    const calendarSelect = document.getElementById('calendar-select');
    calendarSelect.addEventListener('change', (e) => {
        console.log('Calendar system changed to:', e.target.value);
        // TODO: Implement calendar system conversion
    });
});
