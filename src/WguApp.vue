<template>
  <div id="app" data-app>

      <wgu-app-header
        title="Vue.js / OpenLayers WebGIS">

        <v-toolbar-items slot="wgu-tb-buttons" class="">

            <wgu-menubutton
              icon="terrain"
              text=" Test"
            />

            <wgu-toggle-layerlist-button
              icon="layers"
              text=""
            />

            <wgu-toggle-measuretool-button
              icon="photo_size_select_small"
              text=""
            />

            <wgu-toggle-helpwin-button
              icon="help"
              text=""
            />

        </v-toolbar-items>
      </wgu-app-header>

      <wgu-top-logo logoSrc="http://via.placeholder.com/100x100"/>

      <wgu-map :zoom="2">

        <wgu-layer-osm slot="map-layers" :opacity="1.0" name="OSM"/>

        <wgu-layer-vectortiles slot="map-layers"
          name="Vector Tile Layer"
          url="https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf"
          format="MVT"
          hidden
        />

        <wgu-layer-tilewms slot="map-layers"
          name="WMS (ahocevar)"
          url="https://ahocevar.com/geoserver/wms"
          layers="topp:states"
          tiled
        />

        <wgu-layer-vector slot="map-layers"
          name="Shops"
          url="./static/data/shops-dannstadt.geojson"
          format="GeoJSON"
          :formatConfig="{}"
          selectable
          styleRef="shopStyle"
        />

      </wgu-map>

      <wgu-feature-infowindow
        layerId="Shops"
        imageProp="image"
        titleProp="name"
        icon="info"
        title="Information"
      />

      <wgu-layerlist />

      <wgu-measuretool-win />

      <wgu-helpwin />

  </div>
</template>

<script>
import OlMap from './components/ol/Map'
import OsmLayer from './components/ol/LayerOsm'
import TileWmsLayer from './components/ol/LayerTileWms'
import VectorLayer from './components/ol/LayerVector'
import VectorTileLayer from './components/ol/LayerVectorTiles'
import InfoWindow from './components/InfoWindow'
import FeatureInfoWindow from './components/FeatureInfoWindow'
import AppHeader from './components/AppHeader'
import TopLogo from './components/TopLogo'
import MenuButton from './components/MenuButton'
import LayerListToggleButton from './components/layerlist/ToggleButton'
import LayerList from './components/layerlist/LayerList'
import HelpWinToggleButton from './components/helpwin/ToggleButton'
import HelpWin from './components/helpwin/HelpWin'
import MeasureToolToggleButton from './components/measuretool/ToggleButton'
import MeasureToolWin from './components/measuretool/MeasureWin'

export default {
  name: 'app',
  components: {
    'wgu-map': OlMap,
    'wgu-layer-osm': OsmLayer,
    'wgu-layer-tilewms': TileWmsLayer,
    'wgu-layer-vector': VectorLayer,
    'wgu-layer-vectortiles': VectorTileLayer,
    'wgu-info-window': InfoWindow,
    'wgu-feature-infowindow': FeatureInfoWindow,
    'wgu-app-header': AppHeader,
    'wgu-top-logo': TopLogo,
    'wgu-menubutton': MenuButton,
    'wgu-toggle-layerlist-button': LayerListToggleButton,
    'wgu-layerlist': LayerList,
    'wgu-toggle-helpwin-button': HelpWinToggleButton,
    'wgu-helpwin': HelpWin,
    'wgu-toggle-measuretool-button': MeasureToolToggleButton,
    'wgu-measuretool-win': MeasureToolWin
  }
}
</script>

<style>

html {
  /* otherwise we have always vertical scrollbars */
  overflow-y: auto !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
