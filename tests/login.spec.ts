import { test, expect } from '../Fixtures/fixtures';
import { loadLoginData } from '../utils/dataLoader';

const loginData = loadLoginData();

test.describe('Demo Web Shop - Login Tests', () => {

  test('Valid login using seeded credentials', { tag: ['@smoke', '@regression'] }, async ({ page, loginPage, homePage }) => {
    const seededUser = loginData.validUsers[0];

    await loginPage.goto();
    await loginPage.login(seededUser.email, seededUser.password);
    await page.waitForURL(/\/$/);

    await expect(homePage.accountLabel).toContainText(seededUser.email);
  });

  for (const user of loginData.validUsers) {
    test(`Valid login for ${user.email}`, { tag: '@smoke' }, async ({ page, loginPage, homePage }) => {
      await loginPage.goto();
      await loginPage.login(user.email, user.password);
      await page.waitForURL(/\/$/);

      await expect(homePage.accountLabel).toContainText(user.email);
    });
  }

  for (const user of loginData.invalidUsers) {
    test(`Invalid login for ${user.email}`, { tag: ['@regression', '@sanity'] }, async ({ page, loginPage }) => {
      await loginPage.goto();
      await loginPage.login(user.email, user.password);

      await expect(page).toHaveURL(/login/);
      await expect(loginPage.errorMessage).toContainText(/Login was unsuccessful|Please enter a valid email address/i);
    });
  }

  test('Login with empty fields', { tag: '@sanity' }, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(loginData.emptyFields.email, loginData.emptyFields.password);

    await expect(loginPage.errorMessage).toContainText(/Login was unsuccessful|Please enter a valid email address/i);
  });

  test('Remember me login option is available', { tag: '@regression' }, async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.rememberMeCheckbox).toBeVisible();
  });

  test('Forgot password navigation', { tag: '@regression' }, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();

    await expect(page).toHaveURL(/passwordrecovery/);
  });

});
