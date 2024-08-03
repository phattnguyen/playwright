import { expect } from '@playwright/test';
const assert = require('assert');
import { Page } from 'playwright';

export class ConfirmationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyConfirmationMsgDisplay(){
    const thankyouMsgLocator = '//h2[text()="Thank you for your order!"]';
    const nofifyMsg = '//div[text()="Your order has been dispatched, and will arrive just as fast as the pony can get there!"]'; 

    await this.page.waitForSelector(thankyouMsgLocator);
    await this.page.waitForSelector(nofifyMsg);
  }
}