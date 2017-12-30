export const PROJECT_VERSION = '0.1.5.2';

const DELIMETER = '__';

export const SUBREDDIT_COMMENT_COUNTS = 'SUBREDDIT_COMMENT_COUNTS';
export const SUBREDDIT_POST_COUNTS = 'SUBREDDIT_POST_COUNTS';
export const TOTAL_MARKET_CAP = 'TOTAL_MARKET_CAP';
export const TV_CANDLE_CHART = 'TV_CANDLE_CHART';
export const TV_MARKET_OVERVIEW = 'TV_MARKET_OVERVIEW';

export const ITEM_KEY_WHITELIST = [
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  'TOKEN-PRICE',
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
];

// Array of dashboard page objects.
export const DEFAULT_PAGES_OBJECTS = [
  {
    dashboardItems: [
      {"id":"3","w":5,"h":4,"x":0,"y":0,"identifier":"TV_CANDLE_CHART__BITSTAMP:BTCUSD"},
      {"id":"6","w":5,"h":4,"x":0,"y":4,"identifier":"TV_CANDLE_CHART__BITSTAMP:ETHUSD"},
      {"id":"7","w":3,"h":8,"x":5,"y":0,"identifier":"TV_MARKET_OVERVIEW__Default"},
      {"id":"8","w":5,"h":4,"x":0,"y":8,"identifier":"TV_CANDLE_CHART__BITSTAMP:LTCUSD"},
      {"id":"9","w":3,"h":3,"x":5,"y":8,"identifier":"SUBREDDIT_COMMENT_COUNTS__Bitcoin"},
    ],
    index: 0,
    name: 'Tab 1',
  },
  {
    dashboardItems: [
    ],
    index: 1,
    name: 'Tab 2',
  },
  {
    dashboardItems: [
    ],
    index: 2,
    name: 'Tab 3',
  },
  {
    dashboardItems: [
    ],
    index: 3,
    name: 'Tab 4',
  },
];

// Keys should be all lowercase.
export const DEFAULT_ITEM_OBJECTS_BY_SUBREDDIT = {
  monero: [
    {
      id: '1',
      identifier: generateIdentifier(TV_CANDLE_CHART, 'KRAKEN:XMRUSD'),
      w: 4,
      h: 4,
      x: 0,
      y: 0,
    },
    {
      id: '2',
      identifier: generateIdentifier(SUBREDDIT_POST_COUNTS, 'Monero'),
      w: 4,
      h: 4,
      x: 4,
      y: 0,
    },
    {
      id: '3',
      identifier: generateIdentifier(TV_CANDLE_CHART, 'BITTREX:XMRBTC'),
      w: 4,
      h: 4,
      x: 0,
      y: 4,
    },
    {
      id: '4',
      identifier: generateIdentifier(SUBREDDIT_COMMENT_COUNTS, 'Monero'),
      w: 4,
      h: 4,
      x: 4,
      y: 4,
    },
  ],
};

export const ITEM_KEY_TO_LABELS = {
  [TV_CANDLE_CHART]: 'Candle chart',
  [TV_MARKET_OVERVIEW]: 'Market overview',
  [SUBREDDIT_POST_COUNTS]: 'Subreddit posts chart',
  [SUBREDDIT_COMMENT_COUNTS]: 'Subreddit comments chart',
  [TOTAL_MARKET_CAP]: 'Total market cap chart',
};

// These array values should be in user-facing order.
// The order does affect user-facing order.
const SUBREDDITS_IN_USER_FACING_ORDER = [
  'Bitcoin',
  'ethereum',
  'litecoin',
  'Bitcoincash',
  'altcoin',
  'btc',
  'CryptoCurrency',
  'CryptoMarkets',
  'Monero',
  'SubstratumNetwork',
  'dogecoin',
  'Ripple',
  'Vertcoin',
  'NEO',
  'Electroneum',
  'Groestlcoin',
  'Iota',
  'Lisk',
];

