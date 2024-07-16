import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test drag and drop', async ({ page }) => {
  const colA = '[id=column-a]';
  const colB = '[id=column-b]';
  const headerColA = colA + ' > header';
  const headerColB = colB + ' > header';

  await page.goto('https://the-internet.herokuapp.com/');

  // Expect a title "to contain" a substring.
  await page.click("a[href='/drag_and_drop']");

  // Wait for the element to be visible using XPath
  const xpath = '//h3[text()="Drag and Drop"]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  expect(isDisplayed).toBeTruthy;
  console.log('Header is displayed:', isDisplayed);

   await page.dragAndDrop(colA,colB);

   const headerColAElement= await page.waitForSelector(headerColA);
   const headerColBElement= await page.waitForSelector(headerColB);

  // Get the text content of the element
  const textContentColA = await headerColAElement.textContent();
  const textContentColB = await headerColBElement.textContent();

   // Expect the element to have specific text
   console.log('text is of column A: ', textContentColA);
   assert.strictEqual(textContentColA, 'B', 'it should be B');

   // Expect the element to have specific text
   console.log('text is of column B', textContentColB);
   assert.strictEqual(textContentColB, 'A', 'it should be A');
  })
