/**
 * Test spec to check setup / layout of "Default Example".
 */
import { baseComponentsTests } from '../utils/base-components-tests.js';

const wegueAppBaseUrl = globalThis.__WEGUE_APP_BASE_URL__;
let defaultExampleUrl = wegueAppBaseUrl;
if (!defaultExampleUrl.endsWith('?')) {
  defaultExampleUrl += '?';
}

console.info('Checking Wegue Default Example App at:', defaultExampleUrl);

describe('Wegue Default Example App', () => {
  let page;
  beforeAll(async () => {
    page = globalThis.__PAGE__;
    await page.goto(defaultExampleUrl);
  });

  // base UI components app layout
  baseComponentsTests();

  // app browser title
  it('should load and have correct title', async () => {
    const title = await page.title();
    expect(title).toContain('Wegue Demo App');
  });

  // TODO specific tools / modules
});
