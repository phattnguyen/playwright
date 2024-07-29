import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { PurchasePage } from '../../pages/purchase.page';
const assert = require('assert');



test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
});

test('test POM', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.clickSort('lohi')
    await homePage.verifyProductSorted();
})

test('test purchase', async ({ page }) => {
    const purchasePage = new PurchasePage(page);
    await purchasePage.purchaseFirstItem();
})

                  