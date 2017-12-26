const DELIMETER = '__';

export const SUBREDDIT_COMMENT_COUNTS = 'SUBREDDIT_COMMENT_COUNTS';
export const SUBREDDIT_POST_COUNTS = 'SUBREDDIT_POST_COUNTS';
export const TV_CANDLE_CHART = 'TV_CANDLE_CHART';
export const TV_MARKET_OVERVIEW = 'TV_MARKET_OVERVIEW';

export const ITEM_KEY_WHITELIST = [
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  'TOKEN-PRICE',
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
];

export const DEFAULT_ITEM_OBJECTS = [
  {
    id: '1',
    identifier: generateIdentifier(TV_CANDLE_CHART, 'BITSTAMP:BTCUSD'),
    w: 4,
    h: 4,
    x: 0,
    y: 0,
  },
  {
    id: '2',
    identifier: generateIdentifier(SUBREDDIT_POST_COUNTS, 'Bitcoin'),
    w: 4,
    h: 4,
    x: 4,
    y: 0,
  },
  {
    id: '3',
    identifier: generateIdentifier(TV_CANDLE_CHART, 'BITSTAMP:ETHUSD'),
    w: 4,
    h: 4,
    x: 0,
    y: 4,
  },
  {
    id: '4',
    identifier: generateIdentifier(SUBREDDIT_POST_COUNTS, 'ethereum'),
    w: 4,
    h: 4,
    x: 4,
    y: 4,
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
};

export const ITEM_KEY_TO_VALUES = {
  [SUBREDDIT_COMMENT_COUNTS]: [
    'Bitcoin',
    'ethereum',
    'NEO',
  ],
  [SUBREDDIT_POST_COUNTS]: [
    'Bitcoin',
    'ethereum',
    'NEO',
  ],
  [TV_CANDLE_CHART]: [
    'BITSTAMP:BTCUSD',
    'BITSTAMP:ETHUSD',
    'BITSTAMP:LTCUSD',
    'BITSTAMP:BCHUSD',
    'BITSTAMP:XRPUSD',
    'BITFINEX:IOTUSD',
    'BITTREX:ZECUSD',
    'BITTREX:XLMUSD',
    'BITTREX:LSKUSD',
    'BITTREX:STEEMUSD',
    'BITTREX:XVGUSD',
    'BITTREX:WAVESUSD',
    'BITFINEX:EOSUSD',
    'BITTREX:QTUMUSD',
    'KRAKEN:USDTUSD',
    'KRAKEN:DASHUSD',
    'KRAKEN:XMRUSD',
    'BITSTAMP:ETHBTC',
    'BITSTAMP:LTCBTC',
    'BITSTAMP:BCHBTC',
    'BITFINEX:BCHBTC',
    'BITTREX:XMRBTC',
    'BITFINEX:XMRBTC',
    'BITTREX:DASHBTC',
    'BITFINEX:IOTBTC',
    'BITSTAMP:XRPBTC',
    'BITTREX:NEOBTC',
    'BITFINEX:NEOBTC',
    'BITTREX:ZECBTC',
    'BITFINEX:ZECBTC',
    'BITTREX:XLMBTC',
    'BITTREX:LSKBTC',
    'BITTREX:STEEMBTC',
    'BITTREX:XVGBTC',
    'BITFINEX:EOSBTC',
    'BITTREX:QTUMBTC',
  ],
  [TV_MARKET_OVERVIEW]: [
    'Default',
  ],
};

export const ITEM_VALUE_TO_LABELS = {
  Bitcoin: 'r/Bitcoin',
  ethereum: 'r/ethereum',
  NEO: 'r/NEO',
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
