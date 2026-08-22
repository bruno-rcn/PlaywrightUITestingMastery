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

    test('List and dropdowns', async ({page}) => {

        // standart dropdown (starts with tag name <select...>) - we dont need to click() to select an option
        // Lets take the parent element and than the select
        //await page.locator('.form-group', {hasText: 'Toast type:'}).getByRole('combobox').selectOption('info')
        //await expect(page.getByRole('combobox')).toHaveValue('info')

        // ---

        // custom dropdown (starts with tag name for ex: <button...) the list option is independetly from the dropdown
        // here we need to click and than select the option
        // option 1 - how to work with this custom combobox with list (use when you see a tag <ul that means (hole) lits and <li means list item)
        await page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select').click() // click on the dropdown
        await page.getByRole('list').getByText('bottom-end').click() // select the option
        await expect(page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')).toHaveText('bottom-end')

        // option 2
        await page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select').click() // click on the dropdown
        await page.locator('nb-option', {hasText: 'top-left'}).click()
        await expect(page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')).toHaveText('top-left')

        // ---

        // looping through the list
        const positionDropdownField = page.locator('.form-group', {hasText: 'Position:'}).locator('nb-select')
        await positionDropdownField.click()

        const allListValues = await page.locator('nb-option').allTextContents() // extract and save all the option list into this cont as an array
        for(const listValues of allListValues){ // for each value within the allListValues will be interact one by one in listValues
            await page.locator('nb-option', {hasText: listValues}).click() // here will click 
            await expect(positionDropdownField).toHaveText(listValues) // confirm the value from the element
            await positionDropdownField.click() // open the list again to loop can continuos
        }

    })
})

test.describe('Tooltip page', () => {
    // You need to freeze the DOM to cath the message. 
    // 1. Windows - Go to Source tab - F8 
    // or
    // 2. Mac - Go to Source tab - Cmd+\

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
    })

    test('Tooltip placements', async ({page}) => {

        await page.getByRole('button', {name: 'Top'}).hover()
        await expect(page.locator('nb-tooltip')).toHaveText('This is a tooltip')
    })
})

test.describe('Smart table page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart table').click()
    })

    test('Dialog box', async ({page}) => {
        // This kind of dialog box it is not a html it is a Native dialog box. And when this appears PW dismiss on cancel button by default

        // We need to intercept this event and catch to click on OK button - Create a listener
        // need to intercept the event before the click
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        await page.locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
        await expect(page.locator('tr', {hasText: 'mdo@gmail.com'})).not.toBeVisible()

    })

    test('Smart table test', async ({page}) => {
        // TAble usually starts with a <table> tag and have inside <thead> and <tbody>
        // then we have <tr> (table rows - line) and <th> or <td> (table header - column within the line)
        // values in the table are usually HTML text

        // 1. How to select row by any {name: visible text} this could be a text or a property value
        // First find the row by the email and then click on the edit icon
        const rowByEmail = page.getByRole('row', {name: 'fat@yandex.ru'})
        await rowByEmail.locator('.nb-edit').click()
        await rowByEmail.getByPlaceholder('Age').fill('55') // edit the last column
        await rowByEmail.locator('.nb-checkmark').click()
        await expect(rowByEmail.locator('td').last()).toHaveText('55')


        // 2. get row by specific column
        // [bring all rows page.getByRole('row')] [bring all the columns/cell .filter({has: page.getByRole('cell')})]
        const rowByColumn = page.getByRole('row').filter({has: page.getByRole('cell').nth(1).getByText('10')}) // nth(1) ID column
        await rowByColumn.locator('.nb-edit').click()
        await page.locator('tbody').getByPlaceholder('E-mail').fill('emai@teste.com')
        await page.locator('tbody').locator('.nb-checkmark').click()
        await expect(rowByColumn.locator('td').nth(5)).toHaveText('emai@teste.com')

        // 3. Loop through table rows
        // create the array data
        const agesData = ["20", "30", "40", "200"]

        for(let age of agesData){
            await page.getByPlaceholder('Age').fill(age)
            // create the condition
            if(age == "200"){
                await expect(page.locator('tbody')).toContainText('No data found')
            }else{
                await expect(page.locator('tbody tr').first().locator('td').last()).toHaveText(age) // while the first line from the table do have this value our script will no take the list
                // create a locator that catch all rows into an array
                const allTableRows = await page.locator('tbody tr').all()
                // second loop to navigate through this array list of rows
                for(let row of allTableRows){
                    await expect(row.locator('td').last()).toHaveText(age)
                }
            }
        }

    })

})

