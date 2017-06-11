const axios = require('axios');

const getExchangeRate = async (base, counter) => {
  try {
    let response = await axios.get(`http://api.fixer.io/latest?base=${base}`);
    let rate = response.data.rates[counter];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${base}-${counter} pair.`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    let response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get list of countries that use ${currencyCode}.`)
  }

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
  const rate = await getExchangeRate(base, counter);
  const countries = await getCountries(counter);
  const exchanged_amt = rate * amount;
  return `${amount} ${base} is worth ${exchanged_amt} ${counter}.\n` +
  `${counter} can be used in the following countries: ${countries}`;
};

convertCurrencyAlt("USD", "SGD", 100000).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(e.message);
});
