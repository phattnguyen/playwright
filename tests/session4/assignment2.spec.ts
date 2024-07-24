import { test, expect } from '@playwright/test';
const assert = require('assert');

test.beforeEach(async ({page}) => {
    // Navigate to the URL before each test
    await page.goto('https://www.saucedemo.com/inventory.html');
});

test('test sort', async ({ page }) => {
    const selectSelector = '[class=product_sort_container]';

    await page.selectOption(selectSelector, { value: 'lohi' });

    const elements = await page.$$("div[data-test='inventory-item-price']");
    const textArray: number[] = [];
    for (const element of elements) {
        const text = await element.textContent();
        const numberAsText = text?.replace('$','') || '';

        console.log('text is ',numberAsText);

        textArray.push(parseFloat(numberAsText));
    }


    await console.log('array is: ', textArray);

    for (let i = 0; i < textArray.length - 1; i++) {
        expect(textArray[i] <= textArray[i+1]).toBeTruthy();
      }
})

test('test purchase', async ({ page }) => {
    const firstItem = '[class=inventory_item]:first-of-type >* button';
    const firstItemName = '[class=inventory_item]:first-of-type >* a > div[class="inventory_item_name "]';
    const shoppingCartBadge = 'a > span[class=shopping_cart_badge]';
    const checkOutButton = '[id=checkout]';
    const continueButton = '[id=continue]';
    const finishButton = '[id=finish]';

    const thankyouMsgLocator = '//h2[text()="Thank you for your order!"]';
    const nofifyMsg = '//div[text()="Your order has been dispatched, and will arrive just as fast as the pony can get there!"]'; 

    const firstItemNameText = await page.locator(firstItemName).textContent();   
    
    await console.log('item name is ',firstItemNameText);

    await page.locator(firstItem).click();

    const element = await page.locator(shoppingCartBadge);
    const numberOfItem = await element.textContent();

    assert.strictEqual(numberOfItem,'1','not match');

    await page.locator(shoppingCartBadge).click();

    await page.waitForSelector('//div[@class="cart_list"]//div[text()="'+firstItemNameText+'"]');

    await page.locator(checkOutButton).click();
    await page.getByPlaceholder('First Name').fill('Phat');
    await page.getByPlaceholder('Last Name').fill('Nguyen');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');

    await page.locator(continueButton).click();
    await page.locator(finishButton).click();

    await page.waitForSelector(thankyouMsgLocator);
    await page.waitForSelector(nofifyMsg);
})

                  