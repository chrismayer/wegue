<template>
  <div id="wgu-overviewmap-wrapper">
    <v-menu
      location="end"
      offset="15"
      transition="scale-transition"
      :close-on-content-click="false"
      persistent
      z-index=2
      v-model="open"
      attach="#wgu-overviewmap-wrapper"
      >
      <template v-slot:activator="{props}">
        <v-sheet class="wgu-map-button wgu-overviewmap">
          <v-btn v-bind="props"
            color="secondary"
            size="large"
            :icon="icon"
            :title="$t('wgu-overviewmap.title')"
            >
          </v-btn>
        </v-sheet>
      </template>
      <!-- Remarks: The overviewmap-panel is wrapped by an v-if block to avoid unneccesary image
          requests when the panel is not visible -->
      <wgu-overviewmap-panel v-if="open"
        :rotateWithView="rotateWithView"
        :width="width"
        :height="height"
      />
    </v-menu>
  </div>
</template>

<script>
import OverviewMapPanel from './OverviewMapPanel';

export default {
  name: 'wgu-overviewmap',
  components: {
    'wgu-overviewmap-panel': OverviewMapPanel
  },
  props: {
    icon: { type: String, required: false, default: 'md:zoom_out_map' },
    visible: { type: Boolean, required: false, default: true },
    rotateWithView: { type: Boolean, required: false, default: true },
    width: { type: Number, required: false, default: 164 },
    height: { type: Number, required: false, default: 178 }
  },
  data () {
    return {
      open: this.visible
    }
  }
};
</script>
