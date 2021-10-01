<template>
  <v-sheet :color="color" :dark="dark" elevation="8">
    <v-slide-group ref="slideGroup"
      v-if="displayedLayers.length"
      mandatory
      show-arrows
      class="pa-1"
      @change="onSelectLayer"
      :value="selectedLayer"
    >
      <v-slide-item
        v-for="layer in displayedLayers"
        :key="layer.lid"
        :value="layer"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? selColor : color"
          :dark="active? selDark : dark"
          hover
          :width="imageWidth"
          class="ma-1"
          @click="toggle"
        >
          <wgu-layerpreviewimage
            :layer="layer"
            :mapView="map.getView()"
            :width="imageWidth"
            :height="imageHeight"
            :previewIcon="previewIcon"
          />
          <v-card-title class="caption">
            <span class="d-inline-block text-truncate">
              {{ layer.get('name') }}
            </span>
          </v-card-title>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <v-alert v-else type="info" class="mb-0">
      {{ emptyText }}
    </v-alert>
  </v-sheet>
</template>

<script>
import { Mapable } from '../../mixins/Mapable';
import LayerPreviewImage from './LayerPreviewImage'

export default {
  name: 'wgu-bglayerlist',
  components: {
    'wgu-layerpreviewimage': LayerPreviewImage
  },
  mixins: [Mapable],
  props: {
    emptyText: { type: String, required: true },
    color: { type: String, required: true },
    dark: { type: Boolean, required: true },
    selColor: { type: String, required: true },
    selDark: { type: Boolean, required: true },
    imageWidth: { type: Number, required: true },
    imageHeight: { type: Number, required: true },
    previewIcon: { type: String, required: true }
  },
  data () {
    return {
      layers: []
    }
  },
  mounted () {
    // Work around a bug in vuetify which doesn't realize the overflow of slideGroups properly,
    // when the control is initially rendered. The underlying implementation relies on the clientWidth
    // property of DOM elements, which is not computed on mount time. The bug is related to
    // https://github.com/vuejs/Discussion/issues/394 .The following works in Firefox and Chrome.
    var slideGroup = this.$refs.slideGroup;
    if (slideGroup) {
      setTimeout(() => {
        slideGroup.onResize();
      }, 10);
    }
  },
  methods: {
    /**
       * This function is executed, after the map is bound (see mixins/Mapable).
       * Bind to the layers from the OpenLayers map.
       */
    onMapBound () {
      this.layers = this.map.getLayers().getArray();
    },
    /**
       * Handler for click on item in layer list:
       * Set the selected background layer to visible and hide all other background layers.
       * @param  {Object} selLayer  Layer selected by the user
       */
    onSelectLayer (selLayer) {
      selLayer.setVisible(true);
      this.displayedLayers
        .filter(layer => layer !== selLayer)
        .forEach(layer => {
          layer.setVisible(false);
        });
    }
  },
  computed: {
    /**
       * Reactive property to return the OpenLayers layers marked as 'isBaseLayer'.
       */
    displayedLayers () {
      return this.layers
        .filter(layer => layer.get('isBaseLayer'))
        .reverse();
    },
    /**
       * Reactive property to return the currently visible OpenLayers background layer.
       * To disambiguate multiple selected background layers - which may occur programmatically -
       * this returns the first in the list of background layers.
       */
    selectedLayer () {
      return this.displayedLayers.find(layer => layer.getVisible());
    }
  }
}
</script>
