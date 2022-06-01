import organization from "../pages/organization.json";
import login from "../pages/loginModal.json";
import headerLocators from "../pages/header.json";
import boardLocators from "../pages/board.json";
import Organization from "../support/classes/organizations/index.js";

const organization1 = new Organization();

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
    organization1.setupTests();
  });

  it("Create organization", () => {
    cy.visit("/my-organizations");
    organization1.createOrganization("Predrag");

    organization1.verifyCreateOrganization(
      "Predrag",
      "Projects",
      "Boards",
      "Edit Organization",
      "Archive Organization",
      "Add new Project",
      "Add new Board",
      "Predrag Pejovic"
    );
  });

  it("Create organization with empty name", () => {
    organization1.createOrganizationWithEmptyName();
    organization1.verifyUnsuccessfullCreatingOrganizationWithEmpyName();
  });

  it("Navigate back through modal", () => {
    organization1.navigateBackThroughModal("Predrag");
    organization1.verifySuccessfullNavigatingBackThroughModal(
      "New Organization"
    );
  });

  it("Edit Organization name", () => {
    organization1.editOrganizationName("Pejovic");
    organization1.verifySuccessfullEditingOrganizationName("Pejovic");
  });

  it("Archive organization", () => {
    organization1.achiveOrganization();
    organization1.verifySuccessfullOrganizationAchiving(
      "Archived Organizations",
      "Pejovic"
    );
  });

  it("Unarchive organization", () => {
    organization1.unachiveOrganization();
    organization1.verifySuccessfullOrganizationUnachiving("Pejovic");
  });

  it("Delete archived organization", () => {
    organization1.deleteAchivedOrganization("03091992");
    organization1.verifySuccessfullOrganizationDeleting(
      "Welcome to the team! Welcome to VivifyScrum!"
    );
  });

  it("Open Organization detail page", () => {
    organization1.openOrganization("Predrag");
    organization1.verifyOpeningOrganizationDetailPage(
      "Active Boards",
      "Add new Board"
    );
  });
});
