describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/project/board");
  });

  const createIssue = () => cy.get('[data-testid="modal:issue-create"]');
  const issueDetailsModal = '[data-testid="modal:issue-details"]';
  const backlog = '[data-testid="board-list:backlog"]';

  //Create an issue
  const issueTitle = "Dragon";
  const description = "Mancave";
  it("Should create an issue, estimate time, log time and clear all estimations", () => {
    cy.get('[data-testid="icon:plus"]').click();
    createIssue().within(() => {
      cy.get(".ql-editor").type(description);
      cy.get('[data-testid="form-field:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]')
        .trigger("mouseover")
        .trigger("click");
      cy.get('input[name="title"]').type(issueTitle);
      cy.get('input[name="title"]').should("have.value", issueTitle);
      cy.get('button[type="submit"]').click().wait(20000);
    });
    cy.reload();

    //Estimation
    const estimateHours = "10";
    const estimateNewHours = "20";
    cy.wait(20000);
    cy.get(backlog).contains(issueTitle).click();
    cy.get(issueDetailsModal).contains("No time logged");
    cy.contains("Original Estimate (hours)").next("div").type(estimateHours);
    cy.get('[data-testid="icon:close"]').click();
    //Assert
    cy.get(backlog).contains(issueTitle).click();
    cy.get(issueDetailsModal).contains(estimateHours + "h estimated");
    //Change
    cy.contains("Original Estimate (hours)")
      .next("div")
      .find("input")
      .clear()
      .type(estimateNewHours);
    cy.get('[data-testid="icon:close"]').click();
    //Assert
    cy.get(backlog).contains(issueTitle).click();
    cy.get(issueDetailsModal).contains(estimateNewHours + "h estimated");
    //Delete
    cy.contains("Original Estimate (hours)")
      .next("div")
      .find("input")
      .clear()
      .trigger("mouseover");
    cy.get('[data-testid="icon:close"]').click();
    //Assert
    cy.get(backlog).contains(issueTitle).click();
    cy.get(issueDetailsModal).contains("No time logged");
    cy.get(issueDetailsModal)
      .contains(estimateNewHours + "h estimated")
      .should("not.exist");

    //Stopwatch
    const spentTime = "2";
    const remainingTime = "5";
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains("Time spent (hours)")
        .next("div")
        .find("input")
        .type(spentTime);
      cy.contains("Time tracking").click();
      cy.contains("Time remaining (hours)")
        .next("div")
        .find("input")
        .type(remainingTime);
      cy.contains("Time tracking").click();
      cy.get("button").contains("Done").click();
    });

    cy.get(issueDetailsModal).contains("No time logged").should("not.exist");
    cy.get(issueDetailsModal).contains(spentTime + "h logged");
    cy.get(issueDetailsModal).contains(remainingTime + "h remaining");
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains("Time spent (hours)").next("div").find("input").clear();
      cy.contains("Time remaining (hours)").next("div").find("input").clear();
      cy.get("button").contains("Done").click().wait(20000);
    });
    cy.get(issueDetailsModal).contains("No time logged");
    cy.get(issueDetailsModal)
      .contains(spentTime + "h logged")
      .should("not.exist");
    cy.get(issueDetailsModal)
      .contains(remainingTime + "h remaining")
      .should("not.exist");
  });
});
