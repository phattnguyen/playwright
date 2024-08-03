import { expect } from '@playwright/test';
import { resolve } from 'path';
import { Page } from 'playwright';
const assert = require('assert');

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

     firstItem : string = '[class=inventory_item]:first-of-type >* button';
     firstItemName: string = '[class=inventory_item]:first-of-type >* a > div[class="inventory_item_name "]';
     shoppingCartBadge: string = 'a > span[class=shopping_cart_badge]';
     checkOutButton: string = '[id=checkout]';
     continueButton: string = '[id=continue]';
     finishButton: string = '[id=finish]';
     thankyouMsgLocator: string = '//h2[text()="Thank you for your order!"]';
     nofifyMsg: string = '//div[text()="Your order has been dispatched, and will arrive just as fast as the pony can get there!"]'; 

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

  async addFirstToCart(){
    const firstItemNameText = await this.page.locator(this.firstItemName).textContent();   
    await console.log('item name is ',firstItemNameText);
    await this.page.locator(this.firstItem).click();
  }

  async clickShoppingCart(){
    await this.page.locator(this.shoppingCartBadge).click();
  }

  async verifyShoppingCartNumber(noOfProd : string){
    const element = await this.page.locator(this.shoppingCartBadge);
    const numberOfItem = await element.textContent();

    assert.strictEqual(numberOfItem,noOfProd,'not match');
  }

  async getFirstProductNsme(): Promise<string> {
    return new Promise<string>((resolve,reject)=>{
      setTimeout(async()=>{
    const firstItemNameText = await this.page.locator(this.firstItemName).textContent();

        resolve(firstItemNameText||'')
      })
    })
  }
}