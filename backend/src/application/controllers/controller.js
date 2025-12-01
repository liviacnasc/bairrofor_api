import { respostaErroPadrao } from "../../helpers/responses.js";
import bairroService from "../services/BairroService.js";
import integrationService from "../services/IntegrationService.js";
import { compararBairrosUseCase, distanciaEntrePontosUseCase } from "../usecases/useCases.js";


export default function controller() {
    const bairroServ = bairroService();
    const integrationServ = integrationService();

    return {

        async getBairros() {
            const result = await bairroServ.getBairros()

            return result;
        },

        async getBairroById(id) {
            const result = await bairroServ.getBairroById(id)

            return result;
        },

        async getInfobyCEP(cep) {
            const result = await bairroServ.getBairroByCEP(cep)

            return result;
        },

        async getLatLongbyCEPeNumero(numero, cep) {
            const result = await integrationServ.getlatLongByNumeroECEP(numero, cep)

            return result;


        },

        async getDistancia(origem, destino) {
            return await distanciaEntrePontosUseCase(origem, destino);
        },

        async comparar(origem, destino, localInteresse) {
            return await compararBairrosUseCase(origem, destino, localInteresse);
        }
    }
}