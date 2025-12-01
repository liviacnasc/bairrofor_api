import comparar from "../../domain/services/indicadorService.js";
import { AppError, respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";
import bairroService from "../services/BairroService.js";
import integrationService from "../services/IntegrationService.js";

const integrationServ = integrationService();
const bairroServ = bairroService();

export const compararBairrosUseCase = async (origem, destino, localInteresse) => {

    console.log("RECEBIDO NO USECASE:", { origem, destino, localInteresse });
    
    try {
        // colocando os endereços em um array
        const enderecos = [origem, destino, localInteresse];

        //pegando os dados e coordenadas de cada bairro a partir do endereço
        const localidades = await Promise.all(
            enderecos.map(async (endereco) => {
                console.log(endereco)
                const coordenadas = await integrationServ.getlatLongByNumeroECEP(endereco.numero, endereco.cep);

                const dados = await bairroServ.getBairroByCEP(endereco.cep)

                if (dados.success) {
                    return {
                        dadosBairro: dados.value[0],
                        coordenadas: coordenadas.value
                    }
                }

                return null;
            })

        )

        // filtrando nulos e verificando se todos os endereços foram verificados
        if (localidades.filter(Boolean).length < 3) {
            throw new AppError("Algum dos endereços inseridos está incorreto ou não pertence à cidade de Fortaleza.", 502)
        }

        // calculando as distâncias entre as localidades
        const distanciasERotas = await Promise.all(
            localidades.flatMap((coordenadas1, i) =>
                localidades.slice(i + 1).map(async (coordenadas2) => {
                    const result = await integrationServ.getDistancia(
                        [coordenadas1.coordenadas.long, coordenadas1.coordenadas.lat],
                        [coordenadas2.coordenadas.long, coordenadas2.coordenadas.lat]
                    )

                    if (result.success) {
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

        if (distanciasERotas.filter(Boolean).length < 3) {
            throw new AppError("Não foi possível calcular as distâncias.", 502)
        }

        const comparacoes = comparar(localidades[0].dadosBairro, localidades[1].dadosBairro)

        return respostaSucesso(200, {
            resultadosComparacao: comparacoes.resultados,
            dadosBairros: localidades,
            distanciasERotas: distanciasERotas
        });
    } catch (error) {
        console.log("USECASE:", error)

        if (error instanceof AppError) {
            throw error
        }
        throw new AppError(error.message, 500)
    }

}

export const distanciaEntrePontosUseCase = async (origem, destino) => {
    try {
        const origemResult = await integrationServ.getlatLongByNumeroECEP(origem.numero, origem.cep);

        if (!origemResult.success) {
            throw new AppError(origemResult.message, origemResult.statusCode,);
        }

        const destinoResult = await integrationServ.getlatLongByNumeroECEP(destino.numero, destino.cep);

        if (!destinoResult.success) {
            throw new AppError(destinoResult.message, destinoResult.statusCode);
        }
        const response = await integrationServ.getDistancia(
            [origemResult.value.long, origemResult.value.lat],
            [destinoResult.value.long, destinoResult.value.lat])

        if (!response.success) {
            throw new AppError(response.message, response.statusCode)
        }

        return respostaSucesso(response.statusCode, response.value);
    } catch (error) {
        if (error instanceof AppError) {
            throw error; // mantém o status original
        }

        throw new AppError(error.message || "Erro interno.", 500)
    }
}