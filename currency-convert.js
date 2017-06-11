const axios = require('axios');

const getExchangeRate = (base, counter) => {
  return axios.get(`http://api.fixer.io/latest?base=${base}`).then((response) => {
    return response.data.rates[counter];
  });
};

const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
  .then((response) => {
    return response.data.map((country) => country.name);
  });
};

const convertCurrency = (base, counter, amount) => {
  let countries;
  return getCountries(counter).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(base, counter);
  }).then((rate) => {
    const exchanged_amt = rate * amount;
    return `${amount} ${base} is worth ${exchanged_amt} ${counter}.\n` +
    `${counter} can be used in the following countries: ${countries}`;
  });
};

const convertCurrencyAlt = async (base, counter, amount) => {
  const countries = await getCountries(counter);
  const rate = await getExchangeRate(base, counter);
  const exchanged_amt = rate * amount;
  return `${amount} ${base} is worth ${exchanged_amt} ${counter}.\n` +
  `${counter} can be used in the following countries: ${countries}`;
};

convertCurrencyAlt("USD", "SGD", 100000).then((result) => {
  console.log(result);
});
