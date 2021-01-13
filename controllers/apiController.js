const axios = require("axios");

const write_response = (res, output, status) => {
  res.status(status);
  res.json(output);
};

exports.get_rate = (req, res, next) => {
  let base = req.query.base;
  let currency = req.query.currency;
  output = {};

  // call the exchange rate api now
  url = "https://api.exchangeratesapi.io/latest";
  endpoint = `${url}?base=${base}&symbols=${currency}`;
  axios
    .get(endpoint)
    .then(resp => resp.data)
    .then(data => {
      output.results = {
        base: data.base,
        date: data.date,
        rates: data.rates
      };
      return write_response(res, output, 200);
    })
    .catch(err => {
      status = err.message.slice(-3);
      output.results = {
        error: err.message,
        statuscode: status
      };
      return write_response(res, output, status);
    });
};
