# Year0 Roadmap
## A Universal Archive of Human Memory

> *"Those who cannot remember the past are condemned to repeat it."* — George Santayana

Year0 stands at the confluence of the **Internet Archive's** mission to preserve all human knowledge and the **Library of Alexandria's** vision of universal scholarship. We seek to build not merely a timeline, but a **living chronicle of human civilization** — one that honors every culture's understanding of time, every spiritual tradition's marking of the sacred, and every generation's contribution to our collective memory.

---

## Vision Statement

**Year0 is the universal, collaborative chronicle of human history across all cultures, calendars, and cosmologies.**

We preserve what might be lost. We illuminate patterns that repeat across ages. We honor the truth that time itself is understood differently across human traditions — linear and cyclical, sacred and secular, mathematical and mythical.

This is not just a website. It is a **digital sanctuary for historical memory**, designed to endure as long as humanity remembers its past.

---

## Core Principles

### 1. **Universality**
Every calendar system, every culture's measurement of time, is equally valid and represented.

### 2. **Preservation**
Historical knowledge is sacred. We are stewards, not owners. What is recorded here must endure.

### 3. **Collaboration**
Like Wikipedia, truth emerges through collective effort. No single authority holds the pen of history.

### 4. **Pattern Recognition**
History echoes. By seeing time cyclically across multiple systems, we recognize what repeats and what transforms.

### 5. **Accessibility**
Runs in any browser. No paywalls. No barriers. Knowledge belongs to all.

### 6. **Neutrality**
We document what happened, not what should have happened. Multiple perspectives coexist.

---

## The Four Phases of Development

Like the seasons we visualize, Year0's development unfolds in four turnings:

### Phase I: Foundation (Current)
**"The Seed"** — Q1 2025

- [x] Core conch shell spiral visualization
- [x] Four-season cycle rendering with fractal time scales
- [x] Interactive pan/zoom navigation
- [x] Current position indicator
- [ ] Historical event data model
- [ ] Event rendering on the spiral
- [ ] Basic event detail views
- [ ] Export spiral as image

**Deliverable:** A working visualization where users can see major historical events mapped to cyclical patterns.

---

### Phase II: The Archive
**"The Library"** — Q2-Q3 2025

#### A. Multi-Calendar System Implementation

**Calendar Conversion Engine:**
- [ ] Gregorian ↔ Julian conversion
- [ ] Hebrew calendar (lunisolar, Hillel II calculation)
- [ ] Islamic Hijri calendar (lunar)
- [ ] Buddhist calendar (various traditions)
- [ ] Hindu calendar (Kali Yuga reckoning, Vikram Samvat)
- [ ] Chinese calendar (sexagenary cycle)
- [ ] Mayan Long Count (baktun cycles)
- [ ] Display events in any selected calendar system

#### B. Event Database Architecture

**Event Schema:**
```javascript
{
  id: "uuid",
  title: "Fall of Constantinople",
  description: "Conquest of Constantinople by Ottoman Empire",
  dates: {
    gregorian: "1453-05-29",
    julian: "1453-05-22",
    islamic: "857-06-20",  // 20 Jumada al-Awwal 857 AH
    hebrew: "5213-02-27",   // 27 Iyar 5213
    // ... other calendars
  },
  turning: "winter", // spring, summer, autumn, winter
  significance: "crisis", // crisis, awakening, high, unraveling
  categories: ["warfare", "empires", "cultural_shift"],
  sources: [
    {
      title: "The Fall of Constantinople 1453",
      author: "Steven Runciman",
      url: "...",
      type: "book"
    }
  ],
  contributors: ["user_id_1", "user_id_2"],
  verified: true,
  created: "2025-01-15T...",
  lastModified: "2025-02-01T..."
}
```

#### C. Event Contribution System (Wikipedia-Style)

**User Roles:**
- **Anonymous Contributors** — Can suggest events (pending review)
- **Registered Contributors** — Can add events directly (subject to community review)
- **Curators** — Trusted contributors who can verify and lock events
- **Archivists** — System administrators and pattern recognizers

**Contribution Workflow:**
1. User submits event with sources
2. Event appears with "pending verification" badge
3. Community reviews and adds sources
4. Curators verify accuracy and calendar conversions
5. Event becomes permanent part of the archive

