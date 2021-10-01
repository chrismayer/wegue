<template>
  <v-menu offset-y nudge-bottom="15"
      transition="scale-transition"
      v-model="show">
      <template v-slot:activator="{on}">
        <v-btn-toggle borderless dense
          background-color="transparent" :dark="dark"
          :title="$t('wgu-localeswitcher.title')"
          v-model="show">
          <v-btn class="ma-2" icon :value="true" v-on="on" >
            <v-icon class="mr-1" medium>{{icon}}</v-icon>
            {{ $i18n.locale }}
          </v-btn>
        </v-btn-toggle>
      </template>

      <v-list>
        <v-list-item class="wgu-langlist-item"
          v-for="langCode in Object.keys(lang)"
          :key="langCode"
          @click="onItemClick(langCode)">
          <v-list-item-content class="black--text">
            <v-list-item-title>
              {{ lang[langCode] }} ({{ langCode }})
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import LocaleUtil from '../../util/Locale'

export default {
  name: 'wgu-localeswitcher',
  props: {
    icon: { type: String, required: false, default: 'language' },
    dark: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      show: false,
      lang: LocaleUtil.getSupportedLanguages(this.$appConfig)
    }
  },
  methods: {
    /**
     * Change the i18n and built-in vuetify locale.
     */
    onItemClick (langCode) {
      this.$i18n.locale = this.$vuetify.lang.current = langCode;
    }
  }
}
</script>
