const { defineConfig } = require('cypress')

module.exports = defineConfig({
  numTestsKeptInMemory: 15,
  defaultCommandTimeout: 15000,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://www.nekmit.net"
  },
})

