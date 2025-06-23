      # language: pt
      Funcionalidade: Noticias

      backgroud

      Cenário: Deve validar publicação de noticia com sucesso
      Dado eu realizo login na intranet no wp-admin 
      E acesso a página de adição de notícias
      Quando preencho todos os campos do formulário
      E clico no botão publicar
      Então devo visualizar a mensagem informando que o post foi publicado com sucesso

      Cenário: Deve validar mensagem de obrigatoriedade do campo de subtitulo
      Dado eu realizo login na intranet no wp-admin 
      E acesso a página de adição de notícias
      Quando eu não preencho o campo subtitulo 
      E clico no botão publicar
      Então devo visualizar a mensagem informando que o campo de subtitulo é obrigatório

      Cenário: Deve validar se a notícia foi publicada no portal da intranet
      Dado eu publiquei uma notícia 
      Quando eu clico na URL da notícia criada
      Então devo visualizar a notícia publicada no portal da intranet

      @validar_noticia_criada

      Cenário: Deve validar exibição do título da notícia publicada no portal da intranet
      Dado eu realizo login na intranet no wp-admin
      Quando eu acesso a notícia criada na intranet
      Então devo visualizar a exibição do título da notícia publicada no portal da intranet

      Cenário: Deve validar exibição do subtítulo da notícia publicada no portal da intranet
      Dado eu realizo login na intranet no wp-admin
      Quando eu acesso a notícia criada na intranet
      Então devo visualizar a exibição do subtítulo da notícia publicada no portal da intranet

      Cenário: Deve validar validar exibição do corpo da notícia publicada no portal da intranet
      Dado eu realizo login na intranet no wp-admin
      Quando eu acesso a notícia criada na intranet
      Então devo visualizar a exibição do corpo da notícia publicada no portal da intranet



      