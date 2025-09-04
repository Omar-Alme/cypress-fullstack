describe("Reflect AI — E2E User Flows", () => {
    beforeEach(() => {
        // Reset DB to deterministic baseline
        cy.task("reseed");
    });

    it("renders header + landing UI (legend, rating buttons, textarea)", () => {
        cy.visit("/");

        // Header & nav
        cy.contains("a", "ReflectAI").should("be.visible");
        cy.get('[data-testid="nav-history"]').should("be.visible");

        // Rating buttons 1..5
        [1, 2, 3, 4, 5].forEach((n) => {
            cy.get(`[data-testid="rating-${n}"]`).should("be.visible");
        });

        // Textarea + submit
        cy.get('[data-testid="text"]').should("be.visible");
        cy.get('[data-testid="submit"]').should("be.visible");

        // Legend shows all 5 moods with emoji + label
        const expectedLegend = ["SAD", "STRESSED", "NEUTRAL", "CALM", "HAPPY"];
        expectedLegend.forEach((label) =>
            cy.contains(".text-xs", label).should("be.visible")
        );
    });

    it("Header nav – History button routes to /history", () => {
        cy.visit("/");
        cy.get('[data-testid="nav-history"]').click();
        cy.location("pathname").should("eq", "/history");
    });


    it("updates mood preview when a rating is selected and Clear resets", () => {
        cy.visit("/");

        // Initially shows helper text
        cy.contains("Select a rating to see mood").should("be.visible");

        // Select 4 -> CALM (enum)
        cy.get('[data-testid="rating-4"]').click().should("have.attr", "aria-pressed", "true");
        cy.contains(".uppercase", "CALM").should("be.visible");

        // Clear resets preview + textarea
        cy.get('[data-testid="text"]').type("This will be cleared.");
        cy.contains("button", "Clear").click();
        cy.contains("Select a rating to see mood").should("be.visible");
        cy.get('[data-testid="text"]').should("have.value", "");
    });

});