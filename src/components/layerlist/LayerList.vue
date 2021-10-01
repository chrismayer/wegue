<template>

  <v-list>
    <v-list-item class="wgu-layerlist-item"
      v-for="layer in displayedLayers"
      :key="layer.lid"
      @click="onItemClick(layer)">
      <input type="checkbox"
        :key="layer.lid"
        class="wgu-layer-viz-cb"
        :checked="layer.getVisible()"
      />
      <v-list-item-content class="black--text">
          <v-list-item-title>
            {{ layer.get('name') }}
          </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>

</template>

<script>
import { Mapable } from '../../mixins/Mapable';

export default {
  name: 'wgu-layerlist',
  mixins: [Mapable],
  props: {
  },
  data () {
    return {
      layers: []
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
       * Toggles the corresponding layer visibility.
       *
       * @param  {Object} layer Layer object
       */
    onItemClick (layer) {
      layer.setVisible(!layer.getVisible());
    }
  },
  computed: {
    /**
       * Reactive property to return the OpenLayers layers to be shown in the control.
       * Remarks: The 'displayInLayerList' attribute should default to true per convention.
       */
    displayedLayers () {
      return this.layers
        .filter(layer => layer.get('displayInLayerList') !== false && !layer.get('isBaseLayer'))
        .reverse();
    }
  }
}
</script>

<style>

  .wgu-layer-viz-cb {
    width: 45px;
  }

</style>
