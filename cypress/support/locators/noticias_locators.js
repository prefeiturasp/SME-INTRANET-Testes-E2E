export class Adicionar_Noticia_Localizadores {
	// Tela de Opções
	botao_opcoes_de_tela = () => '#show-settings-link'
	checkbox_categorias = () => '#categorias-noticiasdiv-hide'
	checkbox_imagem_destacada = () => '#postimagediv-hide'
	checkbox_resumo = () => '#postexcerpt-hide'
	checkbox_discussao = () => '#commentstatusdiv-hide'
	checkbox_slug = () => '#slugdiv-hide'
	checkbox_autor = () => '#authordiv-hide'
	radio_uma_coluna = () => 'input[name="screen_columns"][value="1"]'
	radio_duas_colunas = () => 'input[name="screen_columns"][value="2"]'
	checkbox_editor_tela_cheia = () => '#editor-expand-toggle'

	// Formulário de Post
	campo_titulo = () => '#title'
	campo_subtitulo = () => '#acf-field_653180a042e9c'
	iframe_conteudo_visual = () => '#content_ifr'
	textarea_conteudo_codigo = () => '#content'
	botao_adicionar_midia = () => '#insert-media-button'

	// Categorias
	aba_todas_categorias = () => '#categorias-noticias-all'
	aba_mais_usadas = () => '#categorias-noticias-pop'
	toggle_adicionar_categoria = () => '#categorias-noticias-add-toggle'
	campo_nova_categoria = () => '#newcategorias-noticias'
	botao_submit_categoria = () => '#categorias-noticias-add-submit'

	// Imagem destacada
	botao_definir_imagem_destacada = () => '#set-post-thumbnail'

	// Resumo e Discussão
	campo_resumo = () => '#excerpt'
	checkbox_permitir_comentarios = () => '#comment_status'
	checkbox_permitir_pingbacks = () => '#ping_status'

	// Slug e Autor
	campo_slug = () => '#post_name'
	select_autor = () => '#post_author_override'

	// Ações de publicação
	botao_salvar_rascunho = () => '#save-post'
	botao_visualizar = () => '#post-preview'
	botao_publicar = () => '#publish'

	//Mensagens
	mensagem_sucesso = () => '#message'
	mensagem_obrigatoriedade = () => '.acf-error-message'

	//Link Permanente
	link_permanente = () => '#sample-permalink a'
}

export class Menu_Noticias_Localizadores {
	// Item principal do menu Notícias
	menu_noticias = () => '#menu-posts-noticia'

	// Link que abre a lista de submenus
	link_menu_noticias = () => '#menu-posts-noticia > a'

	// Submenu: Todos as Notícias
	submenu_todas_as_noticias = () =>
		'#menu-posts-noticia .wp-submenu-wrap a.wp-first-item'

	// Submenu: Adicionar Notícia
	submenu_adicionar_noticia = () =>
		'#menu-posts-noticia .wp-submenu-wrap a[href="post-new.php?post_type=noticia"]'

	// Submenu: Categorias de Notícias
	submenu_categorias = () =>
		'#menu-posts-noticia .wp-submenu-wrap a[href^="edit-tags.php?taxonomy=categorias-noticias"]'
}

export class Visualizar_Noticia_Publicada_Localizadores {
	// Banner da página de notícia
	banner_imagem = () => '.bn_fx_banner'
	titulo_banner = () => '.bn_fx_banner h1'

	// Conteúdo principal da notícia
	data_publicacao = () => '.content-article .data .display-autor'
	titulo_principal = () => '.content-article .titulo-noticia-principal'
	subtitulo = () => '.content-article .sub-titulo'
	conteudo_principal = () => '.content-article p:nth-of-type(2)'

	// Lista de notícias recentes (seção lateral)
	titulo_noticias_recentes = () => '.news-recents h3'
	lista_noticias_recentes = () => '.noticias-recentes .recado'

	// Seção de comentários
	titulo_comentarios = () => '.news-comment .rel-title h2'
	campo_comentario = () => '#comment'
	botao_enviar_comentario = () => '#submit'
	mensagem_obrigatoria_comentario = () => '.comment-form .acf-error-message'
}
