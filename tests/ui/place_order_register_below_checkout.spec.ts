import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { PaymentPage } from '../../pages/PaymentPage';

test.describe('Automation Exercise - E2E Place Order Scenarios (POM)', () => {
  test('Test Case 15: Place Order - Register before Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    const timestamp = Date.now();
    const email = `qa.user.${timestamp}@example.com`;

    // 1. Navigate to home page and verify load
    await homePage.goto();
    await homePage.verifyHomePageLoaded();

    // 2. Register/Login before shopping
    await homePage.clickSignupLogin();
    await signupLoginPage.signup('PreCheckout User', email);

    await signupLoginPage.fillAccountDetails({
      password: 'SecurePassword123',
      firstname: 'PreCheckout',
      lastname: 'User',
      address: '456 Automation Ave',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode: '94107',
      mobileNumber: '9876543210',
    });

    await signupLoginPage.verifyAccountCreated();
    await signupLoginPage.continueToHome();
    await signupLoginPage.verifyLoggedInAs('PreCheckout User');

    // 3. Add product to cart and proceed to checkout
    await homePage.addProductToCart(0);
    await homePage.openCartFromModal();

    await cartPage.verifyCartPageLoaded();
    await cartPage.proceedToCheckout();

    // 4. Checkout and complete payment
    await checkoutPage.verifyCheckoutDetails();
    await checkoutPage.addCommentAndProceedToPayment('Fast delivery requested.');

    await paymentPage.fillPaymentDetails({
      nameOnCard: 'PreCheckout User',
      cardNumber: '4242424242424242',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2026',
    });

    await paymentPage.verifyOrderSuccess();
    await paymentPage.deleteAccount();
  });
});