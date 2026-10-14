# Feedback

## Comments

<h4>Improvement 1: Have a dedicated test envionment or third-party script disabling</h4>

Description: The live environment relies heavily on third-party ad-tech networks and dynamic tracking scripts. These third-party services introduce network latency,slow down DOM hydration and inject overlay elemebts that trigger pointer-event interception during test runs. Providing a sanitised test environment could ensure test results reflect application health.


<h4>Improvement 2: Optimisation of cookie consent</h4>

Description: Cookie consent prompts and floating banner overlays intermittently block primary UI elements (such as checkout and navigation buttons). 

<h4>Feedback 1: Page Object Model (POM) & TypeScript Architecture</h4>

Description: Using TypeScript in combination with the Page Object Model provided a highly maintainable and clean separation between locator/action definitions (in /pages) and test scenario assertions (in /tests). This architectural choice made expanding test coverage from Test Case 14 to Test Case 15 smooth and straightforward.

<h4>Feedback 2: Pragmatic Resilience Strategies in Playwright</h4>

Description: To counteract intermittent pointer interception caused by dynamic ad overlays, strategic defensive mechanisms—such as leveraging Playwright’s { force: true } click options were applied. These resilience patterns successfully allowed the automation suite to proceed through complete checkout scenarios despite volatile UI overlays.

<h4>Feedback 3: Clarity of API Documentation</h4>

Description: The reference documentation for the API endpoints clearly details HTTP methods, required parameters, and expected status/error response codes (e.g., distinguishing between successful operations, 400 bad requests, and 405 unsupported methods). This structural clarity made it straightforward to understand expected backend payloads and design auxiliary API requests alongside the UI suite.

---

## Links

[README](README.md) | [EXERCISE](EXERCISE.md) | [GETTING_STARTED](GETTING_STARTED.md) | [ISSUES](ISSUES.md)