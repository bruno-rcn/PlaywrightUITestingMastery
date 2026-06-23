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

  test('User facing locators', async ({page}) => {

    // input field - 
    page.getByRole('textbox', {name: 'Email'})

    // button
    page.getByRole('button', {name: 'Sign in'})

    // by label - this label is placed above the locator that you wanna save
    page.getByLabel('Email')

    // Placeholder
    page.getByPlaceholder('Jane Doe')

    // by title - is an attribute
    page.getByTitle('IoT Dashboard')

    // by TestId - this is an attribute config with focus to the script automation. Into the dev conde: data-testid="aut"
    page.getByTestId('aut')

  })

  test('Child elements', async ({page}) => {
    // Just add the next attribute following the DOM
    page.locator('nb-card nb-radio :text-is("Option 1")')

    // one by one
    page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")')

    // combine with oage locator
    page.locator('nb-card').getByRole('button', {name: 'Sign in'})

    // by index - try to avoid this one
    page.locator('nb-card').nth(3)

  })

  test('Parents locators', async ({page}) => {

    // find the parent adding the child inside the object has
    page.locator('nb-card', {hasText: 'Using the Grid'})
    page.locator('nb-card', {has: page.locator('#inputEmail1')})

    // using filter instead has. This way we can use the methods getBy...
    page.locator('nb-card').filter({hasText: 'Basic form'})
    page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('button')
  })

})