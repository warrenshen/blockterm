export const ITEM_KEY_WHITELIST = [
  'SUBREDDIT-POSTS',
  'TOKEN-PRICE',
  'TV-CANDLE-CHART',
];

export function isIdentifierValid(identifier)
{
  const index = identifier.lastIndexOf('-');
  const identifierKey = identifier.substring(0, index);
  const identifierValue = identifier.substring(index + 1);
  return ITEM_KEY_WHITELIST.includes(identifierKey);
}
