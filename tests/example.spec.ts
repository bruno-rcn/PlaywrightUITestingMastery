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

    // Best pratice is try to always use this way to locate elements

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

  test('Locating Child elements', async ({page}) => {
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

    // find the parent adding the child within the object has
    page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click()
    page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click()

    // using filter instead has. This way we can use the methods getBy...
    page.locator('nb-card').filter({hasText: 'Basic form'})

    page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click()
    
    page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('button').click()

    page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByLabel('Email').fill('test@tes.com')

    // up the DOM
    page.getByText('Using the Grid').locator('..').getByRole('button').click()
    
  })

  test('Reusing Locators', async ({ page }) => {
    // save the locators into a constant
    const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'})
    const passWordField = basicFormSection.getByLabel('Password')

    await basicFormSection.getByLabel('Email').fill('email@test.com')
    await passWordField.fill('playwright')
  })

  test('Extracting values', async ({page}) => {

    // Extracting text
    const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'})
    const submitButton = await basicFormSection.getByRole('button').textContent()
    //console.log(submitButton)
    expect(submitButton).toEqual('Submit')


    // Extracting multiples values
    const allRadioButton = await page.locator('nd-radio').allTextContents()
    //console.log(allRadioButton)
    expect(allRadioButton).toContain('Option 1')


    // Extracting input value
    const emailFiled = basicFormSection.getByRole('textbox', {name: 'Email'})
    await emailFiled.fill('test@test.com')
    const emailFiledTextValue = await emailFiled.inputValue()
    //console.log(emailFiledTextValue)
    expect(emailFiledTextValue).toEqual('test@test.com')


    // Extracting attr value
    const emailPlaceHolder = await emailFiled.getAttribute('placeholder')
    //console.log(emailPlaceHolder)

  })

  test('Assertions', async ({page}) => {

    // Generic assertion
    const value = 5
    expect(value).toEqual(5)

    // Locator assertion
    const basicFormSection = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button')
    await expect(basicFormSection).toHaveText('Submit')
    await expect(basicFormSection).toBeVisible()
    await expect(basicFormSection).toBeEnabled()
    await expect(basicFormSection).toHaveCount(1)

    // Soft assertion - Let the test keep going and into the report will be show that in this part the test failed
    await expect.soft(basicFormSection).toHaveText('Submit')

  })

  test('Wait for locator', async ({page}) => {

    // wait for element
    await page.getByRole('button', {name: 'Sign in'}).waitFor() // here we can add state: 'visible' or 'hidden' or 'attached' or 'detached'
    await page.waitForSelector('nb-card', {state: 'visible'})

    // wait for API response
    await page.waitForResponse('**/api/endpoint')

    // wait for load state (NOT RECOMMENDED) - The test will continue just when all network call are finished
    await page.waitForLoadState('load') // 'load' | 'domcontentloaded' | 'networkidle'

  })

  test('')

})
