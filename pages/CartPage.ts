import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly shoppingCartHeading: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginModalLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartHeading = page.locator('text=Shopping Cart');
    this.proceedToCheckoutButton = page.locator('text=Proceed To Checkout');
    this.registerLoginModalLink = page.locator('u:has-text("Register / Login")');
  }

  async verifyCartPageLoaded() {
    await expect(this.shoppingCartHeading).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click({ force: true });
  }

  async clickRegisterLoginFromModal() {
    await this.registerLoginModalLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.registerLoginModalLink.click({ force: true });
  }
}