// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in vue.config.js with runtimeCompiler.
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import PortalVue from 'portal-vue'
import VueI18n from 'vue-i18n';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-icons/iconfont/material-icons.css'
import '../node_modules/ol/ol.css';
import WguApp from '../app/WguApp';
import UrlUtil from './util/Url';
import LocaleUtil from './util/Locale';
import ObjectUtil from './util/Object';
import ColorThemeUtil from './util/ColorTheme'
import axios from 'axios';

Vue.use(Vuetify);
Vue.use(PortalVue);
Vue.use(VueI18n);

require('./assets/css/wegue.css');

// try to load an optional app specific CSS file (set project-specific styles)
try {
  require('../app/static/css/app.css');
} catch (e) { }

Vue.config.productionTip = false;

// Detect isEmbedded state by attribute embedded and
// make accessible for all components
// recommended by https://vuejs.org/v2/cookbook/adding-instance-properties.html
const appEl = document.querySelector('#app');
Vue.prototype.$isEmbedded = appEl.hasAttribute('embedded');

// Detect an URL parameter for a custom app context
const appCtx = UrlUtil.getQueryParam('appCtx');
let appCtxFile = '';
if (appCtx) {
  // simple aproach to avoid path traversal
  appCtxFile = '-' + appCtx.replace(/(\.\.[/])+/g, '');
}

/**
 * Creates the active vuetify instance.
 *
 * @param {Object} appConfig Global application context.
 * @returns The active vuetify instance.
 */
const createVuetify = function (appConfig) {
  const preset = {
    theme: ColorThemeUtil.buildTheme(appConfig.colorTheme),
    icons: {
      iconfont: 'mdiSvg'
    },
    lang: {
      current: LocaleUtil.getPreferredLanguage(appConfig),
      locales: LocaleUtil.importVuetifyLocales()
    }
  };
  return new Vuetify(preset);
}

/**
 * Creates the VueI18n object used for internationalization.
 *
 * @param {Object} appConfig Global application context.
 * @returns The active I18n instance.
 */
const createVueI18n = function (appConfig) {
  const preset = {
    locale: LocaleUtil.getPreferredLanguage(appConfig),
    fallbackLocale: LocaleUtil.getFallbackLanguage(appConfig),
    messages: LocaleUtil.importVueI18nLocales()
  };
  return new VueI18n(preset);
}

/**
 * Backwards compatibility layer for legacy features in app-conf.json.
 *
 * @param {Object} appConfig Global application context.
 * @returns The migrated application context.
 */
