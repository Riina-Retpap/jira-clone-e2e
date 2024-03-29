describe("Issue deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
        const getIssueDetailsModal = () =>
          cy.get('[data-testid="modal:issue-details"]');
      });
  });
  it("should delete issue and verify success", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    //clicking "Delete"
    cy.get('[class="sc-bwzfXH dIxFno sc-kGXeez bLOzZQ"]').click();
    cy.should("not.exist");
    cy.get('[data-testid="board-list:backlog"]');
    cy.reload().wait(1000);
    cy.contains("This is an issue of type: Task.").should("not.exist");
  });

  it("should CANCEL deleting issue and confirm", () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should("be.visible");
    //clicking "Cancel"
    cy.get('[class="sc-bwzfXH ewzfNn sc-kGXeez bLOzZQ"]').click();
    cy.should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
  });
});
