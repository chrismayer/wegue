import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Map from '@/components/ol/Map';
import OlMap from 'ol/Map';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import SelectInteraction from 'ol/interaction/Select';

// Used several times, so make const
const epsg28992Extent = [-285401.920, 22598.080, 595401.920, 903401.920];
const tileGridDefs = {
  'dutch_rd': {
    'extent': epsg28992Extent,
    'resolutions': [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
    'tileSize': [256, 256]
  }
};

describe('ol/Map.vue', () => {
  // Inspect the raw component options
  it('is defined', () => {
    expect(typeof Map).to.not.equal('undefined');
  });

  it('has a mounted hook', () => {
    expect(typeof Map.mounted).to.equal('function');
  });

  it('has a created hook', () => {
    expect(typeof Map.created).to.equal('function');
  });

  describe('props', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = { modules: {} };
      comp = mount(Map);
      vm = comp.vm;
    });

    it('has correct default props', () => {
      expect(vm.color).to.equal('red darken-3');
      expect(vm.collapsibleAttribution).to.equal(false);
      expect(vm.rotateableMap).to.equal(false);
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('data', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = mount(Map);
      vm = comp.vm;
    });

    it('has correct default data', () => {
      expect(vm.permalink).to.equal(undefined);
      expect(vm.zoom).to.equal(undefined);
      expect(vm.center).to.equal(undefined);
      expect(vm.tileGridDefs).to.be.empty;
      expect(vm.tileGrids).to.be.empty;
      expect(vm.map.getView().getProjection().getCode()).to.equal('EPSG:3857');
      expect(vm.map.getView().getProjection().getUnits()).to.equal('m');
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('data - TileGrid Definitions', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = { tileGridDefs: tileGridDefs };
      comp = mount(Map);
      vm = comp.vm;
    });

    it('has instantiated TileGridDefs', () => {
      expect(vm.tileGridDefs).to.not.be.empty;
      expect(vm.tileGrids).to.not.be.empty;
      expect(vm.tileGridDefs['dutch_rd']).to.deep.equal(tileGridDefs['dutch_rd']);
      expect(vm.tileGrids['dutch_rd']).to.not.be.empty;
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('data - Projection Definitions', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = {
        mapProjection: {
          'code': 'EPSG:28992',
          'units': 'm',
          'extent': epsg28992Extent
        },
        projectionDefs: [
          ['EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.999908 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs']
        ]
      };
      comp = mount(Map);
      vm = comp.vm;
    });

    it('has instantiated Projection for Map View', () => {
      expect(vm.projectionDefs).to.not.be.empty;
      expect(vm.projection).to.not.be.empty;

      const mapProjection = vm.map.getView().getProjection();
      expect(mapProjection).to.not.be.empty;
      expect(mapProjection.getCode()).to.equal('EPSG:28992');
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('methods', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = mount(Map);
      vm = comp.vm;
    });

    it('createLayers returns always an array', () => {
      // mock a map layer config
      Vue.prototype.$appConfig = { mapLayers: [{
        'type': 'OSM',
        'lid': 'osm-bg',
        'isBaseLayer': false,
        'visible': true,
        'selectable': false,
        'displayInLayerList': true }]
      };
      const layers = vm.createLayers();
      expect(layers).to.be.an('array');
      expect(layers.length).to.equal(1);
    });

    it('createLayers registers a select interaction if configured', () => {
      // mock a map layer config
      Vue.prototype.$appConfig = { mapLayers: [{
        'type': 'OSM',
        'lid': 'osm-bg',
        'isBaseLayer': false,
        'visible': true,
        'selectable': true,
        'displayInLayerList': true }]
      };
      vm.createLayers();
      let selectIa;
      vm.map.getInteractions().forEach((ia) => {
        if (ia instanceof SelectInteraction) {
          selectIa = ia;
        }
      });
      expect(typeof selectIa).to.not.equal('undefined');
    });

    it('setOlButtonColor applies CSS color to OL buttons', async () => {
      // mock a OL zoom button
      const mockZoomDiv = document.createElement('div');
      const mockSubZoomInEl = document.createElement('button');
      const mockSubZoomOutEl = document.createElement('button');
      mockZoomDiv.classList.add('ol-zoom');
      mockSubZoomInEl.classList.add('ol-zoom-in');
      mockSubZoomOutEl.classList.add('ol-zoom-out');
      mockZoomDiv.append(mockSubZoomInEl);
      mockZoomDiv.append(mockSubZoomOutEl);
      document.body.append(mockZoomDiv);

      // mock a OL rotate button
      const mockRotDiv = document.createElement('div');
      const mockSubRotDiv = document.createElement('div');
      mockRotDiv.classList.add('ol-rotate');
      mockSubRotDiv.classList.add('ol-rotate-reset');
      mockRotDiv.append(mockSubRotDiv);
      document.body.append(mockRotDiv);

      await comp.setProps({ color: 'rgb(0, 0, 0)' });
      vm.setOlButtonColor();

      expect(mockSubZoomInEl.style.backgroundColor).to.equal(vm.color);
      expect(mockSubZoomOutEl.style.backgroundColor).to.equal(vm.color);
      expect(mockSubRotDiv.style.backgroundColor).to.equal(vm.color);

      // cleanup (otherwise follow up tests fail)
      mockZoomDiv.parentNode.removeChild(mockZoomDiv);
      mockRotDiv.parentNode.removeChild(mockRotDiv);
    });

    it('setOlButtonColor applies Vuetify color to OL buttons', () => {
      // mock a OL zoom button
      const mockZoomDiv = document.createElement('div');
      const mockSubZoomInEl = document.createElement('button');
      const mockSubZoomOutEl = document.createElement('button');
      mockZoomDiv.classList.add('ol-zoom');
      mockSubZoomInEl.classList.add('ol-zoom-in');
      mockSubZoomOutEl.classList.add('ol-zoom-out');
      mockZoomDiv.append(mockSubZoomInEl);
      mockZoomDiv.append(mockSubZoomOutEl);
      document.body.append(mockZoomDiv);

      // mock a OL rotate button
      var mockRotDiv = document.createElement('div');
      var mockSubRotEl = document.createElement('button');
      mockRotDiv.classList.add('ol-rotate');
      mockSubRotEl.classList.add('ol-rotate-reset');
      mockRotDiv.append(mockSubRotEl);
      document.body.append(mockRotDiv);

      // set a vuetify color definition like 'red darken-3'
      const cssCls1 = 'red';
      const cssCls2 = 'darken-3';
      vm.color = cssCls1 + ' ' + cssCls2;
      vm.setOlButtonColor();

      expect(mockSubZoomInEl.classList.contains(cssCls1)).to.equal(true);
      expect(mockSubZoomInEl.classList.contains(cssCls2)).to.equal(true);
      expect(mockSubZoomOutEl.classList.contains(cssCls1)).to.equal(true);
      expect(mockSubZoomOutEl.classList.contains(cssCls2)).to.equal(true);
      expect(mockSubRotEl.classList.contains(cssCls1)).to.equal(true);
      expect(mockSubRotEl.classList.contains(cssCls2)).to.equal(true);

      // cleanup (otherwise follow up tests fail)
      mockZoomDiv.parentNode.removeChild(mockZoomDiv);
      mockRotDiv.parentNode.removeChild(mockRotDiv);
    });

    it('setupMapHover registers a tooltip DOM element and OL overlay', () => {
      const map = new OlMap({});
      const mockMapDiv = document.createElement('div');
      map.setTarget(mockMapDiv);
      vm.map = map;

      vm.setupMapHover();

      const hoverOverlayEl = vm.map.getTarget().querySelector('.wgu-hover-tooltiptext');
      expect(typeof hoverOverlayEl).not.to.equal('undefined');

      expect(map.getOverlays().getLength()).to.equal(1);
    });

    it('setupMapHover binds a pointermove and shows no tooltip if no feature is hit', () => {
      const map = new OlMap({});
      const mockMapDiv = document.createElement('div');
      map.setTarget(mockMapDiv);
      vm.map = map;

      vm.setupMapHover();
      vm.onPointerMove({ pixel: [0, 0] });

      expect(vm.overlayEl.innerHTML).to.equal('');
      expect(vm.overlay.getPosition()).to.equal(undefined);
    });

    it('setupMapHover binds a pointermove and shows correct tooltip', () => {
      const feat = new Feature({
        foo: 'bar',
        geometry: new Point([0, 0])
      });
      const layer = new VectorLayer({
        hoverable: true,
        hoverAttribute: 'foo',
        source: new VectorSource({
          features: [feat]
        })
      });
      const map = new OlMap({
        layers: [layer]
      });
      const mockMapDiv = document.createElement('div');
      map.setTarget(mockMapDiv);

      // overwrite getFeaturesAtPixel to simulate hitting a valid feature
      map.getFeaturesAtPixel = (evt, opts) => {
        opts.layerFilter(layer);
        return [feat];
      };

      vm.map = map;

      vm.setupMapHover();

      vm.onPointerMove({ pixel: [0, 0] });

      expect(vm.overlayEl.innerHTML).to.equal('bar');
      expect(vm.overlay.getPosition()).to.equal(undefined);
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('methods - TileGrids and Projections', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = {
        mapZoom: 3,
        mapCenter: [155000, 463000],
        mapProjection: {
          'code': 'EPSG:28992',
          'units': 'm',
          'extent': epsg28992Extent
        },
        projectionDefs: [
          ['EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.999908 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs']
        ],
        tileGridDefs: tileGridDefs,
        mapLayers: [{
          'type': 'XYZ',
          'lid': 'brtachtergrondkaart',
          'url': 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/brtachtergrondkaart/EPSG:28992/{z}/{x}/{y}.png',
          'projection': 'EPSG:28992',
          'tileGridRef': 'dutch_rd',
          'displayInLayerList': true,
          'visible': true
        }]
      };
      comp = mount(Map);
      vm = comp.vm;
    });

    it('createLayers assigns TileGrid to Layer Sources', () => {
      const layers = vm.createLayers();
      const tileGrid = layers[0].getSource().getTileGrid();
      expect(tileGrid).to.be.not.empty;
      expect(tileGrid.getResolutions()[0]).to.equal(3440.640);
    });

    it('createLayers assigns Projection to Layer Sources', () => {
      const layers = vm.createLayers();
      const source = layers[0].getSource();
      expect(source.getProjection().getCode()).to.equal('EPSG:28992');
    });

    afterEach(() => {
      comp.destroy();
    });
  });
});
