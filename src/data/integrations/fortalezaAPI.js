import axios from "axios";

export class FortalezaAPI {
  constructor() {
    this.baseURL = "https://dados.fortaleza.ce.gov.br/api/3/action";
  }

  async getDataset(datasetId) {
    try {
      const response = await axios.get(`${this.baseURL}/package_show?id=${datasetId}`);
      return response.data.result;
    } catch (error) {
      console.error("Erro ao consultar Dados Fortaleza:", error.message);
      throw new Error("Falha na integração com API externa");
    }
  }

  async getResource(resourceId) {
    try {
      const response = await axios.get(`${this.baseURL}/resource_show?id=${resourceId}`);

      console.log(response.data.result)

      return response.data.result;
    } catch (error) {
      console.error("Erro ao consultar Dados Fortaleza:", error.message);
      throw new Error("Falha na integração com API externa");
    }
  }
}