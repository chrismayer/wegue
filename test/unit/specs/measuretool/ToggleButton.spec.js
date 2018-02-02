import Vue from 'vue'
import MeasureToggleBtn from '@/components/measuretool/ToggleButton'

describe('measuretool/ToggleButton.vue', () => {
  // Check methods
  it('has a method toggleUi', () => {
    const mtb = new MeasureToggleBtn();
    expect(typeof mtb.toggleUi).to.equal('function');
  });

  // Evaluate the results of functions
  it('sets the correct default data', () => {
    const mtb = new MeasureToggleBtn();
    mtb.toggleUi();
    expect(mtb.showUi).to.equal(true);
  });

  // Mount an instance and inspect the render output
  it('renders the right sub-components', () => {
    const Constructor = Vue.extend(MeasureToggleBtn);
    const vm = new Constructor().$mount();
    const btn = vm.$el.querySelector('v-btn');
    expect(btn !== null).to.equal(true);
    const icon = vm.$el.querySelector('v-icon');
    expect(icon !== null).to.equal(true);
  });
});
