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

test.describe('How to find a locator', () => {

  test('Examples', async ({ page }) => {

    // by tag name
    page.locator('input')

    // by ID
    page.locator('#inputEmail1')

    // by Class value
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // by combine differents locators - Add one by one without any blank space
    page.locator('input[placeholder="Email"]#inputEmail1')

    // by XPath
    page.locator('//*[id="inputEmail1"]')

    // by particial text
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')

  });

})