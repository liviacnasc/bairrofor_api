import { respostaErroPadrao } from "../../helpers/responses.js";
import bairroService from "../services/BairroService.js";
import integrationService from "../services/IntegrationService.js";
import {compararBairrosUseCase, distanciaEntrePontosUseCase} from "../usecases/useCases.js";


export default function controller() {
    const bairroServ = bairroService();
    const integrationServ = integrationService();

    return {
        
        async getBairroById(id) {
            try {
                const result = await bairroServ.getBairroById(id)

                return result;
            } catch(error) {
                return respostaErroPadrao(error.statusCode, error.message)
            }
        },

        async getInfobyCEP(cep){
            try {
                const result = await bairroServ.getBairroByCEP(cep)
                
                return result;
            } catch (error) {
                return respostaErroPadrao(error.statusCode, error.message)
            }

        },

        async getLatLongbyCEPeNumero(numero, cep){
            try {
                const result = await integrationServ.getlatLongByNumeroECEP(numero, cep)
                
                return result;
            } catch (error) {
                return respostaErroPadrao(error.statusCode, error.message)
            }

        },

        async getDistancia(origem, destino){
            try {                
                return await distanciaEntrePontosUseCase(origem, destino);
            } catch (error) {
                return respostaErroPadrao(error.statusCode, error.message)
            }
        },

        async comparar(origem, destino, localInteresse){
            try {                
                return await compararBairrosUseCase(origem, destino, localInteresse);
            } catch (error) {
                return respostaErroPadrao(error.statusCode, error.message)
            }
        }
    }
}