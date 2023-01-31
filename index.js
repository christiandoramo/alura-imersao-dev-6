// foi necessario a instalação do ejs, express;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conversor = require("./dia 1 - conversor de moedas/conversor"); //rodando cotação
const mentalista = require("./dia 2 - mentalista/mentalista"); //rodando cotação

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // decodificação com o bodyparser
app.use(bodyParser.json()); // lê agora os json

app.get("/", (requisicao, resposta) => {
  resposta.render("index");
});

// DIA 1 - CONVERSOR
app.get("/converter", (requisicao, resposta) => {
  const valorEmReal = requisicao.query.valorEmReal;
  const moeda = requisicao.query.moeda;
  const novoValor = conversor.conversao(moeda, valorEmReal);
  resposta.render("dia_1", {
    moeda: moeda,
    valorEmReal: valorEmReal,
    valorConvertido: novoValor,
  });
});

// DIA 2 - MENTALISTA
app.get("/advinhar", (requisicao, resposta) => {
  const valorDigitado = requisicao.query.valorDigitado;
  const maiorOuMenor = mentalista.advinhar(valorDigitado);
  resposta.render("dia_2", {
    valorDigitado: valorDigitado,
    valorPrevio: mentalista.valorPrevio,
    maiorOuMenor: maiorOuMenor,
  });
});

app.listen(2023, () => console.log("Conexão efetuada com sucesso!!!"));
