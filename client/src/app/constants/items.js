const DELIMETER = '__';

export const SUBREDDIT_POST_COUNTS = 'SUBREDDIT_POST_COUNTS';
export const TV_CANDLE_CHART = 'TV_CANDLE_CHART';

export const ITEM_KEY_WHITELIST = [
  SUBREDDIT_POST_COUNTS,
  'TOKEN-PRICE',
  TV_CANDLE_CHART,
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

export const ITEM_KEY_TO_LABELS = {
  [SUBREDDIT_POST_COUNTS]: 'Subreddit posts chart',
  [TV_CANDLE_CHART]: 'Candle chart',
};

export const ITEM_KEY_TO_VALUES = {
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
    'BITSTAMP:XMRUSD',
    'BITSTAMP:NEOUSD',
    'KRAKEN:DASHUSD',
    'BITSTAMP:XRPUSD',
    'BITTREX:ZECUSD',
    'BITFINEX:IOTUSD',
    'BITTREX:XLMUSD',
    'BITTREX:LSKUSD',
    'KRAKEN:USDTUSD',
    'BITTREX:STEEMUSD',
    'BITTREX:XVGUSD',
    'BITTREX:WAVESUSD',
    'BITFINEX:EOSUSD',
    'BITTREX:QTUMUSD',
  ],
};

export const ITEM_VALUE_TO_LABELS = {
  Bitcoin: 'r/Bitcoin',
  ethereum: 'r/ethereum',
  NEO: 'r/NEO',
};
