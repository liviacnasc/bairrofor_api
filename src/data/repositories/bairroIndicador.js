import { query } from "../../database/database.js";

export default class BairroIndicadorRepository {

    findBairroByPmfId = async (id) => {
        return query(
            'SELECT * FROM bairro WHERE id_pmf = $1',
            [id]
        ).catch(() => {
            throw new Error("Não foi possível encontrar um bairro com o id especificado.")
        });
    }

    getBairrosByPmfId = async (id1, id2) => {
        return query(
            'SELECT * FROM bairro WHERE id_pmf IN ($1, $2)',
            [id1, id2]
        ).catch(() => {
            throw new Error("Não foi possível encontrar os bairros com os ids especificados.")
        });
    }
    
    findBairroByNome = async (nome) => {
        return query(
            'SELECT * FROM bairro WHERE nome = $1',
            [nome]
        ).catch(() => {
            throw new Error("Não foi possível encontrar um bairro com o nome especificado.")
        });
    }

}