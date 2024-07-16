import { test, expect } from '@playwright/test';
const assert = require('assert');


test('test upload', async ({ page }) => {
  const fileName = 'playwright_file_upload.txt';
  const filePath = './upload/' + fileName;
  const fileInputSelector = 'input[id="file-upload"]';
  const fileSubmitButton = 'input[id="file-submit"]';
  const uploadedFileXpath = '//div[@id="uploaded-files" and contains(text(),"'+fileName+'")]';

  await page.goto('https://the-internet.herokuapp.com/');

  // Expect a title "to contain" a substring.
  await page.click("a[href='/upload']");

  // Wait for the element to be visible using XPath
  const xpath = '//h3[text()="File Uploader"]';
  await page.waitForSelector(xpath);

  // Verify if the element is displayed
  const isDisplayed = await page.isVisible(xpath);
  expect(isDisplayed).toBeTruthy;
  console.log('Header is displayed:', isDisplayed);
 
  // Select
  const fileInputEle = await page.waitForSelector(fileInputSelector);
  await fileInputEle.setInputFiles(filePath);
  await page.locator(fileSubmitButton).click();

  // Verify file uploaded
  await page.waitForSelector(uploadedFileXpath, {timeout : 5000});
})
