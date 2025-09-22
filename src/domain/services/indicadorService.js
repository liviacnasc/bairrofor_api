
export class IndicadorService {

	comparar(bairro1, bairro2) {
		const populacaoResultado = this.comparadorPopulacao(bairro1, bairro2)
		const areaResultado = this.comparadorArea(bairro1, bairro2)
		const idhResultado = this.comparadorIDH(bairro1, bairro2)
		const idhRendaResultado = this.comparadorIDHRenda(bairro1, bairro2)
		const idhEducacaoResultado = this.comparadorIDHEducacao(bairro1, bairro2)

		return {
			resultados: {
				populacao: populacaoResultado,
				area: areaResultado,
				idh: idhResultado,
				idhRenda: idhRendaResultado,
				idhEducacao: idhEducacaoResultado
			}
		}
	}

	comparadorPopulacao(bairro1, bairro2) {
		const populacao1 = bairro1.indicadores['População']['População'];
		const populacao2 = bairro2.indicadores['População']['População'];

		if(populacao1 > populacao2) {
			return bairro1.bairro_nome;
		}

		return bairro2.bairro_nome;
	}

	comparadorArea(bairro1, bairro2) {
		const area1 = bairro1.indicadores['Território']['Área']
		const area2 = bairro2.indicadores['Território']['Área']

		if(area1 > area2) {
			return bairro1.bairro_nome
		}

		return bairro2.bairro_nome;
	}

	comparadorIDH(bairro1, bairro2) {
		const idh1 = bairro1.indicadores['Socioeconômico']['IDH']
		const idh2 = bairro2.indicadores['Socioeconômico']['IDH']

		if(idh1 > idh2) {
			return bairro1.bairro_nome
		}

		return bairro2.bairro_nome;
	}

	comparadorIDHRenda(bairro1, bairro2) {
		const idhRenda1 = bairro1.indicadores['Socioeconômico']['IDH Renda']
		const idhRenda2 = bairro2.indicadores['Socioeconômico']['IDH Renda']

		if(idhRenda1 > idhRenda2) {
			return bairro1.bairro_nome
		}

		return bairro2.bairro_nome;
	}

	comparadorIDHEducacao(bairro1, bairro2) {
		const idhEducacao1 = bairro1.indicadores['Socioeconômico']['IDH Educação']
		const idhEducacao2 = bairro2.indicadores['Socioeconômico']['IDH Educacão']

		if(idhEducacao1 > idhEducacao2) {
			return bairro1.bairro_nome
		}

		return bairro2.bairro_nome;
	}

}