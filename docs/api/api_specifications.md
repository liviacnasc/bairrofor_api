
> **Conteúdo**
> - Endpoints previstos
> - Parâmetros de requisição
> - Formatos de resposta
> - Autenticação de autorização
> - Exemplos de chamadas e res

### Endpoints previstos

### **GET** `/bairros/{id}`

#### Descrição: 

Recebe o id de um bairro e retorna dados básicos

#### Parâmetros da requisição:

| Parametro | Tipo | Descrição                |
| --------- | ---- | ------------------------ |
| `id`      | string  | Identificador do bairro. |

#### Exemplo

##### Requisição

```
http://localhost:8080/bairro/99
```

##### Resposta
``` json
[
	{
		"success": "true",
		"body": [
			{
			"id_pmf": "99",
			"id_ibge": "2304400100",
			"nome": "Itaperi",
			"ultima_atualizacao": "2022-11-13T03:00:00.000Z"
			}
		]
	}
]
```

### **GET** `/localizar/numero/{numero}/cep/{cep}`

#### Descrição:

Recebe um endereço (número e cep) e retorna coordenadas.

#### Parâmetros da requisição:

| Parametro | Tipo | Descrição                |
| --------- | ---- | ------------------------ |
| `numero`      | string  | Número da casa/prédio. |
| `cep`      | string  | CEP da rua. |
#### Exemplo

##### Requisição
```
http://localhost:8080/localizar/numero/71/cep/60421440
```
##### Resposta

``` json
{
  "success": "true",
  "body": {
    "lat": "-3.7735054",
    "long": "-38.5553965"
  }
}

```

### **GET** `/pesquisar`

#### Descrição:

Recebe um CEP e retorna dados básicos sobre o bairro em que está localizado.

#### Parâmetros da requisição:

query

| Parametro | Tipo | Descrição                |
| --------- | ---- | ------------------------ |
| `cep`      | string  | CEP da rua. |

#### Exemplo

###### Requisição

```
http://localhost:8080/localizar/numero/71/cep/60421440
```


###### Resposta

``` json
{
  "success": "true",
  "body": [
    {
      "id_pmf": "98",
      "bairro_nome": "Itaoca",
      "indicador": {
        "territorio": {
          "area": "0.7410",
          "regional_antiga": "SER IV"
        },
        "populacao": {
          "populacao": "3860"
        },
        "socioeconomico": {
          "idh_renda": "0.1070",
          "idh": "0.3730",
          "idh_educacao": "0.9590"
        }
      }
    }
  ]
}

```


### **POST** `/comparar`

#### Descrição:

Recebe três endereços (número e CEP) e retorna dados básicos, resultados das comparações entre os indicadores e as distâncias entre as localidades.

#### Parâmetros da requisição:

Sem parâmetros

#### Schema do body da requisição:
``` json
{
  "origem": {
    "numero": "1321",
    "cep": "60811-905"
  },
  "destino": {
    "numero": "71",
    "cep": "60421440"
  },
  "localDeInteresse": {
    "numero": "282",
    "cep": "60055402"
  }
}

```

#### Exemplo

##### Requisição

```json
{
  "origem": {
    "numero": "1321",
    "cep": "60811-905"
  },
  "destino": {
    "numero": "71",
    "cep": "60421440"
  },
  "localDeInteresse": {
    "numero": "282",
    "cep": "60055402"
  }
}
```

##### Resposta

