import organization from "../pages/organization.json";
import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import boardLocators from "../pages/board.json";
import sideMenuLocators from "../pages/sideMenu.json";

describe("Create boards", () => {
  // const endpoint =
  //   "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations";

  // const auth_token =
  //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY3lwcmVzcy1hcGkudml2aWZ5c2NydW0tc3RhZ2UuY29tL2FwaS92Mi9sb2dpbiIsImlhdCI6MTY1Mjg3Njk0MywibmJmIjoxNjUyODc2OTQzLCJqdGkiOiJCUWJZMjNXSUxMSmlxQU1IIiwic3ViIjoxNjAwLCJwcnYiOiI5ZjhhMjM4OWEyMGNhMDc1MmFhOWU5NTA5MzUxNTUxN2U5MGUxOTRjIiwidXNlciI6eyJpZCI6MTYwMCwidG9rZW5fdXVpZCI6bnVsbH19.5fcLIP2staN2ig-5lSPQmGwJiJX20RE_QWB61Lf_3IU";

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
    cy.visit("baseUrl");
    cy.get(login.emailAdressInputField).type(username);
    cy.get(login.passwordInputField).type(password);
    cy.get(login.loginButton).click();
    cy.wait(4000);

    // cy.get(headerLocators.displayAllOrganizations).click();
    // cy.get(organization.addNewOrganizationButton).click();
    // cy.get(organization.organizationNameTextBox).type("Predrag");
    // cy.get(organization.nextButton).click();
    // cy.get(organization.createButton).click();

    //cy.wait(8000);
  });

  it("Create new Scrum board", () => {
    cy.visit("/my-organizations");
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type("Pedja");
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectScrumBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();

    cy.get(boardLocators.scrumBoardCard)
      .should("be.visible")
      .and("contain.text", "Pedja")
      .and("contain.text", "Active Sprints")
      .and("contain.text", "Members");
  });

  it("Create new Kanban board", () => {
    cy.visit("/my-organizations");
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();
    cy.get(boardLocators.boardTitleTextBox).type("Pedja");
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.selectKanbanBoardType).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.wait(2000);
    cy.get(boardLocators.nextAndFinishButton).click();
    cy.wait(2000);
    cy.go("back");
    cy.get(boardLocators.kanbanBoardCard)
      .should("be.visible")
      .and("contain.text", "Pedja")
      .and("not.contain", "Active Sprints")
      .and("contain.text", "Members");
  });

  it("Navigate back through board creation", () => {
    cy.visit("/my-organizations");
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
    cy.get(boardLocators.previousButton).click();
    cy.get(boardLocators.previousButton).click();
    cy.get(boardLocators.previousButton).click();

    cy.get(boardLocators.addNewBoardModal)
      .should("be.visible")
      .and("contain.text", "New Board");
  });

  it("Trying to create board withou title", () => {
    cy.visit("/my-organizations");
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.addNewBoard).click();

    cy.get(boardLocators.nextAndFinishButton).should("be.disabled");
  });

  it("Open board", () => {
    cy.visit("/my-organizations");
    cy.get(organization.selectOrganization).click();
    cy.get(boardLocators.confirmOnPopUpModal).click();
    cy.get(boardLocators.selectBoard).click();

    cy.get(boardLocators.boarsDetailPageHeader).should(($element) => {
      expect($element[0]).to.contain.text("Backlog");
      expect($element[1]).to.contain.text("Sprint 1");
    });
  });

  it("Archive board", () => {
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
