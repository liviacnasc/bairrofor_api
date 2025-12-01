import viaCepAPI from '../../data/integrations/viaCepAPI.js';
import orsAPI from '../../data/integrations/openRouteServiceAPI.js';
import nominatimAPI from '../../data/integrations/nominatimAPI.js';
import { AppError, respostaErroPadrao, respostaSucesso } from '../../helpers/responses.js';

//closure

export default function integrationService() {
    const viaCep = viaCepAPI();
    const ors = orsAPI();
    const nominatim = nominatimAPI();

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return {
        
        async getBairroByCEP(cep) {
            const response = await viaCep.getBairroByCep(cep);
            
            return response;
        },

        async getlatLongByNumeroECEP(numero, cep) {
            const result = await viaCep.getNomeRuaByCep(cep);

            if(!result.success) {
                console.log("ERRO result:", result);
                throw new AppError(result.message, result.statusCode)
            }
            
            // a API Nominatim tem uma limitação de 1 requisição por segundo
            await sleep(1000);
            
            const response = await nominatim.getLocalizacao(numero, result.value.rua);
            
            if(!response.success) {
                throw new AppError(response.message, response.statusCode)
            }

            return respostaSucesso(response.statusCode,response.value);
        },
        
        async getDistancia(origem, destino) {
            const carro = await ors.getDistanciaPorCarro(origem, destino)

            if(!carro.success){
                throw new AppError(carro.message, carro.statusCode)
            }
            const pe = await ors.getDistanciaAPe(origem, destino)

            if(!pe.success){
                throw new AppError(pe.message, pe.statusCode)
            }

            return respostaSucesso(200, {
                    carro: carro.value,
                    pe: pe.value
                }
            )
        }
    }
}
    