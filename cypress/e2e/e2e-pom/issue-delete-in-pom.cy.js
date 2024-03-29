/**
 * This is an example file and approach for POM in Cypress
 */
import IssueDelete from "../../pages/IssueDelete";

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        //open issue detail modal with title from line 16
        cy.contains(issueTitle).click();
      });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = "This is an issue of type: Task.";

  it("Should delete issue successfully", () => {
    IssueDelete.clickDeleteButton();
    IssueDelete.confirmDeletion();
    IssueDelete.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it("Should CANCEL deletion process successfully", () => {
    //add steps to start deletion proces but cancel it
    IssueDelete.clickDeleteButton();
    IssueDelete.cancelDeletion();
    IssueDelete.closeDetailModal();
    IssueDelete.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});
