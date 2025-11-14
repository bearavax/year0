# Year0

**Interactive conch shell timeline documenting history in cyclical time periods across multiple spiritual calendars**

## Concept

Year0 is a contributable web-based visualization that represents history as a **conch shell spiral**, embracing the cyclical nature of time as understood across different spiritual and cultural traditions.

### The Fourth Turning Framework

Based on Strauss-Howe generational theory, time moves in recurring cycles of four "seasons" or turnings:

- 🌱 **Spring (High)** - Post-crisis rebirth, strong institutions, weak individualism
- ☀️ **Summer (Awakening)** - Spiritual/cultural upheaval, questioning institutions
- 🍂 **Autumn (Unraveling)** - Weak institutions, strong individualism, fragmentation
- ❄️ **Winter (Crisis)** - Major upheaval, destruction and rebirth

### Fractal Time Scales

Each cycle expands by 4x, creating nested spirals:

- **20 years** = 1 Turning
- **80 years** = 1 Saeculum (4 turnings)
- **320 years** = 4 Saecula
- **1,280 years** = 16 Saecula
- **5,120 years** = 64 Saecula

### Multi-Calendar Support

Events can be mapped across different calendar systems:
- Gregorian (CE)
- Hebrew
- Islamic (Hijri)
- Buddhist
- Hindu (Kali Yuga)
- Chinese
- Mayan Long Count

## Features

### ✅ Phase I Complete (Foundation)
- **Interactive conch shell spiral visualization** - Beautiful nested rings representing fractal time scales
- **Historical event markers** - 6 seed events positioned on the spiral by year and turning
- **Event detail modals** - Click any event to see full details, multi-calendar dates, and sources
- **Hover interactions** - Event names appear on hover with glow effects
- **Multiple time scale views** - 20yr to 5,120yr cycles displayed simultaneously
- **Four-season color coding** - Spring (green), Summer (yellow), Autumn (orange), Winter (blue)
- **Pan and zoom navigation** - Drag to pan, scroll or slider to zoom
- **Current position indicator** - Shows where we are in the current cycle

### 🚧 Coming Soon
- Multi-calendar system conversions (Hebrew, Islamic, Buddhist, Hindu, Chinese, Mayan)
- Community contribution system (Wikipedia-style)
- Pattern recognition visualization
- Event filtering and search
- Larger event database (100+ events)

## Getting Started

### Run Locally

```bash
# Start a local web server
npm run dev
# or
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Technology

- Vanilla JavaScript
- HTML5 Canvas
- No build tools required - runs directly in the browser

## Roadmap Progress

- [x] **Historical event markers** ✅ Phase I Complete
- [x] **Event detail views** ✅ Phase I Complete
- [x] **Interactive hover tooltips** ✅ Phase I Complete
- [ ] Calendar system conversions (Phase II)
- [ ] User contribution system (Phase II)
- [ ] Pattern recognition algorithms (Phase III)
- [ ] Expanded event database (Phase II)
- [ ] Search and filter (Phase II)
- [ ] Export/share functionality (Phase III)

See [ROADMAP.md](ROADMAP.md) for the complete development plan across all four phases.

## Documentation

### 📚 Core Documents
- **[ROADMAP.md](ROADMAP.md)** - Complete development plan: Internet Archive meets Library of Alexandria
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute (Wikipedia-style collaboration)
- **[docs/PATTERNS.md](docs/PATTERNS.md)** - Pattern recognition system and historical echoes

### 📐 Technical Specifications
- **[data/schema.js](data/schema.js)** - Event database schema and validation
- **[data/seed-events.json](data/seed-events.json)** - Initial historical events dataset

## Philosophy

> *"Those who cannot remember the past are condemned to repeat it."* — George Santayana

Year0 stands at the confluence of the **Internet Archive's** mission to preserve all human knowledge and the **Library of Alexandria's** vision of universal scholarship.

Different cultures measure time differently, yet patterns emerge across all systems. Year0 seeks to reveal these patterns by presenting history through multiple lenses simultaneously, honoring the wisdom that time is both linear and cyclical.

**This is not just a timeline. It is a digital sanctuary for historical memory, designed to endure as long as humanity remembers its past.**

## Contributing

We are building the universal memory of humanity. See [CONTRIBUTING.md](CONTRIBUTING.md) for how you can help:

- **Developers:** Build calendar engines, optimize rendering, implement pattern recognition
- **Historians:** Add events, verify dates, ensure accuracy
- **Designers:** Improve UX and accessibility
- **Translators:** Make Year0 available in every language
- **Everyone:** Document history, correct errors, share the vision

## License

- **Code:** MIT License
- **Content:** CC BY-SA 4.0
- **Philosophy:** Knowledge is free, forever
