import { FortalezaAPI } from "../../data/integrations/FortalezaAPI.js";
import { ViaCepAPI } from "../../data/integrations/viaCepAPI.js";
import { NominatimAPI } from "../../data/integrations/nominatimAPI.js";
import { ExternalAPIError, NotFoundError } from "../../helpers/errors.js";

const viaCEP = new ViaCepAPI();
const nominatim = new NominatimAPI();

export default class IntegrationService {

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
            throw new ExternalAPIError(error.message, error.statusCode)
        }
    }

    async getlatLongByNumeroECEP(numero, cep) {
        try {
            const nomeRua = await viaCEP.getNomeRuaByCep(cep);
    
            const result = await nominatim.getEndereco(numero, nomeRua);
    
            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }
    }

    async getDistancia() {

    }

}