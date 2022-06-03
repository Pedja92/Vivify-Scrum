import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import organizationLocators from "../pages/organization.json";
import Login from "../support/classes/login/index.js";

const login = new Login();

describe("Login", () => {
  beforeEach(() => {
    login.setupTests();
  });

  it("Attempt to login with empty fields", () => {
    login.loginWithEmptyCredentials();

    login.validateUnsuccessfullLoginEmptyFields(
      "The email field must be a valid email",
      "The password field is required",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with empty password field", () => {
    login.loginWithEmptyPassword("pp3@gmail.com");

    login.validateUnsuccessfullLoginEmptyPasswordField(
      "The password field is required",
      "The email field must be a valid email",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with empty email field", () => {
    login.loginWithEmptyUsername("03091992");

    login.validateUnsuccessfullLoginEmptyEmailField(
      "The email field must be a valid email",
      "The password field is required",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with wrong password", () => {
    login.login("pp3@gmail.com", "P03091992p");

    login.validateUnsuccessfullLoginWrongPassword(
      "Oops! Your email/password combination is incorrect",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with wrong email", () => {
    login.login("pp@gmail.com", "03091992");

    login.validateUnsuccessfullLoginWrongEmail(
      "Oops! Your email/password combination is incorrect",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Back to Home page", () => {
    cy.get(login.backToHomeLink).click();

    login.validateVisitingHomePage(
      "https://cypress-api.vivifyscrum-stage.com/"
    );
  });

  it("Navigate to sign up", () => {
    cy.get(login.backToHomeLink).click();

    login.validateVisitingSignUpPage(
      "https://cypress-api.vivifyscrum-stage.com/"
    );
  });

  it("Successfull log in", () => {
    login.login("pp3@gmail.com", "03091992");
    login.validateSuccessfullLogin(
      "https://cypress.vivifyscrum-stage.com/my-organizations"
    );
  });
});
