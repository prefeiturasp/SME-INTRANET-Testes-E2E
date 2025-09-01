import { faker } from '@faker-js/faker'
faker.locale = 'pt_BR'

function gerarPagina() {
	const pagina = {
		titulo: faker.lorem.words(2),
		conteudo: faker.lorem.words(2),
	}
	return pagina
}

export default gerarPagina
