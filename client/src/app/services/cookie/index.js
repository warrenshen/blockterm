// @flow weak

const APP_PERSIST_STORES_TYPES = [
  'localStorage',
  'sessionStorage',
];

export const AUTH_TOKEN_COOKIE = 'AUTH_TOKEN_COOKIE';
export const CURRENCY_COOKIE = 'CURRENCY_COOKIE';
export const DASHBOARD_COOKIE = 'DASHBOARD_COOKIE';
export const ENABLED_FEATURES_COOKIE = 'ENABLED_FEATURES_COOKIE';
export const NIGHT_MODE_COOKIE = 'NIGHT_MODE_COOKIE';
export const PORTFOLIO_SORT_BY_COOKIE = 'PORTFOLIO_SORT_BY_COOKIE';
export const SELECTED_TAB_COOKIE = 'SELECTED_TAB_COOKIE';
export const TIME_ZONE_COOKIE = 'TIME_ZONE_COOKIE';
export const LAST_SEEN_VERSION = 'LAST_SEEN_VERSION';

export const FEATURE_PORTFOLIO_HISTORY = 'FEATURE_PORTFOLIO_HISTORY';

const parse = JSON.parse;
const stringify = JSON.stringify;

export function getItem(
  itemKey,
  asString = false,
  fromStorage = APP_PERSIST_STORES_TYPES[0])
{
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0] && localStorage)
  {
    try
    {
      let value = localStorage.getItem(itemKey);

      if (!asString)
      {
        value = parse(value);
      }

      if (String(value) === 'true')
      {
        return true;
      }
      else if (String(value) === 'false')
      {
        return false;
      }
      else
      {
        return value || null;
      }
    }
    catch (err)
    {
      clearItem(itemKey);
    }
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1] && sessionStorage)
  {
    try
    {
      let value = sessionStorage.getItem(itemKey);

      if (!asString)
      {
        value = parse(value);
      }

      if (String(value) === 'true')
      {
        return true;
      }
      else if (String(value) === 'false')
      {
        return false;
      }
      else
      {
        return value || null;
      }
    }
    catch (err)
    {
      clearItem(itemKey);
    }
  }
  // default:
  return null;
}

export function setItem(itemKey, value, toStorage=APP_PERSIST_STORES_TYPES[0])
{
  const json = stringify(value);

  // localStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (localStorage) {
      localStorage.setItem(itemKey, json);
    }
  }
  // sessionStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (sessionStorage) {
      sessionStorage.setItem(itemKey, json);
    }
  }
}

export function clearItem(itemKey, toStorage=APP_PERSIST_STORES_TYPES[0])
{
  // localStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (localStorage) {
      localStorage.removeItem(itemKey);
    }
  }
  // sessionStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (sessionStorage) {
      sessionStorage.removeItem(itemKey);
    }
  }
}

export function isFeatureEnabled(feature)
{
  const enabledFeatures = getItem(ENABLED_FEATURES_COOKIE);
  return enabledFeatures !== null && enabledFeatures[feature] === true;
}
