import { expect } from '@playwright/test';
const assert = require('assert');
import { Page } from 'playwright';

export class PurchasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async purchaseFirstItem(){
    const firstItem = '[class=inventory_item]:first-of-type >* button';
    const firstItemName = '[class=inventory_item]:first-of-type >* a > div[class="inventory_item_name "]';
    const shoppingCartBadge = 'a > span[class=shopping_cart_badge]';
    const checkOutButton = '[id=checkout]';
    const continueButton = '[id=continue]';
    const finishButton = '[id=finish]';

    const thankyouMsgLocator = '//h2[text()="Thank you for your order!"]';
    const nofifyMsg = '//div[text()="Your order has been dispatched, and will arrive just as fast as the pony can get there!"]'; 

    const firstItemNameText = await this.page.locator(firstItemName).textContent();   
    
    await console.log('item name is ',firstItemNameText);

    await this.page.locator(firstItem).click();

    const element = await this.page.locator(shoppingCartBadge);
    const numberOfItem = await element.textContent();

    assert.strictEqual(numberOfItem,'1','not match');

    await this.page.locator(shoppingCartBadge).click();

    await this.page.waitForSelector('//div[@class="cart_list"]//div[text()="'+firstItemNameText+'"]');

    await this.page.locator(checkOutButton).click();
    await this.page.getByPlaceholder('First Name').fill('Phat');
    await this.page.getByPlaceholder('Last Name').fill('Nguyen');
    await this.page.getByPlaceholder('Zip/Postal Code').fill('12345');

    await this.page.locator(continueButton).click();
    await this.page.locator(finishButton).click();

    await this.page.waitForSelector(thankyouMsgLocator);
    await this.page.waitForSelector(nofifyMsg);
  }
}