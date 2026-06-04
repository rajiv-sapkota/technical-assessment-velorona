
//test data for API tests
export const apiData = {
  validUser: {
    username: "emilys",
    password: "emilyspass",
  },

  invalidUser: {
    username: "invalid_user",
    password: "wrong_password",
  },
};


// Helper function to generate auth header with stored access token
export const authHeader = () => ({
  Authorization: `Bearer ${Cypress.env("accessToken")}`,
});
