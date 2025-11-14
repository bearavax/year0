/**
 * Year0 Calendar Conversion Library
 *
 * Converts between multiple calendar systems used across different cultures and traditions.
 * All conversions use Gregorian as the intermediate format.
 *
 * Supported calendars:
 * - Gregorian (CE)
 * - Hebrew (Jewish)
 * - Islamic (Hijri)
 * - Buddhist
 * - Hindu (Kali Yuga)
 * - Chinese (Sexagenary cycle)
 * - Julian (for historical dates)
 */

class CalendarConverter {
    constructor() {
        // Reference dates for calculations
        this.GREGORIAN_EPOCH = 1721425.5; // Julian Day Number for Jan 1, 1 CE
        this.HEBREW_EPOCH = 347995.5; // Julian Day Number for Tishrei 1, 1 AM
        this.ISLAMIC_EPOCH = 1948439.5; // Julian Day Number for Muharram 1, 1 AH
        this.BUDDHIST_OFFSET = 543; // Buddhist calendar is 543 years ahead
        this.KALI_YUGA_EPOCH = -3101; // Kali Yuga started in 3102 BCE
    }

    /**
     * Convert Gregorian date to Julian Day Number
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {number} Julian Day Number
     */
    gregorianToJDN(year, month, day) {
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;

        let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y +
                  Math.floor(y / 4) - Math.floor(y / 100) +
                  Math.floor(y / 400) - 32045;

        return jdn;
    }

    /**
     * Convert Julian Day Number to Gregorian date
     * @param {number} jdn - Julian Day Number
     * @returns {Object} {year, month, day}
     */
    jdnToGregorian(jdn) {
        let a = jdn + 32044;
        let b = Math.floor((4 * a + 3) / 146097);
        let c = a - Math.floor((146097 * b) / 4);
        let d = Math.floor((4 * c + 3) / 1461);
        let e = c - Math.floor((1461 * d) / 4);
        let m = Math.floor((5 * e + 2) / 153);

        let day = e - Math.floor((153 * m + 2) / 5) + 1;
        let month = m + 3 - 12 * Math.floor(m / 10);
        let year = 100 * b + d - 4800 + Math.floor(m / 10);

        return { year, month, day };
    }

    /**
     * Convert Gregorian to Hebrew calendar
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {Object} {year, month, day, monthName}
     */
    gregorianToHebrew(year, month, day) {
        // Hebrew calendar is lunisolar and complex
        // Using simplified Gauss formula for approximation
        const jdn = this.gregorianToJDN(year, month, day);

        // Approximate conversion (simplified)
        // Hebrew year 1 = 3761 BCE in Gregorian
        const hebrewYear = year + 3760;

        // This is a simplified approximation
        // For production, use a full Hebrew calendar library
        const hebrewMonths = [
            'Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
            'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar'
        ];

        // Simple month mapping (not accurate for lunar calendar)
        let hebrewMonth = ((month + 6) % 12) + 1;
        let hebrewDay = day;

        return {
            year: hebrewYear,
            month: hebrewMonth,
            day: hebrewDay,
            monthName: hebrewMonths[hebrewMonth - 1]
        };
    }

