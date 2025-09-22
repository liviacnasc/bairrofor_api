links uteis

https://mapas.fortaleza.ce.gov.br
https://leafletjs.com
https://dados.fortaleza.ce.gov.br/
https://www.gov.br/cnpq/pt-br/assuntos/noticias/destaque-em-cti/inct-do-cnpq-lanca-o-indice-de-bem-estar-urbano-dos-municipios-brasileiros
https://bairros.fortaleza.ce.gov.br

## Sumário
1. Problema abordado e justificativa
2. Objetivos do sistema
3. Escopo do projeto
4. Visão geral da arquitetura
5. Tecnologias propostas
6. Integrantes da equipe e seus papéis

## Problema abordado e Justificativa

Muitas pessoas que desejam mudar de bairro em Fortaleza não têm informações centralizadas sobre qualidade de vida, infraestrutura, custo de moradia e sustentabilidade, pois esses dados estão espalhados (portais da prefeitura, IBGE, SSP-CE etc.) ou são de difícil interpretação. Com base nisso, decidimos criar um sistema que ajudaria a consolidar e comparar bairros da cidade, tornando a escolha mais consciente e sustentável, proporcionando uma melhor experiência aos moradores.
## Objetivos do sistema

Ajudar usuários na escolha de um bairro para morar, levando em consideração a infraestrutura, mobilidade, custo de vida e indicadores ambientais.
## Escopo do projeto
### Descrição

O projeto reúne dados públicos e fornece uma representação visual com tabelas e gráficos, a fim de facilitar a interpretação, comparando dois bairros da cidade de Fortaleza de escolha do usuário.

#### Categorias e Indicadores
Para o cálculo dos indicadores serão levadas em consideração aspectos quantitativos e qualitativos

Território
- Área ✅
- Cobertura vegetal Urbana
- Regional ✅

Socioeconômico
- IDH ✅
- IDH Renda ✅
- IDH Educação ✅

População ✅

Habitação
- Domicílios
- Condomínios

Mobilidade
- Ciclovias
- Estações Bicicletar
- Pontos de ônibus
Equipamentos de saúde


### Entregas e resultados

- Site responsivo (mobile e web):
    - Tela com um mapa, para que usuário possa selecionar dois bairros.
    - Exibição de dados em tabelas e gráficos.
### Fora do Escopo

- Atualização em tempo real de dados externos.
- Machine learning para sugerir bairro ideal.
- Ranking completo de todos os bairros.
### Restrições do projeto

Pelo curto tempo de execução e pela falta de orçamento, o projeto será exclusivo para a cidade de Fortaleza.
### Visão geral da arquitetura

A arquitetura em camadas será aplicada no projeto, de forma que seja um desenvolvimento rápido, mas que mantenha as responsabilidades dos componentes devidamente separadas.
### Tecnologias propostas

- Vite → montar dashboards dinâmicos e comparação lado a lado.
- Recharts → gráficos comparativos claros.
- Node.js + Express → simples para criar API REST que serve os dados.
- PostgreSQL -> banco de dados.
### Integrante da equipe e seus papéis
