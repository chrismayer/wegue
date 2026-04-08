/**
 * Test spec to check setup / layout of "Sidebar Example".
 */
import { expectElFound } from '../utils/expects';
import { baseComponentsTests } from '../utils/base-components-tests.js';

const wegueAppBaseUrl = globalThis.__WEGUE_APP_BASE_URL__;
let sidebarExampleUrl = wegueAppBaseUrl;
if (!sidebarExampleUrl.endsWith('?')) {
  sidebarExampleUrl += '?';
}
sidebarExampleUrl += 'appCtx=sidebar';

console.info('Checking Wegue Sidebar Example App at:', sidebarExampleUrl);

describe('Wegue Default Example App', () => {
  let page;
  beforeAll(async () => {
    page = globalThis.__PAGE__;
    await page.goto(sidebarExampleUrl);
  });

  // base UI components app layout
  baseComponentsTests();

  // app browser title
  it('should load and have correct title', async () => {
    const title = await page.title();
    expect(title).toContain('Wegue Demo App');
  });

  // sidebar
  it('should have a Wegue sidebar', async () => {
    await expectElFound(page, 'nav.wgu-app-sidebar');
  });
});
