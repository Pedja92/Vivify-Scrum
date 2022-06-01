import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import organizationLocators from "../pages/organization.json";
import Login from "../support/classes/login/index.js";

const login1 = new Login();

describe("Login", () => {
  beforeEach(() => {
    login1.setupTests();
  });

  it("Attempt to login with empty fields", () => {
    login1.loginWithEmptyCredentials();

    login1.validateUnsuccessfullLoginEmptyFields(
      "The email field must be a valid email",
      "The password field is required",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with empty password field", () => {
    login1.loginWithEmptyPassword("pp3@gmail.com");

    login1.validateUnsuccessfullLoginEmptyPasswordField(
      "The password field is required",
      "The email field must be a valid email",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with empty email field", () => {
    login1.loginWithEmptyUsername("03091992");

    login1.validateUnsuccessfullLoginEmptyEmailField(
      "The email field must be a valid email",
      "The password field is required",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with wrong password", () => {
    login1.login("pp3@gmail.com", "P03091992p");

    login1.validateUnsuccessfullLoginWrongPassword(
      "Oops! Your email/password combination is incorrect",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Attempt to login with wrong email", () => {
    login1.login("pp@gmail.com", "03091992");

    login1.validateUnsuccessfullLoginWrongEmail(
      "Oops! Your email/password combination is incorrect",
      "https://cypress.vivifyscrum-stage.com/login"
    );
  });

  it("Back to Home page", () => {
    cy.get(login.backToHomeLink).click();

    login1.validateVisitingHomePage(
      "https://cypress-api.vivifyscrum-stage.com/"
    );
  });

  it("Navigate to sign up", () => {
    cy.get(login.backToHomeLink).click();

    login1.validateVisitingSignUpPage(
      "https://cypress-api.vivifyscrum-stage.com/"
    );
  });

  it("Successfull log in", () => {
    login1.login("pp3@gmail.com", "03091992");
    login1.validateSuccessfullLogin(
      "https://cypress.vivifyscrum-stage.com/my-organizations"
    );
  });
});
