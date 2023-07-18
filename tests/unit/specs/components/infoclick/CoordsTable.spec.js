import { shallowMount } from '@vue/test-utils';
import CoordsTable from '@/components/infoclick/CoordsTable';
import Vuetify from 'vuetify';

describe('infoclick/CoordsTable.vue', () => {
  const vuetify = new Vuetify();

  // Inspect the raw component options
  it('is defined', () => {
    expect(typeof CoordsTable).to.not.equal('undefined');
  });

  describe('props', () => {
    let comp;
    beforeEach(() => {
      comp = shallowMount(CoordsTable, {
        vuetify
      });
    });

    it('has correct default props', () => {
      expect(comp.vm.coordsData).to.equal(undefined);
      expect(comp.vm.showMapPos).to.equal(true);
      expect(comp.vm.showWgsPos).to.equal(true);
      expect(comp.vm.showHdms).to.equal(true);
    });
  });

  describe('data', () => {
    let comp;
    beforeEach(() => {
      comp = shallowMount(CoordsTable, {
        vuetify
      });
    });

    it('has correct default data', () => {
      expect(comp.vm.coordRows).to.equal(null);
    });
  });

  describe('watchers', () => {
    let comp;
    beforeEach(() => {
      comp = shallowMount(CoordsTable, {
        vuetify
      });
    });

    it('watches coordsData', done => {
      comp.setProps({
        coordsData: {
          coordinate: [1, 1],
          projection: 'EPSG:4326'
        }
      });
      /* eslint-disable quote-props */
      const expextedCoordRows = {
        'MAP PROJ': '1.00 1.00',
        'WGS 84': '1.0000000° 1.0000000°',
        'HDMS': '1° N 1° E'
      };
      /* eslint-enable quote-props */
      comp.vm.$nextTick(() => {
        expect(comp.vm.coordRows['MAP PROJ']).to.equal(expextedCoordRows['MAP PROJ']);
        expect(comp.vm.coordRows['WGS 84']).to.equal(expextedCoordRows['WGS 84']);
        expect(comp.vm.coordRows.HDMS).to.equal(expextedCoordRows.HDMS);
        done();
      });
    });
  });
});
