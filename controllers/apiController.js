const axios = require("axios");

exports.get_rate = (req, res, next) => {
  //get the url query parameters and convert the query parameter to a list of string. .split still returns an array if it is just one currency so that is cool.
  let base = req.query.base;
  let currency = req.query.currency;
  output = {};

  // call the exchange rate api now
  url = "https://api.exchangeratesapi.io/latest";
  endpoint = `${url}?base=${base}&symbols=${currency}`;
  axios
    .get(endpoint)
    .catch(err => {
      output.results = {
        error: err.message,
        statuscode: err.message.slice(-3)
      };
      res.status(output.results.statuscode);
      res.json(output);
    })
    .then(resp => resp.data)
    .catch(err => {
      output.results = {
        error: err.toString(),
        statuscode: 500
      };
      res.status(500);
      res.json(output);
    })
    .then(data => {
      output.results = {
        base: data.base,
        date: data.date,
        rates: data.rates
      };
      res.json(output);
    })
    .catch(err => {
      output.results = {
        error: err.toString(),
        statuscode: 500
      };
      res.status(500);
      res.json(output);
    });
};
