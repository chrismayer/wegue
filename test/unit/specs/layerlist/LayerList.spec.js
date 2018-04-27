import Vue from 'vue'
import LayerList from '@/components/layerlist/LayerList'

describe('layerlist/LayerList.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof LayerList.data).to.equal('function');
    const defaultData = LayerList.data();
    expect(Array.isArray(defaultData.items)).to.equal(true);
    expect(defaultData.items.length).to.equal(0);
    expect(Array.isArray(defaultData.visibleLayers)).to.equal(true);
    expect(defaultData.visibleLayers.length).to.equal(0);
  });

  // Mount an instance and inspect the render output
  it('does not render on startup', () => {
    const Constructor = Vue.extend(LayerList)
    const vm = new Constructor().$mount();
    // el is not undefined but this tests that it is not rendered
    expect(vm.$el.textContent).to.equal('');
  });
});
