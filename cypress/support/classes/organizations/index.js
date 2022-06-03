import Utils from "../utils/index.js";
import organizationLocators from "../../../pages/organization.json";
import loginLocators from "../../../pages/loginModal.json";
import headerLocators from "../../../pages/header.json";
import boardLocators from "../../../pages/board.json";

const utils = new Utils();

class Organization {
  setupTests() {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    utils.visitUrl("/login");
    cy.get(loginLocators.emailAdressInputField).type(username);
    cy.get(loginLocators.passwordInputField).type(password);
    cy.get(loginLocators.loginButton).click();
    cy.wait(4000);
  }

  createOrganization(organizationName) {
    cy.get(organizationLocators.addNewOrganizationButton).click();
    cy.get(organizationLocators.organizationNameTextBox).type(organizationName);
    cy.get(organizationLocators.nextButton).click();
    cy.get(organizationLocators.createButton).click();
    cy.get(organizationLocators.confirmOnPopUpModal).click();
    cy.get(headerLocators.displayAllOrganizations).click();
  }
  createOrganizationWithEmptyName() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.addNewOrganizationButton).click();
  }
  navigateBackThroughModal(organizationName) {
    cy.visit("/my-organizations");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organizationLocators.addNewOrganizationButton).click();
    cy.get(organizationLocators.organizationNameTextBox).type(organizationName);
    cy.get(organizationLocators.nextButton).click();
    cy.get(organizationLocators.previousButton).click();
  }
  editOrganizationName(organizationName) {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.editOrganization).click();
    cy.get(organizationLocators.organizationNameTextBoxOnEdit)
      .clear()
      .type(organizationName);
    cy.get(organizationLocators.saveButtonOnEdit).click();
  }
  achiveOrganization() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.archiveOrganization).click({ force: true });
    cy.get(organizationLocators.confirmArchivingOrganization).click();
  }
  unachiveOrganization() {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.unarchiveOrganization).click({ force: true });
    cy.get(organizationLocators.confirmArchivingOrganization).click();
  }
  deleteAchivedOrganization(password) {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.archiveOrganization).click({ force: true });
    cy.get(organizationLocators.confirmArchivingOrganization).click();
    cy.get(organizationLocators.deleteArchivedOrganization).click({
      force: true,
    });
    cy.get(organizationLocators.passwordField).type(password);
    cy.get(organizationLocators.confirmDeletingOrganization).click();
  }
  openOrganization(organizationName) {
    cy.visit("/my-organizations");
    cy.get(organizationLocators.addNewOrganizationButton).click();
    cy.get(organizationLocators.organizationNameTextBox).type(organizationName);
    cy.get(organizationLocators.nextButton).click();
    cy.get(organizationLocators.createButton).click();
    cy.get(organizationLocators.selectOrganization).click();
    cy.get(organizationLocators.confirmOnPopUpModal).click();
  }
  //Assertions
  verifyCreateOrganization(
    organizationName,
    projectString,
    boardString,
    editOrganizationButtonTitle,
    achiveOrganizationButtonTitle,
    addNewProjectButtonTitle,
    addNewBoardButtonTitle,
    accountButtonTitle
  ) {
    cy.get(organizationLocators.selectOrganization).should(
      ($organizationModal) => {
        expect($organizationModal).to.contain(organizationName);
        expect($organizationModal).to.contain(projectString);
        expect($organizationModal).to.contain(boardString);
      }
    );
    cy.get(organizationLocators.organizationCardHeader).should(
      ($organizationModal) => {
        expect($organizationModal.first()).attr(
          "title",
          editOrganizationButtonTitle
        );
        expect($organizationModal.last()).attr(
          "title",
          achiveOrganizationButtonTitle
        );
      }
    );
    cy.get(organizationLocators.organizationCardBody).should(
      ($organizationModal) => {
        expect($organizationModal[0]).attr("title", addNewProjectButtonTitle);
        expect($organizationModal[1]).attr("title", addNewBoardButtonTitle);
      }
    );
    cy.get(organizationLocators.organizationCardFooter).should(
      "have.attr",
      "title",
      accountButtonTitle
    );
  }
  verifyUnsuccessfullCreatingOrganizationWithEmpyName() {
    cy.get(organizationLocators.nextButton).should("be.disabled");
  }

  verifySuccessfullNavigatingBackThroughModal(modalHeaderTitle) {
    cy.get(organizationLocators.addNewOrganizationModalHeader)
      .should("be.visible")
      .and("have.text", modalHeaderTitle);

    cy.get(organizationLocators.addNewOrganizationModalBody).should(
      "be.visible"
    );
    cy.get(organizationLocators.cancelButton).click();
    cy.get(organizationLocators.organizationCard).should("have.length", 1);
  }
  verifySuccessfullEditingOrganizationName(organizationName) {
    cy.get(organizationLocators.organizationCard).should(
      "contain.text",
      organizationName
    );
  }
  verifySuccessfullOrganizationAchiving(
    achivedOrganizationContainerTitle,
    organizationName
  ) {
    cy.get(organizationLocators.achivedOrganizationsPlaceholderHeader)
      .should("be.visible")
      .and("contain.text", achivedOrganizationContainerTitle);
    cy.get(organizationLocators.allOrganizationPlaceholder).should(
      "have.length",
      1
    );
    cy.get(organizationLocators.achivedOrganizationCard)
      .should("have.length", 1)
      .and("contains.text", organizationName);
  }
  verifySuccessfullOrganizationUnachiving(organizationName) {
    cy.get(organizationLocators.organizationCard)
      .should("have.length", 1)
      .and("contains.text", organizationName);
  }
  verifySuccessfullOrganizationDeleting(welcomeMessage) {
    cy.get(organizationLocators.organizationCard).should("have.length", 0);

    cy.get(organizationLocators.emptyOrganizationBoardPlaceholderWelcomeMessage)
      .should("be.visible")
      .and("contains.text", welcomeMessage);
  }
  verifyOpeningOrganizationDetailPage(
    boardsContainerTitle,
    addNewBoardCardTitle
  ) {
    cy.get(boardLocators.allBoardsPlaceholderHeader).should(
      "contain.text",
      boardsContainerTitle
    );
    cy.get(boardLocators.addNewBoard)
      .should("be.visible")
      .and("contain.text", addNewBoardCardTitle);
  }
}
export default Organization;
