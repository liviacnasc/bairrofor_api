import axios from "axios";

export class NominatimAPI {
  constructor() {
    this.baseURL = "https://nominatim.openstreetmap.org/";
  }

  async getEndereco(numero, nomeRua) {
    try {
      const response = await axios.get(`${this.baseURL}/search?q=${encodeURI(numero + " " + nomeRua)}&format=json`);

      return {
        lat: response.data[0].lat,
        long: response.data[0].lon
      }
    } catch (error) {
      console.error("Erro ao consultar Nominatim:", error.message);
      throw new Error(error.message);
    }
  }

}