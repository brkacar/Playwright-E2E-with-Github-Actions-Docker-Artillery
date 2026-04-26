# Playwright-brief

An end-to-end test automation project built with [Playwright](https://playwright.dev/) and JavaScript, targeting the [bitheap.tech](https://bitheap.tech) demo e-commerce site. This project covers a full purchase flow including authentication, cart management, and order placement, and is integrated with GitHub Actions for continuous testing.

---

## Tech Stack

| Tool | Version |
|---|---|
| Playwright | latest |
| Node.js | 18.x / 20.x / 22.x |
| Language | JavaScript |
| Browser | Firefox (headless) |
| CI/CD | GitHub Actions |

---

## Project Structure
Playwright-brief/
├── .github/
│ └── workflows/
│ └── node.js.yml # GitHub Actions CI pipeline
├── tests/
│ ├── initial/ # Initial/exploratory test files
│ ├── test1.spec.js # Main end-to-end test
│ └── .gitignore
├── playwright-report/ # HTML test reports (auto-generated)
├── test-results/ # Test artifacts: screenshots, traces
├── playwright.config.js # Playwright configuration
├── package.json
└── package-lock.json


---

## Test Coverage

The main test suite in `tests/test1.spec.js` covers a full e-commerce purchase flow:

| Step | Description |
|---|---|
| Login | Navigates to bitheap.tech and authenticates using credentials |
| Prepare Order | Browses the shop, adds a product to cart, proceeds to checkout |
| Place Order | Fills in billing details and completes the purchase |
| Assert | Verifies the "Order received" confirmation is visible |

The test is organized into three reusable async helper functions:

- `Login(page)` — handles authentication
- `prepareOrder(page)` — handles product selection and cart flow
- `placeOrder(page)` — handles checkout and order confirmation assertion

---

## Configuration

**`playwright.config.js`**

```js
const config = {
  timeout: 60000,
  use: {
    screenshot: 'only-on-failure',
    browserName: 'firefox',
    headless: true,
  },
};

module.exports = config;
```

- **Browser:** Firefox
- **Timeout:** 60 seconds per test
- **Screenshots:** captured only on failure
- **Mode:** headless

---

## Prerequisites

- Node.js 18 or higher
- npm

---

## Installation

```bash
# Clone the repository
git clone https://github.com/brkacar/Playwright-brief.git
cd Playwright-brief

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run with HTML report
npx playwright test --reporter=html

# Run in headed mode (visible browser)
npx playwright test --headed
```

---

## Environment Variables

The test suite reads credentials from environment variables. Set these before running locally:

| Variable | Description |
|---|---|
| `USERNAME` | Login username for bitheap.tech |
| `PASSWORD` | Login password for bitheap.tech |

**Linux / macOS:**
```bash
export USERNAME=playwright
export PASSWORD=playwright
npx playwright test
```

**Windows (PowerShell):**
```powershell
$env:USERNAME="playwright"
$env:PASSWORD="playwright"
npx playwright test
```

> Do not hardcode credentials in test files. Always use environment variables.

---

## CI/CD — GitHub Actions

The pipeline runs automatically on every push or pull request to `main`.

**Workflow:** `.github/workflows/node.js.yml`

```yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          USERNAME: playwright
          PASSWORD: playwright
```

The pipeline tests against Node.js versions 18, 20, and 22.

---

## Reports and Artifacts

After a test run, Playwright generates:

- `playwright-report/` — HTML report viewable in browser
- `test-results/` — screenshots and traces for failed tests

To open the HTML report locally:

```bash
npx playwright show-report
```

---

## Author

**Berk Acar**  
[github.com/brkacar](https://github.com/brkacar)
