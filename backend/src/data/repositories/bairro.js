import { query } from "../../database/database.js";
import { AppError, respostaErroPadrao, respostaSucesso } from "../../helpers/responses.js";

export default function bairroRepository() {

    return {
        async getAllBairros() {
            try {
                const response = await query(`
                    SELECT 
                        b.id_pmf,
                        b.nome AS bairro_nome,
                        json_object_agg(icat.categoria, icat.indicador) AS indicador
                    FROM bairro b
                    JOIN (
                        SELECT  
                            bi.bairro_id_pmf,
                            i.categoria,
                            json_object_agg(i.nome, bi.valor) AS indicador
                        FROM bairro_indicador bi
                        JOIN indicador i
                            ON bi.indicador_id = i.indicador_id
                        GROUP BY bi.bairro_id_pmf, i.categoria
                    ) AS icat
                        ON b.id_pmf = icat.bairro_id_pmf
                    GROUP BY b.id_pmf, b.nome;`);
                return respostaSucesso(200, response.rows)
            } catch (error) {
                throw new AppError(500, `Não há registros: ${error}`)
            }
        },
        async findBairroByPmfId(id) {
            try {
                const response = await query('SELECT * FROM bairro WHERE id_pmf = $1', [id]);

                if (response.rowCount == 0) {
                    throw new AppError(404, `Não foram encontrados indicadores: ${error}`)
                }

                return respostaSucesso(200, response.rows[0])
            } catch (error) {
                throw new AppError(404, `Não foram encontrado o bairro com o id indicado: ${error}`)
            }
        },
        async getBairroByNome(nome) {
            try {
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

                if (response.rowCount == 0) {
                    throw new AppError(404, `Não foram encontrados indicadores: ${error}`)
                }

                return respostaSucesso(200, response.rows)
            } catch (error) {
                throw new AppError(404, `Não foram encontrados indicadores: ${error}`)
            }
        }
    }
}