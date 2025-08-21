import { test, expect } from "@playwright/test";
import { Scenario1 } from "../pomLambdaTest/scenario1.page";
import { Scenario2 } from "../pomLambdaTest/scenario2.page";
import { Scenario3 } from "../pomLambdaTest/scenario3.page";
import { time } from "console";

test("Test Scenario 1", async ({ page }) => {
  const scenario1 = new Scenario1(page);
  await scenario1.openLambdaTest();
  await scenario1.navigateInLambdaTest();
});

test("Test Scenario 2", async ({ page }) => {
  const scenario1 = new Scenario1(page);
  const scenario2 = new Scenario2(page);
  await scenario1.openLambdaTest();
  await scenario2.openDragAndDrop();
});

test("Test Scenario 3", async ({ page }) => {
  const scenario1 = new Scenario1(page);
  const scenario3 = new Scenario3(page);
  await scenario1.openLambdaTest();
  await scenario3.openInputFormSubmit();
  await scenario3.submitEmptyFormAndValidateHTML5();
  await scenario3.fillForm();
});
