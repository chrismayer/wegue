import Vue from 'vue'
import MeasureWin from '@/components/measuretool/MeasureWin'

describe('measuretool/MeasureWin.vue', () => {
  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof MeasureWin.created).to.equal('function');
  });

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof MeasureWin.data).to.equal('function');
    const defaultData = MeasureWin.data();
    expect(defaultData.area).to.equal(' -- ');
    expect(defaultData.distance).to.equal(' -- ');
    expect(defaultData.measureType).to.equal('distance');
    expect(defaultData.show).to.equal(false);
  });

  it('has the correct functions', () => {
    const Constructor = Vue.extend(MeasureWin);
    const vm = new Constructor().$mount();
    expect(typeof vm.createMeasureLayer).to.equal('function');
    expect(typeof vm.addInteraction).to.equal('function');
    expect(typeof vm.removeInteraction).to.equal('function');
    expect(typeof vm.formatLength).to.equal('function');
    expect(typeof vm.formatArea).to.equal('function');
  });

  // Mount an instance and inspect the render output
  it('does not render on startup', () => {
    const Constructor = Vue.extend(MeasureWin);
    const vm = new Constructor().$mount();
    // el is not undefined but this tests that it is not rendered
    expect(vm.$el.textContent).to.equal('');
  });
});
