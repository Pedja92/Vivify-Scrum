import login from "../pages/loginModal.json";

describe("Login", () => {
  it("Attempt to login with empty fields", () => {
    cy.visit("loginUrl");
    cy.get(login.loginButton).click();
  });

  it("Attempt to login with empty password field", () => {
    cy.visit("loginUrl");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.loginButton).click();
  });

  it("Attempt to login with empty email field", () => {
    cy.visit("loginUrl");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
  });

  it("Attempt to login with wrong password", () => {
    cy.visit("loginUrl");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.passwordInputField).type("123456789");
    cy.get(login.loginButton).click();
  });

  it("Attempt to login with wrong email", () => {
    cy.visit("baseUrl");
    cy.get(login.emailAdressInputField).type("pp22222@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
  });

  it("Back to Home page", () => {
    cy.visit("loginUrl");
    cy.get(login.backToHomeLink).click();
  });

  it("Navigate to sign up", () => {
    cy.visit("loginUrl");
    cy.get(login.backToHomeLink).click();
  });

  it("Successfull log in", () => {
    cy.visit("loginUrl");
    cy.get(login.emailAdressInputField).type("pp2@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
  });
});
