<template>
  <wgu-module-card v-bind="$attrs"
      :moduleName="moduleName"
      class="wgu-measurewin"
      :icon="icon"
      v-on:visibility-change="show">

      <v-card-title primary-title>
      <!-- toggle button to choose measure type -->
      <wgu-measure-type-chooser
        :measureType="measureType"
        :showAngleTool="showAngleTool"
        :iconsOnly="iconsOnly"
        @wgu-measuretype-change="applyMeasureType"
      />
      </v-card-title>

      <v-card-actions>
        <!-- result display -->
        <wgu-measure-result :measureGeom="measureGeom" :measureType="measureType" />
      </v-card-actions>
  </wgu-module-card>
</template>

<script>
import ModuleCard from '../modulecore/ModuleCard';
import { useMap } from '@/composables/Map';
import MeasureTypeChooser from './MeasureTypeChooser';
import MeasureResult from './MeasureResult';
import OlMeasureController from './OlMeasureController';

export default {
  name: 'wgu-measuretool-win',
  inheritAttrs: false,
  components: {
    'wgu-module-card': ModuleCard,
    'wgu-measure-type-chooser': MeasureTypeChooser,
    'wgu-measure-result': MeasureResult
  },
  props: {
    icon: { type: String, required: false, default: 'md:photo_size_select_small' },
    showAngleTool: { type: Boolean, required: false, default: false },
    iconsOnly: { type: Boolean, required: false, default: false }
  },
  setup () {
    const { map, layers } = useMap();
    return { map, layers };
  },
  data () {
    return {
      moduleName: 'wgu-measuretool',
      measureGeom: null,
      measureType: 'distance'
    }
  },
  destroy () {
    if (this.olMapCtrl) {
      this.olMapCtrl.destroy();
      this.olMapCtrl = undefined;
    }
  },
  watch: {
    map: {
      handler (newMap, oldMap) {
        if (newMap) {
          this.onMapBound();
          this.unbound = false;
        } else {
          if (oldMap) {
            this.onMapUnbound();
            this.unbound = true;
          }
        }
      },
      immediate: true
    },
    measureType () {
      if (!this.olMapCtrl) {
        return;
      }
      // reset old geom
      this.measureGeom = {};
      this.olMapCtrl.addInteraction(this.measureType, this.onMeasureVertexSet);
    }
  },
  methods: {
    /**
     * (Un-)Register map interactions when the visibility of the module changes.
     *
     * @param  {boolean} visible New visibility state
     */
    show (visible) {
      if (!this.olMapCtrl) {
        return;
      }
      if (visible) {
        this.olMapCtrl.addInteraction(this.measureType, this.onMeasureVertexSet);
      } else {
        this.olMapCtrl.removeInteraction();
      }
    },
    /**
     * Applies the changed measure value to this.measureType.
     * Called as callback of MeasureTypeChooser
     *
     * @param  {String} newMeasureType New measure type
     * @param  {String} oldMeasureType Old measure type
     */
    applyMeasureType (newMeasureType, oldMeasureType) {
      this.measureType = newMeasureType;
    },
    /**
     * This function is executed, after the map is bound.
     */
    onMapBound () {
      if (this.unbound) {
        return;
      }

      // TODO: Should we explicitly declare all attributes as props?
      this.olMapCtrl = new OlMeasureController(this.map, this.$attrs);
      this.olMapCtrl.createMeasureLayer();
    },
    /**
     * This function is executed, after the map is bound.
     */
    onMapUnbound () {
      if (this.olMapCtrl) {
        this.olMapCtrl.destroy();
        this.olMapCtrl = undefined;
      }
    },
    /**
     * Callback function executed when user sets a measure point on the map.
     *
     * @param  {ol/geom/Geometry} geom The geometry object of the map
     */
    onMeasureVertexSet (geom) {
      // wrap geom into object, otherwise the injection into childs does
      // not work. Maybe the OL object does not feel changed for Vue
      this.measureGeom = {
        geom
      };
    }
  }
};
</script>
