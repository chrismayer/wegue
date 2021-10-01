import { shallowMount } from '@vue/test-utils';
import PropertyTable from '@/components/infoclick/PropertyTable'

describe('infoclick/PropertyTable.vue', () => {
  // Inspect the raw component options
  it('is defined', () => {
    expect(typeof PropertyTable).to.not.equal('undefined');
  });

  describe('props', () => {
    let comp;
    beforeEach(() => {
      comp = shallowMount(PropertyTable);
    });

    it('has correct default props', () => {
      expect(comp.vm.color).to.equal('red darken-3');
      expect(comp.vm.properties).to.equal(undefined);
    });
  });

  describe('computed properties', () => {
    let comp;
    beforeEach(() => {
      comp = shallowMount(PropertyTable);
    });

    it('tableStyles returning correct color for given color', async () => {
      expect(comp.vm.tableStyles.border).to.equal('2px solid #c62828');
      const color = 'rgb(0,0,0)';
      await comp.setProps({ color: color });
      expect(comp.vm.tableStyles.border).to.equal('2px solid ' + color);
    });
  });
});
