
//importing login page POM class
import LoginPage from "../pages/loginPage.js";

//importing test data from faker library
import loginData from "../test-data/loginData.js";


const loginPage = new LoginPage()
const loginData = loginData()

describe("Login Scenarios", () => {


    //using hook for reuseability
    beforeEach(() => {
        loginPage.visitLoginPage()
        loginPage.assertLoginFormFieldsAreVisible()
    });
    

    it("TC-LOGIN-001: Verify if user can login with valid credentials", () => {
        loginPage.typeEmail(Cypress.env("validEmail"));
        loginPage.typePassword(Cypress.env("validPassword"));
        loginPage.clickLoginButton();
        loginPage.assertUserIsInDashboard();
        loginPage.assertNotification("Logged in Successfully");
    });

    it("TC-LOGIN-002: Verify if user can login with invalid email and valid password", () => {
      loginPage.typeEmail(loginData.invalidEmail);
      loginPage.typePassword(loginData.validPassword);
      loginPage.clickLoginButton();
      loginPage.assertUserIsInDashboard();
      loginPage.assertNotification("Your email or password is incorrect");
    });

    it("TC-LOGIN-004: Verify if user can login with valid email and invalid password", () => {
      loginPage.typeEmail(Cypress.env("validEmail"));
      loginPage.typePassword(loginData.validPassword);
      loginPage.clickLoginButton();
      loginPage.assertUserIsInDashboard();
      loginPage.assertNotification("Your email or password is incorrect");
    });

    it("TC-LOGIN-005: Verify if user can login with empty email and valid password", () => {
      loginPage.typeEmail("");
      loginPage.typePassword(loginData.validPassword);
      loginPage.clickLoginButton();
      loginPage.assertUserIsInDashboard();
      loginPage.assertNotification("Your email or password is incorrect");
    });
    
    
})