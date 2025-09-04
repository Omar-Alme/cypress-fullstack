describe("Reflect AI — E2E User Flows", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("Flow 1 – allows a user to log their day (happy path, real API)", () => {
    const message = "Today was a good day; I shipped something and took breaks.";

    cy.visit("/");

    // Choose rating + write reflection
    cy.get('[data-testid="rating-4"]').click().should("have.attr", "aria-pressed", "true");
    cy.get('[data-testid="text"]').type(message);

    // Submit
    cy.get('[data-testid="submit"]').click();

    // Redirects to /history and shows newest entry with  AI fields in test env
    cy.location("pathname").should("eq", "/history");
    cy.get('[data-testid="entry-card"]').first().within(() => {
      cy.contains(message).should("be.visible");

      cy.contains("Summary:").should("be.visible");
      cy.contains("Mood:").should("be.visible");
      cy.contains("HAPPY").should("be.visible"); 
      cy.contains("Tip:").should("be.visible");
    });
  });

  it("Flow 2a – shows an error if reflection text is missing/too short", () => {
    cy.visit("/");

    cy.get('[data-testid="rating-3"]').click();
    cy.get('[data-testid="submit"]').click();

    // Stays on page and shows error
    cy.location("pathname").should("eq", "/");
    cy.get('[role="alert"]')
      .should("be.visible")
      .and("contain.text", "Reflection is too short");
  });

  it("Flow 2b – shows an error if user forgets to select a rating", () => {
    cy.intercept("POST", "/api/entries").as("createEntry");

    cy.visit("/");

    // Provide valid-length text but DO NOT pick a rating
    cy.get('[data-testid="text"]').type(
      "This is a valid reflection with more than ten characters."
    );

    // Try to submit
    cy.get('[data-testid="submit"]').click();

    // Stays on the landing page and shows the rating error
    cy.location("pathname").should("eq", "/");
    cy.contains('[role="alert"]', "Please choose a rating").should("be.visible");

    cy.get("@createEntry.all").should("have.length", 0);
  });

  it("Flow 3 – gracefully handles AI failure (saves entry w/o AI fields)", () => {
    // Simulate AI-down by replying 201 WITHOUT aiSummary/aiMood/aiTip
    cy.intercept("POST", "/api/entries", (req) => {
      req.headers["x-test-no-ai"] = "1";
      req.continue();
    }).as("createNoAI");

    const message = "Stressful day but I handled it with short breaks.";

    cy.visit("/");
    cy.get('[data-testid="rating-2"]').click();
    cy.get('[data-testid="text"]').type(message);
    cy.get('[data-testid="submit"]').click();

    cy.wait("@createNoAI");
    cy.location("pathname").should("eq", "/history");

    // Newest entry exists and contains the text but NO AI sections
    cy.contains('[data-testid="entry-card"]', message)
    .should("be.visible")
    .within(() => {
      cy.contains("Summary:").should("not.exist");
      cy.contains("Mood:").should("not.exist");
      cy.contains("Tip:").should("not.exist");
    });
  });

  it("Flow 4 – shows reflection history (seeded entries render)", () => {
    cy.visit("/history");
    cy.get('[data-testid="entry-card"]').should("have.length.at.least", 1);

    // Each card has a timestamp and a rating chip
    cy.get('[data-testid="entry-card"]').first().within(() => {
      cy.get("time").should("exist");
      cy.contains(/^Rating\s\d\/5$/).should("exist");
    });
  });
});