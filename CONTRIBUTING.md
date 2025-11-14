# Contributing to Year0

**Welcome, Chronicler.**

You have arrived at a project that aims to preserve the entire timeline of human history across all cultures and calendars. Your contributions — whether code, events, corrections, or translations — help build a universal archive of human memory.

---

## The Five Pillars of Year0

Before contributing, please understand our guiding principles:

### 1. Year0 is a Universal Chronicle
We document history from all perspectives. Every calendar system, every cultural tradition, every spiritual understanding of time is equally valid here.

### 2. Neutrality is Sacred
We describe what happened, not what should have happened. We present multiple perspectives without taking sides. The goal is documentation, not judgment.

### 3. Sources are Required
Every event must be verifiable. We cite primary sources, academic works, and credible documentation. *Verifiability* matters more than *truth* — we document what sources say, noting disagreements where they exist.

### 4. Community Consensus Rules
No single person owns history. Decisions are made through community discussion and consensus. Edit wars are resolved through dialogue, not authority.

### 5. Knowledge is Free
Everything we create is freely accessible. Code is MIT licensed. Content is CC BY-SA 4.0. No paywalls, ever.

---

## How to Contribute

### For Developers

#### Getting Started
```bash
# Clone the repository
git clone https://github.com/your-org/year0.git
cd year0

# Run local development server
npm run dev
# Visit http://localhost:8000
```

#### Code Contribution Workflow
1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature/calendar-engine`
3. **Make your changes** following our code style (see below)
4. **Test thoroughly** — the spiral must render correctly
5. **Commit** with clear messages: `git commit -m "Add Hebrew calendar conversion"`
6. **Push** and open a Pull Request
7. **Discuss** — maintainers will review and provide feedback

#### Code Style
- **JavaScript:** Vanilla ES6+, no frameworks unless absolutely necessary
- **Functions:** Clear names, documented with JSDoc comments
- **Classes:** PascalCase (e.g., `ConchSpiral`, `CalendarEngine`)
- **Variables:** camelCase (e.g., `currentYear`, `seasonColors`)
- **Indentation:** 2 spaces (no tabs)
- **Comments:** Explain *why*, not *what*

**Example:**
```javascript
/**
 * Converts a Gregorian date to Hebrew calendar
 * Uses the Gauss formula for Hebrew calendar calculation
 * @param {number} year - Gregorian year (CE)
 * @param {number} month - Month (1-12)
 * @param {number} day - Day of month
 * @returns {object} Hebrew date {year, month, day}
 */
function gregorianToHebrew(year, month, day) {
  // Hebrew year 1 = Gregorian 3760 BCE
  const hebrewYear = year + 3760;
  // ... calculation logic
  return { year: hebrewYear, month, day };
}
```

#### Priority Areas for Developers
- [ ] Calendar conversion engines (Hebrew, Islamic, Buddhist, Hindu, Chinese, Mayan)
- [ ] Event database backend (PostgreSQL + API)
- [ ] Search and filter functionality
- [ ] Pattern recognition algorithms
- [ ] Mobile responsiveness improvements
- [ ] Accessibility (screen readers, keyboard navigation)
- [ ] Performance optimization (Canvas rendering, large datasets)

---

### For Historians & Scholars

#### Adding Historical Events

**Step 1: Research**
Before adding an event, verify:
- It's not already in the database
- You have at least 2 credible sources
- You can identify the date in multiple calendar systems (or note if unavailable)
- You understand its significance in the cyclical framework

**Step 2: Categorize**
Every event belongs to a **turning** (season):
- **Spring (High):** Post-crisis renewal, institution building, optimism
- **Summer (Awakening):** Spiritual/cultural upheaval, questioning authority
- **Autumn (Unraveling):** Institutional decay, individualism, cynicism
- **Winter (Crisis):** War, revolution, collapse, rebirth through destruction

And a **significance level:**
- **Local:** Affects a city or region
- **Regional:** Affects multiple regions/countries
- **Global:** Affects entire civilizations or the world
- **Epochal:** Fundamentally changes the course of history

**Step 3: Multi-Calendar Dating**
Provide dates in as many calendar systems as you can verify:
- **Gregorian** (required)
- **Julian** (for events before 1582)
- **Islamic Hijri** (for Islamic world events)
- **Hebrew** (for Jewish history)
- **Buddhist** (for South/Southeast Asian events)
- **Hindu** (Kali Yuga or Vikram Samvat)
- **Chinese** (for East Asian events)
- **Mayan Long Count** (for Mesoamerican events)

**If you don't know a calendar conversion, leave it blank.** Other contributors will fill it in.

**Step 4: Add Sources**
Minimum 2 sources required. Preferred sources:
1. **Primary sources** (eyewitness accounts, contemporary documents)
2. **Academic books and journals**
3. **Credible encyclopedias** (Encyclopedia Britannica, Stanford Encyclopedia, etc.)
4. **Digital archives** (Internet Archive, JSTOR, Library of Congress)

Avoid:
- Wikipedia as sole source (but can supplement)
- Blogs or opinion pieces
- Uncited websites

**Step 5: Submit**
Use the event submission form (Phase II) or create an issue on GitHub (Phase I) with:
```markdown
## Event Title
**Fall of Constantinople**

