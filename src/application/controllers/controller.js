import { ExternalAPIError, NotFoundError } from "../../helpers/errors.js";
import BairroService from "../services/BairroService.js";
import IntegrationService from "../services/IntegrationService.js";
import { distanciaEntrePontosUseCase } from "../usecases/distanciaEntrePontosUseCase.js";

const bairroService = new BairroService;
const integrationService = new IntegrationService;

export default class Controller {

    async getBairroById(id) {
        try {
            const result = await bairroService.getBairroById(id)

            return result;
        } catch(error) {
            throw new NotFoundError(error.message)
        }
    }

    async getInfobyCEP(cep){
        try {
            const result = await bairroService.getBairroByCEP(cep)

            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }

    }

    async getLatLongbyCEPeNumero(numero, cep){
        try {
            const result = await integrationService.getlatLongByNumeroECEP(numero, cep)

            return result;
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }

    }

    async getDistancia(origem, destino){
        try {
            const usecase = new distanciaEntrePontosUseCase();

            return await usecase.execute(origem, destino);
        } catch (error) {
            throw new ExternalAPIError(error.message, error.statusCode)
        }

    }
}