import { query } from "../../database/database.js";

export default class IndicadorRepository {

    async getAllIndicadores() {
        const response = await query(
            'SELECT * FROM indicador',
            []
        )

        if(response.rowCount = 0){
            throw new NotFoundError("Não foi possível encontrar um bairro com o id especificado.")
        }
        
        return response.rows[0];
    }

    async findIndicadorByPmfId(id) {
        const response = await query(
            'SELECT * FROM indicador WHERE indicador_id = $1',
            [id]
        )

        if(response.rowCount = 0){
            throw new NotFoundError("Não foi possível encontrar um bairro com o id especificado.")
        }
        
        return response.rows[0];
    }
    
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
