import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Import Faker

test.describe('API 7 - POST with valid details', () => {
  const baseURL = 'https://automationexercise.com/api';

  test('POST: Create a user with completely randomized Faker data', async ({ request }) => {
    
    // Generate realistic random data using Faker
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomEmail = faker.internet.email({ firstName: randomFirstName, lastName: randomLastName });
    const randomPassword = faker.internet.password({ length: 12 });

    const dynamicUserPayload = {
      name: `${randomFirstName} ${randomLastName}`,
      email: randomEmail,
      password: randomPassword,
      title: 'Mr',
      birth_date: '10',
      birth_month: 'January',
      birth_year: '1990',
      firstname: randomFirstName,
      lastname: randomLastName,
      address1: faker.location.streetAddress(),
      country: 'United States',
      zipcode: faker.location.zipCode(),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number()
    };

    // Send the POST request to create the account
    const response = await request.post(`${baseURL}/createAccount`, {
      form: dynamicUserPayload,
    });

    // Assertions
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('User created!');

    // Cleanup: Delete the account immediately after creating it
    await request.delete(`${baseURL}/deleteAccount`, {
      form: {
        email: randomEmail,
        password: randomPassword,
      },
    });
  });
});