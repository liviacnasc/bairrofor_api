CREATE TABLE bairro (
    id_pmf VARCHAR(3) PRIMARY KEY,
	id_ibge VARCHAR(10) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    ultima_atualizacao DATE NOT NULL
);

CREATE TABLE indicador (
    indicador_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
	categoria VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE bairro_indicador (
    bairro_indicador_id SERIAL PRIMARY KEY,
    bairro_id_pmf VARCHAR(3) REFERENCES bairro (id_pmf),
	indicador_id SERIAL REFERENCES indicador (indicador_id),
    valor VARCHAR(255) NOT NULL
);