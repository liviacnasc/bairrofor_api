import axios from "axios";
import Openrouteservice from 'openrouteservice-js'

let orsDirections = new Openrouteservice.Directions({ api_key: process.env.OPENROUTESERVICE_API_KEY });

export class orsAPI {
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
                        "Authorization": ORS_API_KEY,
                        "Content-Type": "application/json",
                },
                }
            );

            const rota = response.data.routes[0];
        } catch(error) {
            throw new ExternalAPIError(error.message, error.response.status)
        }

    }

    async getDistanciaAPe(origem, destino) {
        try {
            const response = await axios.post(
                `${this.baseURL}foot`,
                {
                    coordinates: [origem, destino],
                },
                {
                    headers: {
                        "Authorization": ORS_API_KEY,
                        "Content-Type": "application/json",
                },
                }
            );

            const rota = response.data.routes[0];
        } catch(error) {
            throw new ExternalAPIError(error.message, error.response.status)
        }
    }
}

