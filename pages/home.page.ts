import { expect } from '@playwright/test';
import { assert } from 'console';
import { Page } from 'playwright';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  homePageUrl = 'https://www.saucedemo.com/';

  //Locators
  loginButton = '[id="login-button"]';
  errorMsg = '//h3[text()="Epic sadface: Sorry, this user has been locked out."]'


  async navigate() {
    await this.page.goto(this.homePageUrl);
  }
  
  async login(user : string, password : string){
    await this.page.getByPlaceholder('Username').fill(user);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyLoginFailed(){
    const textContent = await this.page.textContent('body');
    expect(textContent).toContain('Epic sadface: Sorry, this user has been locked out.');
  }

}