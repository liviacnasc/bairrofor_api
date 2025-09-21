import { FortalezaAPI } from "../../data/integrations/FortalezaAPI.js";
import { ViaCepAPI } from "../../data/integrations/viaCepAPI.js";
import { NominatimAPI } from "../../data/integrations/nominatimAPI.js";


const fortalezaAPI = new FortalezaAPI();
const viaCEP = new ViaCepAPI();
const nominatim = new NominatimAPI();

export default class IntegrationService {

    async getBairroByCEP(cep) {

        const result = await viaCEP.getBairroByCep(cep);
        
        console.log(result)
        
        return result;
    }

    async getNomeRuaByCEP(cep) {
        const result = await viaCEP.getNomeRuaByCep(cep);

        return result;
    }

    async getlatLongByNumeroECEP(numero, cep) {
        const nomeRua = await viaCEP.getNomeRuaByCep(cep);

        const result = await nominatim.getEndereco(numero, nomeRua);
        
        console.log(result)
        
        return result;
    }

    async getDistancia() {

    }

}