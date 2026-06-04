require("dotenv").config();

const os = require("node:os");
const { defineConfig } = require("cypress");


module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: process.env.BASE_URL,

    setupNodeEvents(on, config) {
     

      return config;
    },
  },

  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false
  },
 
  
  env: {
    validEmail: process.env.VALID_EMAIL || process.env.VALID_USERNAME,
    validPassword: process.env.VALID_PASSWORD,
    apiUrl: process.env.API_URL,
    apiUsername: process.env.API_USERNAME,
    apiPassword: process.env.API_PASSWORD,
  },
});
