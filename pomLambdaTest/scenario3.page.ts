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
  }

  async submitEmptyFormAndValidateHTML5() {
    // Click submit to trigger validation
    await this.page.getByRole("button", { name: "Submit" }).click();

    // Wait for validation to appear
    await this.page.waitForTimeout(1000);

    // Get the first required field and check its validation message
    const firstRequiredField = this.page.locator("input[required]").first();
    const validationMessage = await firstRequiredField.evaluate(
      (element: HTMLInputElement) => element.validationMessage
    );

    console.log("Validation message:", validationMessage);
    expect(validationMessage).toBeTruthy(); // Just check that there is a validation message

    // Or check for specific message (common HTML5 messages)
    expect(validationMessage).toContain("Please fill in this field."); // or "Please fill out this field"
  }

  async fillForm() {
    await this.page.getByPlaceholder("Name", { exact: true }).fill(lambda.Name);
    await this.page
      .getByPlaceholder("Email", { exact: true })
      .fill(lambda.Email);
    await this.page.getByPlaceholder("Password").fill(lambda.Passwprd);
    await this.page.getByPlaceholder("Company").fill(lambda.Company);
    await this.page.getByPlaceholder("Website").fill(lambda.Website);
    await this.page.getByRole("combobox").selectOption("US");
    await this.page.getByPlaceholder("City").fill(lambda.City);
    await this.page.getByPlaceholder("Address 1").fill(lambda.Address);
    await this.page.getByPlaceholder("Address 2").fill(lambda.Address2);
    await this.page.getByPlaceholder("State").fill(lambda.State);
    await this.page.getByPlaceholder("Zip code").fill(lambda.Zip);
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.getByText("Thanks for contacting us, we").isVisible();
  }
}
