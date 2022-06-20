# Playwright test

This is an example project for running Playwright.
It contains 1 test that fails on a bug and 2 dynamic tests that utilise data (so technically 7 test).


# Prerequisite
Tested on Ubuntu 20.04, node version v12.18.1
For report ussage please install allure: https://installati.one/ubuntu/20.04/allure/

# Installation
Run command
```
npm install
```

## Run a test

Run tests
```
npx playwright test
```

Run tests in headless mode
```
HEADLESS=true npx playwright test
```

Run tests with retries
```
 playwright test --retries=3
```

Run tests in parallel
```
 playwright test --workers=4
```

Run tests with allure report
```
npx playwright test --reporter=line,allure-playwright
allure generate ./allure-results -c && allure ope
```

## Bugs
 - Footer should not move around when text size change
 - Back button disappear on the last page (previous page arrow)
 - Searching for non existing chars create JS error (for example “/”)
 - Searching is not exact, it seems to count chars, for “di” would also show “Introduction” and “Self sovereign identity”
 - Search bar dropdown overlay blocks clicks in page
 - H1 titles have no consistent pattern, all words with first letter as upper or not?
 - No lang attribute in HTML
 - When you hover on the H3 “Implementations” it shows the anchor symbol
 - On the nav bar it is “Self Sovereign Identity” but the page title is “Self-sovereign identity” so hyphen or not?
 - On the nave bar it should say “DIDComm” not “Didcomm”
 - It should be “Bluetooth” not “BlueTooth” 
 - Double '--' in text at 'DIDComm Messaging' page
 - “Edit this page” leads to 404 page
 - Clicking on “Self-sovereign identity” page in navbar would fully load the page (unlike first and second page)
 - Search placeholder text “Search ("/" to focus)” is not clear

## Concerns
 - Contrast between background and elements is not optimal for accessibility 
- Google page speed could be better
- No robot.txt
- HTML Id should not start with underscore

## Questions
- Why does the sidebar have hidden duplicate li elements the same as visible elements?
Why the desktop HTML includes the HTML for mobile as well (hamburger menu for example is hidden on desktop but still exists there).
- Why 2 requests for https://very-important.vercel.app/_next/static/chunks/pages/didcomm-f06e2d9ff0f1321a.js
