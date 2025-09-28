
> [!NOTE] Conteúdo
> - Descrição da arquitetura
> - Componentes do sistema
> - Padrões arquiteturais utilizados
> - Diagrama de arquitetura
> - Decisões técnicas e justificativas

## Descrição da arquitetura

A arquitetura em camadas será aplicada no projeto, de forma que seja um desenvolvimento rápido, mas que mantenha as responsabilidades dos componentes devidamente separadas.
## Componentes do sistema
### Front End:
- Views:
	- Home
	- Seleção de bairros
	- Tela de comparação
	- Metodologia e Fontes
- API Services

### Back End:
#### Aplicação
- Controlador
- Serviços:
	- BairrosService
		- `getBairroById`
		- `getBairroByCEP`
		- `getComparador`
	- IntegrationService
		- `getBairroByCEP`
		- `getlatLongByNumeroECEP`
		- `getDistancia`
- UseCases:
	- `compararBairrosUseCase`
	- `distanciaEntrePontosUseCase`

Domínio
- Service:
	- `indicadorService`

Dados
- Integrações (APIs Externas):
	- `fortalezaAPI` (implementação futura)
	- `nominatimAPI`
	- `openRouteServiceAPI`
	- `ViaCepAPI`
- Repositorios
	- BairrosRepository
		- `getAllBairros`
		- `findBairroByPmfId`
		- `getBairroByNome`
	- IndicadorRepository (implementação futura)

Banco de Dados
- PostgreSQL

## Padrões arquiteturais utilizados
- **Layered Architecture (Arquitetura em Camadas)** — separação clara de responsabilidades.
- **Repository Pattern** — abstrai acesso a dados; facilita testes e troca de DB.
- **Domain Services** — mantém as regras de negócio no domínio.
- **API REST** — contrato entre frontend e backend.
- **Single Responsibility Principle (SRP)** — cada componente/função tem responsabilidade única.

## Diagrama de Arquitetura

![Diagrama](https://github.com/liviacnasc/bairrofor_api/blob/main/docs/assets/arquitetura.jpg?raw=true)


## Decisões técnicas e justificativas

**1. Arquitetura em camadas**

É simples para provar conceitos de engenharia de software, baixo custo de implementação e ideal para o curto prazo da atividade final.

**2. Node.js e Express**

Rápida prototipagem, ampla comunidade, fácil integração com JSON/REST, bom para testes com Jest.

**3. PostgreSQL (relacional)**

Comparações e agregações são mais naturais em relacional; SQL facilita consultas analíticas.
    
**4. Repositórios**

Desacopla acesso a dados, facilita mocks nos testes unitários da aplicação/domínio.
    

**5. Comparação de indicadores no Domain Service**

Regras de negócio devem ficar no domínio para serem testáveis e independentes.
    
**6. Nenhuma integração em tempo real para consumo de dados públicos**

Os dados mais completas sobre os bairros são disponibilizados pela Prefeitura de Fortaleza, no entanto, implementar essa funcionalidade seria um pouco complexo, pois a plataforma tem recursos em vários formatos diferentes (csv, pdf, json, xlsx, entre outros).

Os dados estáticos em banco de dados são mais fáceis de se trabalhar no protótipo.