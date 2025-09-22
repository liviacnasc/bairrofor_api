
> [!NOTE] Conteúdo
> - Endpoints previstos
> - Parâmetros de requisição
> - Formatos de resposta
> - Autenticação de autorização
> - Exemplos de chamadas e res

APIs externas: 
- https://dados.fortaleza.ce.gov.br/api/3
- https://servicodados.ibge.gov.br/api/docs/agregados?versao=3
- https://dados.fortaleza.ce.gov.br/api/3/action/package_search?q=condominio

### Endpoints previstos

##### Bairros
GET `/bairros`

GET `/bairros/{id}`

parâmetros da requisição

| Parametro | Tipo | Descrição                |
| --------- | ---- | ------------------------ |
| `id`      | int  | Identificador do bairro. |
Resposta
``` json
[
	{
		"id": 101,
		"nome": "Montese",
		"populacao_2022": 21794,
		"area_km2": 1.91,
		"regional": "Secretaria Executiva Regional 4",
		"socioeconomico": {
			"idh": "xx",
			"idh_renda": "xx",
			"idh_educacao": "xx",
			"idh_longevidade": "xx",
		}
		...,
		"ultima_atualizacao": "dd-mm-aaaa"
		
	}
]
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

| Id  | Nome                     |
| --- | ------------------------ |
| T1  | Cobertura vegetal urbana |
| T2  | Área em km2              |
| S1  | IDH                      |
| S2  | IDH Renda                |
| S3  | IDH Longevidade          |
| S4  | População Censo 2022     |
| H1  | Domicílios               |
| H2  | Condomínios              |
| M1  | Ciclovias                |
| M2  | Estações Bicicletar      |
| M3  | Pontos de Onibus         |
| M4  | Equipamentos de Saúde    |

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
