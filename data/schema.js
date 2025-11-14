/**
 * Year0 Event Database Schema
 *
 * This file defines the structure for historical events in the Year0 archive.
 * Events are documented across multiple calendar systems and cyclical patterns.
 */

/**
 * @typedef {Object} EventDate
 * @property {string} gregorian - ISO 8601 date (YYYY-MM-DD)
 * @property {string} [julian] - Julian calendar date (for pre-1582 events)
 * @property {string} [islamic] - Islamic Hijri date
 * @property {string} [hebrew] - Hebrew calendar date
 * @property {string} [buddhist] - Buddhist calendar date
 * @property {string} [hindu] - Hindu calendar date (Kali Yuga or Vikram Samvat)
 * @property {string} [chinese] - Chinese calendar date
 * @property {string} [mayan] - Mayan Long Count date
 * @property {number} [uncertainty] - Date uncertainty in days (0 = exact, higher = more uncertain)
 */

/**
 * @typedef {Object} EventSource
 * @property {string} type - Source type: "primary", "book", "journal", "archive", "other"
 * @property {string} title - Source title
 * @property {string} [author] - Author(s) name
 * @property {string} [url] - Link to source (if available)
 * @property {string} [isbn] - ISBN for books
 * @property {string} [doi] - DOI for journal articles
 * @property {number} [year] - Publication year
 * @property {string} [notes] - Additional context about this source
 */

/**
 * @typedef {Object} EventContributor
 * @property {string} id - User ID or contributor identifier
 * @property {string} name - Display name
 * @property {string} role - Contribution role: "author", "editor", "verifier", "translator"
 * @property {string} timestamp - ISO 8601 timestamp of contribution
 */

/**
 * @typedef {Object} HistoricalEvent
 * @property {string} id - Unique identifier (UUID)
 * @property {string} title - Event title (concise, neutral)
 * @property {string} description - Detailed description (2-4 paragraphs, neutral POV)
 * @property {EventDate} dates - Event date(s) across calendar systems
 * @property {boolean} dateRange - Whether this event spans multiple days/years
 * @property {EventDate} [endDate] - End date if dateRange is true
 *
 * @property {string} turning - Seasonal turning: "spring", "summer", "autumn", "winter"
 * @property {string} significance - Impact level: "local", "regional", "global", "epochal"
 * @property {number} scale - Time scale (years): 20, 80, 320, 1280, 5120
 *
 * @property {string[]} categories - Event categories (see CATEGORIES constant)
 * @property {string[]} regions - Geographic regions affected (see REGIONS constant)
 * @property {string[]} tags - Additional searchable tags
 *
 * @property {EventSource[]} sources - Minimum 2 required for verification
 * @property {EventContributor[]} contributors - List of contributors
 *
 * @property {Object} metadata - Additional metadata
 * @property {boolean} metadata.verified - Whether event is community-verified
 * @property {number} metadata.verificationCount - Number of verifications
 * @property {string} metadata.created - ISO 8601 creation timestamp
 * @property {string} metadata.lastModified - ISO 8601 last edit timestamp
 * @property {number} metadata.version - Version number (increments with each edit)
 * @property {string} metadata.language - Primary language of content (ISO 639-1)
 *
 * @property {Object} [multimedia] - Optional multimedia attachments
 * @property {string[]} [multimedia.images] - Image URLs
 * @property {string[]} [multimedia.audio] - Audio URLs
 * @property {string[]} [multimedia.documents] - Document URLs
 *
 * @property {Object} [translations] - Translations of title/description
 * @property {string} [translations.es] - Spanish translation
 * @property {string} [translations.zh] - Chinese translation
 * @property {string} [translations.ar] - Arabic translation
 * // ... other language codes
 *
 * @property {string[]} [relatedEvents] - IDs of related events (patterns, causes, effects)
 * @property {Object} [patterns] - Identified patterns this event participates in
 */

// Event Categories
const CATEGORIES = {
  WARFARE: "warfare",
  EMPIRE_RISE: "empire_rise",
  EMPIRE_FALL: "empire_fall",
  RELIGIOUS_MOVEMENT: "religious_movement",
  SCIENTIFIC_REVOLUTION: "scientific_revolution",
  NATURAL_DISASTER: "natural_disaster",
  CULTURAL_AWAKENING: "cultural_awakening",
  ECONOMIC_TRANSFORMATION: "economic_transformation",
  TECHNOLOGICAL_INNOVATION: "technological_innovation",
  POLITICAL_REVOLUTION: "political_revolution",
  SOCIAL_MOVEMENT: "social_movement",
  PLAGUE_PANDEMIC: "plague_pandemic",
  ARTISTIC_MOVEMENT: "artistic_movement",
  PHILOSOPHICAL_SHIFT: "philosophical_shift",
  EXPLORATION: "exploration",
  MIGRATION: "migration"
};

