describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const issueComment = '[data-testid="issue-comment"]';

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      cy.get(issueComment).should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get(issueComment).first().contains("Edit").click().should("not.exist");
      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.get(issueComment).should("contain", "Edit").and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal().find(issueComment).contains("Delete").click();
    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");
    getIssueDetailsModal().find(issueComment).should("not.exist");
  });

  const getIssueConfirmModal = () => cy.get('[data-testid="modal:confirm"]');

  it("Should create, edit and delete comment", () => {
    const comment = "MY_TEST_COMMENT";
    const editComment = "MY_TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      cy.get(issueComment).should("contain", comment);

      cy.get(issueComment).first().contains("Edit").click().should("not.exist");
      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", comment)
        .clear()
        .type(editComment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.get(issueComment)
        .should("contain", "Edit")
        .and("contain", editComment);

      cy.get(issueComment).contains("Delete").click();
    });
    getIssueConfirmModal().within(() => {
      cy.contains("button", "Delete comment").click().should("not.exist");
    });
    getIssueDetailsModal()
      .find(issueComment)
      .contains(editComment)
      .should("not.exist");
  });
});
