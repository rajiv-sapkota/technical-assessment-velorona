
//importing login page POM class
import LoginPage from "../pages/loginPage.js";


const loginPage = new LoginPage()

describe("Login Scenarios", () => {


    //using hook for reuseability
    beforeEach(() => {
        loginPage.visitLoginPage()
        loginPage.assertLoginFormFieldsAreVisible()
    });
    

    it("TC-LOGIN-001: Verify if user can login with valid credentials", () => {
        loginPage.typeEmail("testemail@gmail.com")
        loginPage.typePassword("password")
        loginPage.clickLoginButton()
        loginPage.assertUserIsInDashboard()
        loginPage.assertNotification("Logged in Successfully")
    })

    it("TC-LOGIN-002: Verify if user can login with invalid email and valid password", () => {
      loginPage.typeEmail("testemail@gmail.com");
      loginPage.typePassword("password");
      loginPage.clickLoginButton();
      loginPage.assertUserIsInDashboard();
      loginPage.assertNotification("Your email or password is incorrect");
    });
    
    
})