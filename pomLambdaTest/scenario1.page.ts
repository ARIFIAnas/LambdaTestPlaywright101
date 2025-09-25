import { Page, expect } from "@playwright/test";
import lambda from "../lambda.json";

export class Scenario1 {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openLambdaTest() {
    await this.page.goto(lambda.url, {
      timeout: 60000,
      waitUntil: "domcontentloaded",
    });

    await this.page.waitForTimeout(3000);

    // Click "Allow all" button for cookie consent
    try {
      await this.page
        .getByRole("button", { name: "Allow all" })
        .click({ timeout: 5000 });
      console.log("Clicked 'Allow all' button");
    } catch (error) {
      console.log("'Allow all' button not found, continuing...");
    }

    await this.page.waitForTimeout(1000);
  }

  async navigateInLambdaTest() {
    // Wait for the Simple Form Demo link
    await this.page.waitForSelector('a:has-text("Simple Form Demo")', {
      timeout: 15000,
    });

    await this.page.getByRole("link", { name: "Simple Form Demo" }).click();
    await expect(this.page).toHaveURL(/simple-form-demo/);

    // Wait for the message input field
    await this.page.waitForSelector('input[placeholder*="Message"]', {
      timeout: 15000,
    });

    // Store the input message for later verification
    const inputMessage = lambda.WelcomeText;

    await this.page.getByPlaceholder("Please enter your Message").click();
    await this.page
      .getByPlaceholder("Please enter your Message")
      .fill(inputMessage);

    // Verify the input field contains what we typed
    const inputValue = await this.page
      .getByPlaceholder("Please enter your Message")
      .inputValue();
    expect(inputValue).toBe(inputMessage);

    await this.page.getByRole("button", { name: "Get Checked Value" }).click();

    // Wait for result
    await this.page.waitForTimeout(2000);

    // Check that result element exists and is visible
    await expect(this.page.getByText(lambda.WelcomeText)).toBeVisible({
      timeout: 10000,
    });
  }
}
