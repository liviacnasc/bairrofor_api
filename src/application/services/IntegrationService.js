import { FortalezaAPI } from "../../data/integrations/FortalezaAPI.js";
import { ViaCepAPI } from "../../data/integrations/viaCepAPI.js";
import { NominatimAPI } from "../../data/integrations/nominatimAPI.js";
import { ExternalAPIError, NotFoundError } from "../../helpers/errors.js";
import { OrsAPI } from "../../data/integrations/openRouteServiceAPI.js";

const viaCEP = new ViaCepAPI();
const nominatim = new NominatimAPI();
const orsAPI = new OrsAPI();

export default class IntegrationService {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getBairroByCEP(cep) {

        try {
            const result = await viaCEP.getBairroByCep(cep);
            
            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }
    }

    async getNomeRuaByCEP(cep) {
        try {
            const result = await viaCEP.getNomeRuaByCep(cep);
    
            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode);
        }
    }

    async getlatLongByNumeroECEP(numero, cep) {
        try {
            const nomeRua = await viaCEP.getNomeRuaByCep(cep);
            
            // a API Nominatim tem uma limitação de 1 requisição por segundo
            await this.sleep(1000)

            const result = await nominatim.getLocalizacao(numero, nomeRua);
    
            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode);
        }
    }

    async getDistancia(origem, destino) {
        try {
            const response = {
                carro: await orsAPI.getDistanciaPorCarro(origem, destino),
                pe: await orsAPI.getDistanciaAPe(origem, destino)
            }

            return response;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode);
        }
    }

}
