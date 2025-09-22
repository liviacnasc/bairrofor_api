
> [!NOTE] Conteúdo
> - Descrição da arquitetura
> - Componentes do sistema
> - Padrões arquiteturais utilizados
> - Diagrama de arquitetura
> - Decisões técnicas e justificativas

## Descrição da arquitetura

A arquitetura em camadas será aplicada no projeto, de forma que seja um desenvolvimento rápido, mas que mantenha as responsabilidades dos componentes devidamente separadas.
## Componentes do sistema
Front End:
- Views:
	- Home
	- Seleção de bairros
	- Tela de comparação
	- Metodologia e Fontes
- API Services
	- `bairrosService` 
		- `listar`, `obterDetalhes`, `comparar`
	- `indicadoresService` 
		- `listarIndicadores`

Back End:
Apresentação
- Controllers
	- BairrosController
Aplicação
- Services
	- BairrosService: 
		- getBairro(bairroId)
		- getBairroIndicador(bairroId, indicadorId)
	- IntegracaoService
		- 
Domínio
- Modelos:
	- Bairro
	- Indicador

Persistência
- IBGERepository
- PMFRepository
- BairrosRepository

Dados
- PostgreSQL
- APIs Externas
## Padrões arquiteturais utilizados
- **Layered Architecture (Arquitetura em Camadas)** — separação clara de responsabilidades.
- **Repository Pattern** — abstrai acesso a dados; facilita testes e troca de DB.
- **Domain Services + Entities (DDD-lite)** — manter regras de negócio no domínio.
- **API REST** — contrato entre frontend e backend.
- **Single Responsibility Principle (SRP)** — cada componente/função tem responsabilidade única.
## Diagrama de Arquitetura
![[Diagramas.jpg]]
## Decisões técnicas e justificativas

Padrão: **Arquitetura em camadas**

- **Por que:** clareza didática, simples para provar conceitos de engenharia de software, baixo custo de implementação, ideal para 1 mês.

Linguagem / Runtime: **Node.js (Express) no backend**

- **Por que:** rapidez de prototipagem, ampla comunidade, fácil integração com JSON/REST, bom para TDD com Jest.


Frontend: **React + TailwindCSS**

- **Por que:** velocidade de desenvolvimento, componentes reutilizáveis, facilidade para gráficos (Recharts) e PWA se quiser.
    
- **Trade-offs:** curva inicial se time não conhece, mas compensa pela produtividade.
    

Banco: **PostgreSQL (relacional)**

- **Por que:** comparações e agregações multi-tabelas (indicadores por ano/mês) são mais naturais em relacional; SQL facilita consultas analíticas.

DTOs entre Application ↔ Domain

- **Por que:** isola domínio de mudanças externas, facilita testes e normalização, deixa domínio puro.
    
- **Trade-offs:** um pouco mais de código (mappers) mas ganho em manutenibilidade.
    

## 5.6 Repositório Pattern

- **Por que:** desacopla acesso a dados, facilita mocks nos testes unitários da aplicação/domínio.
    
- **Trade-offs:** boilerplate adicional, porém valioso para qualidade acadêmica.
    

## 5.7 Normalização e cálculo no Domain Service

- **Por que:** regras de negócio (normalização, pesos, agregação) devem ficar no domínio para serem testáveis e independentes da infra.
    
- **Trade-offs:** se cálculos precisarem de dados externos complexos, o service de aplicação prepara o DTO (ETL) e passa ao domínio.
    

## 5.8 ETL/Seed manual no MVP (nenhuma integração em tempo real)

- **Por que:** fontes por bairro costumam ser CSV/PDF; ingestão manual/semiautomática é mais confiável e viável em 1 mês.
    
- **Evolução:** automatizar scraping/ETL em fase futura.
    

## 5.9 Deploy: Vercel (frontend) + Render/Railway (backend) + Managed Postgres

- **Por que:** deploy rápido, grátis/baixo custo para protótipo, fácil CI.
    
- **Trade-offs:** limitações de plans gratuitos, mas suficientes para entrega acadêmica.
    

## 5.10 Testes

- **Dominio:** cobertura alta, unit tests para `ComparadorDeBairros` e `Normalizador`.
    
- **Application:** mocks de repositórios, testes de integração leve.
    
- **Controllers:** testes de integração com supertest.