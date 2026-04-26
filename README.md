# Playwright E2E with GitHub Actions, Docker & Artillery

An end-to-end test automation project built with [Playwright](https://playwright.dev/) and JavaScript, targeting the [bitheap.tech](https://bitheap.tech) demo e-commerce site. This project covers a full purchase flow including authentication, cart management, and order placement. It integrates **Docker** for containerized test execution, **GitHub Actions** for CI/CD, and **Artillery** for performance/load testing.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | E2E browser automation |
| Node.js | Runtime (18.x / 20.x / 22.x) |
| JavaScript | Language |
| Firefox | Test browser (headless) |
| Docker | Containerized test execution |
| GitHub Actions | CI/CD pipeline |
| Artillery | Performance & load testing |

---

## Project Structure

```text
Playwright-E2E-with-Github-Actions-Docker-Artillery/
├── .github/
│   └── workflows/
│       └── node.js.yml              # GitHub Actions CI pipeline
├── node_modules/                    # Installed dependencies
├── playwright-report/               # HTML test reports (auto-generated)
├── test-results/                    # Screenshots and traces for failures
├── tests/
│   ├── initial/                     # Initial / exploratory test files
│   └── test1.spec.js                # Main Playwright E2E test
├── .gitignore                       # Git ignore rules
├── Dockerfile                       # Docker image definition
├── README.md                        # Project documentation
├── package.json                     # Project metadata and scripts
└── package-lock.json                # Locked dependency versions
```

---

## Test Coverage

The main test suite in `tests/test1.spec.js` covers a full e-commerce purchase flow:

| Step | Description |
|---|---|
| Login | Navigates to bitheap.tech and authenticates using credentials |
| Prepare Order | Browses shop, adds a product to cart, proceeds to checkout |
| Place Order | Fills in billing details and completes the purchase |
| Assert | Verifies the "Order received" confirmation is visible |

Tests are organized into three reusable async helper functions:

- `Login(page)` — handles authentication
- `prepareOrder(page)` — handles product selection and cart flow
- `placeOrder(page)` — handles checkout and order confirmation assertion

---

## Playwright Configuration

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
- Docker Desktop (for containerized runs)
- Artillery (for load testing)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/brkacar/Playwright-E2E-with-Github-Actions-Docker-Artillery.git
cd Playwright-E2E-with-Github-Actions-Docker-Artillery

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

# Run in headed mode
npx playwright test --headed

# Open the HTML report after run
npx playwright show-report
```

---

## Environment Variables

The test suite reads credentials from environment variables:

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
$env:USERNAME = "playwright"
$env:PASSWORD = "playwright"
npx playwright test
```

**Windows (CMD):**
```cmd
set USERNAME=playwright
set PASSWORD=playwright
npx playwright test
```

> Never hardcode credentials in test files. Always use environment variables.

---

## Docker

This project includes a `Dockerfile` for running Playwright tests inside a container without needing a local Node or browser setup.

**`Dockerfile`**

```dockerfile
FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

ENV USERNAME=playwright
ENV PASSWORD=playwright

COPY . .

RUN npm install
RUN npx playwright install

CMD ["npx", "playwright", "test"]
```

### Build the image

```bash
docker build -t playwright .
```

### Run the tests in a container

```bash
docker run playwright
```

### Run and export the report to your local machine

**Windows CMD:**
```cmd
docker run --rm -v %cd%:/app -v %cd%/playwright-report:/app/playwright-report -w /app playwright
```

**PowerShell:**
```powershell
docker run --rm -v ${PWD}:/app -v ${PWD}/playwright-report:/app/playwright-report -w /app playwright
```

**Linux / macOS:**
```bash
docker run --rm -v $(pwd):/app -v $(pwd)/playwright-report:/app/playwright-report -w /app playwright
```

After the run, open the report locally:
```bash
npx playwright show-report
```

---

## Artillery — Load & Performance Testing

This project uses [Artillery](https://www.artillery.io/) with the Playwright engine to simulate real user browser flows under load.

### Artillery config (`shop.yml`)

```yaml
config:
  target: https://www.bitheap.tech
  engines:
    playwright: {}
  processor: "./tests/flows.js"
scenarios:
  - engine: playwright
    testFunction: "shopFlow"
```

### Load phases example

```yaml
phases:
  - duration: 60
    arrivalRate: 5
    rampTo: 10
    name: Warm up the API
  - duration: 60
    arrivalRate: 10
    rampTo: 50
    name: Ramp up to peak load
  - duration: 300
    arrivalRate: 50
    name: Sustained peak load
```

### Flow definition (`tests/flows.js`)

```js
module.exports = { shopFlow };

async function shopFlow(page) {
  await page.goto("https://www.bitheap.tech/");
  await page.click("#menu-item-1310");
}
```

### Run Artillery

```bash
# Install Artillery globally
npm install -g artillery

# Install Artillery Playwright engine
npm install -g @artillery/engine-playwright

# Run load test
artillery run shop.yml
```

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
      - name: Use Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
        env:
          USERNAME: playwright
          PASSWORD: playwright
```

---

## Reports and Artifacts

After a test run, Playwright generates:

- `playwright-report/` — HTML report viewable in browser
- `test-results/` — screenshots and traces for failed tests

```bash
npx playwright show-report
```

---

## Author

**Berk Acar**
[github.com/brkacar](https://github.com/brkacar)
