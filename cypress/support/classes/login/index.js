import Utils from "../utils/index.js";
import loginLocators from "../../../pages/loginModal.json";
import headerLocators from "../../../pages/header.json";
import organizationLocators from "../../../pages/organization.json";

const utils = new Utils();

class Login {
  setupTests() {
    utils.visitUrl("baseUrl");
  }

  loginWithEmptyCredentials() {
    cy.get(loginLocators.loginButton).click();
  }
  loginWithEmptyUsername(password) {
    cy.get(loginLocators.passwordInputField).type(`${password}`);
    cy.get(loginLocators.loginButton).click();
  }

  loginWithEmptyPassword(username) {
    cy.get(loginLocators.emailAdressInputField).type(`${username}`);
    cy.get(loginLocators.loginButton).click();
  }
  login(username, password) {
    cy.get(loginLocators.emailAdressInputField).type(`${username}`);
    cy.get(loginLocators.passwordInputField).type(`${password}`);
    cy.get(loginLocators.loginButton).click();
  }
  //ASSERTIONS
  validateUnsuccessfullLoginEmptyFields(
    messageEmailField,
    messagePasswordField,
    expectedUrl
  ) {
    cy.get(loginLocators.loginModal)
      .should("contain.text", messageEmailField)
      .and("contain.text", messagePasswordField);
    cy.url().should("eq", expectedUrl);
  }
  validateUnsuccessfullLoginEmptyPasswordField(
    messageEmailField,
    messagePasswordField,
    expectedUrl
  ) {
    cy.get(loginLocators.loginModal)
      .should("contain.text", messageEmailField)
      .and("not.contain", messagePasswordField);
    cy.url().should("eq", expectedUrl);
  }
  validateUnsuccessfullLoginEmptyEmailField(
    messagePasswordField,
    messageEmailField,
    expectedUrl
  ) {
    cy.get(loginLocators.loginModal)
      .should("contain.text", messagePasswordField)
      .and("not.contain", messageEmailField);
    cy.url().should("eq", expectedUrl);
  }
  validateUnsuccessfullLoginWrongPassword(messagePasswordField, expectedUrl) {
    cy.get(loginLocators.loginModal).should(
      "contain.text",
      messagePasswordField
    );
    cy.url().should("eq", expectedUrl);
  }
  validateUnsuccessfullLoginWrongEmail(errorMessage, expextedUrl) {
    cy.get(loginLocators.loginModal).should("contain.text", errorMessage);
    cy.url().should("eq", expextedUrl);
  }
  validateVisitingHomePage(expectedUrl) {
    cy.url().should("eq", expectedUrl);
  }
  validateVisitingSignUpPage(expectedUrl) {
    cy.url().should("eq", expectedUrl);
    cy.get(loginLocators.productSelectionModal).should("be.visible");
  }
  validateSuccessfullLogin(expectedUrl) {
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.url().should("eq", expectedUrl);
    cy.get(organizationLocators.allOrganizationPlaceholder).should(
      "be.visible"
    );
  }
}

export default Login;
