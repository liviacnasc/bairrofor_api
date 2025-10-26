import bairroRepository from "../../data/repositories/bairro.js";
import { respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";
import integrationService from "./IntegrationService.js";



export default function bairroService() {
    const integrationServ = integrationService();
    const bairroRepo = bairroRepository();
    
    return {

        async getBairroById(id) {

            const response = await bairroRepo.findBairroByPmfId(id);
            
            return response;

        },
                
        async getBairroByCEP(cep) {
            const result = await integrationServ.getBairroByCEP(cep);

            if(!result.success) {
                return respostaErroPadrao(result.statusCode, `ViaCEP: ${result.message}`)
            }
            
            const response = await bairroRepo.getBairroByNome(result.value);

            if(!response.success) {
                return respostaErroPadrao(response.statusCode, response.message)
            }

            return respostaSucesso(response.statusCode, response.value);
        },
        
        async getComparador(origem, destino, localInteresse) {
            try {
                const nome = await integrationServ.getBairroByCEP(cep);
                
                return await bairroRepo.getBairroByNome(nome);
                
            } catch (error) {

            }
        }
}
    
    
}