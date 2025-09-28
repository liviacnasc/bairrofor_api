import axios from "axios";
import { respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";

export default function viaCepAPI() {

	const baseURL = "https://viacep.com.br/ws/";

	return {

		async getNomeRuaByCep(cep) {
			try {
				const response = await axios.get(`${baseURL}/${cep}/json`);
					
				return respostaSucesso(response.status, {
					bairro: response.data.bairro, 
					rua: response.data.logradouro
				})
				
			} catch (error) {
				return respostaErroPadrao(error.response.status, error.message)
			}
		},

		async getBairroByCep(cep) {
			try {
				const response = await axios.get(`${baseURL}/${cep}/json`);
				
				return respostaSucesso(response.status, response.data.bairro)
			} catch (error) {
                return respostaErroPadrao(error.response.status, error.message)
			}
		},

		async getBairroByNomeRua(rua) {
			try {
				const response = await axios.get(`${baseURL}CE/Fortaleza/${encodeURIComponent(rua)}/json`);
			
				return respostaSucesso(response.status, response.body[0].bairro)
			} catch (error) {
				return {
					success: false,
					statusCode: error.response.status,
					message: error.message
				};
			}
		}
	}
}