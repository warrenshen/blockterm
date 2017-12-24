export const ITEM_KEY_WHITELIST = [
  'SUBREDDIT-POSTS',
  'TOKEN-PRICE',
  'TV-CANDLE-CHART',
];

export const DEFAULT_DASHBOARD_ITEMS = [
  {
    id: '1',
    identifier: 'TV-CANDLE-CHART-BITSTAMP:BTCUSD',
    w: 4,
    h: 4,
    x: 0,
    y: 0,
  },
  {
    id: '2',
    identifier: 'SUBREDDIT-POSTS-5',
    w: 4,
    h: 4,
    x: 4,
    y: 0,
  },
];

export function isIdentifierValid(identifier)
{
  const index = identifier.lastIndexOf('-');
  const identifierKey = identifier.substring(0, index);
  const identifierValue = identifier.substring(index + 1);
  return ITEM_KEY_WHITELIST.includes(identifierKey);
}

export const DASHBOARD_ITEM_KEYS = [
  'Candle chart',
  '# posts',
];

export const DASHBOARD_ITEM_KEY_TO_VALUES = {
  'Candle chart': [
    'BITSTAMP:BTCUSD',
    'BITSTAMP:ETHUSD',
    'BITSTAMP:LTCUSD',
    'BITSTAMP:XMRUSD',
    'BITSTAMP:NEOUSD',
  ],
  '# posts': [
    'r/Bitcoin',
    'r/ethereum',
    'r/NEO',
  ],
};
