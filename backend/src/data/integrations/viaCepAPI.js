import axios from "axios";
import { AppError, respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";

export default function viaCepAPI() {

	const baseURL = "https://viacep.com.br/ws/";

	return {

		async getNomeRuaByCep(cep) {
			try {
				const response = await axios.get(`${baseURL}/${cep}/json`);
				
				if(Number(response.data.ibge) != 2304400){
					return respostaErroPadrao(502, "Algum dos endereços inseridos está incorreto ou não pertence à cidade de Fortaleza.")
				}

				return respostaSucesso(response.status, {
					bairro: response.data.bairro, 
					rua: response.data.logradouro,
				})
				
			} catch (error) {
				throw new AppError(error.message, error.response.status)
			}
		},

		async getBairroByCep(cep) {
			try {
				const response = await axios.get(`${baseURL}/${cep}/json`);

				if(Number(response.data.ibge) != 2304400){
					return respostaErroPadrao(502, "Algum dos endereços inseridos está incorreto ou não pertence à cidade de Fortaleza.")
				}
				
				return respostaSucesso(response.status, response.data.bairro)
			} catch (error) {
                throw new AppError(error.message, error.response.status)
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