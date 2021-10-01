<template>

  <div class="">
    <div class="measure-result">
      {{ $t("wgu-measuretool.length") }}: {{distance}}
    </div>
    <div class="measure-result">
      {{ $t("wgu-measuretool.area") }}: {{area}}
    </div>
  </div>

</template>

<script>
import LineStringGeom from 'ol/geom/LineString';
import PolygonGeom from 'ol/geom/Polygon';
import { getArea, getLength } from 'ol/sphere.js';

export default {
  name: 'wgu-measure-result',
  props: {
    measureGeom: { type: Object }
  },
  data () {
    return {
      area: ' -- ',
      distance: ' -- '
    }
  },
  watch: {
    measureGeom () {
      const me = this;
      const geom = me.measureGeom.geom;
      let output;
      if (geom instanceof PolygonGeom) {
        output = me.formatArea(geom);
        me.area = output;
      } else if (geom instanceof LineStringGeom) {
        output = me.formatLength(geom);
        me.distance = output;
      } else {
        me.area = ' -- ';
        me.distance = ' -- ';
      }
    }
  },
  methods: {
    /**
       * Calculates and formats the length of the given line.
       *
       * @param  {ol.geom.LineString} line The LineString object to calculate length for
       */
    formatLength (line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = this.$t('wgu-measuretool.lengthKm',
          [Math.round(length / 1000 * 100) / 100]);
      } else {
        output = this.$t('wgu-measuretool.lengthMeter',
          [Math.round(length * 100) / 100]);
      }
      return output;
    },
    /**
       * Calculates and formats the area of the given polygon.
       *
       * @param  {ol.geom.Polygon} polygon The Polygon object to calculate area for
       */
    formatArea (polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = this.$t('wgu-measuretool.areaSquareKm',
          [Math.round(area / 1000000 * 100) / 100]);
      } else {
        output = this.$t('wgu-measuretool.areaSquareMeter',
          [Math.round(area * 100) / 100]);
      }
      return output;
    }
  }
}
</script>

<style>

  .measure-result {
    font-size: 14px;
    padding-left: 8px;
    padding-bottom: 8px;
  }

</style>
