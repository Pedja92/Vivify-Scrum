import organization from "../pages/organization.json";
import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";

describe("Create new organization", () => {
  beforeEach(() => {
    cy.visit("loginUrl");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
    cy.wait(5000);
  });

  it("Create organization", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.createButton).click();
  });

  it("Create organization with empty name", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.nextButton).click();
  });

  it("Navigate back through modal", () => {
    //cy.visit("baseUrl");
    cy.visit("https://cypress.vivifyscrum-stage.com/my-organizations");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.previousButton).click();
    cy.get(organization.cancelButton).click();
  });

  it("Edit Organization name", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.editOrganization).click();
    cy.get(organization.organizationNameTextBoxOnEdit).clear().type("Pejovic");
    cy.get(organization.saveButtonOnEdit).click();
  });

  it("Archive organization", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();
  });

  it("Unarchive organization", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.unarchiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();
  });

  it("Delete archived organization", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();
    cy.get(organization.deleteArchivedOrganization).click({ force: true });
    cy.get(organization.passwordField).type("03091992");
    cy.get(organization.confirmDeletingOrganization).click();
  });

  it("Open Organization detail page", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.createButton).click();
    cy.get(organization.selectOrganization).click();
  });
});
