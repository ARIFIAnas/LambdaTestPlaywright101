import { Page, expect } from "@playwright/test";
import lambda from "../lambda.json";

export class Scenario2 {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openDragAndDrop() {
    // Handle cookie consent if needed (in case this runs independently)
    try {
      await this.page
        .getByRole("button", { name: "Allow all" })
        .click({ timeout: 2000 });
      console.log("✅ Clicked 'Allow all' button in scenario2");
      await this.page.waitForTimeout(1000);
    } catch (error) {
      // Button not present, continue
    }

    // Wait for the Drag & Drop link and click it
    await this.page.waitForSelector('a:has-text("Drag & Drop Sliders")', {
      timeout: 15000,
    });
    await this.page.getByRole("link", { name: "Drag & Drop Sliders" }).click();

    await expect(this.page).toHaveURL(/drag-drop-range-sliders-demo/);

    // Wait for the slider elements to load
    await this.page.waitForSelector("#slider3", { timeout: 10000 });

    // Click on the text that shows "Default value 1515"
    await this.page.getByText("Default value 1515").click();

    // Set the slider value to 95
    await this.page.locator("#slider3").getByRole("slider").fill("95");

    // Wait for the value to update
    await this.page.waitForTimeout(1000);

    // Verify the value shows 95
    await expect(this.page.getByText("95")).toHaveText("95");
    await this.page.getByText("95").isVisible();

    console.log("✅ Drag & Drop slider test completed successfully");
  }
}
