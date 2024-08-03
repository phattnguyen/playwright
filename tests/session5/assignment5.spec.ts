import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory.page';
import { ConfirmationPage } from '../../pages/confirmation.page';
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';
import { CheckoutPage } from '../../pages/checkout.page';
const assert = require('assert');


test('test login POM', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.login('locked_out_user','secret_sauce');
    await homePage.verifyLoginFailed();
})

test('test purchase POM', async ({ page }) => {
    const homePage = new HomePage(page);

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await homePage.navigate();
    await homePage.login('standard_user','secret_sauce');

    await inventoryPage.addFirstToCart();

    await inventoryPage.verifyShoppingCartNumber('1');
    const firstProductName = await inventoryPage.getFirstProductNsme();

    await inventoryPage.clickShoppingCart();

    await cartPage.verifyShoppingCartInfo(firstProductName);
    await cartPage.clickCheckoutButton();

    await checkoutPage.fulfillUserInfo('Phat','Nguyen','12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.verifyItemDisplay
    await checkoutPage.clickFinishButton();

    await confirmationPage.verifyConfirmationMsgDisplay();
})

                  