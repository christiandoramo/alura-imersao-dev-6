// foi necessario a instalação do ejs, express;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cotacao = require("./dia 1 - conversor de moedas/conversor"); //rodando cotação

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); // decodificação com o bodyparser
app.use(bodyParser.json()); // lê agora os json

app.get("/", (requisicao, resposta) => {
  resposta.render("index");
});

app.get("/converter", (requisicao, resposta) => {
  resposta.render("dia_1-1");
});

app.get("/processar", (requisicao, resposta) => {
  const valorEmReal = requisicao.query.valorEmReal;
  const moeda = requisicao.query.moeda;
  // resposta.end(
  //   "moeda: " +
  //     moeda +
  //     " valor: " +
  //     valorEmReal +
  //     " valor convertido: " +
  //     valorConvertido
  // );
  resposta.render("dia_1-2", {
    moeda: moeda,
    valorEmReal: valorEmReal,
    valorConvertido: cotacao.conversao(moeda, valorEmReal),
  });
});

app.listen(2023, () => console.log("Conexão efetuada com sucesso!!!"));
