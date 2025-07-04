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
const editarNoticia = gerarNoticia()

//----------------------------Dado----------------------------------------//

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

//----------------------------E----------------------------------------//

E('acesso a página de adição de notícias', () => {
	cy.ir_para_formulario_adicionar_noticias()
})

E('clico no botão publicar', () => {
	cy.clicar_botao_publicar()
})

E('acesso uma notícia publicada', () => {
	cy.visitar_listagem_noticias_intranet()
	cy.acessar_noticia_na_listagem_intranet(novaNoticia.titulo)
})

//----------------------------Quando----------------------------------------//

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
Quando('eu acesso a notícia editada na intranet', () => {
	cy.visitar_noticia_editada()
})
Quando('eu acesso a listagem de notícias na intranet', () => {
	cy.visitar_listagem_noticias_intranet()
})

Quando('preencho todos os campos do formulário', () => {
	cy.preencher_titulo(novaNoticia.titulo)
	cy.preencher_subtitulo(novaNoticia.subtitulo)
	cy.preencher_conteudo_noticia(novaNoticia.conteudo)
	cy.preencher_resumo(novaNoticia.resumo)
})

Quando('edito todos os campos do formulário', () => {
	cy.editar_titulo(editarNoticia.titulo)
	cy.editar_subtitulo(editarNoticia.subtitulo)
	cy.editar_conteudo_noticia(editarNoticia.conteudo)
	cy.editar_resumo(editarNoticia.resumo)
})

//----------------------------Então----------------------------------------//
Entao(
	'devo visualizar a mensagem informando que o post foi publicado com sucesso',
	() => {
		cy.validar_mensagem_sucesso_ao_postar_noticia()
	},
)
Entao(
	'devo visualizar a mensagem informando que o post foi atualizado com sucesso',
	() => {
		cy.validar_mensagem_sucesso_ao_atualizar_noticia()
	},
)

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
Entao('devo visualizar o título da notícia na listagem da intranet', () => {
	cy.validar_exibicao_noticia_na_listagem_intranet(novaNoticia.titulo)
})

Entao(
	'devo visualizar a exibição do título da notícia editada no portal da intranet',
	() => {
		cy.validar_titulo_noticia_publicada(editarNoticia.titulo)
	},
)

Entao(
	'devo visualizar a exibição do subtítulo da notícia editada no portal da intranet',
	() => {
		cy.validar_subtitulo_noticia_publicada(editarNoticia.subtitulo)
	},
)
Entao(
	'devo visualizar a exibição do corpo da notícia editada no portal da intranet',
	() => {
		cy.validar_conteudo_noticia_publicada(editarNoticia.conteudo)
	},
)

//----------------------------Hooks----------------------------------------//

Before({ tags: '@validar_noticia_criada' }, () => {
	cy.realizar_login_intranet()
	cy.ir_para_formulario_adicionar_noticias()
	cy.preencher_titulo(novaNoticia.titulo)
	cy.preencher_subtitulo(novaNoticia.subtitulo)
	cy.preencher_conteudo_noticia(novaNoticia.conteudo)
	cy.preencher_resumo(novaNoticia.resumo)
	cy.clicar_botao_publicar()
	cy.obter_link_da_noticia()
})
Before({ tags: '@validar_noticia_editada' }, () => {
	cy.realizar_login_intranet()
	cy.visitar_listagem_noticias_intranet()
	cy.acessar_noticia_na_listagem_intranet(editarNoticia.titulo)
	cy.obter_link_da_noticia_editada()
})
