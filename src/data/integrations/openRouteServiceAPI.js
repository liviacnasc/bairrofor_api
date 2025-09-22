import axios from "axios";
import { ExternalAPIError } from "../../helpers/errors.js";
import { config } from "dotenv";
config();

export class OrsAPI {
    constructor() {
        this.baseURL = "https://api.openrouteservice.org/v2/directions/";
    }

    async getDistanciaPorCarro(origem, destino){
        try {
            const response = await axios.post(
                `${this.baseURL}driving-car`,
                {
                    coordinates: [origem, destino],
                },
                {
                    headers: {
                        "Authorization": process.env.OPENROUTESERVICE_API_KEY,
                        "Content-Type": "application/json",
                },
                }
            );

            console.log(response.data.routes[0])

            return response.data.summary;
        } catch(error) {
            throw new ExternalAPIError(error.message, error.response.status)
        }

    }

    async getDistanciaAPe(origem, destino) {
        try {
            const response = await axios.post(
                `${this.baseURL}foot-walking`,
                {
                    coordinates: [origem, destino],
                },
                {
                    headers: {
                        "Authorization": process.env.OPENROUTESERVICE_API_KEY,
                        "Content-Type": "application/json",
                },
                }
            );

            console.log(response.data.routes[0])

            return response.data.summary;
        } catch(error) {
            throw new ExternalAPIError(error.message, error.response.status)
        }
    }
}

