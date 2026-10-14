import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Automation Exercise - User API Negative & Method Validation Tests', () => {
  const baseURL = 'https://automationexercise.com/api';

  test('POST: Verify login fails when email parameter is missing (API 8)', async ({ request }) => {
    const response = await request.post(`${baseURL}/verifyLogin`, {
      form: {
        password: 'SomePassword123',
        // email is intentionally omitted
      },
    });

    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });

  test('DELETE: Verify invalid HTTP method on verifyLogin endpoint (API 9)', async ({ request }) => {
    // Send a DELETE request instead of POST to the login route
    const response = await request.delete(`${baseURL}/verifyLogin`);

    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  test('POST: Verify login fails with non-existent/invalid details (API 10)', async ({ request }) => {
    // Generate a completely random fake user that definitely hasn't been created
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    const response = await request.post(`${baseURL}/verifyLogin`, {
      form: {
        email: fakeEmail,
        password: fakePassword
      },
    });

    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });
});