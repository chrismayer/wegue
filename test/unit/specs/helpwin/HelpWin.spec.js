import Vue from 'vue'
import HelpWin from '@/components/helpwin/HelpWin'

describe('helpwin/HelpWin.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('has the correct properties', () => {
    expect(Array.isArray(HelpWin.props)).to.equal(true);
    // const defaultData = HelpWin.props();
    // expect(defaultData.show).to.equal(false);
    expect(HelpWin.props[0]).to.equal('headline');
    expect(HelpWin.props[1]).to.equal('content');
    expect(HelpWin.props[2]).to.equal('infoLink');
    expect(HelpWin.props[3]).to.equal('infoLinkText');
  });

  // Mount an instance and inspect the render output
  it('does not render on startup', () => {
    const Constructor = Vue.extend(HelpWin)
    const vm = new Constructor().$mount();
    // el is not undefined but this tests that it is not rendered
    expect(vm.$el.textContent).to.equal('');
  });
});
