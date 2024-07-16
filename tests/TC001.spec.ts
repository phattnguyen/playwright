import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test check boxes', async ({ page }) => {
  const firstCheckBox = 'form > input:first-child';
  const lastCheckBox = 'form > input:last-child';

  await page.goto('https://the-internet.herokuapp.com/');

  // Expect a title "to contain" a substring.
  await page.click("a[href='/checkboxes']");

  // Wait for the element to be visible using XPath
  const xpath = '//h3[text()="Checkboxes"]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  console.log('Header is displayed:', isDisplayed);

  //check checkbox1
  await page.check(firstCheckBox);

  var isChecked = await page.isChecked(firstCheckBox);
  // Assert that the checkbox is checked
  console.log('checkbox1 is checked:', isDisplayed);
  assert.strictEqual(isChecked, true, 'Checkbox should be checked');

  //uncheck checkbox2lastCheckBox);
  await page.uncheck(lastCheckBox);

  isChecked = await page.isChecked(lastCheckBox);
  // Assert that the checkbox is unchecked
  console.log('checkbox2 is checked:', isDisplayed);
  assert.strictEqual(isChecked, false, 'Checkbox should be unchecked');
})
