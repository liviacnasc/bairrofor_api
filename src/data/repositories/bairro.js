import { query } from "../../database/database.js";
import { NotFoundError } from "../../helpers/errors.js";


export default class BairroRepository {

    async getAllBairros() {
        const response = await query(
            'SELECT * FROM bairro',
        ).catch(() => {
            throw new NotFoundError("Não foi possível encontrar bairros.")
        });

        return response.rows[0];
    }

     async findBairroByPmfId(id) {
        const response = await query(
            'SELECT * FROM bairro WHERE id_pmf = $1',
            [id]
        )
        if(response.rowCount == 0){
            throw new NotFoundError("Não foi possível encontrar um bairro com o id especificado.")
        }
        
        return response.rows[0];
    }

    // async getBairrosByPmfId(id1, id2) {
    //     return await query(
    //         'SELECT * FROM bairro WHERE id_pmf IN ($1, $2)',
    //         [id1, id2]
    //     ).catch(() => {
    //         throw new NotFoundError("Não foi possível encontrar os bairros com os ids especificados.")
    //     });
    // }
    
    async getBairroByNome(nome) {
        const response = await query(
            `SELECT bairro.id_pmf,
                    bairro.nome AS bairro_nome,
                    json_object_agg(indicador_por_categoria.categoria, indicador_por_categoria.indicador) AS indicador
            FROM bairro
            JOIN (
                SELECT  bairro_indicador.bairro_id_pmf,
                        indicador.categoria,
                        json_object_agg(indicador.nome, bairro_indicador.valor) AS indicador
                FROM bairro_indicador
                JOIN indicador
                ON bairro_indicador.indicador_id = indicador.indicador_id
                GROUP BY bairro_indicador.bairro_id_pmf, indicador.categoria
            ) AS indicador_por_categoria
            ON bairro.id_pmf = indicador_por_categoria.bairro_id_pmf
            WHERE bairro.nome IN ($1)
            GROUP BY bairro.id_pmf, bairro.nome`,
            [nome]
        )

        if(response.rowCount == 0){
            throw new NotFoundError("Não foi possível encontrar um bairro com o id especificado.")
        }
        
        return response.rows[0];
    }

}