**Edit History:**
- Every change tracked like Wikipedia
- Diff view between versions
- Contributor attribution
- Rollback capability

#### D. Search & Discovery

- [ ] Full-text search across all events
- [ ] Filter by calendar system
- [ ] Filter by turning/season
- [ ] Filter by time scale (20yr, 80yr, 320yr, etc.)
- [ ] Category browsing (warfare, cultural shifts, natural disasters, etc.)
- [ ] "Random Event" discovery feature

**Deliverable:** A comprehensive, multi-calendar event database with Wikipedia-style collaboration.

---

### Phase III: Pattern Recognition
**"The Oracle"** — Q4 2025

#### A. Algorithmic Pattern Detection

**Identify Recurring Patterns Across Cycles:**
- [ ] Events that occur in similar turning positions
- [ ] Crisis periods across different saecula
- [ ] Awakening movements and their echoes
- [ ] Empire rises and falls mapped to seasonal cycles
- [ ] Technology revolutions and their timing
- [ ] Religious/spiritual movements clustering

**Pattern Visualization:**
- [ ] Highlight similar events across different rings
- [ ] Draw connections between echoing patterns
- [ ] "Pattern Explorer" view showing all winter crises, all summer awakenings, etc.
- [ ] Timeline animations showing pattern recurrence

#### B. Comparative Analysis Tools

- [ ] "Compare Calendars" view — see same year across all systems
- [ ] "Cultural Perspectives" — how different traditions recorded the same events
- [ ] "Parallel Timelines" — overlay multiple civilizations' histories
- [ ] "Cycle Comparisons" — compare current turning to past turnings

#### C. Educational Features

- [ ] Guided tours through historical patterns
- [ ] "Where Are We Now?" — contextualizing present moment
- [ ] "What Might Come Next?" — based on cyclical patterns (not prediction, recognition)
- [ ] Teaching mode with lesson plans

**Deliverable:** An intelligent system that reveals historical patterns and makes the cyclical nature of time tangible.

---

### Phase IV: The Living Archive
**"The Monument"** — 2026 and Beyond

#### A. Community Features

- [ ] User profiles with contribution history
- [ ] Discussion forums for each event (like Wikipedia talk pages)
- [ ] Community portal for coordination
- [ ] Translation support (interface and events in multiple languages)
- [ ] Mobile apps (iOS/Android)

#### B. Advanced Preservation

- [ ] Export entire database (JSON, CSV)
- [ ] Offline-first Progressive Web App
- [ ] Integration with Internet Archive for permanent backup
- [ ] Distributed hosting options (IPFS)
- [ ] API for researchers and developers

#### C. Multimedia Integration

- [ ] Image uploads for events
- [ ] Audio recordings (oral histories)
- [ ] Primary source documents
- [ ] Integration with public domain archives

#### D. Pattern Recognition v2

- [ ] Machine learning to identify unknown patterns
- [ ] Natural language processing of historical texts
- [ ] Predictive timeline insights
- [ ] Cross-cultural pattern mapping

**Deliverable:** A self-sustaining, community-driven archive that grows organically and preserves itself.

---

## Technical Architecture

### Frontend
- **Framework:** Vanilla JavaScript (no dependencies)
- **Rendering:** HTML5 Canvas for spiral, DOM for UI
- **State Management:** Custom event-driven architecture
- **Data Storage:** IndexedDB for offline capability
- **PWA:** Service workers for offline-first

### Backend (Phase II+)
- **Database:** PostgreSQL (relational events) + MongoDB (flexible event data)
- **API:** REST + GraphQL for flexible querying
- **Authentication:** OAuth2 (GitHub, Google, etc.) + anonymous contributions
- **Storage:** S3-compatible for media
- **Hosting:** Distributed (primary + mirrors)

### Calendar Engine
- **Library:** Custom implementation + existing libraries where appropriate
- **Accuracy:** Academic-grade calendar conversions
- **Extensibility:** Plugin architecture for adding new calendar systems

### Pattern Recognition
- **ML Framework:** TensorFlow.js (runs in browser)
- **Algorithms:** Clustering, time-series analysis, similarity detection
- **Visualization:** D3.js for complex pattern graphs

