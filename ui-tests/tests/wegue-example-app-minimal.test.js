/**
 * Test spec to check setup / layout of "Minimal Example".
 */
import { expectElFound, expectElNotFound } from '../utils/expects';
import { baseComponentsTests } from '../utils/base-components-tests.js';

const wegueAppBaseUrl = globalThis.__WEGUE_APP_BASE_URL__;
let minimalExampleUrl = wegueAppBaseUrl;
if (!minimalExampleUrl.endsWith('?')) {
  minimalExampleUrl += '?';
}
minimalExampleUrl += 'appCtx=minimal';

console.info('Checking Wegue Minimal Example App at:', minimalExampleUrl);

describe('Wegue Default Example App', () => {
  let page;
  beforeAll(async () => {
    page = globalThis.__PAGE__;
    await page.goto(minimalExampleUrl);
  });

  // base UI components app layout
  baseComponentsTests();

  // app browser title
  it('should load and have correct title', async () => {
    const title = await page.title();
    expect(title).toContain('Wegue Demo App');
  });

  // modules
  it('should have help button', async () => {
    await expectElFound(page, '.wgu-toggle-button');
  });
  it('should NOT have other module button', async () => {
    await expectElNotFound(page, 'button[type="wgu-zoomtomaxextent-btn"]');
  });
});
