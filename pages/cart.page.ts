import { expect } from '@playwright/test';
import { Page } from 'playwright';
const assert = require('assert');

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  checkoutButton = '[id=checkout]';
  
  async verifyShoppingCartInfo(prodName : String){
    await console.log('item name is ',prodName);
    await this.page.waitForSelector('//div[@class="cart_list"]//div[text()="'+prodName+'"]');
  }

  async clickCheckoutButton(){
    await this.page.locator(this.checkoutButton).click();
  }
}