// foi necessario a instalação do ejs, express;
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const conversor = require('./dia 1 - conversor de moedas/conversor')
const mentalista = require('./dia 2 - mentalista/mentalista')
const aluraflix = require('./dia 3 - aluraFlix/aluraflix')
const filmesPreferidos = require('./dia 4 - filmes preferidos/filmesPreferidos')
const tabeladepontos = require('./dia 5 - tabela de pontos/tabelaDePontos')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false })) // decodificação com o bodyparser
app.use(bodyParser.json()) // lê agora os json

app.get('/', (requisicao, resposta) => {
  resposta.render('index')
})

// DIA 1 - CONVERSOR
app.get('/converter', (requisicao, resposta) => {
  const valorEmReal = requisicao.query.valorEmReal
  const moeda = requisicao.query.moeda
  const pesquisa = conversor.pesquisar(moeda, valorEmReal)
  resposta.render('dia_1', {
    pesquisa: pesquisa,
  })
})

// DIA 2 - MENTALISTA
app.get('/advinhar', (requisicao, resposta) => {
  const valorDigitado = requisicao.query.valorDigitado
  const maiorOuMenor = mentalista.advinhar(valorDigitado)
  resposta.render('dia_2', {
    valorDigitado: valorDigitado,
    valorPrevio: mentalista.valorPrevio,
    maiorOuMenor: maiorOuMenor,
  })
})

// DIA 3 - ALURAFLIX
app.get('/aluraflix', (req, res) => {
  res.render('dia_3', {
    filmes: aluraflix.filmes,
  })
})

// DIA 4 - FILMES PREFERIDOS
app.get('/filmesPreferidos', (req, res) => {
  const filme = req.query.filme
  filmesPreferidos.adicionarFilme(filme)
  res.render('dia_4', {
    filmes: filmesPreferidos.filmes,
  })
})

// DIA 5 - TABELA DE PONTOS
app.get('/tabeladepontos', (req, res) => {
  const jogadorNome = req.query.jogadorNome
  const rodada = req.query.rodada
  tabeladepontos.adicionar(jogadorNome, rodada)
  res
    .render('dia_5', {
      jogadores: tabeladepontos.jogadores,
    })
})

app.listen(2023, () => console.log('Conexão efetuada com sucesso!!!'))
