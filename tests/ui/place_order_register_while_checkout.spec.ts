import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { PaymentPage } from '../../pages/PaymentPage';

test.describe('Automation Exercise - E2E Place Order Scenarios (POM)', () => {
  test('Test Case 14: Place Order - Register while Checkout', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    // 1 & 2. Navigate and add product to cart
    await homePage.navigate();
    await homePage.addFirstProductToCart();
    await homePage.openCartFromModal();

    // 3 & 4. Verify cart and proceed to checkout
    await cartPage.verifyCartPageLoaded();
    await cartPage.proceedToCheckout();

    // 5 & 6. Click Register/Login modal link and register a new user on the fly
    await cartPage.clickRegisterLoginFromModal();
    const uniqueSuffix = Date.now();
    const testEmail = `qa.user.${uniqueSuffix}@example.com`;
    await signupLoginPage.signup('Checkout TestUser', testEmail);

    // 7. Complete full registration details
    await signupLoginPage.fillAccountDetails({
      password: 'Password123!',
      firstname: 'Checkout',
      lastname: 'Tester',
      address: '123 Test Avenue',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '5550198234'
    });

    // 8 & 9. Verify account creation and successful login header
    await signupLoginPage.verifyAccountCreated();
    await signupLoginPage.continueToHome();
    await signupLoginPage.verifyLoggedInAs('Checkout TestUser');

    // 10 & 11. Go back to cart, proceed to checkout, review, and place order
    await homePage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyCheckoutDetails();
    await checkoutPage.addCommentAndProceedToPayment('Please leave package at front door.');

    // 12 & 13. Enter payment and verify success
    await paymentPage.fillPaymentDetails({
      nameOnCard: 'Checkout Tester',
      cardNumber: '4111222233334444',
      cvc: '311',
      expiryMonth: '12',
      expiryYear: '2028'
    });
    await paymentPage.verifyOrderSuccess();

    // 14. Clean up account
    await paymentPage.deleteAccount();
  });
});