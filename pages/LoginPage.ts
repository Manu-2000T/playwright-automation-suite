import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.loginButton = page.locator('input[value="Log in"]');
    this.errorMessage = page.getByText(/Login was unsuccessful|Please enter a valid email address/i);
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.rememberMeCheckbox = page.getByLabel('Remember me?');
  }

  /**
   * Navigates to the login page.
   */
  async goto() {
    await this.page.goto('/login');
  }

  /**
   * Fills in the credentials and submits the login form.
   * @param email - The email address to use for login.
   * @param password - The password to use for login.
   */
  async login(email: string, password: string) {
    try {
      await expect(this.emailInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.loginButton).toBeEnabled();

      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);

      await expect(this.emailInput).toHaveValue(email);
      await expect(this.passwordInput).toHaveValue(password);

      await this.loginButton.click();
    } catch (error) {
      throw new Error(`Login attempt failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Verifies that the login error message is shown with the expected text.
   * @param expectedText - The text or regex expected in the error message.
   */
  async assertErrorVisible(expectedText: string | RegExp) {
    try {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toContainText(expectedText);
    } catch (error) {
      throw new Error(`Expected login error message not found: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