const migrateAppConfig = function (appConfig) {
  // Warning for deprecated baseColor
  if (appConfig.baseColor) {
    console.warn('The configuration path ".baseColor" is deprecated, ' +
      'instead declare a path ".colorTheme"');
  }

  // Migrate boolean values for module.win.
  if (appConfig.modules) {
    Object.keys(appConfig.modules).forEach(name => {
      const module = appConfig.modules[name];
      if (typeof module.win === 'boolean') {
        module.win = module.win ? 'floating' : undefined;
      }
    });
  }

  // Create warnings for text based configuration properties,
  // which are no longer supported and have been moved to the language files.
  /* eslint-disable no-useless-escape */
  /* eslint-disable quote-props */
  const deprecatedTextProps = {
    'title': 'app.title',
    'browserTitle': 'app.browserTitle',
    'footerTextLeft': 'app.footerTextLeft',
    'footerTextRight': 'app.footerTextRight',
    'mapGeodataDragDop\\.layerName': 'mapLayers.wgu-drag-drop-layer.name',
    'modules.\\.wgu-attributetable\\.selectorLabel': 'wgu-attributetable.selectorLabel',
    'modules\\.wgu-geocoder\\.placeHolder': 'wgu-geocoder.placeHolder',
    'modules\\.wgu-infoclick\\.mediaInfoLinkText': 'wgu-infoclick.mediaInfoLinkText',
    'modules\\.wgu-zoomtomaxextent\\.text': 'wgu-zoomtomaxextent.text',
    'modules\\.wgu-helpwin\\.windowTitle': 'wgu-helpwin.title',
    'modules\\.wgu-helpwin\\.textTitle': 'wgu-helpwin.textTitle',
    'modules\\.wgu-helpwin\\.htmlContent': 'wgu-helpwin.htmlContent',
    'modules\\.wgu-helpwin\\.infoLinkUrl': 'wgu-helpwin.infoLinkUrl',
    'modules\\.wgu-helpwin\\.infoLinkText': 'wgu-helpwin.infoLinkText',
    'modules\\..*\\.title': '<moduleName>.title'
  };
  /* eslint-enable quote-props */
  /* eslint-enable no-useless-escape */

  const configPaths = ObjectUtil.toPaths(appConfig);
  for (const path of configPaths) {
    const match = Object.keys(deprecatedTextProps).find(pattern => {
      const regex = new RegExp('^\\.' + pattern + '$', 'g');
      return regex.test(path);
    });
    if (match) {
      console.warn('The configuration path "' + path + '" is deprecated, ' +
        'instead declare a path "' + deprecatedTextProps[match] +
        '" in all language files in your "/app/locales" folder');
    }
  };

  // Create warnings and migrate settings related to mapLayers configuration:
  if (appConfig.mapLayers) {
    appConfig.mapLayers.forEach((layer, i) => {
      if (!layer.lid) {
        console.warn('mapLayers[' + i + '] does not declare a lid property');
      }
      if (layer.type === 'WMS') {
        console.warn('mapLayers[' + i + '] uses the depreated type WMS. Use TILEWMS instead.');
        layer.type = 'TILEWMS';
      }
    });
  }

  // Create warnings, if one of the module specific animation properties is declared,
  // which are no longer supported due to global view animation configuration.
  /* eslint-disable no-useless-escape */
  const deprecatedAnimProps = {
    'modules\\.wgu-geolocator\\.zoomAnimation': 'viewAnimation.type',
    'modules\\.wgu-geolocator\\.zoomAnimationDuration': 'viewAnimation.options.duration',
    'modules\\.wgu-geolocator\\.maxZoom': 'viewAnimation.options.maxZoom',
    'modules\\.wgu-geocoder\\.selectZoom': 'viewAnimation.options.zoom'
  };
  /* eslint-enable no-useless-escape */

  for (const path of configPaths) {
    const match = Object.keys(deprecatedAnimProps).find(pattern => {
      const regex = new RegExp('^\\.' + pattern + '$', 'g');
      return regex.test(path);
    });
    if (match) {
      console.warn('The configuration path "' + path + '" is deprecated, ' +
        'instead declare the "viewAnimation" option and configure the "' + deprecatedAnimProps[match] +
        '" property');
    }
  };

  return appConfig;
}

/**
 * Create the vue application.
 *
 * @param {Object} appConfig Global application context.
 */
const createApp = function (appConfig) {
  // make app config accessible for all components
  Vue.prototype.$appConfig = migrateAppConfig(appConfig);

  // const appTpl = appConfig.appTpl || 'WguApp';
  // const WguApp = await import(`../app/${appTpl}.vue`);
  // const WguApp = await import('../app/WguApp.vue');
  // console.log(WguApp);

  new Vue({
    vuetify: createVuetify(appConfig),
    i18n: createVueI18n(appConfig),
    render: h => h(WguApp)
    // render: h => h(WguApp.default)
  }).$mount('#app');
};

// Look in the static dir for an app-specific config file.
const configFile = 'static/app-conf' + appCtxFile + '.json';
const request = {
  method: 'GET',
  url: configFile
};
axios(request)
  .then(response => {
    createApp(response.data);
  }).catch(function (error) {
    console.error(`Cannot load config file ${configFile}, ${error}`)
  });
