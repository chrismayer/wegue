/**
 * Expect like function to check if a DOM element is NOT present.
 *
 * @param {*} page
 * @param {String} selector
 */
async function expectElNotFound(page, selector) {
  try {
    await page.waitForSelector(selector, { timeout: 3000 });
    throw new Error('WGU_EL_SHOULD_NOT_EXIST');
  } catch (error) {
    if (error.message === 'WGU_EL_SHOULD_NOT_EXIST') {
      expect(0).toEqual(1); // force test fail
    }
    // test passes if element is not found
  }
}

/**
 * Expect like function to check if a DOM element defined by CSS selector is present.
 *
 * @param {*} page
 * @param {String} selector
 */
async function expectElFound(page, selector) {
  const el = await page.waitForSelector(selector);
  expect(el).toBeDefined();
}

export { expectElNotFound, expectElFound };
