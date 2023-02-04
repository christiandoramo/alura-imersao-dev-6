let charlinhos = {
  nome: 'Charlinhos',
  vitoria: 0,
  empate: 0,
  derrota: 0,
  pontos: 0,
}

let maxuelson = {
  nome: 'Maxuelson',
  vitoria: 0,
  empate: 0,
  derrota: 0,
  pontos: 0,
}

let enzo = {
  nome: 'Enzo',
  vitoria: 0,
  empate: 0,
  derrota: 0,
  pontos: 0,
}

let lorenzo = {
  nome: 'Lorenzo',
  vitoria: 0,
  empate: 0,
  derrota: 0,
  pontos: 0,
}

let jogadores = [enzo, lorenzo, maxuelson, charlinhos]

function adicionar(jogadorNome, rodada) {
  let jogador
  jogadores.forEach((player) => {
    if (player.nome == jogadorNome) jogador = player
  })
  if (rodada == 'vitoria') {
    jogador.vitoria++
    jogador.pontos = jogador.pontos + 3
  }
  if (rodada == 'empate') {
    jogador.empate++
    jogador.pontos++
  }
  if (rodada == 'derrota') {
    jogador.derrota++
  }
}

module.exports = { jogadores, adicionar }