    /**
     * Convert Gregorian to Islamic (Hijri) calendar
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {Object} {year, month, day, monthName}
     */
    gregorianToIslamic(year, month, day) {
        const jdn = this.gregorianToJDN(year, month, day);

        // Islamic calendar conversion
        const islamicYear = Math.floor(((jdn - this.ISLAMIC_EPOCH) * 30) / 10631) + 1;

        // Calculate month and day (simplified)
        const daysIntoYear = jdn - this.islamicYearToJDN(islamicYear);

        const islamicMonths = [
            'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
            'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
            'Ramadan', 'Shawwal', "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ];

        let islamicMonth = 1;
        let remainingDays = daysIntoYear;

        // Islamic months alternate between 29 and 30 days
        const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

        for (let i = 0; i < 12; i++) {
            if (remainingDays <= monthLengths[i]) {
                islamicMonth = i + 1;
                break;
            }
            remainingDays -= monthLengths[i];
        }

        return {
            year: islamicYear,
            month: islamicMonth,
            day: Math.floor(remainingDays),
            monthName: islamicMonths[islamicMonth - 1]
        };
    }

    /**
     * Helper: Get JDN for start of Islamic year
     */
    islamicYearToJDN(year) {
        return Math.floor((year - 1) * 354.36667 + this.ISLAMIC_EPOCH);
    }

    /**
     * Convert Gregorian to Buddhist calendar
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {Object} {year, month, day}
     */
    gregorianToBuddhist(year, month, day) {
        // Buddhist calendar is simply Gregorian + 543 years
        return {
            year: year + this.BUDDHIST_OFFSET,
            month: month,
            day: day
        };
    }

    /**
     * Convert Gregorian to Hindu (Kali Yuga) calendar
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {Object} {year, month, day}
     */
    gregorianToKaliYuga(year, month, day) {
        // Kali Yuga started in 3102 BCE
        const kaliYear = year - this.KALI_YUGA_EPOCH;

        return {
            year: kaliYear,
            month: month,
            day: day,
            era: 'Kali Yuga'
        };
    }

    /**
     * Convert Gregorian to Chinese calendar (simplified)
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {Object} {year, cycle, stemBranch, animal}
     */
    gregorianToChinese(year, month, day) {
        // Chinese calendar year (simplified - uses Gregorian year as approximation)
        // Actual Chinese New Year varies by lunisolar calendar

        const animals = [
            'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
            'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
        ];

        const stems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
        const branches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

        // Chinese calendar started in 2637 BCE
        const chineseYear = year + 2636;
        const sexagenaryYear = (year - 4) % 60;
        const animalIndex = (year - 4) % 12;

        const stem = stems[sexagenaryYear % 10];
        const branch = branches[sexagenaryYear % 12];

        return {
            year: chineseYear,
            cycle: Math.floor(sexagenaryYear / 60) + 1,
            stemBranch: `${stem}-${branch}`,
            animal: animals[animalIndex],
            month: month,
            day: day
        };
    }

    /**
     * Convert Gregorian to Julian calendar
     * @param {number} year - Gregorian year
     * @param {number} month - Month (1-12)
     * @param {number} day - Day of month
     * @returns {Object} {year, month, day}
     */
    gregorianToJulian(year, month, day) {
        const jdn = this.gregorianToJDN(year, month, day);

        // Julian calendar formula
        let b = 0;
        let c = jdn + 32082;
        let d = Math.floor((4 * c + 3) / 1461);
        let e = c - Math.floor((1461 * d) / 4);
        let m = Math.floor((5 * e + 2) / 153);

        let julianDay = e - Math.floor((153 * m + 2) / 5) + 1;
        let julianMonth = m + 3 - 12 * Math.floor(m / 10);
        let julianYear = d - 4800 + Math.floor(m / 10);

        return {
            year: julianYear,
            month: julianMonth,
            day: julianDay
        };
    }

    /**
     * Format a date object as a readable string
     * @param {Object} dateObj - Date object from conversion
     * @param {string} calendarType - Type of calendar
     * @returns {string} Formatted date string
     */
    formatDate(dateObj, calendarType) {
        switch (calendarType) {
            case 'gregorian':
                return `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;

            case 'hebrew':
                return `${dateObj.day} ${dateObj.monthName || ''} ${dateObj.year}`;

            case 'islamic':
                return `${dateObj.day} ${dateObj.monthName || ''} ${dateObj.year} AH`;

            case 'buddhist':
                return `${dateObj.year} BE (${dateObj.month}/${dateObj.day})`;

            case 'hindu':
                return `${dateObj.year} ${dateObj.era || 'Kali Yuga'}`;

            case 'chinese':
                return `Year ${dateObj.year} (${dateObj.stemBranch}, ${dateObj.animal})`;

            case 'julian':
                return `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')} (Julian)`;

            default:
                return JSON.stringify(dateObj);
        }
    }

    /**
     * Convert from Gregorian to any supported calendar
     * @param {string} gregorianDate - Date in YYYY-MM-DD format
     * @param {string} targetCalendar - Target calendar system
     * @returns {string} Formatted date in target calendar
     */
    convert(gregorianDate, targetCalendar) {
        const parts = gregorianDate.split('-');
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        let dateObj;

        switch (targetCalendar) {
            case 'gregorian':
                dateObj = { year, month, day };
                break;
            case 'hebrew':
                dateObj = this.gregorianToHebrew(year, month, day);
                break;
            case 'islamic':
                dateObj = this.gregorianToIslamic(year, month, day);
                break;
            case 'buddhist':
                dateObj = this.gregorianToBuddhist(year, month, day);
                break;
            case 'hindu':
                dateObj = this.gregorianToKaliYuga(year, month, day);
                break;
            case 'chinese':
                dateObj = this.gregorianToChinese(year, month, day);
                break;
            case 'julian':
                dateObj = this.gregorianToJulian(year, month, day);
                break;
            default:
                dateObj = { year, month, day };
        }

        return this.formatDate(dateObj, targetCalendar);
    }

    /**
     * Convert all dates in an event to a target calendar
     * @param {Object} event - Event object with dates
     * @param {string} targetCalendar - Target calendar system
     * @returns {string} Primary date in target calendar
     */
    convertEventDate(event, targetCalendar) {
        if (!event.dates || !event.dates.gregorian) {
            return 'Unknown date';
        }

        // If the event already has this calendar's date, use it
        if (event.dates[targetCalendar]) {
            return event.dates[targetCalendar];
        }

        // Otherwise, convert from Gregorian
        return this.convert(event.dates.gregorian, targetCalendar);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalendarConverter;
}
