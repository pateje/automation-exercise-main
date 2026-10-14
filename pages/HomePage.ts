import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly firstProduct: Locator;
  readonly addToCartButton: Locator;
  readonly signUpLoginLink: Locator;
  readonly viewCartModalLink: Locator;
  readonly cartHeaderLink: Locator;
  readonly consentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProduct = page.locator('.single-products').first();
    this.addToCartButton = this.firstProduct.locator('.add-to-cart');
    this.signUpLoginLink = page.locator('a[href="/login"]');
this.viewCartModalLink = page.locator('#cartModal').getByText('View Cart');

    this.cartHeaderLink = page.locator('header a[href="/view_cart"]');
    // Common selector for consent/privacy overlay buttons if present
    this.consentButton = page.locator('button.fc-cta-consent, .fc-button-label:has-text("Consent")');
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async verifyHomePageLoaded() {
    await expect(this.page).toHaveURL('https://automationexercise.com/');
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click({ force: true });
  }

  

  async addProductToCart(index: number = 0) {
    const product = this.page.locator('.product-image-wrapper').nth(index);
    await product.hover();
    const addToCartBtn = product.locator('.add-to-cart').first();
    await addToCartBtn.click({ force: true });
  }


  async navigate() {
    await this.page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    
    // Dismiss consent overlay if it appears to prevent click interception
    if (await this.consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.consentButton.click().catch(() => {});
    }
  }

  async addFirstProductToCart() {
    await this.firstProduct.hover();
    await this.addToCartButton.first().click({ force: true });
  }

  async openCartFromModal() {
    await this.viewCartModalLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.viewCartModalLink.click({ force: true });
  }

  async openCart() {
    await this.cartHeaderLink.click();
  }
}