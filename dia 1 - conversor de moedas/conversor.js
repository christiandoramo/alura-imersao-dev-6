const request = require("request"); //importação da lib para requisição das cotações

const moedas = "USD-BRL,EUR-BRL,BTC-BRL";

let dataCotacaoUSD;
let dataCotacaoEUR;
let dataCotacaoBTC;
let cotacaoUSD;
let cotacaoEUR;
let cotacaoBTC;

const options = {
  url: `https://economia.awesomeapi.com.br/json/last/${moedas}`,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Accept-Charset": "UTF-8",
  },
};

function callback_USD(erro, resposta, body) {
  let json = JSON.parse(body);
  cotacaoUSD = json.USDBRL["bid"];
  dataCotacaoUSD = json.USDBRL["create_date"];
}

function callback_EUR(erro, resposta, body) {
  let json = JSON.parse(body);
  cotacaoEUR = json.EURBRL["bid"];
  dataCotacaoEUR = json.EURBRL["create_date"];
}
function callback_BTC(erro, resposta, body) {
  let json = JSON.parse(body);
  cotacaoBTC = json.BTCBRL["bid"];
  dataCotacaoBTC = json.BTCBRL["create_date"];
  console.log(json.BTCBRL);
}
function atualizar() {
  request(options, callback_USD);
  request(options, callback_EUR);
  request(options, callback_BTC);
}
atualizar();

function pesquisar(moeda, valorEmReal) {
  atualizar();
  let resultado;
  if (moeda == "DolarAmericano") {
    resultado = {
      valorEmReal: valorEmReal,
      cotacao: cotacaoUSD,
      data: dataCotacaoUSD,
      convertido: "U$ " + valorEmReal / cotacaoUSD,
      moeda: "Dólar Americano",
    };
    return resultado;
  } else if (moeda == "Euro") {
    resultado = {
      valorEmReal: valorEmReal,
      cotacao: cotacaoEUR,
      data: dataCotacaoEUR,
      convertido: "€ " + valorEmReal / cotacaoEUR,
      moeda: "Euro",
    };
    return resultado;
  } else if (moeda == "Bitcoin") {
    resultado = {
      moeda: "Bitcoin",
      valorEmReal: valorEmReal,
      cotacao: cotacaoBTC,
      data: dataCotacaoBTC,
      convertido: "₿ " + valorEmReal / cotacaoBTC,
    };
    return resultado;
  }
  return undefined;
}
module.exports = { pesquisar };
