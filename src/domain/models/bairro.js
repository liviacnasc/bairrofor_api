class Bairro {

    constructor(idPmf, idIbge, nome, indicador) {
        this.idPmf = idPmf;
        this.idIbge = idIbge;
        this.nome = nome;
        this.indicadores = indicador
    }

    getIdPmf() {
        return this.idPmf;
    }

    getNome() {
        return this.nome;
    }
    
    getRegional() {
        return this.regional;
    }
}