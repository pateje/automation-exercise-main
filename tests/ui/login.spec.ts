import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Automation Exercise - UI Login Tests (POM)', () => {
  test('User can successfully log in using hardcoded credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Navigate to the login page
    await loginPage.navigate();

    // 2. Perform login with your registered test account credentials
    await loginPage.login('qa.testuser+automation@gmail.com', 'TestAutomation300!');

    // 3. Assert that the "Logged in as" banner is visible
    const loggedInHeader = page.locator('text=/Logged in as/i');
    await expect(loggedInHeader).toBeVisible({ timeout: 10000 });
  });
});