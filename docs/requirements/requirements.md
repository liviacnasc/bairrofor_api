
> [!NOTE] Conteúdo
> - Requisitos funcionais
> - Requisitos não funcionais
> - Regras de negócio
> - Histórias de usuário ou casos de uso
> - Perfis de usuários

### Requisitos Funcionais

RF 01: Comparar dois bairros (ESSENCIAL)

RF 02: O sistema deve exibir informações de cada bairro. (ESSENCIAL)

RF 03: O sistema deve apresentar indicadores como: território, socioeconômico e população, etc. (ESSENCIAL)

RF 04 - O sistema deve consumir dados de APIs públicas ou datasets estáticos pré-processados.

### Requisitos não funcionais

RNF 01: O sistema não deve expor dados sensíveis, apenas informações públicas.

### Regras de Negócio

1. A comparação será feita sempre entre dois bairros por vez.
2. Se algum dado não estiver disponível para determinado bairro, o sistema deve indicar “informação indisponível” sem comprometer a comparação.
3. O usuário poderá comparar dois bairros e indicar um local de interesse para que sejam comparadas as distâncias entre as localidades.

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

