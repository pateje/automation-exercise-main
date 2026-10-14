# Getting Started

## Purpose

This document outlines the setup, execution and architectural standards for the End-to-End (E2E) test automation suite built for this Automation Exercise using Playwright, TypeScript and the Page Object Model (POM) pattern. Its goal is to provide developers and QA engineers with a guide to  configure their local environments, execute test scenarios and understand framework design choices.

## Getting the Latest Code

To pull down the latest version of the test framework repository, open your terminal and run:

`git clone https://github.com/pateje/automation-exercise-main.git`

`cd automation-exercise-main.git`

## Setting Up the Environment

Ensure your local machine meets the following prerequisites before setting up the project:

Prerequisites

Node.js: Version 18.x or higher (Download Node.js)

npm (comes packaged with Node.js) or yarn

Installation Steps

1. Install project dependencies (including Playwright and TypeScript types):

`npm install`

2. Install required browser binaries for Playwright:
`npx playwright install`

## Running the Tests

Run all UI tests in headless mode
'''npx playwright test'''

Run tests using Playwright UI Mode (Recommended for interactive debugging and visual tracking)

`npx playwright test --ui`

Run a specific test file (e.g. Test Case 14)

`npx playwright test place_order_register_while_checkout.spec.ts`

View the HTML test report after a run:
`npx playwright show-report`

## Additional Details

Framework Architecture Highlights
Page Object Model (POM): Located in the pages/ directory, separating page locators and user actions from the test logic to improve code maintainability.

Common Issues & Troubleshooting Tips
TypeScript Red Underlines / Missing Globals:
If editor errors appear regarding Node or Playwright namespaces, ensure @types/node is installed and run TypeScript: Restart TS Server via the VS Code Command Palette (Ctrl + Shift + P or Cmd + Shift + P).
Navigation Timeouts (TimeoutError: page.goto):
Public practice sites frequently undergo network fluctuations. If navigation or teardown hangs occur, check playwright.config.ts to ensure navigationTimeout and actionTimeout are tuned appropriately (e.g., 30000ms).

Resilience Patterns: Designed with defensive coding practices to handle volatile third-party environments (such as aggressive ad-tech or cookie-consent overlays causing pointer interception) by utilizing { force: true } interactions.


---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)