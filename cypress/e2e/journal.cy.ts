// cypress/e2e/journal.cy.ts

describe("AI Daily Reflection Journal", () => {
  beforeEach(() => {
    // Reset the test database before each test
    cy.task("reseed");
  });

  it("Flow 1 – should allow user to log their day (happy path, real API)", () => {
    cy.visit("/");

    cy.get('[data-testid="rating-4"]').click();
    cy.get('[data-testid="text"]').type(
      "Today was a good day; I shipped something and took breaks."
    );
    cy.get('[data-testid="submit"]').click();

    cy.location("pathname").should("eq", "/history");
    cy.location("search").should("eq", "");
    cy.get('[data-testid="ai-down-banner"]').should("not.exist");
    cy.get('[data-testid="entry-card"]').should("have.length.at.least", 1);
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

    // Force API to return an entry without AI fields
    cy.intercept("POST", "/api/entries", (req) => {
      const b = req.body as { rating: number; text: string };
      req.reply({
        statusCode: 201,
        body: {
          id: "mock-no-ai",
          rating: b.rating,
          text: b.text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // no aiSummary/aiMood/aiTip
        },
      });
    }).as("createNoAI");

    cy.visit("/");
    cy.get('[data-testid="rating-2"]').click();
    cy.get('[data-testid="text"]').type(
      "Stressful day but I handled it with breaks."
    );
    cy.get('[data-testid="submit"]').click();

    cy.wait("@createNoAI");
    cy.location("pathname").should("eq", "/history");
    cy.location("search").should("eq", "?ai=down");
    cy.get('[data-testid="ai-down-banner"]').should("be.visible");
  });


  it("Flow 4 – should show user their reflection history", () => {
    cy.visit("http://localhost:3000/history");

    // TODO: Ensure DB has seeded entries
    // TODO: Assert entries are listed with date, rating, text, AI fields
    // TODO: (Optional) Assert trend or multiple entries displayed
  });
});
