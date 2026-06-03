const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: process.env.BASE_URL,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    validEmail: process.env.VALID_USERNAME,
    validPassword: process.env.VALID_PASSWORD,
  },
});
