import organization from "../pages/organization.json";
import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import boardLocators from "../pages/board.json";
import sideMenuLocators from "../pages/sideMenu.json";

describe("Create boards", () => {
  beforeEach(() => {
    cy.visit("loginUrl");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
    cy.wait(5000);
  });

  it("Create new Scrum board", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type("Pedja");
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectScrumBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
  });

  it("Create new Kanban board", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type("Pedja");
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectKanbanBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
  });

  it("Navigate back through board creation", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type("Pedja");
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectKanbanBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.previousButton).click();
  });

  it("Trying to create board withou title", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.nextAndFinishButton).click();
  });

  it("Open board", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectBoard).click();
  });

  it("Archive board", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectBoard).click();
    cy.get(sideMenuLocators.boardConfiguration).click();
    cy.get(sideMenuLocators.archiveBoard).click();
    cy.get(sideMenuLocators.yesButton).click();
  });

  it("Unarchive button", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectArchivedBoard).click();
    cy.get(boardLocators.reopenBoard).click();
    cy.get(sideMenuLocators.yesButton).click();
  });

  it("Delete board", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectArchivedBoard).click();
    cy.get(boardLocators.deleteBoard).click();
    cy.get(sideMenuLocators.yesButton).click();
  });
});