## Description
The capture of Constantinople by the Ottoman Empire under Mehmed II, ending the Byzantine Empire and marking a major turning point in history.

## Dates
- Gregorian: May 29, 1453
- Julian: May 22, 1453
- Islamic: 20 Jumada al-Awwal 857 AH
- Hebrew: 27 Iyar 5213

## Turning
Winter (Crisis)

## Significance
Epochal

## Categories
- Warfare
- Empire Fall
- Religious Shift

## Sources
1. Runciman, Steven. *The Fall of Constantinople 1453*. Cambridge University Press, 1965.
2. Crowley, Roger. *Constantinople: The Last Great Siege, 1453*. Faber & Faber, 2005.
3. Primary source: Kritovoulos. *History of Mehmed the Conqueror* (contemporary account).
```

#### Reviewing Events
Community members can review pending events:
- **Verify dates** across calendar systems
- **Check sources** for credibility
- **Improve descriptions** for clarity
- **Add context** from other perspectives
- **Correct errors** with edit summaries

---

### For Translators

Help make Year0 accessible worldwide:

**Priority Languages:**
- Spanish (500M speakers)
- Mandarin Chinese (900M speakers)
- Arabic (300M speakers)
- Hindi (600M speakers)
- French (280M speakers)
- Portuguese (250M speakers)

**What to Translate:**
1. User interface (buttons, menus, labels)
2. Documentation (README, CONTRIBUTING, ROADMAP)
3. Event descriptions (community-contributed)
4. Educational content

**Translation Process:**
1. Create `locales/[language-code]/` directory
2. Copy `locales/en/strings.json` to your language folder
3. Translate all strings while preserving variables (`{0}`, `{1}`)
4. Test in the interface
5. Submit PR

---

### For Designers

#### Visual Design Needs
- [ ] Improved mobile layouts
- [ ] Accessibility improvements (contrast, font sizes)
- [ ] Event card designs
- [ ] Pattern visualization styles
- [ ] Logo and branding
- [ ] Educational infographics

#### UX Improvements
- [ ] Onboarding flow for new users
- [ ] Event submission forms (intuitive, clear)
- [ ] Navigation between time scales
- [ ] Search results presentation
- [ ] Pattern explorer interface

**Design Principles:**
- **Timeless:** Avoid trendy styles, aim for lasting design
- **Scholarly:** Serious tone, like a library
- **Accessible:** WCAG 2.1 AA compliance
- **Minimalist:** Information-dense but not cluttered

---

## Community Standards

### Code of Conduct
- **Be respectful:** We're all here to preserve knowledge
- **Assume good faith:** Most mistakes are honest errors
- **Provide evidence:** Cite sources in disputes
- **Stay neutral:** No modern political agendas
- **Welcome newcomers:** Everyone starts somewhere

### Edit Wars
If two contributors disagree on an event:
1. **Discuss on the event's talk page**
2. **Cite sources** for your position
3. **Seek community input** if no consensus
4. **Curators mediate** as last resort
5. **Present both views** if disagreement persists

### Content Disputes
- **Primary sources trump secondary sources**
- **Multiple perspectives are presented, not judged**
- **Academic consensus is weighted heavily**
- **Fringe theories are noted as such**

---

## Recognition

Contributors are honored in multiple ways:

### Contributor Tiers
- **Bronze:** 1+ verified events
- **Silver:** 10+ verified events
- **Gold:** 100+ verified events
- **Platinum:** 1,000+ verified events
- **Archivist:** Sustained, high-quality contributions

### Special Roles
- **Curator:** Trusted contributor who verifies events (elected by community)
- **Translator:** Localization contributors
- **Developer:** Code contributors
- **Patron:** Financial supporters

### Attribution
- Every event shows its contributors
- Edit history is preserved forever
- Annual "State of the Archive" recognizes top contributors

---

## Getting Help

- **Discord:** [Join our server] (coming Phase II)
- **GitHub Issues:** Report bugs or request features
- **Email:** contribute@year0.org (coming Phase II)
- **Documentation:** See `/docs` folder

---

## License

**Code:** MIT License — use it, modify it, share it
**Content:** CC BY-SA 4.0 — share and adapt with attribution

By contributing, you agree that your contributions will be licensed under these terms.

---

**Thank you for helping build the universal archive of human memory.**

*"We are not just recording history — we are ensuring it can never be forgotten."*

— Year0 Community
