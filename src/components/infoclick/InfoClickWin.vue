<template>

  <div class="">

    <v-card v-draggable-win class="wgu-floatwin wgu-infoclick-win" v-if=show v-bind:style="{ left: left, top: top }">
      <v-toolbar class="red darken-3 white--text" dark>
        <v-toolbar-side-icon><v-icon>{{icon}}</v-icon></v-toolbar-side-icon>
        <v-toolbar-title>Map Click Info</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon @click="show = false"><v-icon>close</v-icon></v-toolbar-side-icon>
      </v-toolbar>
      <v-card-title primary-title>

        <div v-if="this.gridData === null && this.coordsData === null" class="no-data">
          Click on the map to get information for the clicked map position.
        </div>

        <!-- feature property grid -->
        <table v-if="this.gridData !== null">
          <thead>
            <tr>
              <th v-for="entry in gridData"
              </th>
            </tr>
          </thead>
          <tbody class="attr-tbody">
            <tr v-for="(value, key) in gridData">
              <td>
                {{key}}
              </td>
              <td>
                {{value}}
              </td>
            </tr>
          </tbody>
        </table>

        <table class="coords" v-if="this.coordsData !== null">
          <thead>
            <tr>
              <th v-for="entry in coordsData"
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in coordsData">
              <td>
                {{key}}
              </td>
              <td>
                {{value}}
              </td>
            </tr>
          </tbody>
        </table>

      </v-card-title>
    </v-card>

  </div>

</template>

<script>

import { WguEventBus } from '../../WguEventBus.js'
import FloatingWin from '../window/FloatingWindow';
import olProj from 'ol/proj'
import olCoordinate from 'ol/coordinate'

export default {
  extends: FloatingWin,
  name: 'wgu-infoclick-win',
  data: function () {
    return {
      coordsMapProj: '',
      coordsWgs84: '',
      coordsHdms: '',
      gridData: null,
      coordsData: null
    }
  },
  created () {
    var me = this;
    // Listen to the ol-map-mounted event and receive the OL map instance
    WguEventBus.$on('ol-map-mounted', (olMap) => {
      // make the OL map accesible in this component
      me.map = olMap;
    });
  },
  methods: {
    registerMapClick () {
      var me = this;

      me.map.on('singleclick', (evt) => {
        var featureLayer = me.map.forEachFeatureAtPixel(evt.pixel,
          function (feature, layer) {
            return [feature, layer];
          });

        if (featureLayer) {
          var feat = featureLayer[0];
          var props = feat.getProperties();

          delete props.geometry;

          me.gridData = props;
        } else {
          me.gridData = null;
        }

        var coordinates = evt.coordinate;
        var mapProjCode = me.map.getView().getProjection().getCode();
        var coordinatesWgs84 =
          olProj.transform(coordinates, mapProjCode, 'EPSG:4326')
        var hdms = olCoordinate.toStringHDMS(coordinatesWgs84);

        me.coordsMapProj = coordinates[1].toFixed(2) + ' ' + coordinates[0].toFixed(2);
        me.coordsWgs84 = coordinatesWgs84[1].toFixed(7) + ' ' + coordinatesWgs84[0].toFixed(7);
        me.coordsHdms = hdms;

        me.coordsData = {
          'POS': coordinates[1].toFixed(2) + ' ' + coordinates[0].toFixed(2),
          'WGS 84': coordinatesWgs84[1].toFixed(7) + ' ' + coordinatesWgs84[0].toFixed(7),
          'HDMS': hdms
        }
      });
    }
  },
  watch: {
    show () {
      if (this.show === true) {
        this.registerMapClick();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .wgu-infoclick-win .card__title {
    display: inherit;
  }

  .wgu-infoclick-win .no-data {
    width: 335px;
  }

  .wgu-infoclick-win table {
    border: 2px solid #c62828;
    border-radius: 3px;
    background-color: #fff;
  }

  .wgu-infoclick-win .attr-tbody {
    display: block;
    max-height: 300px;
    overflow-y: scroll;
  }

  .wgu-infoclick-win table.coords {
    margin-top: 12px;
    width: 100%;
  }

  .wgu-infoclick-win td {
    background-color: #f9f9f9;
  }

  .wgu-infoclick-win th, .wgu-infoclick-win td {
    width: 200px;
    padding: 10px 20px;
  }

  .wgu-infoclick-win th.active {
    color: #fff;
  }

</style>
