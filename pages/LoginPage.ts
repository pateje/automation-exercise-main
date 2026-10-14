import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using data-qa attributes which are stable on Automation Exercise
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/login', {
      waitUntil: 'domcontentloaded',
    });
  }

  async login(email: string, pass: string) {
    // Ensure the input field is visible and ready before interaction
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
    
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(pass);
    
    await this.loginButton.click({ force: true });
  }
}