import organization from "../pages/organization.json";
import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import boardLocators from "../pages/board.json";

describe("Create new organization", () => {
  // const endpoint =
  //   "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations";

  // const auth_token =
  //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY1MzQyMzIwMywibmJmIjoxNjUzNDIzMjAzLCJqdGkiOiJNcURXUTNPMWtoaXlMeDZLIiwic3ViIjoxODU0LCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6MTg1NCwidG9rZW5fdXVpZCI6bnVsbH19.dbfEBfwgzq3LgwA85SIVVtKWcH-dBp65DEVhKRSMiYk";

  // const getAllBoards = {
  //   method: "GET",
  //   url: endpoint,
  //   headers: {
  //     authorization: auth_token,
  //   },
  // };

  // console.log(getAllBoards);
  // let arrayWithOrganizationId = [];
  // const endpointsWithOrganizationsIds = [];

  // beforeEach(() => {
  //   cy.request(getAllBoards).then((response) => {
  //     for (let i = 0; i < response.body.length; i++) {
  //       arrayWithOrganizationId.push(response.body[i].id);
  //       console.log(response.body[i].id);
  //     }

  //     for (let j = 0; j < response.body.length; j++) {
  //       endpointsWithOrganizationsIds.push(
  //         endpoint + "/" + arrayWithOrganizationId[j]
  //       );
  //     }
  //     console.log(
  //       "Ovo je lista endpointa sa ID-jevima" + endpointsWithOrganizationsIds
  //     );

  //     for (let k = 0; k < endpointsWithOrganizationsIds.length; k++) {
  //       const deleteAllBoards = {
  //         method: "POST",
  //         url: endpointsWithOrganizationsIds[k],
  //         headers: {
  //           authorization: auth_token,
  //         },
  //         body: {
  //           passwordOrEmail: "03091992",
  //         },
  //       };
  //       cy.request(deleteAllBoards);
  //     }
  //   });
  beforeEach(() => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.visit("/login");
    cy.get(login.emailAdressInputField).type(username);
    cy.get(login.passwordInputField).type(password);
    cy.get(login.loginButton).click();
    cy.wait(5000);
  });

  it("Create organization", () => {
    cy.visit("/my-organizations");
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.createButton).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.selectOrganization).should(($organizationModal) => {
      expect($organizationModal).to.contain("Predrag");
      expect($organizationModal).to.contain("Projects");
      expect($organizationModal).to.contain("Boards");
    });
    cy.get(organization.organizationCardHeader).should(($organizationModal) => {
      expect($organizationModal.first()).attr("title", "Edit Organization");
      expect($organizationModal.last()).attr("title", "Archive Organization");
    });
    cy.get(organization.organizationCardBody).should(($organizationModal) => {
      expect($organizationModal[0]).attr("title", "Add new Project");
      expect($organizationModal[1]).attr("title", "Add new Board");
    });
    cy.get(organization.organizationCardFooter).should(
      "have.attr",
      "title",
      "Predrag Pejovic"
    );
  });

  it("Create organization with empty name", () => {
    cy.visit("/my-organizations");
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.nextButton).should("be.disabled");
  });

  it("Navigate back through modal", () => {
    cy.visit("/my-organizations");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.previousButton).click();

    cy.get(organization.addNewOrganizationModalHeader)
      .should("be.visible")
      .and("have.text", "New Organization");

    cy.get(organization.addNewOrganizationModalBody).should("be.visible");
    cy.get(organization.cancelButton).click();
    cy.get(organization.organizationCard).should("have.length", 1);
  });

  it("Edit Organization name", () => {
    cy.visit("/my-organizations");
    //cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.editOrganization).click();
    cy.get(organization.organizationNameTextBoxOnEdit).clear().type("Pejovic");
    cy.get(organization.saveButtonOnEdit).click();
    cy.get(organization.organizationCardHeader).should(
      "contain.text",
      "Pejovic"
    );
  });

  it("Archive organization", () => {
    cy.visit("/my-organizations");
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();

    cy.get(organization.achivedOrganizationsPlaceholderHeader)
      .should("be.visible")
      .and("contain.text", "Archived Organizations");
    cy.get(organization.allOrganizationPlaceholder).should("have.length", 0);
    cy.get(organization.achivedOrganizationCard)
      .should("have.length", 2)
      .and("contains.text", "Predrag");
  });

  it("Unarchive organization", () => {
    cy.visit("/my-organizations");
    cy.get(organization.unarchiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();

    cy.get(organization.organizationCard)
      .should("have.length", 1)
      .and("contains.text", "Predrag");
  });

  it("Delete archived organization", () => {
    cy.visit("/my-organizations");
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();
    cy.get(organization.deleteArchivedOrganization).click({ force: true });
    cy.get(organization.passwordField).type("03091992");
    cy.get(organization.confirmDeletingOrganization).click();
    cy.get(organization.organizationCard).should("have.length", 0);

    cy.get(organization.emptyOrganizationBoardPlaceholderWelcomeMessage)
      .should("be.visible")
      .and("contains.text", "Welcome to the team! Welcome to VivifyScrum!");
  });

  it("Open Organization detail page", () => {
    cy.visit("/my-organizations");
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.createButton).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();

    cy.get(boardLocators.allBoardsPlaceholderHeader).should(
      "contain.text",
      "Active Boards"
    );
    cy.get(boardLocators.addNewBoard)
      .should("be.visible")
      .and("contain.text", "Add new Board");
  });
});
