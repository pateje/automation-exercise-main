import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly addressDetailsHeader: Locator;
  readonly reviewOrderHeader: Locator;
  readonly commentTextArea: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressDetailsHeader = page.locator('text=Address Details');
    this.reviewOrderHeader = page.locator('text=Review Your Order');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a[href="/payment"]');
  }

  async verifyCheckoutDetails() {
    await expect(this.addressDetailsHeader).toBeVisible();
    await expect(this.reviewOrderHeader).toBeVisible();
  }

  async addCommentAndProceedToPayment(comment: string) {
    await this.commentTextArea.fill(comment);
    await this.placeOrderButton.click({ force: true });
  }
}