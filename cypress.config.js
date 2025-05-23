const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			on('file:preprocessor', cucumber())
		},
		specPattern: 'cypress/e2e/**/**/*.{feature,cy.{js,jsx,ts,tsx}}',
		baseUrl: 'https://hom-intranet.sme.prefeitura.sp.gov.br/',
	},
})
