import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 300,
});

const PRIVAT_API =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
const MONO_API = 'https://api.monobank.ua/bank/currency';

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(`Cant fetch data from ${url}. ${error.message}`);
  }
};

export const getExchangeRate = async (currency) => {
  const cachedData = cache.get(currency);
  if (cachedData) {
    return cachedData;
  }

  const monoData = await fetchData(MONO_API);
  const privatData = await fetchData(PRIVAT_API);

  if (!monoData || !privatData) {
    console.error('Cant fetch data from API or cache');
  }

  const { buy: buyPrivat, sale: sellPrivat } = privatData.find(
    (rates) => rates.ccy === currency
  );

  // transform currency name to code (USD -> 840) or (EUR -> 978)
  const currencyCode = currency === 'USD' ? 840 : 978;
  const { rateBuy: buyMono, rateSell: sellMono } = monoData.find(
    (rates) => rates.currencyCodeA === currencyCode
  );

  const rates = {
    mono: {
      buy: buyMono,
      sell: sellMono,
    },
    privat: {
      buy: buyPrivat,
      sell: sellPrivat,
    },
  };

  cache.set(currency, rates);
  return rates;
};
