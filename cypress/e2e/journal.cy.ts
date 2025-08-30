// cypress/e2e/journal.cy.ts

describe("AI Daily Reflection Journal", () => {
  beforeEach(() => {
    // Reset the test database before each test
    cy.task("reseed");
  });

  it("Flow 1 – should allow user to log their day (happy path)", () => {
    cy.visit("http://localhost:3000");

    // TODO: Select a rating (e.g., 4)
    // TODO: Type a valid reflection text (≥10 chars)
    // TODO: Click Save
    // TODO: Assert AI summary, mood, tip appear
    // TODO: Assert entry appears at the top of the history page
  });

  it("Flow 2 – should show an error if user forgets to write text", () => {
    cy.visit("http://localhost:3000");

    // TODO: Select a rating (e.g., 3)
    // TODO: Leave reflection text empty
    // TODO: Click Save
    // TODO: Assert error message is shown
    // TODO: Assert no entry was added to history
  });

  it("Flow 3 – should handle AI service failure for user", () => {
    cy.visit("http://localhost:3000");

    // TODO: Intercept API call to simulate AI failure (cy.intercept)
    // TODO: Select a rating (e.g., 2)
    // TODO: Type a reflection text
    // TODO: Click Save
    // TODO: Assert entry is saved without AI fields
    // TODO: Assert "AI service is currently unavailable" message is shown
  });

  it("Flow 4 – should show user their reflection history", () => {
    cy.visit("http://localhost:3000/history");

    // TODO: Ensure DB has seeded entries
    // TODO: Assert entries are listed with date, rating, text, AI fields
    // TODO: (Optional) Assert trend or multiple entries displayed
  });
});
