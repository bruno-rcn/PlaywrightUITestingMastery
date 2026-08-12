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

    test('Radio buttons', async ({page}) => {
        // Radio button is a input filed with propertie type=radio

        // Parent locator
        const theGridInputEmail = page.locator('nb-card', {hasText: "Using the Grid"})

        // await theGridInputEmail.getByLabel('Option 1').check({force: true}) // use the force because we have a class=visually-hidden and to the check works we need the field visible. When use force true disable PW autowaiting
        await theGridInputEmail.getByRole('radio', {name: "Option 2"}).check({force: true})

        // Assertion
        const radioStatus = await theGridInputEmail.getByRole('radio', {name: "Option 2"}).isChecked() // return true or false
        expect(radioStatus).toBeTruthy() // generic assertion because we are using the boolean return and not the own locator
        // expect(radioStatus).toBeFalsy()

        await expect(theGridInputEmail.getByLabel('Option 1')).not.toBeChecked()
        await expect(theGridInputEmail.getByRole('radio', {name: "Option 2"})).toBeChecked()
    })

})

test.describe('Toastr page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })

    test('Checkbox', async ({page}) => {

        // If we use click() for checkbox that will change the status. [Checkbox.true - Click() - Checkbox.false] and [Checkbox.false - Click() - Checkbox.true]
        // If we cares about the status we could use: check() [this way if the checkbox is already checked, nothings happen] and uncheck()
        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
        await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})

        
        const allBoxes = page.getByRole('checkbox') // work with more than 1 checkbox
        // uncheck
        for(const box of await allBoxes.all()){ // we need first to convert allBoxes for an array. Box will interact with any item within the array one by one
            await box.uncheck({force: true})
            await expect(box).not.toBeChecked()
        }
        // check
        for(const box of await allBoxes.all()){ 
            await box.check({force: true})
            await expect(box).toBeChecked()
        }

    })

})