import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Inline form', async ({page}) => {
    
    // Identify the locators
    const inlineForm = page.locator('.form-inline')
    const nameInput = inlineForm.getByPlaceholder('Jane Doe')
    const emailInput = inlineForm.getByPlaceholder('Email')
    const checkboxRememberMe = inlineForm.getByRole('checkbox', {name: 'Remember me'})
    const submitButton = inlineForm.getByRole('button', {name: 'Submit'})

    // Faker
    const fullNameFaker = faker.person.fullName()
    const emailFaker = faker.internet.email()

    // Submit the form
    await nameInput.fill(fullNameFaker)
    await emailInput.fill(emailFaker)
    await checkboxRememberMe.check({force: true})
    await submitButton.click()

    // Assertion
    await expect(nameInput).toHaveValue(fullNameFaker)
    await expect(emailInput).toHaveValue(emailFaker)
    await expect(checkboxRememberMe).toBeChecked()
})

test('Using the Grid', async ({page}) => {
    // Identify the locators    
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
    const emailInput = usingTheGridForm.getByRole('textbox', {name: "Email"})
    const passwordInput = usingTheGridForm.getByRole('textbox', {name: "Password"})
    const radioButtonOption1 = usingTheGridForm.getByRole('radio', {name: "Option 1"})
    const radioButtonOption2 = usingTheGridForm.getByRole('radio', {name: "Option 2"})
    const radioButtonDisableOption = usingTheGridForm.getByRole('radio', {name: "Disabled Option"})
    const signinButton = usingTheGridForm.getByRole('button', {name: "Sign in"})

    // Faker
    const emailFaker = faker.internet.email()
    const passwordFaker = faker.internet.password()

    // Submit the form
    await emailInput.fill(emailFaker)
    await passwordInput.fill(passwordFaker)
    await radioButtonOption1.check({force: true})
    await signinButton.click()

    // Assertion
    await expect(emailInput).toHaveValue(emailFaker)
    await expect(passwordInput).toHaveValue(passwordFaker)
    await expect(radioButtonOption1).toBeChecked()
    await expect(radioButtonOption2).not.toBeChecked()
    await expect(radioButtonDisableOption).toBeDisabled()
})


test('Basic form', async ({page}) => {

    // Identify the locators
    const basicForm = page.locator('nb-card', {hasText: "Basic form"})
    const emailAddressInput = basicForm.getByPlaceholder('Email')
    const passwordInput = basicForm.locator('#exampleInputPassword1')
    const checkBoxCheckMeOut = basicForm.getByRole('checkbox', {name: 'Check me out'})
    const buttonSubmit = basicForm.getByRole('button', {name: 'Submit'})

    // Faker    
    const emailFaker = faker.internet.email()
    const passwordFaker = faker.internet.password()

    // Submit the form
    await emailAddressInput.fill(emailFaker)
    await passwordInput.fill(passwordFaker)
    await checkBoxCheckMeOut.check({force: true})
    await buttonSubmit.click()

    // Assertion
    await expect(emailAddressInput).toHaveValue(emailFaker)
    await expect(passwordInput).toHaveValue(passwordFaker)

})

