import Utils from "../utils/index.js";
import loginLocators from "../../../pages/loginModal.json";
import organizationLocators from "../../../pages/organization.json";
import boardLocators from "../../../pages/board.json";
import headerLocators from "../../../pages/header.json";
import sideMenuLocators from "../../../pages/sideMenu.json";

const utils = new Utils();

class Boards {
  setupTests() {
    cy.visit("/login");
    cy.get(loginLocators.emailAdressInputField).type(Cypress.env("username"));
    cy.get(loginLocators.passwordInputField).type(Cypress.env("password"));
    cy.get(loginLocators.loginButton).click();
    cy.wait(4000);
  }

  createScrumBoard(boardName) {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type(boardName);
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectScrumBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.wait(2000);
    cy.get(boardLocators.nextAndFinishButton).click();
  }

  createKanbanBoard(boardName) {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type(boardName);
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectKanbanBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.wait(2000);
    cy.go("back");
  }

  navigateBackThroughModal(boardName) {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type(boardName);
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectKanbanBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.previousButton).click();
    cy.get(boardLocators.previousButton).click();
    cy.get(boardLocators.previousButton).click();
    cy.get(boardLocators.previousButton).click();
  }

  createBoardWithoutTitle() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
  }

  openBoard() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectBoard).click();
  }

  archiveScrumBoard() {
    cy.visit("/my-organizations");
    //cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectBoard).click();
    cy.get(sideMenuLocators.boardConfiguration).click();
    cy.get(sideMenuLocators.archiveBoard).click();
    cy.get(sideMenuLocators.yesButton).click();
  }

  unarchiveScrumBoard() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectArchivedBoard).click();
    cy.get(boardLocators.reopenBoard).click();
    cy.get(sideMenuLocators.yesButton).click();
  }

  deleteScrumBoard() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(boardLocators.selectArchivedBoard).click();
    cy.get(boardLocators.deleteBoard).click();
    cy.get(sideMenuLocators.yesButton).click();
  }
  //Assertions

  verifyCreatingScrumBoard(boardName, activeSprintTitle, membersTitle) {
    cy.get(boardLocators.scrumBoardCard)
      .should("be.visible")
      .and("contain.text", boardName)
      .and("contain.text", activeSprintTitle)
      .and("contain.text", membersTitle);
  }
  verifyCreatingKanbanBoard(boardName, activeSprintTitle, membersTitle) {
    cy.get(boardLocators.kanbanBoardCard)
      .should("be.visible")
      .and("contain.text", boardName)
      .and("not.contain", activeSprintTitle)
      .and("contain.text", membersTitle);
  }

  verifySuccessfullNavigateBackThroughModal(newBoardModalTitle) {
    cy.get(boardLocators.addNewBoardModal)
      .should("be.visible")
      .and("contain.text", newBoardModalTitle);
  }

  verifyUnsuccessfullBoardCreatingWithoutName() {
    cy.get(boardLocators.nextAndFinishButton).should("be.disabled");
  }

  verifySuccessfullBoardOpening(backlogTitle, sprintTitle) {
    cy.get(boardLocators.boarsDetailPageHeader).should(($element) => {
      expect($element[0]).to.contain.text(backlogTitle);
      expect($element[1]).to.contain.text(sprintTitle);
    });
  }
}
export default Boards;
