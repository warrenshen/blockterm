import numeral from 'numeral';

export const currencySelectOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'AUD', label: 'AUD' },
  { value: 'BGN', label: 'BGN' },
  { value: 'BRL', label: 'BRL' },
  { value: 'CAD', label: 'CAD' },
  { value: 'CHF', label: 'CHF' },
  { value: 'CNY', label: 'CNY' },
  { value: 'CZK', label: 'CZK' },
  { value: 'DKK', label: 'DKK' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'HKD', label: 'HKD' },
  { value: 'HRK', label: 'HRK' },
  { value: 'HUF', label: 'HUF' },
  { value: 'IDR', label: 'IDR' },
  { value: 'ILS', label: 'ILS' },
  { value: 'INR', label: 'INR' },
  { value: 'ISK', label: 'ISK' },
  { value: 'JPY', label: 'JPY' },
  { value: 'KRW', label: 'KRW' },
  { value: 'MXN', label: 'MXN' },
  { value: 'MYR', label: 'MYR' },
  { value: 'NOK', label: 'NOK' },
  { value: 'NZD', label: 'NZD' },
  { value: 'PHP', label: 'PHP' },
  { value: 'PLN', label: 'PLN' },
  { value: 'RON', label: 'RON' },
  { value: 'RUB', label: 'RUB' },
  { value: 'SEK', label: 'SEK' },
  { value: 'SGD', label: 'SGD' },
  { value: 'THB', label: 'THB' },
  { value: 'TRY', label: 'TRY' },
  { value: 'ZAR', label: 'ZAR' },
];

export const currencySymbols = {
  'USD': '$',
  'BGN': 'лв',
  'BRL': 'R$',
  'CNY': '¥',
  'CZK': 'Kč',
  'DKK': 'kr',
  'EUR': '€',
  'GBP': '£',
  'HRK': 'kn',
  'HUF': 'Ft',
  'IDR': 'Rp',
  'ILS': '₪',
  'INR': '₹',
  'ISK': 'kr',
  'JPY': '¥',
  'KRW': '₩',
  'MYR': 'RM',
  'NOK': 'kr',
  'PHP': '₱',
  'PLN': 'zł',
  'LEI': 'lei',
  'RUB': '₽',
  'SEK': 'kr',
  'THB': '฿',
  'TRY': '₺',
  'ZAR': 'R',
  // left out that use '$': CAD, AUD, SGD, NZD, MXN, HKD
  // these just show whatever they are labeled, e.g. CAD, AUD
};

export function convertCurrency(inputValue, currency) {
  const RATES = window.exchangeRates;
  if (RATES)
  {
    const rate = RATES[currency];
    return inputValue * rate;
  }
  else
  {
    return inputValue;
  }
}

export function convertCurrencyToString(inputValue, currency, format = '$0,0') {
  const SYMBOL = currencySymbols[currency] || currency + ' ';
  const RATES = window.exchangeRates;

  if (RATES)
  {
    const rate = RATES[currency];
    const converted = inputValue * rate;
    return numeral(converted).format(format).replace('$', SYMBOL);
  }
  else
  {
    return numeral(inputValue).format(format);
  }
}
