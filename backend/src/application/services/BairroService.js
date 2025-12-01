import bairroRepository from "../../data/repositories/bairro.js";
import { AppError, respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";
import integrationService from "./IntegrationService.js";



export default function bairroService() {
    const integrationServ = integrationService();
    const bairroRepo = bairroRepository();
    
    return {

        async getBairros() {

            const response = await bairroRepo.getAllBairros();
            
            return response;

        },

        async getBairroById(id) {

            const response = await bairroRepo.findBairroByPmfId(id);
            
            return response;

        },
                
        async getBairroByCEP(cep) {
            const result = await integrationServ.getBairroByCEP(cep);

            if(!result.success) {
               throw new AppError(`ViaCEP: ${result.message}`, result.statusCode)
            }
            
            const response = await bairroRepo.getBairroByNome(result.value);

            if(!response.success) {
               throw new AppError(response.message, response.statusCode)
            }

            return respostaSucesso(response.statusCode, response.value);
        },
    
}
    
    
}