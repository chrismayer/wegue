import ColorUtil from './Color';

// Macro for default color themes configuration
const DEFAULT_THEMES = Object.freeze({
  light: {
    primary: '#af2622',
    'on-primary': '#ffffff',
    secondary: '#af2622',
    'on-secondary': '#ffffff',
    anchor: '#af2622',
    error: '#ff6f00'
  },
  dark: {
    primary: '#272727',
    'on-primary': '#ffffff',
    secondary: '#ea9b9b',
    'on-secondary': '#272727',
    anchor: '#ea9b9b',
    error: '#ff6f00'
  }
});

// Macros for light/dark theme
const LIGHT_WHITE = '#ffffff';
const LIGHT_ERROR = '#FF5252';
const LIGHT_INFO = '#2196F3';
const LIGHT_SUCCESS = '#4CAF50';
const LIGHT_WARNING = '#FFC107';
const LIGHT_BLACK = '#000000';
const DARK_WHITE = '#ffffff';
const DARK_ERROR = '#FF5252';
const DARK_INFO = '#2196F3';
const DARK_SUCCESS = '#4CAF50';
const DARK_WARNING = '#FFC107';
const DARK_BLACK = '#272727';

/**
   * Gets the base color for the input color.
   * See the theme object interface on
   * https://vuetifyjs.com/en/features/theme/#custom-theme-variants
   * @param {String | Object} color hexadecimal/object color
   * @returns {String} base color
   */
function getBaseColor (color) {
  return typeof color === 'object' ? color.base : color;
}

/**
 * Checks luminance of the input color and:
 *   - chooses "light" if color is dark;
 *   - chooses "dark" if color is light
 * @param {String | Object} color hexadecimal/object color
 * @param {String} light hexadecimal color
 * @param {String} dark hexadecimal color
 * @returns {String} contrast color
 */
function contrastColor (color, light, dark) {
  const baseColor = getBaseColor(color);

  return ColorUtil.checkLuminance(baseColor) ? light : dark;
}

/**
 * Util class for vuetify theming
 */
const ColorThemeUtil = {
  /**
   * Merges user color theme with the default color theme
   * @param {Object} inputTheme input theme from app-config
   * @param {Object} defaultTheme default Wegue theme
   * @returns {Object} merged color theme
   */
  mergeThemes (inputTheme, defaultTheme) {
    let { light, dark } = inputTheme;

    const merged = {
      light: {},
      dark: {}
    }

    // If light theme is configured with at least the primary color
    if (!light || !light.primary) {
      // fallback to default light theme
      light = defaultTheme.light;
    }

    // set primary color
    merged.light.primary = light.primary;

    // set secondary to user secondary,
    // otherwise fallback to primary
    merged.light.secondary = light.secondary ? light.secondary : light.primary;

    // set accent to the light theme white
    merged.light.accent = contrastColor(merged.light.primary, LIGHT_WHITE, LIGHT_BLACK);

    // set anchor to the light theme secondary
    merged.light.anchor = merged.light.secondary;

    // set on-primary to user on-primary,
    // otherwise fallback to a color that contrasts with the primary
    merged.light['on-primary'] = light['on-primary'] ? light['on-primary'] : contrastColor(merged.light.primary, LIGHT_WHITE, LIGHT_BLACK);

    // set on-primary to user on-secondary,
    // otherwise fallback to a color that contrasts with the secondary
    merged.light['on-secondary'] = light['on-secondary'] ? light['on-secondary'] : contrastColor(merged.light.secondary, LIGHT_WHITE, LIGHT_BLACK);

    // set semantic colors,
    // otherwise fallback to light theme defaults
    merged.light.info = light.info ? light.info : LIGHT_INFO;
    merged.light.success = light.success ? light.success : LIGHT_SUCCESS;
    merged.light.warning = light.warning ? light.warning : LIGHT_WARNING;
    merged.light.error = light.error ? light.error : LIGHT_ERROR;

    // apply unknown / custom theme properties to light theme
    for (const themeProp in light) {
      const hasProp = themeProp in merged.light;
      if (!hasProp) {
        merged.light[themeProp] = light[themeProp];
      }
    }

    // If light theme is configured with at least the secondary color
    if (!dark || !dark.secondary) {
      // fallback to default dark theme
      dark = defaultTheme.dark;
    }

    // set primary to dark theme primary
    merged.dark.primary = DARK_BLACK;

    // set secondary
    merged.dark.secondary = dark.secondary;

    // set anchor to the dark theme secondary
    merged.dark.anchor = merged.dark.secondary;

    // set accent to secondary
    merged.dark.accent = dark.secondary;

    // set on-primary to dark theme white
    merged.dark['on-primary'] = DARK_WHITE;

    // set on-secondary to user on-secondary,
    // otherwise fallback to a color that contrasts with secondary
    merged.dark['on-secondary'] = dark['on-secondary'] ? dark['on-secondary'] : contrastColor(merged.dark.secondary, DARK_WHITE, DARK_BLACK);

    // set semantic colors,
    // otherwise fallback to dark theme defaults
    merged.dark.info = dark.info ? dark.info : DARK_INFO;
    merged.dark.success = dark.success ? dark.success : DARK_SUCCESS;
    merged.dark.warning = dark.warning ? dark.warning : DARK_WARNING;
    merged.dark.error = dark.error ? dark.error : DARK_ERROR;

    // apply unknown / custom theme properties to dark theme
    for (const themeProp in dark) {
      const hasProp = themeProp in merged.dark;
      if (!hasProp) {
        merged.dark[themeProp] = dark[themeProp];
      }
    }

    return merged;
  },

  /**
   * Builds the theme object used by Vuetify
   * @param {Object} inputConfig user configuration from app-config
   * @returns {Object} theme object
   */
  buildTheme: function (inputConfig) {
    // If there is no input config, create it
    if (!inputConfig || typeof inputConfig !== 'object') {
      inputConfig = { defaultTheme: 'light' };
    }

    // If there is no input themes, create it
    if (!inputConfig.themes || typeof inputConfig.themes !== 'object') {
      inputConfig.themes = {};
    }

    // Object for the output config
    const outputConfig = {};

    // Apply start with dark theme
    outputConfig.defaultTheme = inputConfig.dark ? 'dark' : 'light';

    // Apply user theme or fallback to default
    const mergedThemes = ColorThemeUtil.mergeThemes(inputConfig.themes, DEFAULT_THEMES);
    outputConfig.themes = {
      light: {
        dark: false,
        colors: mergedThemes.light
      },
      dark: {
        dark: true,
        colors: mergedThemes.dark
      }
    };

    const lightColorsList = new Set(Object.keys(mergedThemes.light));
    const darkColorsList = new Set(Object.keys(mergedThemes.dark));

    // Set variations.
    // This creates 5 lighten and 4 darken variants for some vuetify color class to keep same behaviour as in Vuetify2
    outputConfig.variations = {
      colors: lightColorsList.union(darkColorsList),
      lighten: 5,
      darken: 4
    };

    return outputConfig;
  }
}

export default ColorThemeUtil;
