import {Page, Browser, chromium } from '@playwright/test';

async function globalSetup(){
  const loginButton = '[id="login-button"]';

  const browser: Browser = await chromium.launch({headless:false});
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator(loginButton).click();
  await page.context().storageState({path : "./auth.json"});

  await browser.close();
}

export default globalSetup;