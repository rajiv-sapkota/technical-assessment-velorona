import { apiData, authHeader } from "../../test-data/apiData";

const apiUrl = () => Cypress.env("apiUrl");

describe("Users API", () => {
  
  beforeEach(() => {
    cy.apiLogin();
  });

  it("TC-USERS-001: filter users", () => {
    cy.request(
      "GET",
      `${apiUrl()}/users/filter?key=hair.color&value=Brown`,
    ).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.users).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-USERS-002: search users", () => {
    cy.request("GET", `${apiUrl()}/users/search?q=Johnson`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.users).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-USERS-003: get user carts", () => {
    cy.request("GET", `${apiUrl()}/users/5/carts`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.carts).to.be.an("array");
    });
  });

  it("TC-USERS-004: get authenticated user", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl()}/user/me`,
      headers: authHeader(),
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(apiData.validUser.username);
    });
  });
});
