import { query } from "../../database/database.js";

export default class IndicadorRepository {

    findIndicadorByPmfId = async (id) => {
        return query(
            'SELECT * FROM bairro WHERE id_pmf = $1',
            [categoria]
        ).catch(() => {
            throw new Error("Não foi possível encontrar um bairro com o id especificado.")
        });
    }
    
    findIndicadorByCategoria = async (categoria) => {
        return query(
            'SELECT * FROM bairro WHERE categoria = $1',
            [categoria]
        ).catch(() => {
            throw new Error("Não foi possível encontrar um bairro com o id especificado.")
        });
    }

}
