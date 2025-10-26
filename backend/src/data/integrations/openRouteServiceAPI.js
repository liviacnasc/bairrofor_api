import axios from "axios";
import { config } from "dotenv";
config();

//closure
export default function orsAPI() {
    
    const baseURL = "https://api.openrouteservice.org/v2/directions/";

    return {
        async getDistanciaPorCarro(origem, destino){
            try {
                const response = await axios.post(
                    `${baseURL}driving-car`,
                    {
                        coordinates: [origem, destino],
                    },
                    {
                        headers: {
                            "Authorization": process.env.OPENROUTESERVICE_API_KEY,
                            "Content-Type": "application/json",
                    },
                    }
                )

                return {
                    success: true,
                    statusCode: 200,
                    value: response.data.routes[0].summary
                }
            } catch(error) {
                return {
                    success: false,
                    statusCode: error.response.status,
                    message: error.message
                };
            }

        },
        async getDistanciaAPe(origem, destino) {
            try {
                const response = await axios.post(
                    `${baseURL}foot-walking`,
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

                return {
                    success: true,
                    statusCode: 200,
                    value: response.data.routes[0].summary
                }
            } catch(error) {
                return {
                    success: false,
                    statusCode: error.response.status,
                    message: error.message
                }
            }
        }
    }
}

