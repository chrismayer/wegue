<template>

  <wgu-module-card v-bind="$attrs"
    :moduleName="moduleName"
    class="wgu-infoclick-win"
    :icon="icon"
    :color="color"
    v-on:visibility-change="show">

    <!-- Show feature properties and position tables -->
    <div v-if="!this.showMedia">

      <v-card-title primary-title class="wgu-infoclick-win-title">

        <v-card-text v-if="!this.attributeData && !this.coordsData" class="no-data">
          {{ $t('wgu-infoclick.mapClick') }}
        </v-card-text>

        <!-- feature property grid -->
        <wgu-property-table :properties="attributeData" :color="color" />

        <!-- click coodinate info grid -->
        <wgu-coords-table :coordsData="coordsData" :color="color" />

      </v-card-title>

    </div>

    <!-- Show a default image based object info as previously
         done in FeatureInfoWindow -->
    <div v-if="this.showMedia">

      <v-card-text v-if="!this.attributeData" class="no-data">
        {{ $t('wgu-infoclick.mediaClick') }}
      </v-card-text>

      <v-img
        height="250"
        v-if="this.attributeData"
        :src="this.attributeData[this.imageProp]"
      ></v-img>

      <v-card-text
        v-if="this.attributeData && this.attributeData[imageDescriptionProp]" >
        {{this.attributeData[imageDescriptionProp]}}
      </v-card-text>

      <v-card-actions>
        <v-btn
          text :color="color"
          v-if="this.attributeData && this.attributeData[mediaInfoLinkUrlProp]"
          :href="this.attributeData[mediaInfoLinkUrlProp]"
          target="_blank"
        >
          {{ $t('wgu-infoclick.mediaInfoLinkText') || this.attributeData[mediaInfoLinkUrlProp] }}
        </v-btn>
      </v-card-actions>

    </div>

   </wgu-module-card>
</template>

<script>
import ModuleCard from './../modulecore/ModuleCard';
import { WguEventBus } from '../../WguEventBus.js';
import PropertyTable from './PropertyTable';
import CoordsTable from './CoordsTable';

export default {
  name: 'wgu-infoclick-win',
  inheritAttrs: false,
  components: {
    'wgu-module-card': ModuleCard,
    'wgu-property-table': PropertyTable,
    'wgu-coords-table': CoordsTable
  },
  props: {
    color: { type: String, required: false, default: 'red darken-3' },
    icon: { type: String, required: false, default: 'info' },
    showMedia: { type: Boolean, required: false, default: false },
    // below props only have an effect if showMedia=true
    mediaInfoLinkUrlProp: { type: String, required: false },
    imageProp: { type: String, required: false },
    imageDescriptionProp: { type: String, required: false }
  },
  data: function () {
    return {
      moduleName: 'wgu-infoclick',
      attributeData: null,
      coordsData: null
    }
  },
  created () {
    var me = this;
    // Listen to the ol-map-mounted event and receive the OL map instance
    WguEventBus.$on('ol-map-mounted', (olMap) => {
      // make the OL map accessible in this component
      me.map = olMap;
    });
  },
  methods: {
    registerMapClick (unregister) {
      var me = this;

      if (unregister === true) {
        me.map.un('singleclick', me.onMapClick);
      } else {
        me.map.on('singleclick', me.onMapClick);
      }
    },
    /**
     * Handler for 'singleclick' on the map.
     * Collects data and passes it to corresponding objects.
     *
     * @param  {ol/MapBrowserEvent} evt The OL event of 'singleclick' on the map
     */
    onMapClick (evt) {
      const me = this;
      let featureLayer = me.map.forEachFeatureAtPixel(evt.pixel,
        (feature, layer) => {
          return [feature, layer];
        });

      // collect feature attributes --> PropertyTable
      if (featureLayer) {
        const feat = featureLayer[0];
        let props = feat.getProperties();
        // do not show geometry property
        delete props.geometry;

        me.attributeData = props;
      } else {
        me.attributeData = null;
      }

      // collect click coordinate + projection --> CoordsTable
      me.coordsData = {
        coordinate: evt.coordinate,
        projection: me.map.getView().getProjection().getCode()
      };
    },
    /**
     * (Un-)Register map interactions when the visibility of the module changes.
     *
     * @param  {boolean} visible New visibility state
    */
    show (visible) {
      const me = this;
      if (visible) {
        me.registerMapClick();
      } else {
        // cleanup old data
        me.attributeData = null;
        me.coordsData = null;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .wgu-infoclick-win {
    width: 450px;
  }

  .wgu-infoclick-win .v-card__title {
    display: inherit;
  }

  @media (max-width: 600px) {
    /* TODO
      Generalize the positioning concept for windows,
      this interferes with positioning and draggable settings in the app.conf */

    /* tmp. approach to position on small screens */
    .wgu-infoclick-win.wgu-floating {
      /* tmp. fix */
      left: 0 !important;
      top: 40% !important;
      width: 100%;
      max-width: 600px;
    }

    .wgu-infoclick-win.wgu-floating > .wgu-infoclick-win-title {
      overflow: scroll;
      max-height: 300px;
    }
  }

</style>
