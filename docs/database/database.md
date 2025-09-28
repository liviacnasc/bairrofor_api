
> [!NOTE] Conteúdo
> - Modelo de dados
> - Descrição das entidades e relacionamentos
> - Diagrama ER ou similar
> - Dicionário de dados

### Modelo de dados
O sistema precisa armazenar informações sobre os bairros de fortaleza, categorizá-los de acordo com os indicadores estabelecidos. 

### Descrição das entidades e relacionamentos

**Bairro:** representa um bairro de Fortaleza e relaciona-se com valores de indicadores.
**Indicador:** representa o indicador e os classifica por categoria.
**BairroIndicador:** armazena os valores dos e relaciona-se com as tabelas Bairro e Indicador.

### Diagrama ER ou similar

![Diagrama Banco](https://github.com/liviacnasc/bairrofor_api/blob/main/docs/assets/banco.jpg?raw=true)

### Dicionário de dados

###### Tabela: Bairro

| Campo              | Tipo      | Descrição                                                                    |
| ------------------ | --------- | ---------------------------------------------------------------------------- |
| id_pmf (PK)        | string       | Identificador do bairro pela PMF.                                            |
| id_ibge            | string       | Identificador do bairro pelo IBGE.                                           |
| nome               | string    | Nome do bairro.                                                              |
| ultima_atualizacao | timestamp | data da última atualização das informações da tabela, de acordo com a fonte. |
###### Tabela: Indicador

| Campo              | Tipo      | Descrição                                                                    |
| ------------------ | --------- | ---------------------------------------------------------------------------- |
| id_indicador       | string    | Identificador do indicador.                                                  |
| nome               | string    | Nome do indicador (exemplo: idh).                                            |
| categoria          | string    | Categoria do identificador (exemplo: socioeconômico)                         |
| descricao          | string    | Descrição do indicador.                                                      |
###### Tabela: BairroIndicador

| Campo             | Tipo   | Descrição                                         |
| ----------------- | ------ | ------------------------------------------------- |
| id_bairro (FK)    | string | Identificador do indicador.                       |
| id_indicador (FK) | string | Nome do indicador (exemplo: idh).                 |
| valor      | string  | Valor do indicador.                         |



