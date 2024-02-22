class IssueDelete {
  constructor() {
    this.deleteButton = '[data-testid="icon:trash"]';
    this.deleteButtonName = "Delete issue";
    this.cancelDeletionButtonName = "Cancel";
    this.confirmationPopup = '[data-testid="modal:confirm"]';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.title = 'input[name="title"]';
    this.backlogList = '[data-testid="board-list:backlog"]';
  }
  clickDeleteButton() {
    cy.get(this.deleteButton).click();
    cy.get(this.confirmationPopup).should("be.visible");
  }

  confirmDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains(this.deleteButtonName).click();
    });
    cy.get(this.confirmationPopup).should("not.exist");
    cy.get(this.backlogList).should("be.visible");
  }

  cancelDeletion() {
    cy.get(this.confirmationPopup).within(() => {
      cy.contains(this.cancelDeletionButtonName).click();
    });
    cy.get(this.confirmationPopup).should("not.exist");
    cy.get(this.issueDetailModal).should("be.visible");
  }

  ensureIssueIsNotVisibleOnBoard(issueTitle) {
    cy.get(this.issueDetailModal).should("not.exist");
    cy.reload();
    cy.contains(issueTitle).should("not.exist");
  }

  closeDetailModal() {
    cy.get(this.issueDetailModal)
      .get(this.closeDetailModalButton)
      .first()
      .click();
    cy.get(this.issueDetailModal).should("not.exist");
  }

  ensureIssueIsVisibleOnBoard(issueTitle) {
    cy.get(this.issueDetailModal).should("not.exist");
    cy.reload();
    cy.contains(issueTitle).should("be.visible");
  }
}

export default new IssueDelete();
