const request = require("request"); //importação da lib para requisição das cotações

const moedas = "USD-BRL,EUR-BRL,BTC-BRL";

let cotacaoSelecionada;
let dataCotacao;

const options = {
  url: `https://economia.awesomeapi.com.br/json/last/${moedas}`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "UTF-8",
  },
};

function atualizarDataECotacao(ctc, dt) {
  cotacaoSelecionada = ctc;
  dataCotacao = dt;
}

function atualizaUSD(erro, resposta, body) {
  let json = JSON.parse(body);
  let cotacao = json.USDBRL["bid"];
  let data = json.USDBRL["create_date"];
  atualizarDataECotacao(cotacao, data);
}

function atualizaEUR(erro, resposta, body) {
  let json = JSON.parse(body);
  let cotacao = json.EURBRL["bid"];
  let data = json.EURBRL["create_date"];
  atualizarDataECotacao(cotacao, data);
}
function atualizaBTC(erro, resposta, body) {
  let json = JSON.parse(body);
  let cotacao = json.BTCBRL["bid"];
  let data = json.BTCBRL["create_date"];
  atualizarDataECotacao(cotacao, data);
}

const callback_EUR = atualizaEUR;
const callback_BTC = atualizaBTC;
const callback_USD = atualizaUSD;

// valores já iniciados para corrigir bug
request(options, callback_USD);
request(options, callback_EUR);
request(options, callback_BTC);

function selecaoCotacao(moeda) {
  if (moeda == "DolarAmericano") {
    request(options, callback_USD);
  } else if (moeda == "Euro") {
    request(options, callback_EUR);
  } else if (moeda == "Bitcoin") {
    request(options, callback_BTC);
  }
}

function conversao(moeda, valorEmReal) {
  selecaoCotacao(moeda);
  return valorEmReal / cotacaoSelecionada;
}

function dataAtual(moeda) {
  selecaoCotacao(moeda);
  return dataCotacao;
}

function cotacaoAtual(moeda) {
  selecaoCotacao(moeda);
  return cotacaoSelecionada;
}
module.exports = { conversao, cotacaoAtual, dataAtual };
