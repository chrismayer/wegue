<template>
  <wgu-module-card v-bind="$attrs"
      :moduleName="moduleName"
      class="wgu-helpwin"
      :icon="icon"
      :width="width">
    <v-card-title primary-title>
      <div>
        <h3 class="text-h5 mb-0" v-if="$t('wgu-helpwin.textTitle')">
          {{ $t('wgu-helpwin.textTitle') }}</h3>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="text--primary" v-html="$t('wgu-helpwin.htmlContent')">
      </div>
    </v-card-text>

    <v-card-actions>
      <a class="info-link"
        :href="$t('wgu-helpwin.infoLinkUrl')" target="_blank" v-if="$t('wgu-helpwin.infoLinkUrl')">
        {{ $t('wgu-helpwin.infoLinkText') || $t('wgu-helpwin.infoLinkUrl') }}
        </a>
    </v-card-actions>
  </wgu-module-card>
</template>

<script>
import ModuleCard from '../modulecore/ModuleCard';

export default {
  name: 'wgu-helpwin-win',
  inheritAttrs: false,
  components: {
    'wgu-module-card': ModuleCard
  },
  props: {
    icon: { type: String, required: false, default: 'md:help' },
    width: { type: Number, required: false, default: 300 }
  },
  data () {
    return {
      moduleName: 'wgu-helpwin'
    }
  }
};
</script>

<style scoped>

  /* TODO
    Generalize the positioning concept for windows,
    this interferes with positioning and draggable settings in the app.conf */
  .wgu-helpwin.wgu-floating {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%);
  }

</style>
