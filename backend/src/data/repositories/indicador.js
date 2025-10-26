import { query } from "../../database/database.js";

export default function IndicadorRepository() {

    return {

        async getAllIndicadores() {
            try {
                const response = await query(
                    'SELECT * FROM indicador'
                )
                
                if(response.rowCount = 0){
                    throw new NotFoundError("Não foi possível encontrar um bairro com o id especificado.")
                }
                
                return {
                    success: true,
                    statusCode: 200,
                    value: response.rows[0]
                }
            } catch (error) {
                return {
                    success: false,
                    statusCode: 404,
                    message: `Não há registros: ${error}`
                }
            }
        },
    
        async findIndicadorByPmfId(id) {
            try {
                const response = await query(
                    'SELECT * FROM indicador WHERE indicador_id = $1',
                    [id]
                )
                
                if(response.rowCount = 0){
                    return {
                        success: false,
                        statusCode: 404,
                        message: `Não há registros: ${error}`
                    }
                }
                
                return {
                    success: true,
                    statusCode: 200,
                    value: response.rows[0]
                }
                
            } catch (error) {
                return {
                    success: false,
                    statusCode: 404,
                    message: `Não há registros: ${error}`
                }
            }
        },
    
        async findIndicadorByCategoria(categoria) {
            const response = await query(
                // TO DO
                [categoria]
            )
            if(response.rowCount = 0){
                throw new NotFoundError("Não foi possível encontrar um bairro com o id especificado.")
            }
            
            return response.rows[0];
        }
    
    }
}
