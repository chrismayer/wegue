import FloatingWin from '@/components/window/FloatingWindow'
import DraggableWin from '@/directives/DraggableWin'

describe('window/FloatingWindow.vue', () => {
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof FloatingWin.data).to.equal('function');
    const defaultData = FloatingWin.data();
    expect(defaultData.show).to.equal(false);
    expect(defaultData.left).to.equal('100px');
    expect(defaultData.top).to.equal('200px');
  });

  it('has the correct directives', () => {
    expect(typeof FloatingWin.directives).to.equal('object');
  });

});
