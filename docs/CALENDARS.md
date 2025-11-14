# Calendar Systems in Year0

**Different cultures measure time differently. Year0 honors all perspectives.**

This document explains the calendar conversion system and the mathematical/historical basis for each calendar.

---

## Supported Calendar Systems

### 1. **Gregorian Calendar (CE)**

**Origin:** Introduced by Pope Gregory XIII in 1582
**Type:** Solar calendar
**Year Length:** 365.2425 days (365 days + leap years)
**Era:** CE (Common Era) / AD (Anno Domini)
**Start:** Year 1 CE

**How it works:**
- 12 months of varying lengths (28-31 days)
- Leap year every 4 years, except centuries not divisible by 400
- Most widely used civil calendar worldwide

**Example:** `2025-01-15` = January 15, 2025 CE

---

### 2. **Hebrew Calendar (Jewish)**

**Origin:** Ancient Jewish tradition, formalized by Hillel II (~358 CE)
**Type:** Lunisolar (lunar months, solar years)
**Year Length:** 353-385 days (varies by year type)
**Era:** Anno Mundi (AM) - "Year of the World"
**Start:** 3761 BCE (Gregorian) = Year 1 AM

**How it works:**
- 12 or 13 months (adds leap month 7 times per 19-year cycle)
- Months alternate 29-30 days
- New Year (Rosh Hashanah) in autumn
- Hebrew year = Gregorian year + 3760/3761

**Months:**
1. Nisan (30)
2. Iyar (29)
3. Sivan (30)
4. Tammuz (29)
5. Av (30)
6. Elul (29)
7. Tishrei (30)
8. Cheshvan (29/30)
9. Kislev (29/30)
10. Tevet (29)
11. Shevat (30)
12. Adar (29)
13. Adar II (29, leap years only)

**Example:** `5213-02-27` = 27 Iyar 5213 = May 29, 1453 CE

**Note:** Year0 uses simplified conversion. Full Hebrew calendar requires complex lunisolar calculations.

---

### 3. **Islamic Calendar (Hijri)**

**Origin:** Year of Muhammad's migration (Hijra) from Mecca to Medina
**Type:** Lunar calendar (pure, no solar adjustment)
**Year Length:** 354.37 days (11 days shorter than solar year)
**Era:** AH (Anno Hegirae) - "Year of the Hijra"
**Start:** July 16, 622 CE (Gregorian)

**How it works:**
- 12 lunar months, strictly following moon phases
- 29 or 30 days per month
- No leap months (drifts through seasons)
- Islamic year ≈ 0.97 Gregorian years

**Months:**
1. Muharram (30)
2. Safar (29)
3. Rabi' al-Awwal (30)
4. Rabi' al-Thani (29)
5. Jumada al-Awwal (30)
6. Jumada al-Thani (29)
7. Rajab (30)
8. Sha'ban (29)
9. Ramadan (30)
10. Shawwal (29)
11. Dhu al-Qi'dah (30)
12. Dhu al-Hijjah (29/30)

**Example:** `857-06-20` = 20 Jumada al-Awwal 857 AH = May 29, 1453 CE

**Note:** Actual Islamic dates may vary by 1-2 days based on moon sighting observations.

---

### 4. **Buddhist Calendar**

**Origin:** Traditional reckoning based on Buddha's death/Parinirvana
**Type:** Solar calendar (uses local civil calendar + offset)
**Year Length:** Follows Gregorian structure
**Era:** BE (Buddhist Era)
**Start:** 543 BCE (traditional, varies by region)

**How it works:**
- Simply adds 543 years to Gregorian calendar
- Used in Thailand, Cambodia, Laos, Myanmar, Sri Lanka
- Different Buddhist traditions use different epoch years

**Conversion:**
- Buddhist year = Gregorian year + 543

**Example:** `1996 BE` = 1453 CE

**Note:** Some traditions use 544 or 545 year offset. Year0 uses standard 543.

---

### 5. **Hindu Calendar (Kali Yuga)**

**Origin:** Hindu cosmology, current age (Yuga)
**Type:** Lunisolar (multiple regional variants)
**Year Length:** Varies by regional calendar
**Era:** Kali Yuga (current cosmic age)
**Start:** 3102 BCE (Gregorian)

**How it works:**
- Kali Yuga is the current age in Hindu cosmology
- One of four Yugas in a cycle (Satya, Treta, Dvapara, Kali)
- Kali Yuga year = Gregorian year + 3102

**The Four Yugas:**
- **Satya Yuga** (Golden Age) - 1,728,000 years
- **Treta Yuga** (Silver Age) - 1,296,000 years
- **Dvapara Yuga** (Bronze Age) - 864,000 years
- **Kali Yuga** (Iron Age) - 432,000 years (current, started 3102 BCE)

**Example:** `4555 Kali Yuga` = 1453 CE

**Note:** Actual Hindu calendars (Vikram Samvat, Saka, etc.) are complex lunisolar systems. Year0 uses simplified Kali Yuga reckoning.

---

### 6. **Chinese Calendar**

**Origin:** Ancient China, traditionally attributed to Yellow Emperor (2637 BCE)
**Type:** Lunisolar
**Year Length:** 353-385 days (12 or 13 lunar months)
**Era:** Sexagenary cycle (60-year repeating cycle)
**Start:** 2637 BCE (traditional)

