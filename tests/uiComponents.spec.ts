import { test, expect } from '@playwright/test';

test.describe('Form Layouts page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({page}) => {

        // How to write something
        const theGridInputEmail = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await theGridInputEmail.fill('test@test.com') // This will click, clear and writhe into the input field
        await theGridInputEmail.clear()
        await theGridInputEmail.pressSequentially('slow@typing.com', {delay: 700})

        // Extract values
        const inputValue = await theGridInputEmail.inputValue()

        // Assertion
        await expect(theGridInputEmail).toHaveValue('slow@typing.com')
    })
    
})