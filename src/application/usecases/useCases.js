import comparar from "../../domain/services/indicadorService.js";
import { respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";
import bairroService from "../services/BairroService.js";
import integrationService from "../services/IntegrationService.js";

const integrationServ = integrationService();
const bairroServ = bairroService();

export const compararBairrosUseCase = async (origem, destino, localInteresse) => {
    
    try {
        // colocando os endereços em um array
        const enderecos = [ origem, destino, localInteresse ];
        
        //pegando os dados e coordenadas de cada bairro a partir do endereço
        const localidades = await Promise.all(
            enderecos.map(async (endereco) => {
                const coordenadas = await integrationServ.getlatLongByNumeroECEP(endereco.numero, endereco.cep);
                if(!coordenadas.success){
                    return null;
                }
    
                const dados = await bairroServ.getBairroByCEP(endereco.cep)
                if(dados.success){
                    return {
                        dadosBairro: dados.value[0],
                        coordenadas: coordenadas.value
                    }
                }
                
                return null;
            })

        )
        // filtrando nulos e verificando se todos os endereços foram verificados
        if(localidades.filter(Boolean).length < 3){
            return respostaErroPadrao(502, "Algum dos endereços inseridos está incorreto.")
        }

        // calculando as distâncias entre as localidades
        const distanciasERotas = await Promise.all(
            localidades.flatMap((coordenadas1, i) =>
                localidades.slice(i + 1).map( async (coordenadas2) => {
                    const result = await integrationServ.getDistancia(
                        [coordenadas1.coordenadas.long, coordenadas1.coordenadas.lat], 
                        [coordenadas2.coordenadas.long, coordenadas2.coordenadas.lat]
                    )
                    
                    if(result.success) {
                        return {
                            origem: coordenadas1.dadosBairro.bairro_nome,
                            destino: coordenadas2.dadosBairro.bairro_nome,
                            distancia: result.value
                        }
                    }

                    return null;
                })
            )
        )

        if(distanciasERotas.filter(Boolean).length < 3){
            return respostaErroPadrao(502, "Não foi possível calcular as distâncias.")
        }

        console.log(localidades)

        const comparacoes = comparar(localidades[0].dadosBairro, localidades[1].dadosBairro)

        return respostaSucesso(comparacoes.statusCode, {
            resultadosComparacao: comparacoes.resultados,
            dadosBairros: localidades,
            distanciasERotas: distanciasERotas
        });
    } catch (error) {
        return respostaErroPadrao(error.statusCode, error.message)
    }

}

export const distanciaEntrePontosUseCase = async (origem, destino) => {
    try {
        const origemResult = await integrationServ.getlatLongByNumeroECEP(origem.numero, origem.cep);

        if(!origemResult.success){
            return respostaErroPadrao(origemResult.statusCode, origemResult.message);
        }

        const destinoResult = await integrationServ.getlatLongByNumeroECEP(destino.numero, destino.cep);
        
        if(!destinoResult.success){
            return respostaErroPadrao(destinoResult.statusCode, origemResult.message);
        }
        const response = await integrationServ.getDistancia(
            [origemResult.value.long, origemResult.value.lat],
            [destinoResult.value.long, destinoResult.value.lat])
        
        if(!response.success){
            respostaErroPadrao(response.statusCode, response.message)
        }

        return respostaSucesso(response.statusCode, response.value);
    } catch (error) {
        return respostaErroPadrao(error.statusCode, error.message)
    }
}