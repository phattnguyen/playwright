import { expect } from '@playwright/test';
import { Page } from 'playwright';
const assert = require('assert');

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  continueButton = '[id=continue]';
  finishButton = '[id=finish]';


  async fulfillUserInfo(firstName, lastName, zipCode){
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
  }

  async clickContinueButton(){
    await this.page.locator(this.continueButton).click();
  }

  async clickFinishButton(){
    await this.page.locator(this.finishButton).click();
  }

  async verifyItemDisplay(itemName){
    const itemLocator = '//div[@class="inventory_item_name" and text()="'+itemName+'"]';
    expect(this.page.locator(itemLocator).isVisible).toBe(true);

  }
}