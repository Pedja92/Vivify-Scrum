import organization from "../pages/organization.json";
import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import boardLocators from "../pages/board.json";
import sideMenuLocators from "../pages/sideMenu.json";
import Boards from "../support/classes/boards/index.js";

const boards = new Boards();

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
    boards.setupTests();
  });

  it("Create new Scrum board", () => {
    boards.createScrumBoard("Pedja");
    boards.verifyCreatingScrumBoard("Pedja", "Active Sprints", "Members");
  });

  it("Create new Kanban board", () => {
    boards.createKanbanBoard("Pedja");
    boards.verifyCreatingKanbanBoard("Pedja", "Active Sprints", "Members");
  });

  it("Navigate back through board creation", () => {
    boards.navigateBackThroughModal("Pedja");
    boards.verifySuccessfullNavigateBackThroughModal("New Board");
  });

  it("Trying to create board without title", () => {
    boards.createBoardWithoutTitle();
    boards.verifyUnsuccessfullBoardCreatingWithoutName();
  });

  it("Open board", () => {
    boards.openBoard();
    boards.verifySuccessfullBoardOpening("Backlog", "Sprint 1");
  });

  it("Archive Scrum board", () => {
    boards.archiveScrumBoard();
  });

  it("Unarchive button", () => {
    boards.unarachiveScrumBoard();
  });

  it("Delete board", () => {
    boards.deleteScrumBoard();
  });
});