export const ITEM_KEY_TO_VALUES = {
  [SUBREDDIT_COMMENT_COUNTS]: SUBREDDITS_IN_USER_FACING_ORDER,
  [SUBREDDIT_POST_COUNTS]: SUBREDDITS_IN_USER_FACING_ORDER,
  [TOTAL_MARKET_CAP]: [
    'Default',
  ],
  [TV_CANDLE_CHART]: [
    'COINBASE:BTCUSD',
    'BITSTAMP:BTCUSD',
    'BITSTAMP:ETHUSD',
    'BITSTAMP:LTCUSD',
    'BITSTAMP:BCHUSD',
    'BITSTAMP:XRPUSD',
    'KRAKEN:XMRUSD',
    'BITFINEX:XMRUSD',
    'BITTREX:ZECUSD',
    'BITTREX:STEEMUSD',
    'BITTREX:SBDUSD',
    'KRAKEN:DASHUSD',
    'BITTREX:XEMUSD',
    'BITFINEX:IOTUSD',
    'BITTREX:XLMUSD',
    'BITTREX:LSKUSD',
    'BITTREX:XVGUSD',
    'BITTREX:WAVESUSD',
    'BITFINEX:EOSUSD',
    'BITTREX:QTUMUSD',
    'KRAKEN:USDTUSD',
    'BITTREX:MCOUSD',
    'HITBTC:BTCUSD',
    'COINBASE:ETHUSD',
    'KRAKEN:ETHUSD',
    'COINBASE:LTCUSD',
    'BITFINEX:LTCUSD',
    'KRAKEN:LTCUSD',
    'BITFINEX:BTCUSD',
    'BITSTAMP:ETHBTC',
    'BITSTAMP:LTCBTC',
    'BITSTAMP:BCHBTC',
    'BITFINEX:BCHBTC',
    'BITTREX:XMRBTC',
    'BINANCE:XMRBTC',
    'BITFINEX:XMRBTC',
    'BITTREX:ADABTC',
    'BITTREX:ADAETH',
    'BITTREX:DASHBTC',
    'BITTREX:XEMBTC',
    'BITFINEX:IOTBTC',
    'BITSTAMP:XRPBTC',
    'BINANCE:XRPBTC',
    'BITTREX:NEOUSD',
    'BITTREX:NEOBTC',
    'BINANCE:NEOBTC',
    'BITFINEX:NEOBTC',
    'BITTREX:ZECBTC',
    'BITFINEX:ZECBTC',
    'BITTREX:XLMBTC',
    'BITTREX:LSKBTC',
    'BITTREX:STEEMBTC',
    'BITTREX:SBDBTC',
    'BITTREX:XVGBTC',
    'BITFINEX:EOSBTC',
    'BITTREX:QTUMBTC',
    'BITTREX:MCOBTC',
    'BINANCE:MCOBTC',
    'BINANCE:BNBBTC',
    'BINANCE:BNBETH',
    'BINANCE:MCOETH',
    'BINANCE:MCOETH',
    'BINANCE:ICXBTC',
    'BINANCE:ICXETH',
  ],
  [TV_MARKET_OVERVIEW]: [
    'Default',
  ],
};

// This map should be alphabetical for ease of development.
// The order does not affect user-facing order.
export const ITEM_VALUE_TO_LABELS = {
  'altcoin' : 'r/Altcoin',
  'Bitcoin' : 'r/Bitcoin',
  'Bitcoincash' : 'r/Bitcoincash',
  'btc' : 'r/BTC',
  'dogecoin' : 'r/Dogecoin',
  'Electroneum' : 'r/Electroneum',
  'ethereum' : 'r/Ethereum',
  'CryptoCurrency' : 'r/Cryptocurrency',
  'CryptoMarkets' : 'r/Cryptomarkets',
  'Groestlcoin' : 'r/Groestlcoin',
  'Iota' : 'r/Iota',
  'litecoin' : 'r/Litecoin',
  'Lisk' : 'r/Lisk',
  'Monero' : 'r/Monero',
  'NEO' : 'r/NEO',
  'Ripple' : 'r/Ripple',
  'SubstratumNetwork' : 'r/Substratumnetwork',
  'Vertcoin' : 'r/Vertcoin',
};

// Returns an array of [next Y coordinate to use, next id to use].
export function computeDashboardFreeValues(dashboardItems)
{
  var maxId = 0;
  var maxY = 0;
  dashboardItems.forEach((dashboardItem) => {
    maxId = Math.max(maxId, parseInt(dashboardItem.id));
    maxY = Math.max(maxY, dashboardItem.y + dashboardItem.h);
  });
  return [maxY, String(maxId + 1)];
}

export function generateIdentifier(key, value)
{
  if (!ITEM_KEY_WHITELIST.includes(key))
  {
    console.log('Invalid identifier');
    return null;
  }
  else
  {
    return `${key}${DELIMETER}${value}`;
  }
}

export function isIdentifierValid(identifier)
{
  const arr = identifier.split(DELIMETER, 2);
  const identifierKey = arr[0];
  const identifierValue = arr[1];
  return ITEM_KEY_WHITELIST.includes(identifierKey);
}

export function parseIdentifer(identifier)
{
  if (!isIdentifierValid(identifier))
  {
    console.log('Invalid identifier');
    return null;
  }
  else
  {
    return identifier.split(DELIMETER, 2);
  }
}

export function parseIdentiferKey(identifier)
{
  const arr = parseIdentifer(identifier);
  if (arr)
  {
    return arr[0];
  }
  else
  {
    return null;
  }
}
