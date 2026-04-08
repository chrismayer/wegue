import puppeteer from 'puppeteer';
import process from 'process';

export default {
  name: 'puppeteer',
  viteEnvironment: 'ssr',

  async setup () {
    const browser = await puppeteer.launch({
      headless: process.env.HEADLESS !== 'false',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // expose globally to re-use in test specs
    globalThis.__BROWSER__ = browser;
    globalThis.__PAGE__ = page;

    // detect application base URL and save as global var to access in tests
    let wegueAppBaseUrl;
    if (process.env.WEGUE_APP_BASEURL) {
      wegueAppBaseUrl = process.env.WEGUE_APP_BASEURL;

      if (!wegueAppBaseUrl.endsWith('/')) {
        wegueAppBaseUrl += '/';
      }
    } else {
      console.error('Missing environment variable "WEGUE_APP_BASEURL" - EXIT!');
      process.exit(1);
    }

    // set reference to access in teardown
    globalThis.__WEGUE_APP_BASE_URL__ = wegueAppBaseUrl;

    return {
      teardown: async () => {
        await browser.close();
      }
    };
  }
};
