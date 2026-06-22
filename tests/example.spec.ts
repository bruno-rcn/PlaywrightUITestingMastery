import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Charts').click()
})

test('First example', async ({ page }) => {
  await page.getByText('Echarts').click()
});

test.describe('suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click()
  })

  test('First example', async ({ page }) => {
    await page.getByText('Form Layouts').click()
  });

  test('Second example', async ({ page }) => {
    await page.getByText('Datepicker').click()
  });

});