**How it works:**
- Combines 10 Heavenly Stems and 12 Earthly Branches
- Each year has a Stem-Branch name and an animal
- 60-year cycle repeats continuously

**Heavenly Stems (Tiāngān):**
1. Jia (甲) - Wood+
2. Yi (乙) - Wood-
3. Bing (丙) - Fire+
4. Ding (丁) - Fire-
5. Wu (戊) - Earth+
6. Ji (己) - Earth-
7. Geng (庚) - Metal+
8. Xin (辛) - Metal-
9. Ren (壬) - Water+
10. Gui (癸) - Water-

**Earthly Branches (Dìzhī) & Zodiac Animals:**
1. Zi (子) - Rat
2. Chou (丑) - Ox
3. Yin (寅) - Tiger
4. Mao (卯) - Rabbit
5. Chen (辰) - Dragon
6. Si (巳) - Snake
7. Wu (午) - Horse
8. Wei (未) - Goat
9. Shen (申) - Monkey
10. You (酉) - Rooster
11. Xu (戌) - Dog
12. Hai (亥) - Pig

**Example:** `Year 4090 (Ji-You, Rooster)` = 1453 CE

**Note:** Chinese New Year varies (Jan 21 - Feb 20). Year0 uses simplified year calculation.

---

### 7. **Julian Calendar**

**Origin:** Introduced by Julius Caesar in 45 BCE
**Type:** Solar calendar
**Year Length:** 365.25 days
**Era:** BCE/CE (same as Gregorian)
**Start:** Year 1 CE

**How it works:**
- Predecessor to Gregorian calendar
- Leap year every 4 years (no century exception)
- Accumulates 1 day error per 128 years
- Used by some Eastern Orthodox churches today

**Difference from Gregorian:**
- By 1582: 10 days behind Gregorian
- By 1900: 13 days behind Gregorian
- Continues to drift

**Example:** `1453-05-22 (Julian)` = `1453-05-29 (Gregorian)`

---

## Calendar Conversion Methodology

### Julian Day Number (JDN)

Year0 uses **Julian Day Number** as an intermediate format for conversions:

1. Convert source calendar → JDN
2. Convert JDN → target calendar

**Julian Day Number** is a continuous count of days since January 1, 4713 BCE (proleptic Julian calendar). Used in astronomy and history.

### Conversion Accuracy

**High Accuracy:**
- Gregorian ↔ Julian (exact)
- Gregorian → Buddhist (exact, simple offset)

**Moderate Accuracy:**
- Gregorian ↔ Islamic (algorithmic, may differ 1-2 days from observational)

**Approximations:**
- Gregorian ↔ Hebrew (simplified, full accuracy requires complex lunisolar calculations)
- Gregorian ↔ Hindu (simplified Kali Yuga, not regional calendars)
- Gregorian ↔ Chinese (simplified, doesn't account for lunar new year date)

### Why Approximations?

Full calendar conversions require:
- **Astronomical calculations** (moon phases, solar terms)
- **Historical adjustments** (calendar reforms, regional variations)
- **Religious rules** (e.g., Hebrew calendar Molad, Islamic moon sighting)

Year0 provides **educational approximations** that are historically useful but may not match exact religious/traditional calculations.

**For scholarly work:** Cross-reference with specialized calendar libraries.

---

## Using the Calendar System

### In the UI

1. **Select calendar** from dropdown (top left)
2. **Current year** updates to show selected calendar
3. **Event modals** show date in ALL calendars (both stored and converted)

### In the Code

```javascript
const converter = new CalendarConverter();

// Convert a single date
const islamicDate = converter.convert('1453-05-29', 'islamic');
// Returns: "20 Jumada al-Awwal 857 AH"

// Convert an event's date
const eventDate = converter.convertEventDate(event, 'hebrew');
// Returns stored date if available, otherwise converts
```

### Adding New Calendars

To add a new calendar system:

1. **Add conversion function** in `calendars.js`
   ```javascript
   gregorianToNewCalendar(year, month, day) {
       // Implement conversion logic
       return { year, month, day };
   }
   ```

2. **Add formatting** in `formatDate()`
3. **Update UI dropdown** in `index.html`
4. **Document the calendar** in this file

---

## Future Enhancements

- **Mayan Long Count** calendar
- **Persian (Jalali)** calendar
- **Coptic** calendar
- **Ethiopian** calendar
- **French Revolutionary** calendar
- **More accurate lunisolar** calculations
- **Historical calendar reforms** (e.g., 1582 skip)
- **Regional variations** (different Buddhist eras, etc.)

---

## Further Reading

### Academic Resources
- Reingold & Dershowitz: *Calendrical Calculations* (definitive reference)
- Duncan Steel: *Marking Time: The Epic Quest to Invent the Perfect Calendar*
- E.G. Richards: *Mapping Time: The Calendar and Its History*

### Online Resources
- NASA's [Time and Date](https://eclipse.gsfc.nasa.gov/SEhelp/calendars.html)
- Fourmilab's [Calendar Converter](https://www.fourmilab.ch/documents/calendar/)
- Hebcal.com (Hebrew calendar)
- IslamicFinder.org (Islamic calendar)

---

*"Time is not a line, but a tapestry woven by many hands across many cultures."*

— Year0 Calendar Philosophy
