Playwright UI Testing with TypeScript - Notes from the video classes

---> Environment Configuration

1. Download and install Node.js (LTS)
	Verify if you already have in your machine running at the terminal: node -v and npm -v
	Node.js is the virtual env. to be able to run JavaScript outside the browser (on our computer). This happen because JavaScript was created to run into the Browser. With this we are able to use commands lines like npm

2. Download and install an IDE. In this course we are gonna use Visual Studio Code

3. Git
	Verify if you already have in your machine running at the terminal: git -v

***

---> Clone the application that we are gonna use to work in this course:

Step 1: Clone the Application
	Fork the project and clone your own repository to your workspace

Step 2: Install Dependencies
	npm install --force

Step 3: Run the Application
	npm start
	To access: localhost:4200

  ***

---> Playwright Installation - Doc: https://playwright.dev/docs/intro

1. Goes to the folder do you wanna install the PW
2. Run in the terminal: npm init playwright@latest
3. Finish to choose the options you wanna for the installation


Folder Structure Overview
	After installation, the following folder structure is created:

a. node-modules: Contains libraries and components, including the Playwright framework.
	If you need to delete this folder, when you run [npm install] this folder will be automatically generated again

b. test: Contains test files, with example.spec.ts as a sample.

c. gitignore: Excludes certain folders from the git repository when we perform a commit and push commands

d. package.json: Describes the project and its dependencies [like npm scripts and dev dependencies].

e.  package-lock.json: Can be safetly deleted, when you run [npm install] this file will be automatically generated again

e. Playwright.config.ts: Main configuration file for Playwright settings.

***

---> Run with command line

Running Tests

a. To run all test cases in headless mode by default (all projects/browsers)
	npx playwright test

b. To run tests in headed mode (visible browser) (add --headed) (all projects/browsers)
	npx playwright test --headed

c. To see the report after run the tests 
	npx playwright show-report


Running Tests in Specific Browsers (project)

d. To run tests for a specific browser, specify the project
	npx playwright test --project=Chromium


Running Specific Test Files

e. To run a specific test file and with specific browser (project)
	npx playwright test example.spec.ts
	npx playwright test example.spec.ts --project=Chromium


f. To run a specific test by name (all projects/browsers)
	npx playwright test -g "has title"


For skip some test we can use .skip in the test function to skip this when we are running
	test.skip('', async ({page}) => {})

For execute just 1 TC in a file we can use .only:
	test.only('', async ({page}) => {})

Running in UI mode
  npx playwright test --ui

Debugging Options

a. To run tests with tracing, use the command. This way, after run, look to the report file that was generated and you will can se the trace.
	npx playwright test --trace on

b. To debug run the command and the playwright will open a new windows to see the code to debug:
	npx playwright test --debug

  c. Put a breaking point on the left side of the code and run using the debug option in the Playwright plugin on the VScode

***


---> HTML terminology

a. HTML Tag: Starts and ends with angle braces (e.g., <input>).

b. HTML Attributes: Characteristics of HTML tags, which may or may not have values (e.g., placeholder="email").

c. Parent and Child Elements: Elements above are parent elements, while those below are child elements. Sibling elements are at the same level.

***


---> Locator Syntax Rules:

a. By Tag Name: Use the tag name as a string. For example, page.locator('input').

b. By ID: Prefix the ID with a hash sign. Example: page.locator('#input-email1').

c. By Class: Prefix the class with a dot. Example: page.locator('.shape-rectangle').

d. By Attribute: Use square brackets. Example: page.locator('[placeholder="email"]').

e. Combining Selectors: Combine tag and attribute without spaces. Example: page.locator('input[placeholder="email"]').

f. XPath: While possible, it is not recommended. Example: page.locator('//input[@id="input-email1"]').

g. Text Matching: Use page.locator({ text: 'partial text' }) for partial matches and page.locator({ text: 'exact text' }) for exact matches.


***

---> Best Practices for Locators

Use the following methods to create user-facing locators:

a. getByRole: Identifies elements by their role. Example: await page.getByRole('textbox', { name: 'email' }).

b. getByLabel: Finds elements by their associated label. Example: await page.getByLabel('email').click().

c. getByPlaceholder: Locates elements by their placeholder text. Example: await page.getByPlaceholder('Jane Doe').click().

d. getByText: Uses static text displayed on the web page. Example: await page.getByText('Using the grid').click().

e. getByTitle: Finds elements by their title attribute. Example: await page.getByTitle('IoT dashboard').click().

f. getByTestId: Uses custom test IDs defined in the source code. Example: await page.getByTestId('sign-in').click().

