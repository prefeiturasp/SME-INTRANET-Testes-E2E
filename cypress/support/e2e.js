import './commands/commands_login'
import './commands/commands_globais'
import './commands/commands_noticias'

Cypress.on('uncaught:exception', (err, runnable) => {
	return false
})
