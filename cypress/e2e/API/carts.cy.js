const apiUrl = () => Cypress.env("apiUrl");

describe("Carts API", () => {
  
  // Ensure we have a valid token before each test
  beforeEach(() => {
    cy.apiLogin();
  });

  it("TC-CARTS-001: get cart by id", () => {
    cy.request("GET", `${apiUrl()}/carts/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.products).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-CARTS-002: get carts by user", () => {
    cy.request("GET", `${apiUrl()}/carts/user/5`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.carts).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-CARTS-003: add cart", () => {
    cy.request("POST", `${apiUrl()}/carts/add`, {
      userId: 1,
      products: [
        { id: 1, quantity: 2 },
        { id: 144, quantity: 1 },
      ],
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.userId).to.eq(1);
    });
  });

  it("TC-CARTS-004: delete cart", () => {
    cy.request("DELETE", `${apiUrl()}/carts/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.isDeleted).to.eq(true);
    });
  });
});