``` json
{
  "success": "true",
  "body": {
    "resultadosComparacao": {
      "populacao": "Edson Queiroz",
      "area": "Edson Queiroz",
      "idh": "Itaoca",
      "idhRenda": "Edson Queiroz",
      "idhEducacao": "Edson Queiroz"
    },
    "dadosBairros": [
      {
        "dadosBairro": {
          "id_pmf": "57",
          "bairro_nome": "Edson Queiroz",
          "indicador": {
			...
          }
        },
        "coordenadas": {
          "lat": "-3.7687254",
          "long": "-38.4776938"
        }
      },
      {
        "dadosBairro": {
          "id_pmf": "98",
          "bairro_nome": "Itaoca",
          "indicador": {
			...
          }
        },
        "coordenadas": {
          "lat": "-3.7735054",
          "long": "-38.5553965"
        }
      },
      {
        "dadosBairro": {
          "id_pmf": "23",
          "bairro_nome": "José Bonifácio",
          "indicador": {
			...
          }
        },
        "coordenadas": {
          "lat": "-3.7394095",
          "long": "-38.5252641"
        }
      }
    ],
    "distanciasERotas": [
      {
        "origem": "Edson Queiroz",
        "destino": "Itaoca",
        "distancia": {
          "carro": {
            "distance": 11789.3,
            "duration": 1290.6
          },
          "pe": {
            "distance": 11309.1,
            "duration": 8142.5
          }
        }
      },
      {
        "origem": "Edson Queiroz",
        "destino": "José Bonifácio",
        "distancia": {
          "carro": {
            "distance": 7884.9,
            "duration": 807.6
          },
          "pe": {
            "distance": 8367.1,
            "duration": 6024.2
          }
        }
      },
      {
        "origem": "Itaoca",
        "destino": "José Bonifácio",
        "distancia": {
          "carro": {
            "distance": 6520.8,
            "duration": 648.9
          },
          "pe": {
            "distance": 6395.8,
            "duration": 4604.9
          }
        }
      }
    ]
  }
}

```


### **POST** `/calcular-distancia` 

#### Descrição:

Recebe dois endereços (número e CEP) e retorna as distâncias entre as localidades.

#### Schema do body da requisição:

``` json
{
  "origem": {
    "numero": "1321",
    "cep": "60811-905"
  },
  "destino": {
    "numero": "71",
    "cep": "60421440"
  }
}
``` 

#### Exemplo

##### Requisição

``` json
{
  "origem": {
    "numero": "1321",
    "cep": "60811-905"
  },
  "destino": {
    "numero": "71",
    "cep": "60421440"
  }
}
``` 

##### Resposta

``` json
{
  "success": "true",
  "body": {
    "carro": {
      "distance": 11789.3,
      "duration": 1290.6
    },
    "pe": {
      "distance": 11309.1,
      "duration": 8142.5
    }
  }
}

```


#### Indicadores
GET `/indicadores`

Resposta
``` json
[
	{
		"id": "T1",
		"nome": "Cobertura Vegetal Urbana",
		"categoria": "Território",
		"descricao": "",
	},
	{
		"id": "S1",
		"nome": "IDH",
		"categoria": "Socioeconômico",
		"descricao": "",
	}
	...
]
```


GET `/indicadores/{id}`

parâmetros da requisição

| Parametro | Tipo | Descrição                |
| --------- | ---- | ------------------------ |
| `id`      | int  | Identificador do bairro. |
Resposta

``` json
{
	"bairro_id": 1,
	"nome": "Montese",
	"indicadores": {
		{
			"indicador_id": 1,
			"indicador_nome": valor
		}
	}
}
```

##### Comparações

