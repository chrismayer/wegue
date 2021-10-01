<template>
  <div id="wgu-bglayerswitcher-wrapper">
    <v-menu offset-x nudge-right="15"
      transition="scale-transition"
      :close-on-content-click="false"
      v-model="show"
      attach="#wgu-bglayerswitcher-wrapper"
      >
      <template v-slot:activator="{on}">
        <v-sheet class="wgu-bglayerswitcher">
          <v-btn v-on="on"
            :color="color"
            :dark="dark"
            fab
            :title="$t('wgu-bglayerswitcher.title')"
            >
            <v-icon medium>{{icon}}</v-icon>
          </v-btn>
        </v-sheet>
      </template>
      <!-- Remarks: The layerlist is wrapped by an v-if block to avoid unneccesary image
           requests when the layerlist is not visible -->
      <wgu-bglayerlist v-if="show"
        color="white"
        :dark="false"
        :selColor="color"
        :selDark="dark"
        :previewIcon="icon"
        :imageWidth="imageWidth"
        :imageHeight="imageHeight"
        :emptyText="$t('wgu-bglayerswitcher.emptyText')"
        />
    </v-menu>
  </div>
</template>

<script>
import BgLayerList from './BgLayerList';

export default {
  name: 'wgu-bglayerswitcher',
  components: {
    'wgu-bglayerlist': BgLayerList
  },
  props: {
    color: { type: String, required: false, default: 'red darken-3' },
    icon: { type: String, required: false, default: 'map' },
    dark: { type: Boolean, required: false, default: true },
    imageWidth: { type: Number, required: false, default: 152 },
    imageHeight: { type: Number, required: false, default: 114 }
  },
  data () {
    return {
      show: false
    }
  }
};
</script>
