import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'

function gerarNoticia() {
	const noticia = {
		titulo: faker.lorem.sentence(),
		subtitulo: faker.lorem.sentence(),
		conteudo: faker.lorem.paragraphs(3, '\n\n'),
		resumo: faker.lorem.sentences(2),
	}
	return noticia
}

export default gerarNoticia
