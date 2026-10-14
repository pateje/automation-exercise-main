import { Page, Locator, expect } from '@playwright/test';

export interface AccountDetails {
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class SignupLoginPage {
  readonly page: Page;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly accountCreatedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipCodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountCreatedHeader = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountDetails(details: AccountDetails) {
    // Use Playwright's semantic getByRole for reliable radio selection
    await this.page.getByRole('radio', { name: 'Mr.' }).click({ force: true });
    await this.passwordInput.fill(details.password);
    
    await this.daysSelect.selectOption('10');
    await this.monthsSelect.selectOption('May');
    await this.yearsSelect.selectOption('1992');

    await this.firstNameInput.fill(details.firstname);
    await this.lastNameInput.fill(details.lastname);
    await this.addressInput.fill(details.address);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipCodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobileNumber);

    await this.createAccountButton.click({ force: true });
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async continueToHome() {
    await this.continueButton.click();
  }

  async verifyLoggedInAs(username: string) {
    const loggedInHeader = this.page.locator(`text=/Logged in as ${username}/i`);
    await expect(loggedInHeader).toBeVisible();
  }
}