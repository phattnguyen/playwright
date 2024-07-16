import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test dynamic', async ({ page }) => {
  const example1Locator = 'a[href="/dynamic_loading/1"]';
  const startButtonLocator = 'div[id="start"] > button';

  const notLoadingStatusLocator = '//div[@id="loading" and @style="display: none;"]';
  const loadingStatusLocator = '//div[@id="loading" and not(@style="display: none;")]';

  const helloWorldLocator = "div[id='finish']>h4";

  await page.goto('https://the-internet.herokuapp.com/');

  // Expect a title "to contain" a substring.
  await page.click("a[href='/dynamic_loading']");

  // Wait for the element to be visible using XPath
  const xpath = '//h3[text()="Dynamically Loaded Page Elements"]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  expect(isDisplayed).toBeTruthy;
  console.log('Header is displayed:', isDisplayed);

  // go to example 1
  await page.locator(example1Locator).click();
  await page.waitForSelector(xpath);
  await page.locator(startButtonLocator).click();

  await page.waitForSelector(loadingStatusLocator);
  await page.waitForSelector(loadingStatusLocator, {state : 'hidden', timeout: 10000});
  const text = await page.$eval(helloWorldLocator, (element) => element.textContent);
  assert.strictEqual(text , "Hello World!");
})
