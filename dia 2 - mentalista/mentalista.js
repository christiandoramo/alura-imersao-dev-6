const valorPrevio = parseInt(Math.random() * 1001);

function advinhar(valorDigitado) {
  if (valorDigitado == valorPrevio) {
    return "igual";
  } else if (valorDigitado > valorPrevio) {
    return "menor";
  }
  return "maior";
}

module.exports = { valorPrevio, advinhar };
