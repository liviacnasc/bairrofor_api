import axios from "axios";
import { ExternalAPIError } from "../../helpers/errors.js";

export class ViaCepAPI {
	constructor() {
		this.baseURL = "https://viacep.com.br/ws/";
	}

	async getNomeRuaByCep(cep) {
		try {
			const response = await axios.get(`${this.baseURL}/${cep}/json`);
			return response.data.logradouro;

		} catch (error) {
			throw new ExternalAPIError(error.message, error.response.status)
		}
	}

	async getBairroByCep(cep) {
		try {
			const response = await axios.get(`${this.baseURL}/${cep}/json`);

			return response.data.bairro;
		} catch (error) {
			throw new ExternalAPIError(error.message, error.response.status)
		}
	}

	async getBairroByNomeRua(rua) {
		try {
			const response = await axios.get(`${this.baseURL}CE/Fortaleza/${encodeURIComponent(rua)}/json`);

			return response.body[0].bairro;
		} catch (error) {
			throw new ExternalAPIError(error.message, error.response.status);
		}
	}

}