// Geographic Regions
const REGIONS = {
  GLOBAL: "global",
  EUROPE: "europe",
  ASIA: "asia",
  AFRICA: "africa",
  AMERICAS: "americas",
  OCEANIA: "oceania",
  MIDDLE_EAST: "middle_east",
  MEDITERRANEAN: "mediterranean",
  EAST_ASIA: "east_asia",
  SOUTH_ASIA: "south_asia",
  SOUTHEAST_ASIA: "southeast_asia",
  CENTRAL_ASIA: "central_asia",
  NORTH_AMERICA: "north_america",
  SOUTH_AMERICA: "south_america",
  WESTERN_EUROPE: "western_europe",
  EASTERN_EUROPE: "eastern_europe",
  SUB_SAHARAN_AFRICA: "sub_saharan_africa",
  NORTH_AFRICA: "north_africa"
};

// Turnings (Seasons)
const TURNINGS = {
  SPRING: "spring",    // High
  SUMMER: "summer",    // Awakening
  AUTUMN: "autumn",    // Unraveling
  WINTER: "winter"     // Crisis
};

// Significance Levels
const SIGNIFICANCE = {
  LOCAL: "local",       // City or small region
  REGIONAL: "regional", // Multiple regions/countries
  GLOBAL: "global",     // Entire civilizations or world
  EPOCHAL: "epochal"    // Fundamentally changes history
};

// Time Scales (years)
const SCALES = {
  TURNING: 20,
  SAECULUM: 80,
  FOUR_SAECULA: 320,
  SIXTEEN_SAECULA: 1280,
  SIXTYFOUR_SAECULA: 5120
};

/**
 * Validates an event object against the schema
 * @param {HistoricalEvent} event - Event to validate
 * @returns {Object} {valid: boolean, errors: string[]}
 */
function validateEvent(event) {
  const errors = [];

  // Required fields
  if (!event.id) errors.push("Missing required field: id");
  if (!event.title) errors.push("Missing required field: title");
  if (!event.description) errors.push("Missing required field: description");
  if (!event.dates || !event.dates.gregorian) errors.push("Missing required field: dates.gregorian");
  if (!event.turning) errors.push("Missing required field: turning");
  if (!event.significance) errors.push("Missing required field: significance");
  if (!event.categories || event.categories.length === 0) errors.push("Event must have at least one category");
  if (!event.sources || event.sources.length < 2) errors.push("Event must have at least 2 sources");

  // Validate enum values
  if (event.turning && !Object.values(TURNINGS).includes(event.turning)) {
    errors.push(`Invalid turning: ${event.turning}`);
  }
  if (event.significance && !Object.values(SIGNIFICANCE).includes(event.significance)) {
    errors.push(`Invalid significance: ${event.significance}`);
  }
  if (event.scale && !Object.values(SCALES).includes(event.scale)) {
    errors.push(`Invalid scale: ${event.scale}`);
  }

  // Validate date format (basic check)
  if (event.dates.gregorian && !/^\d{4}-\d{2}-\d{2}$/.test(event.dates.gregorian)) {
    errors.push("Invalid Gregorian date format (expected YYYY-MM-DD)");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Creates a new event object with default values
 * @param {Object} eventData - Partial event data
 * @returns {HistoricalEvent} Complete event object
 */
function createEvent(eventData) {
  return {
    id: eventData.id || generateUUID(),
    title: eventData.title,
    description: eventData.description,
    dates: eventData.dates,
    dateRange: eventData.dateRange || false,
    endDate: eventData.endDate || null,
    turning: eventData.turning,
    significance: eventData.significance,
    scale: eventData.scale || SCALES.TURNING,
    categories: eventData.categories || [],
    regions: eventData.regions || [],
    tags: eventData.tags || [],
    sources: eventData.sources || [],
    contributors: eventData.contributors || [],
    metadata: {
      verified: false,
      verificationCount: 0,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: 1,
      language: eventData.metadata?.language || "en",
      ...eventData.metadata
    },
    multimedia: eventData.multimedia || null,
    translations: eventData.translations || {},
    relatedEvents: eventData.relatedEvents || [],
    patterns: eventData.patterns || {}
  };
}

// Utility function for UUID generation (simple version)
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CATEGORIES,
    REGIONS,
    TURNINGS,
    SIGNIFICANCE,
    SCALES,
    validateEvent,
    createEvent,
    generateUUID
  };
}
