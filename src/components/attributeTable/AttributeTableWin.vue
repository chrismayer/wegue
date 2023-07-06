<template>
  <wgu-module-card v-bind="$attrs"
    :moduleName="moduleName"
    class="wgu-attributetable-win"
    :icon="icon"
  >

    <template v-slot:wgu-win-toolbar>
      <v-select
        v-model="selLayer"
        color="accent"
        item-color="secondary"
        :dark="isPrimaryDark"
        filled
        outlined
        class="wgu-vector-layer-select wgu-solo-field"
        :items="displayedLayers"
        :item-text="item => item.get('name')"
        :menu-props="{
          bottom: true,
          'offset-y': true,
        }"
        dense
        return-object
        hide-details
        :label="$t('wgu-attributetable.selectorLabel')"
        ></v-select>
    </template>

    <wgu-attributetable
      v-if="selLayer"
      :layerId="selLayer.get('lid')"
      :syncTableMapSelection="syncTableMapSelection"
    >
    </wgu-attributetable>
  </wgu-module-card>
</template>

<script>
import ModuleCard from './../modulecore/ModuleCard';
import { Mapable } from '../../mixins/Mapable';
import { ColorTheme } from '../../mixins/ColorTheme';
import VectorLayer from 'ol/layer/Vector'
import AttributeTable from './AttributeTable';

export default {
  name: 'wgu-attributetable-win',
  inheritAttrs: false,

  props: {
    icon: { type: String, required: false, default: 'table_chart' },
    syncTableMapSelection: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      moduleName: 'wgu-attributetable',
      layers: [],
      selLayer: null
    }
  },
  mixins: [Mapable, ColorTheme],
  components: {
    'wgu-module-card': ModuleCard,
    'wgu-attributetable': AttributeTable
  },
  methods: {
    /**
     * This function is executed, after the map is bound (see mixins/Mapable).
     * Bind to the layers from the OpenLayers map.
     */
    onMapBound () {
      this.layers = this.map.getLayers().getArray();
    }
  },
  computed: {
    /**
     * Reactive property to return the OpenLayers vector layers to be shown in the selection menu.
     */
    displayedLayers () {
      return this.layers
        .filter(layer =>
          layer instanceof VectorLayer &&
          layer.get('lid') !== 'wgu-measure-layer' &&
          layer.get('lid') !== 'wgu-geolocator-layer'
        )
        .reverse();
    }
  }
};
</script>

<style scoped>

  /* TODO
    Generalize the positioning concept for windows,
    this interferes with positioning and draggable settings in the app.conf */

  .wgu-attributetable-win.wgu-floating {
    top: inherit !important;
    position: relative;
    bottom: 35px;
  }

  @media only screen and (max-width: 600px) {
    .wgu-attributetable-win.wgu-floating {
      bottom: 33px;
      height: 100%;
    }
  }
</style>
