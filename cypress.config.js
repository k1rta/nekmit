const { defineConfig } = require('cypress');

module.exports = defineConfig({
  numTestsKeptInMemory: 15,
  defaultCommandTimeout: 15000,
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    baseUrl: process.env.CYPRESS_BASE_URL || "https://k1rta.github.io/nekmit/"
  },
});
