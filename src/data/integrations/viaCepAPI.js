import axios from "axios";

export class ViaCepAPI {
  constructor() {
    this.baseURL = "https://viacep.com.br/ws/";
  }

  async getNomeRuaByCep(cep) {
    try {
      const response = await axios.get(`${this.baseURL}/${cep}/json`);
      return response.data.logradouro;
      
    } catch (error) {
      console.error("Erro ao consultar o CEP.", error.message);
    }
  }

  async getBairroByCep(cep) {
    try {
      const response = await axios.get(`${this.baseURL}/${cep}/json`);
      return response.data.bairro;
      
    } catch (error) {
      console.error("Erro ao consultar o CEP.", error.message);
    }
  }

  async getBairroByNomeRua(rua) {
    try {
      const response = await axios.get(`${this.baseURL}CE/Fortaleza/${encodeURIComponent(rua)}/json`);
      return response.body[0].bairro;
    } catch (error) {
      console.error("Erro ao consultar a rua:", error.message);
      throw new Error("Falha na integração com API externa");
    }
  }

}