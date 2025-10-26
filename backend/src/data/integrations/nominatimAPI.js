import axios from "axios";

//closure
export default function nominatimAPI() {
  
  const baseURL = "https://nominatim.openstreetmap.org/";
  
  return {
    async getLocalizacao(numero, nomeRua) {
      try {
        const response = await axios.get(`${baseURL}/search?q=${encodeURI(numero + " " + nomeRua)}&format=json`);

        return {
          success: true,
          statusCode: 200,
          value:{
            lat: response.data[0].lat,
            long: response.data[0].lon
          } 
        }
        } catch (error) {
            return {
              success: false,
              statusCode: error.response.status,
              message: error.message
        }
      }
    }
  }
}