const apiUrl = () => Cypress.env("apiUrl");

describe("Products API", () => {
  
  beforeEach(() => {
    cy.apiLogin();
  });

  it("TC-PRODUCTS-001: search products", () => {
    cy.request("GET", `${apiUrl()}/products/search?q=phone`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.products).to.be.an("array").and.not.be.empty;
    });
  });

  it("TC-PRODUCTS-002: get product by id", () => {
    cy.request("GET", `${apiUrl()}/products/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(1);
    });
  });

  it("TC-PRODUCTS-003: add product", () => {
    cy.request("POST", `${apiUrl()}/products/add`, {
      title: "Test Product",
      price: 49.99,
      category: "beauty",
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.title).to.eq("Test Product");
    });
  });

  it("TC-PRODUCTS-004: update and delete product", () => {
    cy.request("PUT", `${apiUrl()}/products/1`, {
      title: "Updated Product Title",
    }).then((updateRes) => {
      expect(updateRes.status).to.eq(200);

      cy.request("DELETE", `${apiUrl()}/products/1`).then((deleteRes) => {
        expect(deleteRes.status).to.eq(200);
        expect(deleteRes.body.isDeleted).to.eq(true);
      });
    });
  });
});
