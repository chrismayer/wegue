<template>

  <v-card v-draggable-win class="wgu-floatwin wgu-layerlist" v-if=show v-bind:style="{ left: left, top: top }">
    <v-toolbar class="red darken-3 white--text" dark>
      <v-toolbar-side-icon><v-icon>{{icon}}</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Layers</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click="show = false"><v-icon>close</v-icon></v-toolbar-side-icon>
    </v-toolbar>
    <v-list>
      <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
        <v-list-tile class="wgu-layerlist-item" v-for="subItem in item.items" v-bind:key="subItem.title" @click="">
          <input type="checkbox" class="wgu-layer-viz-cb" v-bind:value="subItem.title" v-model="visibleLayers" @change="layerVizChanged">
          <v-list-tile-content class="black--text">
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-card>

</template>

<script>
  import FloatingWin from '../window/FloatingWindow';
  import { Mapable } from '../../mixins/Mapable';

  export default {
    extends: FloatingWin,
    mixins: [Mapable],
    props: ['icon'],
    data () {
      return {
        // will be filled in createLayerItems
        items: [],
        // will be filled in createLayerItems a. adapted by the layer checkboxes
        visibleLayers: []
      }
    },
    methods: {
      /**
       * This function is executed, after the map is bound (see mixins/Mapable)
       */
      onMapBound () {
        this.createLayerItems();
      },
      /**
       * Creates the layer items from the OpenLayers map.
       */
      createLayerItems () {
        // go over all layers from the map and list them up
        var layers = this.map.getLayers();
        // clone to only reverse the order for the list
        var layerArrClone = layers.getArray().slice(0);
        layers = layerArrClone.reverse();

        var layerItems = []
        var visibleLayers = []
        layers.forEach(function (layer) {
          var visible = layer.getVisible();
          var name = layer.get('name');
          layerItems.push({
            title: name,
            visible: visible
          })

          if (visible) {
            visibleLayers.push(name);
          }
        })

        // set the initial state of visible layers
        this.visibleLayers = visibleLayers

        // set the layer list
        this.items = [{
          title: '',
          items: layerItems,
          active: true
        }]
      },

      /**
       * Handles the 'change' event of the visibility checkboxes of the layers
       */
      layerVizChanged () {
        var me = this

        me.map.getLayers().forEach(function (layer) {
          layer.setVisible(false)
        })

        me.visibleLayers.forEach(function (layerNode) {
          var layer = me.getLayersBy('name', layerNode)[0]
          if (layer) {
            layer.setVisible(true)
          }
        })
      },

      /**
       * Returns a set of map layers which matches the given key value pair.
       *
       * @param {String} key - Key to filter layers
       * @param {Object} value - Value to filter layers
       * @return {ol.layer.Base[]} Array of matching layers
       */
      getLayersBy (key, value) {
        var layerMatches = []
        var allLayers = this.map.getLayers()
        allLayers.forEach(function (layer) {
          if (layer.get(key) === value) {
            layerMatches.push(layer)
          }
        })

        return layerMatches
      }
    }
  }
</script>

<style>

  .wgu-layerlist-item a.list__tile {
    padding-left: 0;
  }

  .wgu-layer-viz-cb {
    width: 45px;
  }

  .wgu-layerlist.card .list__group__header {
    border: 1px solid red;
    display: none;
  }

</style>
