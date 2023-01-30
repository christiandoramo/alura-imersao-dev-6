const request = require("request"); //importação da lib para requisição das cotações

const moedas = "USD-BRL,EUR-BRL,BTC-BRL";

let cotacaoAtual;
let dataCotação;

const options = {
  url: `https://economia.awesomeapi.com.br/json/last/${moedas}`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "UTF-8",
  },
};

const callback_USD = function (erro, resposta, body) {
  let json = JSON.parse(body);
  let cotacao = json.USDBRL["bid"];
  let data = json.USDBRL["create_date"];
  cotacaoAtual = cotacao;
  dataCotação = data;
};

const callback_EUR = function (erro, resposta, body) {
  let json = JSON.parse(body);
  let cotacao = json.EURBRL["bid"];
  let data = json.EURBRL["create_date"];
  cotacaoAtual = cotacao;
  dataCotação = data;
};
const callback_BTC = function (erro, resposta, body) {
  let json = JSON.parse(body);
  let cotacao = json.BTCBRL["bid"];
  let data = json.BTCBRL["create_date"];
  cotacaoAtual = cotacao;
  dataCotação = data;
};

function conversao(moeda, valorEmReal) {
  if (moeda == "DolarAmericano") {
    request(options, callback_USD);
  } else if (moeda == "Euro") {
    request(options, callback_EUR);
  } else if (moeda == "Bitcoin") {
    request(options, callback_BTC);
  }
  return valorEmReal / cotacaoAtual;
}

module.exports = { conversao, cotacaoAtual, dataCotação };
