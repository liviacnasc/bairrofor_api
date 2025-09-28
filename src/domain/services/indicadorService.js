const comparador = (e1, e2) => e1 > e2 ? e1 : e2

// função de alta ordem
function criarComparador(extrairIndicador) {

  return (bairro1, bairro2) => {
    const valor1 = extrairIndicador(bairro1);
    const valor2 = extrairIndicador(bairro2);

    return valor1 > valor2 ? bairro1.bairro_nome : bairro2.bairro_nome;
  };
}

// funções puras
const extrairArea = bairro => bairro.indicador.territorio.area
const extrairPopulacao = bairro => bairro.indicador.populacao.populacao
const extrairIdhRenda = bairro => bairro.indicador.socioeconomico.idh_renda
const extrairIdh = bairro => bairro.indicador.socioeconomico.idh
const extrairIdhEducacao = bairro => bairro.indicador.socioeconomico.idh_educacao

// comparadores especificos
const comparadorArea = criarComparador(extrairArea);
const comparadorPopulacao = criarComparador(extrairPopulacao);
const comparadorIdhRenda = criarComparador(extrairIdhRenda);
const comparadorIdh = criarComparador(extrairIdh);
const comparadorIdhEducacao = criarComparador(extrairIdhEducacao);

// closure
export default function comparar(bairro1, bairro2) {

	return {
		resultados: {
			populacao: comparadorPopulacao(bairro1, bairro2),
			area: comparadorArea(bairro1, bairro2),
			idh: comparadorIdh(bairro1, bairro2),
			idhRenda: comparadorIdhRenda(bairro1, bairro2),
			idhEducacao: comparadorIdhEducacao(bairro1, bairro2)
		}
	}
}