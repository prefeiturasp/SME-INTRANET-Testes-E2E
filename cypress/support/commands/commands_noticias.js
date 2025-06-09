import {
	Adicionar_Noticia_Localizadores,
	Visualizar_Noticia_Publicada_Localizadores,
} from '../locators/noticias_locators'
import 'cypress-iframe'

const adicionar_Noticia_Localizadores = new Adicionar_Noticia_Localizadores()
const visualizar_Noticia_Publicada_Localizadores =
	new Visualizar_Noticia_Publicada_Localizadores()

Cypress.Commands.add('ir_para_formulario_adicionar_noticias', (device) => {
	cy.configurar_visualizacao(device)
	cy.visit('/wp-admin/post-new.php?post_type=noticia')
})

Cypress.Commands.add('preencher_titulo', (titulo) => {
	cy.get(adicionar_Noticia_Localizadores.campo_titulo()).type(titulo)
})
Cypress.Commands.add('preencher_subtitulo', (subtitulo) => {
	cy.get(adicionar_Noticia_Localizadores.campo_subtitulo()).type(subtitulo)
})

Cypress.Commands.add('preencher_conteudo_noticia', (conteudo) => {
	cy.frameLoaded(adicionar_Noticia_Localizadores.iframe_conteudo_visual())
	cy.iframe(adicionar_Noticia_Localizadores.iframe_conteudo_visual())
		.clear()
		.type(conteudo)
})

Cypress.Commands.add('preencher_resumo', (resumo) => {
	cy.get(adicionar_Noticia_Localizadores.campo_resumo()).type(resumo)
})

Cypress.Commands.add('clicar_botao_publicar', () => {
	cy.get(adicionar_Noticia_Localizadores.botao_publicar())
		.should('be.visible')
		.click()
})
Cypress.Commands.add('clicar_link_permanente', () => {
	cy.get(adicionar_Noticia_Localizadores.link_permanente())
		.should('be.visible')
		.invoke('removeAttr', 'target')
		.click()
})
Cypress.Commands.add('validar_mensagem_sucesso_ao_postar_noticia', () => {
	cy.get(adicionar_Noticia_Localizadores.mensagem_sucesso())
		.contains('Post publicado.')
		.should('be.visible')
})
Cypress.Commands.add('validar_mensagem_obrigatoriedade_campo_subtitulo', () => {
	cy.get(adicionar_Noticia_Localizadores.mensagem_obrigatoriedade())
		.contains('O valor Insira o subtítulo é obrigatório')
		.should('be.visible')
})
Cypress.Commands.add('validar_titulo_noticia_publicada', (titulo) => {
	cy.get(visualizar_Noticia_Publicada_Localizadores.titulo_principal())
		.contains(titulo)
		.should('be.visible')
})
