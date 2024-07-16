import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test fill form', async ({ page }) => {

  const nameFieldLocator = 'input[id="name"]';
  const addrFieldLocator = 'textarea[id="textarea"]';
  const nameText = 'name';
  const addrText = '123 address';

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Wait for the element to be visible using XPath
  const xpath = '//h1[contains(text(),"Automation Testing Practice")]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  expect(isDisplayed).toBeTruthy;
  console.log('Header is displayed:', isDisplayed);

  const nameFieldEle = await page.$(nameFieldLocator);
  const addrFieldEle = await page.$(addrFieldLocator);

  // input form
  await page.locator(nameFieldLocator).fill(nameText);
  await page.locator(addrFieldLocator).fill(addrText);


  var inputtedName = await nameFieldEle?.inputValue();
  var inputtedAddress = await addrFieldEle?.inputValue();
  assert.strictEqual(inputtedName , nameText);
  assert.strictEqual(inputtedAddress , addrText);

  // clear form
  await page.locator(nameFieldLocator).clear();
  await page.locator(addrFieldLocator).clear();

  inputtedName = await nameFieldEle?.inputValue();
  inputtedAddress = await addrFieldEle?.inputValue();
  assert.strictEqual(inputtedName , '');
  assert.strictEqual(inputtedAddress , '');
})
