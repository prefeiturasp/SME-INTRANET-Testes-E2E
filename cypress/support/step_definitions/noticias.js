import {
	Given,
	When,
	Then,
	And,
	Before,
} from 'cypress-cucumber-preprocessor/steps'
import gerarNoticia from '../utils/gerar_noticias'
import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'

const Dado = Given
const Quando = When
const Entao = Then
const E = And

const novaNoticia = gerarNoticia()

let urlNoticia = ''

Dado('eu realizo login na intranet no wp-admin', () => {
	cy.realizar_login_intranet()
})

Dado('eu publiquei uma notícia', () => {
	cy.realizar_login_intranet()
	cy.ir_para_formulario_adicionar_noticias()
	cy.preencher_titulo(novaNoticia.titulo)
	cy.preencher_subtitulo(novaNoticia.subtitulo)
	cy.preencher_conteudo_noticia(novaNoticia.conteudo)
	cy.preencher_resumo(novaNoticia.resumo)
	cy.clicar_botao_publicar()
})

E('acesso a página de adição de notícias', () => {
	cy.ir_para_formulario_adicionar_noticias()
})

Quando('preencho todos os campos do formulário', () => {
	cy.preencher_titulo(novaNoticia.titulo)
	cy.preencher_subtitulo(novaNoticia.subtitulo)
	cy.preencher_conteudo_noticia(novaNoticia.conteudo)
	cy.preencher_resumo(novaNoticia.resumo)
})

E('clico no botão publicar', () => {
	cy.clicar_botao_publicar()
})

Entao(
	'devo visualizar a mensagem informando que o post foi publicado com sucesso',
	() => {
		cy.validar_mensagem_sucesso_ao_postar_noticia()
	},
)

Quando('eu não preencho o campo subtitulo', () => {
	cy.preencher_titulo(novaNoticia.titulo)
	cy.preencher_conteudo_noticia(novaNoticia.conteudo)
	cy.preencher_resumo(novaNoticia.resumo)
})

Quando('eu clico na URL da notícia criada', () => {
	cy.clicar_link_permanente()
})

Quando('eu acesso a notícia criada na intranet', () => {
	cy.visitar_noticia_criada()
})

Entao(
	'devo visualizar a mensagem informando que o campo de subtitulo é obrigatório',
	() => {
		cy.validar_mensagem_obrigatoriedade_campo_subtitulo()
	},
)
Entao('devo visualizar a notícia publicada no portal da intranet', () => {
	cy.validar_titulo_noticia_publicada(novaNoticia.titulo)
})

Entao(
	'devo visualizar a exibição do título da notícia publicada no portal da intranet',
	() => {
		cy.validar_titulo_noticia_publicada(novaNoticia.titulo)
	},
)
Entao(
	'devo visualizar a exibição do subtítulo da notícia publicada no portal da intranet',
	() => {
		cy.validar_subtitulo_noticia_publicada(novaNoticia.subtitulo)
	},
)
Entao(
	'devo visualizar a exibição do corpo da notícia publicada no portal da intranet',
	() => {
		cy.validar_conteudo_noticia_publicada(novaNoticia.conteudo)
	},
)

Before({ tags: '@validar_noticia_criada' }, () => {
	cy.realizar_login_intranet()
	cy.ir_para_formulario_adicionar_noticias()
	cy.preencher_titulo(novaNoticia.titulo)
	cy.preencher_subtitulo(novaNoticia.subtitulo)
	cy.preencher_conteudo_noticia(novaNoticia.conteudo)
	cy.preencher_resumo(novaNoticia.resumo)
	cy.clicar_botao_publicar()
	cy.obter_link_da_nova_noticia()
})
