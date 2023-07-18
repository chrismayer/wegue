import { shallowMount } from '@vue/test-utils';
import BgLayerList from '@/components/bglayerswitcher/BgLayerList';
import OlMap from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Vuetify from 'vuetify';

const vuetify = new Vuetify();

const moduleProps = {
  imageWidth: 152,
  imageHeight: 114,
  previewIcon: 'map'
};

describe('bglayerswitcher/BgLayerList.vue', () => {
  it('is defined', () => {
    expect(BgLayerList).to.not.be.an('undefined');
  });

  it('has a mounted hook', () => {
    expect(BgLayerList.mounted).to.be.a('function');
  });

  describe('props', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(BgLayerList, {
        propsData: moduleProps,
        vuetify
      });
      vm = comp.vm;
    });

    it('has correct props', () => {
      expect(vm.imageWidth).to.equal(152);
      expect(vm.imageHeight).to.equal(114);
      expect(vm.previewIcon).to.equal('map');
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('data', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(BgLayerList, {
        propsData: moduleProps,
        vuetify
      });
      vm = comp.vm;
    });

    it('has correct default data', () => {
      expect(typeof BgLayerList.data).to.equal('function');
      expect(vm.layers).to.be.an('array');
      expect(vm.layers.length).to.eql(0);
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('computed properties', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(BgLayerList, {
        propsData: moduleProps,
        vuetify
      });
      vm = comp.vm;
    });

    it('detects base layer items', () => {
      const layerIn = new VectorLayer({
        visible: true,
        isBaseLayer: true,
        source: new VectorSource()
      });
      const layerOut = new VectorLayer({
        visible: true,
        isBaseLayer: false,
        source: new VectorSource()
      });
      const map = new OlMap({
        layers: [layerIn, layerOut]
      });
      vm.map = map;
      vm.onMapBound();

      expect(vm.displayedLayers.length).to.equal(1);
      const li = vm.displayedLayers[0];
      expect(li).to.equal(layerIn);
      expect(li.getVisible()).to.equal(true);
      expect(vm.selectedLayer).to.equal(layerIn);
    });

    it('displayedLayers items are synced with the layer stack', () => {
      const layerIn = new VectorLayer({
        visible: true,
        isBaseLayer: true,
        source: new VectorSource()
      });
      const layerOut = new VectorLayer({
        visible: false,
        isBaseLayer: true,
        source: new VectorSource()
      });
      const map = new OlMap({
        layers: [layerIn]
      });
      vm.map = map;
      vm.onMapBound();

      expect(vm.displayedLayers.length).to.equal(1);

      map.addLayer(layerOut);

      expect(vm.displayedLayers.length).to.equal(2);
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('methods', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(BgLayerList, {
        propsData: moduleProps,
        vuetify
      });
      vm = comp.vm;
    });

    it('are implemented', () => {
      expect(typeof vm.onMapBound).to.equal('function');
      expect(typeof vm.onSelectLayer).to.equal('function');
    });

    it('onSelectLayer toggles layer visibility and selection', () => {
      const layerIn = new VectorLayer({
        visible: true,
        isBaseLayer: true,
        source: new VectorSource()
      });
      const layerOut = new VectorLayer({
        visible: false,
        isBaseLayer: true,
        source: new VectorSource()
      });
      const map = new OlMap({
        layers: [layerIn, layerOut]
      });
      vm.map = map;
      vm.onMapBound();

      expect(layerIn.getVisible()).to.equal(true);
      expect(layerOut.getVisible()).to.equal(false);
      expect(vm.selectedLayer).to.equal(layerIn);

      vm.onSelectLayer(layerOut);

      expect(layerIn.getVisible()).to.equal(false);
      expect(layerOut.getVisible()).to.equal(true);
      expect(vm.selectedLayer).to.equal(layerOut);
    });

    afterEach(() => {
      comp.destroy();
    });
  });
});