POST `/comparar

parametros do body

``` json
{
  "enderecoMora": {
		"numero": 71,
		"logradouro": Itumirim
		""
	}// Aldeota e Montese, respectivamente
}
```


``` json
{
  "bairrosIds": [ 2, 101 ] // Aldeota e Montese, respectivamente
}
```

Resposta

``` json
{
	"bairrosIds": [ 2, 101 ],
	"nomes": ["Aldeota", "Montese"],
	"indicadores": {
		{
			"indicador_id": 1,
			"indicador_nome": "valor",
			""
		}
	}
}
```

### Identificadores

##### Indicadores

|id |nome                    |categoria     |descricao                                                                                    |
|---|------------------------|--------------|---------------------------------------------------------------------------------------------|
|1  |area                    |territorio    |Extensão territorial total do bairro em quilômetros quadrados.                               |
|2  |cobertura_vegetal_urbana|territorio    |Percentual da área ocupada por vegetação em espaços públicos e privados.                     |
|4  |idh                     |socioeconomico|Índice de Desenvolvimento Humano geral do bairro, considerando renda, educação e longevidade.|
|5  |idh_renda               |socioeconomico|Subíndice do IDH que mede a qualidade de vida a partir da renda dos moradores.               |
|6  |idh_educacao            |socioeconomico|Subíndice do IDH que mede o acesso e a escolaridade da população do bairro.                  |
|7  |renda_media_mensal      |socioeconomico|Valor médio mensal recebido pelos domicílios do bairro.                                      |
|8  |domicilios              |habitacao     |Número total de residências cadastradas no bairro.                                           |
|9  |condominios             |habitacao     |Quantidade de condomínios residenciais e comerciais presentes no bairro.                     |
|10 |ciclovias               |mobilidade    |Extensão total de ciclovias e ciclofaixas disponíveis no bairro, em quilômetros.             |
|11 |estacoes_bicicletar     |mobilidade    |Número de estações do sistema público de bicicletas disponíveis no bairro.                   |
|12 |ponto_onibus            |mobilidade    |Quantidade de paradas oficiais de transporte coletivo localizadas no bairro.                 |
|3  |regional_antiga         |territorio    |Região administrativa à qual o bairro pertencia na antiga divisão da cidade.                 |
|13 |regional_atual          |territorio    |Região administrativa à qual o bairro pertence na divisão da cidade atualmente.              |
|14 |populacao               |populacao     |População total do bairro, segundo o Censo Demográfico 2022 do IBGE.                         |


##### Bairros

| PMF | IBGE       | Nome                          |
| --- | ---------- | ----------------------------- |
| 1   | 2304400001 | São Gerardo                   |
| 2   | 2304400002 | Aldeota                       |
| 3   | 2304400003 | Álvaro Weyne                  |
| 4   | 2304400004 | Amadeu Furtado                |
| 5   | 2304400005 | Moura Brasil                  |
| 6   | 2304400006 | Barra do Ceará                |
| 7   | 2304400007 | Benfica                       |
| 8   | 2304400008 | Bom Futuro                    |
| 9   | 2304400009 | Carlito Pamplona              |
| 10  | 2304400010 | Centro                        |
| 11  | 2304400011 | Cocó                          |
| 12  | 2304400012 | Cristo Redentor               |
| 13  | 2304400013 | Damas                         |
| 14  | 2304400014 | Dionísio Torres               |
| 15  | 2304400015 | Farias Brito                  |
| 16  | 2304400016 | Fátima                        |
| 17  | 2304400017 | Floresta                      |
| 18  | 2304400018 | Jacarecanga                   |
| 19  | 2304400019 | Jardim América                |
| 20  | 2304400020 | Jardim Guanabara              |
| 21  | 2304400021 | Jardim Iracema                |
| 22  | 2304400022 | Joaquim Távora                |
| 23  | 2304400023 | José Bonifácio                |
| 24  | 2304400024 | Meireles                      |
| 25  | 2304400025 | Monte Castelo                 |
| 26  | 2304400026 | Mucuripe                      |
| 27  | 2304400027 | Papicu                        |
| 28  | 2304400028 | Parque Araxá                  |
| 29  | 2304400029 | Parquelândia                  |
| 30  | 2304400030 | Parreão                       |
| 31  | 2304400031 | Pirambu                       |
| 32  | 2304400032 | Praia de Iracema              |
| 33  | 2304400033 | Presidente Kennedy            |
| 34  | 2304400034 | Rodolfo Teófilo               |
| 35  | 2304400035 | Tauape                        |
| 36  | 2304400036 | Varjota                       |
| 37  | 2304400037 | Vicente Pinzón                |
| 38  | 2304400038 | Ellery                        |
| 39  | 2304400039 | Vila Velha                    |
| 40  | 2304400040 | Antônio Bezerra               |
| 41  | 2304400041 | Autran Nunes                  |
| 42  | 2304400042 | Conjunto Ceará I              |
| 43  | 2304400043 | Dom Lustosa                   |
| 44  | 2304400044 | Genibaú                       |
| 45  | 2304400045 | Henrique Jorge                |
| 46  | 2304400046 | João XXIII                    |
| 47  | 2304400047 | Padre Andrade                 |
| 48  | 2304400048 | Quintino Cunha                |
| 49  | 2304400049 | José de Alencar               |
| 50  | 2304400050 | Ancuri                        |
| 51  | 2304400051 | Barroso                       |
| 52  | 2304400052 | Cajazeiras                    |
| 53  | 2304400053 | Cambeba                       |
| 54  | 2304400054 | Cidade dos Funcionários       |
| 55  | 2304400055 | Coaçu                         |
| 56  | 2304400056 | Curió                         |
| 57  | 2304400057 | Edson Queiroz                 |
| 58  | 2304400058 | Engenheiro Luciano Cavalcante |
| 59  | 2304400059 | Guajeru                       |
| 60  | 2304400060 | Guararapes                    |
| 61  | 2304400061 | Jangurussu                    |
| 62  | 2304400062 | Jardim das Oliveiras          |
| 63  | 2304400063 | Lagoa Redonda                 |
| 64  | 2304400064 | Sapiranga / Coité             |
| 65  | 2304400065 | Messejana                     |
| 66  | 2304400066 | Parque Iracema                |
| 67  | 2304400067 | Parque Manibura               |
| 68  | 2304400068 | Paupina                       |
| 69  | 2304400069 | Pedras                        |
| 70  | 2304400070 | Sabiaguaba                    |
| 71  | 2304400071 | Salinas                       |
| 72  | 2304400072 | Bom Jardim                    |
| 73  | 2304400073 | Bonsucesso                    |
| 74  | 2304400074 | Canindezinho                  |
| 75  | 2304400075 | Conjunto Ceará II             |
| 76  | 2304400076 | Conjunto Esperança            |
| 77  | 2304400077 | Rachel de Queiroz             |
| 78  | 2304400078 | Granja Lisboa                 |
| 79  | 2304400079 | Granja Portugal               |
| 80  | 2304400080 | Jardim Cearense               |
| 81  | 2304400081 | Manoel Sátiro                 |
| 82  | 2304400082 | Maraponga                     |
| 83  | 2304400083 | Mondubim                      |
| 84  | 2304400084 | Parque Dois Irmãos            |
| 85  | 2304400085 | Parque Presidente Vargas      |
| 86  | 2304400086 | Parque São José               |
| 87  | 2304400087 | Parque Santa Rosa             |
| 88  | 2304400088 | Passaré                       |
| 89  | 2304400089 | Prefeito José Walter          |
| 90  | 2304400090 | Siqueira                      |
| 91  | 2304400091 | Aerolândia                    |
| 92  | 2304400092 | Aeroporto                     |
| 93  | 2304400093 | Alto da Balança               |
| 94  | 2304400094 | Bela Vista                    |
| 95  | 2304400096 | Couto Fernandes               |
| 96  | 2304400097 | Demócrito Rocha               |
| 97  | 2304400098 | Dias Macedo                   |
| 98  | 2304400099 | Itaoca                        |
| 99  | 2304400100 | Itaperi                       |
| 100 | 2304400101 | Jóquei Clube                  |
| 101 | 2304400103 | Montese                       |
| 102 | 2304400104 | Panamericano                  |
| 103 | 2304400105 | Parangaba                     |
| 104 | 2304400106 | Pici                          |
| 105 | 2304400107 | Serrinha                      |
| 106 | 2304400108 | Vila Peri                     |
| 107 | 2304400109 | Vila União                    |
| 108 | 2304400110 | Cais do Porto                 |
| 109 | 2304400111 | Cidade 2000                   |
| 110 | 2304400112 | Manuel Dias Branco            |
| 111 | 2304400113 | Praia do Futuro I             |
| 112 | 2304400114 | Praia do Futuro II            |
| 113 | 2304400115 | De Lourdes                    |
| 114 | 2304400116 | Planalto Ayrton Senna         |
| 115 | 2304400118 | Conjunto Palmeiras            |
| 116 | 2304400119 | São Bento                     |
| 117 | 2304400121 | Novo Mondubim                 |
| 118 | 2304400122 | Olavo Oliveira                |
| 119 | 2304400123 | Parque Santa Maria            |
| 120 | 2304400124 | Aracapé                       |
| 121 | 2304400125 | Boa Vista / Castelão          |

### APIs externas: 
- https://viacep.com.br
- https://openrouteservice.org
- https://nominatim.org

### Fonte de dados: 
- https://dados.fortaleza.ce.gov.br
- https://servicodados.ibge.gov.br/api/docs