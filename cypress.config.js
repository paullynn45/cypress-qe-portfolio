const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    setupNodeEvents(on, config) {
      // Wire node event listeners here when needed (was cypress/plugins/index.js).
    },
  },
})