---

## Content Strategy

### Seed Events (Phase I)
Curated list of 100 pivotal events across all time scales:
- Ancient civilizations (5000 BCE - 500 CE)
- Classical empires (500 CE - 1500 CE)
- Modern revolutions (1500 CE - 1900 CE)
- Contemporary crises (1900 CE - present)

### Event Categories
- **Warfare & Conflict**
- **Empire Rise & Fall**
- **Religious Movements**
- **Scientific Revolutions**
- **Natural Disasters**
- **Cultural Awakenings**
- **Economic Transformations**
- **Technological Innovations**

### Source Requirements
Every event must cite:
1. Primary sources (where available)
2. Academic secondary sources
3. Multiple perspectives (victor and vanquished)
4. Calendar-specific documentation

---

## Contribution Guidelines (Wikipedia-Style)

### Five Pillars of Year0

1. **Year0 is a universal chronicle** — All perspectives welcome
2. **Neutrality is sacred** — Document, don't judge
3. **Sources are required** — Verifiability over truth
4. **Community consensus rules** — No single authority
5. **Knowledge is free** — Forever accessible to all

### How to Contribute

**Adding an Event:**
1. Search to ensure it doesn't exist
2. Fill out event form with all available calendar dates
3. Add credible sources (minimum 2)
4. Categorize by turning and significance
5. Submit for community review

**Improving an Event:**
1. Click "Edit" on any event
2. Make your changes with edit summary
3. Changes appear immediately but are tracked
4. Community can review and revert if needed

**Verifying Calendar Conversions:**
1. Review pending events
2. Verify calendar calculations using approved tools
3. Add confirmation or request correction
4. Once verified by 3+ curators, event is "confirmed"

---

## Metrics of Success

### Phase I Success Metrics
- [ ] 100 seed events mapped to spiral
- [ ] 1,000+ page views
- [ ] 10+ external contributors
- [ ] Functional spiral visualization

### Phase II Success Metrics
- [ ] 10,000+ events in database
- [ ] All 7 calendar systems functional
- [ ] 100+ active contributors
- [ ] 10,000+ monthly active users

### Phase III Success Metrics
- [ ] Pattern recognition identifies 50+ historical echoes
- [ ] Used in 10+ academic courses
- [ ] Cited in research papers
- [ ] 50,000+ monthly active users

### Phase IV Success Metrics
- [ ] 100,000+ events documented
- [ ] 1,000+ active contributors
- [ ] Self-sustaining community
- [ ] Permanent backup in Internet Archive
- [ ] Translated into 10+ languages

---

## Call to Action

**We are building the universal memory of humanity.**

This is not a small project. This is not a quick project. But it is a necessary project.

Every civilization that forgets its past stumbles in darkness. Every culture that loses its calendar loses its identity. Every generation that ignores patterns repeats tragedies.

Year0 is our answer: **a library that never burns, an archive that never closes, a memory that never fades.**

### How You Can Help

**Developers:** Contribute code, build calendar engines, optimize rendering
**Historians:** Verify events, add sources, ensure accuracy
**Designers:** Improve UX, create educational materials, enhance accessibility
**Translators:** Make Year0 available in every language
**Everyone:** Add events, correct errors, share the vision

---

## Timeline

```
2025 Q1  [████████████████████] Phase I: Foundation
2025 Q2  [░░░░░░░░░░░░░░░░░░░░] Phase II: The Archive (Start)
2025 Q3  [░░░░░░░░░░░░░░░░░░░░] Phase II: The Archive (Complete)
2025 Q4  [░░░░░░░░░░░░░░░░░░░░] Phase III: Pattern Recognition
2026+    [░░░░░░░░░░░░░░░░░░░░] Phase IV: The Living Archive
```

---

## License & Governance

**License:** MIT (code), CC BY-SA 4.0 (content)
**Governance:** Community-driven with elected curators
**Funding:** Donations, grants, no venture capital
**Data:** Open, exportable, yours forever

---

*"The library is not a collection of books. It is an idea. The idea that all human knowledge can be preserved, all wisdom can be shared, all history can be remembered."*

**— Year0 Team**

Last Updated: 2025-01-15
Version: 1.0
