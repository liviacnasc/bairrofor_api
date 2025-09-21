

function calcularEscore(bairro, minMax) {
  const indicadores = bairro.indicadores;

  const normalizados = Object.entries(indicadores).map(([nome, valor]) => {
    const { min, max } = minMax[nome];
    return (valor - min) / (max - min);
  });

  const total = normalizados.reduce((acc, v) => acc + v, 0);
  return total / normalizados.length; // média final normalizada
}

// Exemplo de uso:
const bairro = {
  nome: "Bairro A",
  indicadores: {
    renda: 1500,
    educacao: 0.75,
    ciclovias: 12
  }
};

const minMax = {
  renda: { min: 1000, max: 5000 },
  educacao: { min: 0, max: 1 },
  ciclovias: { min: 0, max: 30 }
};

console.log("Escore do bairro:", calcularEscore(bairro, minMax));