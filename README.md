# Playwright Automation Suite

This project contains Playwright end-to-end tests for the Demo Web Shop application.

## What is included
- Playwright test configuration in `playwright.config.ts`
- Page Object Model files in `pages/`
- Test fixtures in `Fixtures/`
- Test data loaders in `utils/`
- CI workflow in `.github/workflows/playwright.yml`
- Jenkins pipeline in `Jenkinsfile`

## Prerequisites
- Node.js 18 or newer
- npm
- Playwright browsers

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Install Playwright browsers
   ```bash
   npx playwright install --with-deps
   ```
3. Create a `.env` file with your test credentials if needed.

## Run tests
Run all tests:
```bash
npm test
```

Run tests in headed mode:
```bash
npm run test:headed
```

Run tests in CI-friendly mode:
```bash
npm run test:ci
```

## Reports
Playwright HTML reports are generated in `playwright-report/`.

## CI/CD
- GitHub Actions: `.github/workflows/playwright.yml`
- Jenkins: `Jenkinsfile`
