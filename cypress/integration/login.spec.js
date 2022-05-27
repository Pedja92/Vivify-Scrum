import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import organizationLocators from "../pages/organization.json";

describe("Login", () => {
  it("Attempt to login with empty fields", () => {
    cy.visit("/login");
    cy.get(login.loginButton).click();

    cy.get(login.loginModal)
      .should("contain.text", "The email field must be a valid email")
      .and("contain.text", "The password field is required");
    cy.url().should("eq", "https://cypress.vivifyscrum-stage.com/login");
  });

  it("Attempt to login with empty password field", () => {
    cy.visit("/login");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.loginButton).click();

    cy.get(login.loginModal)
      .should("contain.text", "The password field is required")
      .and("not.contain", "The email field must be a valid email");
    cy.url().should("eq", "https://cypress.vivifyscrum-stage.com/login");
  });

  it("Attempt to login with empty email field", () => {
    cy.visit("/login");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();

    cy.get(login.loginModal)
      .should("contain.text", "The email field must be a valid email")
      .and("not.contain", "The password field is required");
    cy.url().should("eq", "https://cypress.vivifyscrum-stage.com/login");
  });

  it("Attempt to login with wrong password", () => {
    cy.visit("/login");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.passwordInputField).type("123456789");
    cy.get(login.loginButton).click();

    cy.get(login.loginModal).should(
      "contain.text",
      "Oops! Your email/password combination is incorrect"
    );
    cy.url().should("eq", "https://cypress.vivifyscrum-stage.com/login");
  });

  it("Attempt to login with wrong email", () => {
    cy.visit("/login");
    cy.get(login.emailAdressInputField).type("pp22222@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();

    cy.get(login.loginModal).should(
      "contain.text",
      "Oops! Your email/password combination is incorrect"
    );
    cy.url().should("eq", "https://cypress.vivifyscrum-stage.com/login");
  });

  it("Back to Home page", () => {
    cy.visit("/login");
    cy.get(login.backToHomeLink).click();

    cy.url().should("eq", "https://cypress-api.vivifyscrum-stage.com/");
  });

  it("Navigate to sign up", () => {
    cy.visit("/login");
    cy.get(login.backToHomeLink).click();

    cy.url().should("eq", "https://cypress-api.vivifyscrum-stage.com/");
    cy.get(login.productSelectionModal).should("be.visible");
  });

  it("Successfull log in", () => {
    cy.visit("/login");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
    cy.get(headerLocators.displayAllOrganizations).click();

    cy.url().should(
      "eq",
      "https://cypress.vivifyscrum-stage.com/my-organizations"
    );
    cy.get(organizationLocators.allOrganizationPlaceholder).should(
      "be.visible"
    );
  });
});
