<template>

  <v-card v-draggable-win class="wgu-floatwin wgu-helpwin" v-if=show v-bind:style="{ left: left, top: top }">
    <v-toolbar class="red darken-3 white--text" dark>
      <v-toolbar-side-icon><v-icon>{{icon}}</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Help</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click="show = false"><v-icon>close</v-icon></v-toolbar-side-icon>
    </v-toolbar>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ headline }}</h3>
        <div class="">
          <span v-html="content"></span>
        </div>
      </div>
    </v-card-title>

    <v-card-actions>
      <a class="info-link red--text darken3"
        :href="infoLink" target="_blank">{{ infoLinkText }}</a>
    </v-card-actions>
  </v-card>

</template>

<script>
  import FloatingWin from '../window/FloatingWindow';

  export default {
    extends: FloatingWin,
    props: ['headline', 'content', 'infoLink', 'infoLinkText']
  }
</script>

<style>

  .wgu-helpwin .info-link {
    padding-left: 15px;
  }

</style>
