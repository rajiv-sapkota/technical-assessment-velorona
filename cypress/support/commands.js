import { apiData } from "../test-data/apiData";

const apiUrl = () => Cypress.env("apiUrl");

Cypress.Commands.add("apiLogin", () => {
  cy.session(
    "apiUser",
    () => {
      cy.request({
        method: "POST",
        url: `${apiUrl()}/auth/login`,
        body: apiData.validUser,
      }).then((res) => {
        Cypress.env("accessToken", res.body.accessToken);
        Cypress.env("refreshToken", res.body.refreshToken);
      });
    },
    {
      validate() {
        cy.request({
          method: "GET",
          url: `${apiUrl()}/auth/me`,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          failOnStatusCode: false,
        })
          .its("status")
          .should("eq", 200);
      },
    },
  );
});
