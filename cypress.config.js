require("dotenv").config();

const os = require("node:os");
const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: process.env.BASE_URL,

    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      });

      return config;
    },
  },
  env: {
    validEmail: process.env.VALID_EMAIL || process.env.VALID_USERNAME,
    validPassword: process.env.VALID_PASSWORD,
    apiUrl: process.env.API_URL,
    apiUsername: process.env.API_USERNAME,
    apiPassword: process.env.API_PASSWORD,
  },
});
