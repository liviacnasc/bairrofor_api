import { ExternalAPIError } from "../../helpers/errors.js";
import IntegrationService from "../services/IntegrationService.js";

const integrationService = new IntegrationService();

export class distanciaEntrePontosUseCase {

    async execute(origem, destino) {
        try {
            const origemLocalizacao = await integrationService.getlatLongByNumeroECEP(origem.numero, origem.cep);
            const destinoLocalizacao = await integrationService.getlatLongByNumeroECEP(destino.numero, destino.cep);
    
            const result = await integrationService.getDistancia([origemLocalizacao.long, origemLocalizacao.lat], [destinoLocalizacao.long, destinoLocalizacao.lat])
    
            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }
    }
}