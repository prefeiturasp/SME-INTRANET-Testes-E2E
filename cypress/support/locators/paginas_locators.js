export class Adicionar_Pagina_Localizadores {
	// Opções de Tela
	botao_opcoes_de_tela = () => '#show-settings-link'
	checkbox_atributos_pagina = () => '#pageparentdiv-hide'
	checkbox_imagem_destacada = () => '#postimagediv-hide'
	checkbox_discussao = () => '#commentstatusdiv-hide'
	checkbox_slug = () => '#slugdiv-hide'
	checkbox_autor = () => '#authordiv-hide'
	radio_uma_coluna = () => 'input[name="screen_columns"][value="1"]'
	radio_duas_colunas = () => 'input[name="screen_columns"][value="2"]'
	checkbox_editor_tela_cheia = () => '#editor-expand-toggle'

	// Formulário de Página
	campo_titulo = () => '#title'
	iframe_conteudo_visual = () => '#content_ifr'
	textarea_conteudo_codigo = () => '#content'
	botao_adicionar_midia = () => '#insert-media-button'

	// Atributos da Página
	select_ascendente = () => '#parent_id'
	select_modelo = () => '#page_template'
	campo_ordem = () => '#menu_order'

	// Imagem Destacada
	botao_definir_imagem_destacada = () => '#set-post-thumbnail'

	// Discussão
	checkbox_permitir_comentarios = () => '#comment_status'
	checkbox_permitir_pingbacks = () => '#ping_status'

	// Slug e Autor
	campo_slug = () => '#post_name'
	select_autor = () => '#post_author_override'

	// Ações de Publicação
	botao_salvar_rascunho = () => '#save-post'
	botao_visualizar = () => '#post-preview'
	botao_publicar = () => '#publish'
	botao_mover_para_lixeira = () => '.submitdelete'

	// Mensagens
	mensagem_conexao_perdida = () => '#lost-connection-notice'
	mensagem_sucesso = () => '#message'
	mensagem_local_storage = () => '#local-storage-notice'

	// Ajuda contextual
	botao_ajuda = () => '#contextual-help-link'
	aba_sobre_paginas = () => '#tab-link-about-pages'
	aba_inserir_midia = () => '#tab-link-inserting-media'
	aba_atributos_pagina = () => '#tab-link-page-attributes'
	conteudo_aba_ativa = () => '.help-tab-content.active'

	// Agendamento de Publicação
	botao_editar_data = () => '.edit-timestamp'
	select_mes = () => '#mm'
	campo_dia = () => '#jj'
	campo_ano = () => '#aa'
	campo_hora = () => '#hh'
	campo_minuto = () => '#mn'
	botao_ok_data = () => '.save-timestamp'
}
