import BairroRepository from "../../data/repositories/bairro.js";
import { ExternalAPIError, NotFoundError } from "../../helpers/errors.js";
import IntegrationService from "./IntegrationService.js";


const integrationService = new IntegrationService();
const bairroRepository = new BairroRepository();

export default class BairroService {
    
    async getBairroById(id) {
        try {
            const response = await bairroRepository.findBairroByPmfId(id);

            return response;

        } catch (error) {
            throw new NotFoundError(error.message)
        }
    }

    async getBairroByCEP(cep) {
        try {
            const nome = await integrationService.getBairroByCEP(cep);
            
            return await bairroRepository.getBairroByNome(nome);

        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }
    }

    async getComparador(origem, destino, localInteresse) {
        try {
            const nome = await integrationService.getBairroByCEP(cep);
            
            return await bairroRepository.getBairroByNome(nome);

        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }
    }


}