import axios from "axios";

export default async function fortalezaAPI() {

  const baseURL = "https://dados.fortaleza.ce.gov.br/api/3/action";
  
  return {
      async getDataset(datasetId) {
        try {
        const response = await axios.get(`${baseURL}/package_show?id=${datasetId}`);

        return {
          success: true,
          statusCode: 200,
          value: response.data.result 
        } 

      } catch (error) {
        return {
          success: false,
          statusCode: 404,
          message: `Não há registros: ${error}` 
        } 
      }
    },
    
    async getResource(resourceId) {
      try {
        const response = await axios.get(`${baseURL}/resource_show?id=${resourceId}`);
        
        return {
          success: true,
          statusCode: 200,
          value: response.data.result 
        } 

      } catch (error) {
        return {
          success: false,
          statusCode: 404,
          message: `Não há registros: ${error}` 
        } 
      }
    }
  }
}