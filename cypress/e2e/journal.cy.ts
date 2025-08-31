// cypress/e2e/journal.cy.ts

describe("AI Daily Reflection Journal", () => {
  beforeEach(() => {
    // Reset the test database before each test
    cy.task("reseed");
  });

  it("Flow 1 – should allow user to log their day (happy path)", () => {
    // Stub backend so we don't need the real API yet
    cy.intercept("POST", "/api/entries", (req) => {
      const body = req.body;
      expect(body.rating).to.be.within(1, 5);
      expect((body.text as string).length).to.be.greaterThan(9);

      req.reply({
        statusCode: 201,
        body: {
          id: "mock-id",
          rating: body.rating,
          text: body.text,
          aiSummary: "You seemed reflective but balanced.",
          aiMood: "CALM",
          aiTip: "Plan a 15-minute walk.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }).as("createEntry");

    cy.visit("/");

    cy.get('[data-testid="rating-4"]').click();
    cy.get('[data-testid="text"]').type(
      "Today was a good day; I shipped something and took breaks."
    );
    cy.get('[data-testid="submit"]').click();

    cy.wait("@createEntry");

    cy.location("pathname").should("eq", "/history");
  });

  it("Flow 2 – should show an error if user forgets to write text", () => {
    cy.visit("/");

    cy.get('[data-testid="rating-3"]').click();
    // leave text empty
    cy.get('[data-testid="submit"]').click();

    cy.contains('[role="alert"]', "Reflection is too short").should("be.visible");
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
