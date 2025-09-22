
> [!NOTE] Conteúdo
> - Requisitos funcionais
> - Requisitos não funcionais
> - Regras de negócio
> - Histórias de usuário ou casos de uso
> - Perfis de usuários

### Requisitos Funcionais

RF 01: Comparar dois bairros (ESSENCIAL)

RF 02: O sistema deve exibir informações de cada bairro em tabelas ou gráficos comparativos. (ESSENCIAL)

RF 03: O sistema deve apresentar indicadores como: mobilidade; infraestrutura; custo de vida; sustentabilidade. (ESSENCIAL)

RF 04:  O sistema deve exibir uma página com a metodologia usada para calcular os scores (transparência dos dados). (IMPORTANTE)

RF 05 - O sistema deve consumir dados de APIs públicas ou datasets estáticos pré-processados.

### Requisitos não funcionais

RNF 01: O sistema deve ser acessível via navegador web (desktop e mobile).
RNF 02. A interface deve ser responsiva e intuitiva, permitindo fácil comparação.
RNF 03: O sistema não deve expor dados sensíveis, apenas informações públicas.

### Regras de Negócio

1. A comparação será feita sempre entre dois bairros por vez.
2. Se algum dado não estiver disponível para determinado bairro, o sistema deve indicar “informação indisponível” sem comprometer a comparação.
3. O sistema exibirá sempre a **fonte dos dados** para garantir confiabilidade.
4. Os indicadores serão classificados em **positivo** (quanto maior, melhor, como áreas verdes) ou **negativo** (quanto maior, pior, como criminalidade).

### Perfis de Usuários

Morador de Fortaleza que deseja conhecer mais sobre a cidade;
Morador de outra cidade que deseja se mudar para Fortaleza;
Servidores públicos ou agentes políticos;
Estudantes.

### Casos de Uso

UC 01: Comparar bairros
	Ator: Usuário de qualquer perfil
	Fluxo:
		1. Usuário acessa a página principal.
		2. Usuário seleciona no mapa os bairros que deseja comparar.
		3. O sistema busca as informações e indicadores.
		4. O sistema exibe uma tela de comparação entre os bairros.
		5. Se houver falta de dados, exibe a mensagem "informação indisponível".

