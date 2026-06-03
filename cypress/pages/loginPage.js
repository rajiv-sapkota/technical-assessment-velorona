
//creating class to define POM for login page

export default class LoginPage {
  //urls
  loginPageUrl = "/login";

  //isolating selectors
  loginFormSelector = '[test="login-form"]';
  loginButtonSelector = '[test="login-button"]';
  emailFieldSelector = '[test="email-input"]';
  passwordFieldSelector = '[test="password-input"]';
  googleLoginButtonSelector = '[test="google-login-button"]';
  forgotPasswordLinkSelector = '[test="forgot-password-link"]';
  notificationLocator = '[test="notification"]';

  //navigation
  visitLoginPage() {
    cy.visit(this.loginPageUrl);
  }

  //page actions
  typeEmail(email) {
    cy.get(this.emailFieldSelector).click().type(email);
  }

  typePassword(password) {
    cy.get(this.passwordFieldSelector).click().type(password, { log: false });
  }

  clickLoginButton() {
    cy.get(this.loginButtonSelector).click();
  }

  clickGoogleLoginButton() {
    cy.get(this.googleLoginButtonSelector).click();
  }

  clickForgotPasswordLink() {
    cy.get(this.forgotPasswordLinkSelector).click();
  }

  //assertions

  assertUserIsInLoginPage() {
    cy.url().should("eq", this.loginPageUrl);
  }

  assertLoginFormFieldsAreVisible() {
    cy.get(this.loginFormSelector).should("be.visible");
    cy.get(this.emailFieldSelector).should("be.visible");
    cy.get(this.passwordFieldSelector).should("be.visible");
    cy.get(this.loginButtonSelector).should("be.visible");
    cy.get(this.forgotPasswordLinkSelector).should("be.visible");
    cy.get(this.googleLoginButtonSelector).should("be.visible");
  }

  assertUserIsInDashboard() {
    cy.url().should("eq", "/dashboard");
  }

  assertNotification(expectedMessage) {
    cy.get(this.notificationLocator).should("have.text", expectedMessage);
  }

  assertErrorMessage(selector,expectedMessage) {
    cy.get(selector).should("have.text", expectedMessage);
  }
}



