import comparar from "../../src/domain/services/indicadorService.js";

describe("indicadorService", () => {
  test("deve calcular os resultados corretamente", () => {
    const itaoca = {
            "id_pmf": "98",
            "bairro_nome": "Itaoca",
            "indicador": {
            "populacao": {
                "populacao": "3860"
            },
            "territorio": {
                "area": "0.7410",
                "regional_antiga": "SER IV"
            },
            "socioeconomico": {
                "idh_renda": "0.1070",
                "idh": "0.3730",
                "idh_educacao": "0.9590"
            }
        }
    }
    const edsonQueiroz = {
            "id_pmf": "57",
            "bairro_nome": "Edson Queiroz",
            "indicador": {
                "territorio": {
                    "area": "13.8480",
                    "regional_antiga": "SER VI"
                },
                "socioeconomico": {
                    "idh_renda": "0.1990",
                    "idh": "0.3500",
                    "idh_educacao": "0.9650"
                },
                "populacao": {
                    "populacao": "8448"
                }
            }
    }


    expect(comparar(itaoca, edsonQueiroz)).toEqual({
        resultados: {
            populacao: "Edson Queiroz",
			area: "Edson Queiroz",
			idh: "Itaoca",
			idhRenda: "Edson Queiroz",
			idhEducacao: "Edson Queiroz"
        }
    });
  });
});