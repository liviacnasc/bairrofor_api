import BairroService from "../services/BairroService.js";
import IntegrationService from "../services/IntegrationService.js";

const bairroService = new BairroService;
const integrationService = new IntegrationService;

export default class Controller {

    async getBairroById(id) {
        try {
            const result = await bairroService.getBairroById(id)

            return result;
        } catch(error) {

        }
    }

    async getResultadoComparacao(bairro1, bairro2, localInteresse) {
        try {
            const result = await bairroService.getBairroById(id)

            return result;
        } catch(error) {

        }
    }

    async getInfobyCEP(cep){
        try {
            const result = bairroService.getBairroByCEP(cep)

            return result;
        } catch (error) {
            
        }

    }

    async getLatLongbyCEPeNumero(numero, cep){
        try {
            const result = await integrationService.getlatLongByNumeroECEP(numero, cep)

            return result;
        } catch (error) {
            
        }

    }
}