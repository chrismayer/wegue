<template>
  <div id="wgu-bglayerswitcher-wrapper" v-if="show">
    <v-menu
      location="end"
      offset="15"
      transition="scale-transition"
      :close-on-content-click="false"
      v-model="open"
      attach="#wgu-bglayerswitcher-wrapper"
      >
      <template v-slot:activator="{props}">
        <v-sheet class="wgu-map-button wgu-bglayerswitcher">
          <v-btn v-bind="props"
            color="secondary"
            size="large"
            :icon="icon"
            :title="$t('wgu-bglayerswitcher.title')"
            >
          </v-btn>
        </v-sheet>
      </template>
      <!-- Remarks: The layerlist is wrapped by an v-if block to avoid unneccesary image
           requests when the layerlist is not visible -->
      <wgu-bglayerlist v-if="open"
        :previewIcon="icon"
        :imageWidth="imageWidth"
        :imageHeight="imageHeight"
        />
    </v-menu>
  </div>
</template>

<script>
import { useMap } from '@/composables/Map';
import BgLayerList from './BgLayerList';

export default {
  name: 'wgu-bglayerswitcher',
  components: {
    'wgu-bglayerlist': BgLayerList
  },
  props: {
    icon: { type: String, required: false, default: 'md:map' },
    imageWidth: { type: Number, required: false, default: 152 },
    imageHeight: { type: Number, required: false, default: 114 }
  },
  setup () {
    const { map, layers } = useMap();
    return { map, layers };
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    /**
     * Reactive property to return true, when more than one OpenLayers layer is available,
     * which is marked as 'isBaseLayer'.
     */
    show () {
      return this.layers
        .filter(layer => layer.get('isBaseLayer'))
        .length > 1;
    }
  }
};
</script>
