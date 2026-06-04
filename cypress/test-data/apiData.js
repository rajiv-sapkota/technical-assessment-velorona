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

export const authHeader = () => ({
  Authorization: `Bearer ${Cypress.env("accessToken")}`,
});
