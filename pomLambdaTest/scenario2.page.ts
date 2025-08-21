import { Page, expect } from "@playwright/test";
import lambda from "../lambda.json";

export class Scenario2 {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async openDragAndDrop() {
    await this.page.getByRole("link", { name: "Drag & Drop Sliders" }).click();
    await expect(this.page).toHaveURL(/drag-drop-range-sliders-demo/);
    await this.page.getByText("Default value 1515").click();
    await this.page.locator("#slider3").getByRole("slider").fill("95");
    await expect(this.page.getByText("95")).toHaveText("95");
    await this.page.getByText("95").isVisible();
  }
}
