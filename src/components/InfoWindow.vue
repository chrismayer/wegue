<!-- TODO
  This component is no longer in use,
  if we decide to revive this, i18n internationalization has to be provided
-->

<template>
  <v-navigation-drawer
       class="pb-0 wgu-infowindow"
       permanent
       absolute
       height="100%"
       light
       right
     >
     <v-card
        class="info-card">
         <v-card-media src="http://via.placeholder.com/200x200" height="200px">
         </v-card-media>
         <v-card-title primary-title>
           <div>
             <h3 class="headline mb-0">{{title}}</h3>
             <div>{{description1}} <br> {{description2}}</div>
           </div>
         </v-card-title>
         <v-card-actions>
           <v-btn flat class="orange--text">Share</v-btn>
           <v-btn flat class="orange--text">Explore</v-btn>
         </v-card-actions>
    </v-card>

  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'wgu-info-window',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .wgu-infowindow {
    padding: 75px 5px 5px 5px
  }

  .wgu-infowindow .info-card {
    background-color: white;
    padding: 5px;
    height: 100%;
  }

</style>
