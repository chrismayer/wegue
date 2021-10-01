<template>
<v-toolbar-items>
    <v-combobox
      class="wgu-geocoder-combo"
      :style='{ display: (hideSearch ? "none" : "block" ) }'
      return-object
      :no-filter="noFilter"
      v-model="selected"
      :autofocus="autofocus"
      :items="resultItems"
      :label="$t('wgu-geocoder.placeHolder')"
      :clearable="clearable"
      :dark="dark"
      :color="dark ? 'white': ''"
      :persistent-hint="persistentHint"
      :hidden="hideSearch"
      :rounded="rounded"
      :search-input.sync="search"
    ></v-combobox>

  <v-toolbar-items>

    <v-btn @click='toggle()' icon :dark="dark"
      :title="$t('wgu-geocoder.title')">
      <v-icon medium>{{icon}}</v-icon>
    </v-btn>

  </v-toolbar-items>
  </v-toolbar-items>

</template>

<script>
import { Mapable } from '../../mixins/Mapable';
import { GeocoderController } from './GeocoderController';
import { applyTransform } from 'ol/extent';
import { getTransform, fromLonLat } from 'ol/proj';

export default {
  name: 'wgu-geocoder-input',
  mixins: [Mapable],
  props: {
    icon: { type: String, required: false, default: 'search' },
    rounded: { type: Boolean, required: false, default: true },
    autofocus: { type: Boolean, required: false, default: true },
    clearable: { type: Boolean, required: false, default: true },
    dark: { type: Boolean, required: false, default: false },
    persistentHint: { type: Boolean, required: false, default: true },
    debug: { type: Boolean, required: false, default: false },
    minChars: { type: Number, required: false, default: 3 },
    queryDelay: { type: Number, required: false, default: 300 },
    selectZoom: { type: Number, required: false, default: 16 },
    provider: { type: String, required: false, default: 'osm' },
    providerOptions: { type: Object, required: false, default: function () { return {}; } }

  },
  data () {
    return {
      results: [],
      lastQueryStr: '',
      noFilter: true,
      search: null,
      selecting: false,
      selected: null,
      hideSearch: true,
      timeout: null
    }
  },
  computed: {
    resultItems () {
      let items = [];
      if (!this.results) {
        return items;
      }
      this.trace(`computed.resultItems() - cur results len=${this.results.length}`);

      // Convert results to v-combobox (text, value) Items
      this.results.forEach(result => {
        this.trace(`add to this.items: ${result.address.name}`);
        items.push({ text: result.address.name, value: result });
      });

      return items;
    }
  },
  methods: {
    trace (str) {
      this.debug && console && console.info(str);
    },
    toggle () {
      // Show/hide search combobox
      this.hideSearch = !this.hideSearch;
    },
    // Query by string - should return list of selection items (adresses) for ComboBox
    querySelections (queryStr) {
      this.timeout = setTimeout(() => {
        // Let Geocoder Provider do the query
        // items (item.text fields) will be shown in combobox dropdown suggestions
        this.trace(`geocoderController.query: ${queryStr}`);
        this.geocoderController.query(queryStr)
          .then(results => this.onQueryResults(results))
          .catch(err => this.onQueryError(err))
      }, this.queryDelay);
    },
    onQueryResults (results) {
      // Handle query results from GeocoderController
      this.timeout && clearTimeout(this.timeout);
      this.timeout = null;
      this.results = null;

      if (!results || results.length === 0) {
        return;
      }

      // ASSERT: results is defined and at least one result
      this.trace(`results ok: len=${results.length}`);
      this.results = results;
    },
    onQueryError (err) {
      if (err) {
        this.trace(`onQueryResult error: ${err}`);
      }
    }
  },
  watch: {
    // Input string value changed
    search (queryStr) {
      if (this.timeout || this.selecting) {
        // Query or selection in progress
        this.trace(`query or selection in progress...`);
        return;
      }
      if (!queryStr || queryStr.length === 0) {
        // Query reset
        this.trace(`queryStr none`);
        this.results = null;
        return
      }

      // ASSERTION: queryStr is valid
      queryStr = queryStr.trim();

      // Only query if minimal number chars typed and querystring has changed
      queryStr.length >= this.minChars && queryStr !== this.lastQueryStr && this.querySelections(queryStr);
      this.lastQueryStr = queryStr;
    },
    // User has selected entry from suggested items
    selected (item) {
      if (!item || !item.hasOwnProperty('text') || !item.hasOwnProperty('value')) {
        return;
      }
      this.selecting = true;
      this.trace(`selected=${item.text}`);

      // Position Map on result
      const result = item.value;
      const mapProjection = this.map.getView().getProjection();
      const coords = fromLonLat([result.lon, result.lat], mapProjection);

      // Prefer zooming to bounding box if present in result
      if (result.hasOwnProperty('boundingbox')) {
        // Result with bounding box.
        // bbox is in EPSG:4326, needs to be transformed to Map Projection (e.g. EPSG:3758)
        const extent = applyTransform(result.boundingbox, getTransform('EPSG:4326', mapProjection));
        this.map.getView().fit(extent);
      } else {
        // No bbox in result: center on lon/lat from result and zoom in
        this.map.getView().setZoom(this.selectZoom);
      }
      this.map.getView().setCenter(coords);
      this.selecting = false;
    }
  },
  mounted () {
    // Setup GeocoderController to which we delegate Provider and query-handling
    this.geocoderController = new GeocoderController(this.provider, this.providerOptions, this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .v-input.wgu-geocoder-combo {
    /* have to be reset here since .v-toolbar .v-input overwrites this */
    padding-top: 12px;
    margin-top: 4px;
  }

</style>
