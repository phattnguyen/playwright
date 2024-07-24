import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
const assert = require('assert');

test.beforeEach(async ({page}) => {
    // Navigate to the URL before each test
    await page.goto('https://the-internet.herokuapp.com/');
});


test.skip('test check boxes', async ({ page }) => {
  const firstCheckBox = 'form > input:first-child';
  const lastCheckBox = 'form > input:last-child';

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


test('test drag and drop', async ({ page }) => {
    const colA = '[id=column-a]';
    const colB = '[id=column-b]';
    const headerColA = colA + ' > header';
    const headerColB = colB + ' > header';
    
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


    test.fail('test drop down', async ({ page }) => {
        const selectSelector = '[id=dropdown]';
        const selectedSelector = selectSelector + ' > option[selected]';
            
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


        test('test upload',{ tag: ['@regression'] } ,async ({ page }) => {
            const fileName = 'playwright_file_upload.txt';
            const filePath = './upload/' + fileName;
            const fileInputSelector = 'input[id="file-upload"]';
            const fileSubmitButton = 'input[id="file-submit"]';
            const uploadedFileXpath = '//div[@id="uploaded-files" and contains(text(),"'+fileName+'")]';
                    
            // Expect a title "to contain" a substring.
            await page.pause();
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


   
          test('test dynamic', async ({ page }) => {
            const example1Locator = 'a[href="/dynamic_loading/1"]';
            const startButtonLocator = 'div[id="start"] > button';
          
            const notLoadingStatusLocator = '//div[@id="loading" and @style="display: none;"]';
            const loadingStatusLocator = '//div[@id="loading" and not(@style="display: none;")]';
          
            const helloWorldLocator = "div[id='finish']>h4";
                    
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
                  