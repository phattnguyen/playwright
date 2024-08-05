import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test iframe', async ({ page }) => {
  test.setTimeout(150_000);

  const iframeTabLocator = "[id=iFrame]";
  const iframeLocator = "iframe[name='globalSqa']";
  const iframeButtonSearchLocator = "button[class='button_search']";
  const searchResult = 'Sorry, no posts matched your criteria.';

  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
  await page.waitForLoadState('networkidle');
  // click iframe tab
  await page.locator(iframeTabLocator).click();

  // switch iframe and search
  await page.frameLocator(iframeLocator).first().getByPlaceholder("Search...").fill("Playwright");
  await page.frameLocator(iframeLocator).first().locator(iframeButtonSearchLocator).click();

  // verify text present
  await page.waitForLoadState('networkidle');
  const iframeEle = await page.waitForSelector(iframeLocator);
  const iframe = await iframeEle.contentFrame();

  // wait for frame to fully loaded
  await iframe?.waitForLoadState('networkidle');
  const iframeContent = await iframe?.textContent('body');
  await assert.strictEqual(iframeContent?.includes(searchResult),true);
  })
