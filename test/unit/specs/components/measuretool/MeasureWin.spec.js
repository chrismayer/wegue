import { shallowMount } from '@vue/test-utils';
import MeasureWin from '@/components/measuretool/MeasureWin';
// import OlMap from 'ol/Map';
// import LineStringGeom from 'ol/geom/LineString';

describe('measuretool/MeasureWin.vue', () => {
  it('is defined', () => {
    expect(typeof MeasureWin).to.not.equal('undefined');
  });

  describe('props', () => {
    let comp;
    beforeEach(() => {
      comp = shallowMount(MeasureWin);
    });

    it('has correct default props', () => {
      expect(comp.vm.color).to.equal('red darken-3');
      expect(comp.vm.icon).to.equal('photo_size_select_small');
      expect(comp.vm.title).to.equal('Measure');
      expect(comp.vm.draggable).to.equal(true);
      expect(comp.vm.initPos).to.equal(undefined);
    });
  });

  // describe('data', () => {
  //   let comp;
  //   beforeEach(() => {
  //     comp = shallowMount(MeasureWin);
  //   });
  //
  //   it('has correct default data', () => {
  //     expect(comp.vm.moduleName).to.equal('wgu-measuretool');
  //     expect(comp.vm.measureGeom).to.equal(null);
  //     expect(comp.vm.measureType).to.equal('distance');
  //     expect(comp.vm.show).to.equal(false);
  //     expect(comp.vm.left).to.equal('0');
  //     expect(comp.vm.top).to.equal('0');
  //   });
  // });

  // describe('watchers', () => {
  //   let comp;
  //   let vm;
  //   beforeEach(() => {
  //     comp = shallowMount(MeasureWin);
  //     vm = comp.vm;
  //   });
  //
  //   it('watches show setting to false', () => {
  //     let cnt = 0;
  //     let mockFn = () => {
  //       cnt++;
  //     };
  //     vm.$appConfig = {modules: {}};
  //
  //     const map = new OlMap({});
  //     vm.map = map;
  //     vm.onMapBound();
  //     vm.olMapCtrl.removeInteraction = mockFn;
  //     // toggle to trigger the watcher
  //     vm.show = true;
  //     vm.show = false;
  //     expect(cnt).to.equal(1);
  //   });
  //
  //   it('watches show setting to true', () => {
  //     let cnt = 0;
  //     let mockFn = () => {
  //       cnt++;
  //     };
  //     vm.$appConfig = {modules: {}};
  //
  //     const map = new OlMap({});
  //     vm.map = map;
  //     vm.onMapBound();
  //     vm.olMapCtrl.addInteraction = mockFn;
  //     vm.show = true;
  //     expect(cnt).to.equal(1);
  //   });
  //
  //   it('watches measureType resets old data', () => {
  //     comp.vm.measureType = 'area';
  //     expect(comp.vm.measureGeom).to.be.an('object').that.is.empty;
  //   });
  // });

  // describe('methods', () => {
  //   let comp;
  //   let vm;
  //   beforeEach(() => {
  //     comp = shallowMount(MeasureWin);
  //     vm = comp.vm;
  //   });
  //
  //   it('are implemented', () => {
  //     expect(typeof vm.applyMeasureType).to.equal('function');
  //     expect(typeof vm.onMeasureVertexSet).to.equal('function');
  //   });
  //
  //   it('applyMeasureType sets measureType', () => {
  //     vm.applyMeasureType('kalle');
  //     expect(vm.measureType).to.equal('kalle');
  //   });
  //
  //   it('onMeasureVertexSet sets measureGeom object', () => {
  //     const lineGeom = new LineStringGeom([[0, 0], [1000, 0], [1000, 1000], [0, 1000]]);
  //     vm.onMeasureVertexSet(lineGeom);
  //     expect(vm.measureGeom.geom).to.equal(lineGeom);
  //   });
  // });
});
