import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly accountLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountLabel = page.locator('a.account').filter({ hasText: /@/ });
  }

  /**
   * Returns the currently displayed logged-in account label text.
   */
  async getLoggedInUser() {
    return await this.accountLabel.first().textContent();
  }

  /**
   * Verifies that the logged-in user account matches the expected email.
   * @param email - The expected email address for the logged-in user.
   */
  async assertLoggedInUser(email: string) {
    try {
      await expect(this.accountLabel.first()).toBeVisible();
      await expect(this.accountLabel.first()).toContainText(email);
    } catch (error) {
      throw new Error(`User account assertion failed for '${email}': ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
