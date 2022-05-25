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
    cy.visit("loginUrl");
    cy.get(login.emailAdressInputField).type("pp3@gmail.com");
    cy.get(login.passwordInputField).type("03091992");
    cy.get(login.loginButton).click();
    cy.wait(3000);
  });

  it("Create organization", () => {
    //cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
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
    cy.get("[class='vs-c-my-organization__header'] span").should(
      ($organizationModal) => {
        expect($organizationModal.first()).attr("title", "Edit Organization");
        expect($organizationModal.last()).attr("title", "Archive Organization");
      }
    );
    cy.get("[class='vs-c-my-organization__body'] li").should(
      ($organizationModal) => {
        expect($organizationModal[0]).attr("title", "Add new Project");
        expect($organizationModal[1]).attr("title", "Add new Board");
      }
    );
    cy.get("[class='vs-c-my-organization__footer'] li").should(
      "have.attr",
      "title",
      "Predrag Pejovic"
    );
  });

  it("Create organization with empty name", () => {
    //cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.nextButton).should("be.disabled");
  });

  it("Navigate back through modal", () => {
    //cy.visit("baseUrl");
    cy.visit("https://cypress.vivifyscrum-stage.com/my-organizations");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.previousButton).click();

    cy.get("[class='vs-c-modal__title'] span")
      .should("be.visible")
      .and("have.text", "New Organization");

    cy.get("[class='vs-c-modal__body']").should("be.visible");
    cy.get(organization.cancelButton).click();
    //OVO trebam proveriti sta ce da se desi kada iskljucim beforeEach()
    cy.get("[class='vs-c-my-organizations-item-wrapper']").should(
      "have.length",
      1
    );
  });

  it("Edit Organization name", () => {
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.editOrganization).click();
    cy.get(organization.organizationNameTextBoxOnEdit).clear().type("Pejovic");
    cy.get(organization.saveButtonOnEdit).click();
    cy.get("[class='vs-c-my-organization__header']").should(
      "contain.text",
      "Pejovic"
    );
  });

  it("Archive organization", () => {
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();

    cy.get("[class='vs-c-my-organizations__header vs-c-organization__header']")
      .should("be.visible")
      .and("contain.text", "Archived Organizations");
    cy.get("vs-c-my-organizations-item-wrapper").should("have.length", 0);
    cy.get(
      "[class='vs-c-my-organizations-item-wrapper vs-c-my-organizations-item-wrapper--archived']"
    )
      .should("have.length", 1)
      .and("contain.text", "Pejovic");
  });

  it("Unarchive organization", () => {
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.unarchiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();

    cy.get("[class='vs-c-my-organizations-item-wrapper']").should(
      "have.length",
      1
    );
  });

  it("Delete archived organization", () => {
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.confirmArchivingOrganization).click();
    cy.get(organization.deleteArchivedOrganization).click({ force: true });
    cy.get(organization.passwordField).type("03091992");
    cy.get(organization.confirmDeletingOrganization).click();
    cy.wait(4000);
    cy.get("[class='vs-c-my-organizations-item-wrapper']").should(
      "have.length",
      1
    );
  });

  it("Open Organization detail page", () => {
    cy.visit("baseUrl");
    cy.get(headerLocators.displayAllOrganizations).click();
    cy.get(organization.addNewOrganizationButton).click();
    cy.get(organization.organizationNameTextBox).type("Predrag");
    cy.get(organization.nextButton).click();
    cy.get(organization.createButton).click();
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();

    cy.get(
      "[class='vs-c-organization__header vs-u-display--flex vs-u-space-between-flex vs-u-align-center']"
    ).should("contain.text", "Active Boards");
    cy.get("[class='vs-c-organization-boards__item--add-new']")
      .should("be.visible")
      .and("contain.text", "Add new Board");
  });
});
