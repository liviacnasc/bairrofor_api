import { config } from 'dotenv';
import swaggerAutogen from 'swagger-autogen';

config();

const doc = {
    info: {
        version: "1.0.0",
        title: "Bairros Fortaleza",
        description: "Some description..."
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`
        }
    ],
    components: {
        schemas: {
            comparadorSchema: {
                $origem: {
                    $numero: "1321",
                    $cep: "60811-905"
                },
                $destino: {
                    $numero: "71",
                    $cep: "60421440"
                }
            },
            comparadorSchema2: {
                $origem: {
                    $numero: "1321",
                    $cep: "60811-905"
                },
                $destino: {
                    $numero: "71",
                    $cep: "60421440"
                },
                $localInteresse: {
                    $numero: "282",
                    $cep: "60055402"
                }
            },
            bairroId: {
                id_pmf: "77",
                bairro_nome: "Rachel de Queiroz",
                indicador: {
                    "Socioeconômico": {
                    "IDH Renda": 0.115,
                    "IDH": 0.181,
                    "IDH Educação": 0.948
                    }}
            }
        },
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);