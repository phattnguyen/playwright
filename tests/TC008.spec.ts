import { test, expect } from '@playwright/test';
import exp from 'constants';
const assert = require('assert');


test('test fill form', async ({ page }) => {

  const promtButtonLocator = '//button[text()="Prompt"]';
  const promptMsgLocator = 'p[id="demo"]';

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Wait for the element to be visible using XPath
  const xpath = '//h1[contains(text(),"Automation Testing Practice")]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  expect(isDisplayed).toBeTruthy;
  console.log('Header is displayed:', isDisplayed);

  //click prompt
  // await page.pause();
  // await page.locator(promtButtonLocator).click();
  // await page.pause();


  page.on('dialog', async (dialog) => {
    console.log('Dialog message:', dialog.message());

    // Example: Accept the dialog
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toContain('Harry Potter');
    await dialog.accept('Phat Nguyen');
  });

  await page.locator(promtButtonLocator).click();
  await page.waitForSelector(promptMsgLocator);
  const text = await page.$eval(promptMsgLocator, (element) => element.textContent);
  assert.strictEqual(text , "Hello Phat Nguyen! How are you today?");
})
