import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test drop down', async ({ page }) => {
  const selectSelector = '[id=dropdown]';
  const selectedSelector = selectSelector + ' > option[selected]';

  await page.goto('https://the-internet.herokuapp.com/');

  // Expect a title "to contain" a substring.
  await page.click("a[href='/dropdown']");

  // Wait for the element to be visible using XPath
  const xpath = '//h3[text()="Dropdown List"]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  expect(isDisplayed).toBeTruthy;
  console.log('Header is displayed:', isDisplayed);
 
   // Select the option by label
  const optionLabel = 'Option 2';
  await page.selectOption(selectSelector, { label: optionLabel });

  // Verify selected value
  var selectedValue = await page.$eval(selectedSelector, (element) => element.textContent);
  console.log('selected value is: ',selectedValue);
  assert.strictEqual(selectedValue,'Option 2');


  // Select the option by index
  const optionIndex = 1;
  await page.selectOption(selectSelector, { index: optionIndex });

  // Verify selected value
  selectedValue = await page.$eval(selectedSelector, (element) => element.textContent);
  console.log('selected value is: ',selectedValue);
  assert.strictEqual(selectedValue,'Option 1');

   // Select the option by value
  const optionValue = '2';
  await page.selectOption(selectSelector, { value: optionValue });

  // Verify selected value
  selectedValue = await page.$eval(selectedSelector, (element) => element.textContent);
  console.log('selected value is: ',selectedValue);
  assert.strictEqual(selectedValue,'Option 2');

  })
