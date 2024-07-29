import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async clickSort(value: string) {
    await this.page.selectOption('[class=product_sort_container]', { value: value });
  }

  async verifyProductSorted(){
    const elements = await this.page.$$("div[data-test='inventory-item-price']");
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
  }
}