import { apiData, authHeader } from "../../test-data/apiData";

const apiUrl = () => Cypress.env("apiUrl");

describe("Auth API", () => {
  it("TC-AUTH-001: login and store access token", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl()}/auth/login`,
      body: { ...apiData.validUser, expiresInMins: 30 },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.accessToken).to.be.a("string").and.not.be.empty;
      expect(res.body.refreshToken).to.be.a("string").and.not.be.empty;

      Cypress.env("accessToken", res.body.accessToken);
      Cypress.env("refreshToken", res.body.refreshToken);
    });
  });

  it("TC-AUTH-002: reject invalid credentials", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl()}/auth/login`,
      body: apiData.invalidUser,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
    });
  });

  it("TC-AUTH-003: get current user with stored token", () => {
    cy.apiLogin();

    cy.request({
      method: "GET",
      url: `${apiUrl()}/auth/me`,
      headers: authHeader(),
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq(apiData.validUser.username);
    });
  });

  it("TC-AUTH-004: reject /auth/me without token", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl()}/auth/me`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([401, 403]);
    });
  });
});
