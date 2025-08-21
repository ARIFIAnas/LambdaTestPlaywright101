import { Page, expect } from "@playwright/test";
import lambda from "../lambda.json";

export class Scenario1 {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async openLambdaTest() {
    //Open LambdaTest selenium
    await this.page.goto(lambda.url);
    await this.page.getByRole("button", { name: "Allow selection" }).click();
  }
  async navigateInLambdaTest() {
    await this.page.getByRole("link", { name: "Simple Form Demo" }).click();
    await expect(this.page).toHaveURL(/simple-form-demo/);
    await this.page.getByPlaceholder("Please enter your Message").click();
    await this.page
      .getByPlaceholder("Please enter your Message")
      .fill(lambda.WelcomeText);
    await this.page.getByRole("button", { name: "Get Checked Value" }).click();
    await this.page.getByRole("button", { name: "Get Checked Value" }).click();
    await this.page
      .locator("div")
      .filter({ hasText: /^Your Message: Welcome to LambdaTesT$/ })
      .first()
      .isVisible();
  }
}
