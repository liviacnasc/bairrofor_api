## Sumário
1. Instalação
2. Problema abordado e justificativa
3. Objetivos do sistema
4. Escopo do projeto
5. Visão geral da arquitetura
6. Tecnologias propostas
7. Integrantes da equipe e seus papéis

## Instalação 

### Pré-requisitos

- Node.js (>= v18)
- npm
- Banco de dados PostgreSQL
- Git instalado
- Bruno https://www.usebruno.com

### Passo a passo

1. Clonar o repositório

```
git clone https://github.com/liviacnasc/bairrofor_api.git
cd bairrofor_api
```

2. Instalar dependências
```
npm install
```

3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione:

```
# Porta da aplicação

PORT='8080'

# Configuração do banco

DATABASE_URL='postgres://{db_username}:{db_password}@{host}:{port}/{db_name}'

# Crie uma conta em https://openrouteservice.org para criar a chave da api

OPENROUTESERVICE_API_KEY=''
```
Altere os valores conforme sua configuração local.

4. Popular banco de dados

```
npm run db
```

5. Rodar o servidor

```
npm start
```


A API estará disponível em:

```
http://localhost:8080
```

6. Testar a aplicação

Para rodar os testes unitários:

```
npm run test
```

7. Testar a API utilizando a APi Client Bruno

- Faça o download e a instalação do Bruno no link a seguir: https://www.usebruno.com/downloads
- Abra o Bruno, clique nos três pontinhos e em "Open Collection".
![ ](https://)
- 


## Problema abordado e Justificativa

Muitas pessoas que desejam mudar de bairro em Fortaleza não têm informações centralizadas sobre qualidade de vida, infraestrutura, custo de moradia e sustentabilidade, pois esses dados estão espalhados (portais da prefeitura, IBGE, SSP-CE etc.) ou são de difícil interpretação. Com base nisso, decidimos criar um sistema que ajudaria a consolidar e comparar bairros da cidade, tornando a escolha mais consciente e sustentável, proporcionando uma melhor experiência aos moradores.
## Objetivos do sistema

Ajudar usuários na escolha de um bairro para morar, levando em consideração indicadores populacionais, socioeconômicos, territoriais e outros.
## Escopo do projeto
### Descrição

O projeto reúne dados públicos a fim de facilitar a interpretação, comparando dois bairros da cidade de Fortaleza de escolha do usuário.

#### Categorias e Indicadores

Território
- Área ✅
- Cobertura vegetal Urbana
- Regional ✅

Socioeconômico
- IDH ✅
- IDH Renda ✅
- IDH Educação ✅

População ✅

Habitação (implementação futura)
- Domicílios
- Condomínios

Mobilidade (implementação futura)
- Ciclovias
- Estações Bicicletar
- Pontos de ônibus
Equipamentos de saúde

### Fora do Escopo
- Atualização em tempo real de dados externos.
- Machine learning para sugerir bairro ideal.
- Ranking completo de todos os bairros.
### Restrições do projeto

Projeto será exclusivo para a cidade de Fortaleza.
### Visão geral da arquitetura

A arquitetura em camadas será aplicada no projeto, de forma que seja um desenvolvimento rápido, mas que mantenha as responsabilidades dos componentes devidamente separadas.
### Tecnologias propostas

- Runtime: Node.js
- Framework: Express
- Cliente http: Axios
- Testes: Jest
- Documentação: Swagger autogen & swagger-ui-express
- Banco de dados: PostgreSQL

### Integrante da equipe e seus papéis

Nome                    | Função     |
------------------------|--------------|
Ana Lívia  | Desenvolvedora    |
Fernando Henrique | Documentação |
Rebeca Samia | Design Web e Mobile |
