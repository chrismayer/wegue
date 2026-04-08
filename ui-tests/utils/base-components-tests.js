import { expectElFound } from './expects';

/**
 * Tests for base UI components in Wegue applications.
 */
const baseComponentsTests = () => {
  let page;
  beforeAll(() => {
    page = globalThis.__PAGE__;
  });

  describe('Basic App Layout', async () => {
    it('should have a v-application top level element', async () => {
      await expectElFound(page, '.v-application');
    });
    it('should have a Wegue header/toolbar', async () => {
      await expectElFound(page, 'header.wgu-app-toolbar');
    });
    it('should have a main container', async () => {
      await expectElFound(page, 'main.v-main');
    });
    it('should have an OL map container', async () => {
      await expectElFound(page, '#ol-map-container');
    });
    it('should have an OL map viewport', async () => {
      await expectElFound(page, '.ol-viewport');
    });
    it('should have a map teleport target', async () => {
      await expectElFound(page, '#wgu-map-teleport');
    });
    it('should have a Wegue footer', async () => {
      await expectElFound(page, 'footer.v-footer');
    });
  });
};

export { baseComponentsTests };
