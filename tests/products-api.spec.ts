import { test, expect } from '@playwright/test';

test.describe('Automation Exercise - Practice API Suite', () => {
  const baseURL = 'https://automationexercise.com/api';

  test('GET: Fetch all products list and verify response', async ({ request }) => {
    // Send a GET request to the products list endpoint
    const response = await request.get(`${baseURL}/productsList`);

    // 1. Assert status code is 200 (Success)
    expect(response.status()).toBe(200);

    // 2. Parse the JSON body
    const body = await response.json();

    // 3. Assert response code inside JSON matches success
    expect(body.responseCode).toBe(200);

    // 4. Assert that the products list is not empty
    expect(body.products.length).toBeGreaterThan(0);
    
    // 5. Assert the first product has a name
    expect(body.products[0].name).toBeTruthy();
  });
});