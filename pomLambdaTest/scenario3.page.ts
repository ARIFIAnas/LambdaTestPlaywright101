import { Page, expect } from "@playwright/test";
import lambda from "../lambda.json";

export class Scenario3 {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openInputFormSubmit() {
    await this.page.getByRole("link", { name: "Input Form Submit" }).click();
    await expect(this.page).toHaveURL(/input-form-demo/);
    await expect(
      this.page.getByRole("heading", { name: "Form Demo" })
    ).toBeVisible();
  }

  async fillForm() {
    // Fill form fields with proper waits
    await this.page.getByPlaceholder("Name", { exact: true }).fill(lambda.Name);
    await this.page.waitForTimeout(500); // Small delay between fields

    await this.page
      .getByPlaceholder("Email", { exact: true })
      .fill(lambda.Email);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("Password").fill(lambda.Passwprd);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("Company").fill(lambda.Company);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("Website").fill(lambda.Website);
    await this.page.waitForTimeout(500);

    // Wait for dropdown to be ready
    await this.page.selectOption('select[name="country"]', "US");
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("City").fill(lambda.City);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("Address 1").fill(lambda.Address);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("Address 2").fill(lambda.Address2);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("State").fill(lambda.State);
    await this.page.waitForTimeout(500);

    await this.page.getByPlaceholder("Zip code").fill(lambda.Zip);
    await this.page.waitForTimeout(1000);

    // Submit the form
    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
