import BairroRepository from "../../data/repositories/bairro.js";
import IntegrationService from "./IntegrationService.js";


const integrationService = new IntegrationService();
const bairroRepository = new BairroRepository();

export default class BairroService {
    
    async getBairroById(id) {
        return await bairroRepository.findBairroByPmfId(id);
    }

    async getIdBairroByCEP(cep) {
        const nome = integrationService.getBairroByCEP(cep);

        return bairroRepository.getBairroByNome(nome);
    }

    async getBairroByCEP(cep) {
        const nome = await integrationService.getBairroByCEP(cep);

        return (await bairroRepository.getBairroByNome(nome)).rows;
    }


}