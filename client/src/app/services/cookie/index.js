// @flow weak

const APP_PERSIST_STORES_TYPES = [
  'localStorage',
  'sessionStorage',
];

export const AUTH_TOKEN_COOKIE = 'AUTH_TOKEN_COOKIE';
export const DASHBOARD_COOKIE = 'DASHBOARD_COOKIE';
export const NIGHT_MODE_COOKIE = 'NIGHT_MODE_COOKIE';

const parse = JSON.parse;
const stringify = JSON.stringify;

export function getItem(itemKey, asString=false, fromStorage=APP_PERSIST_STORES_TYPES[0])
{
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0] && localStorage) {
    let value = localStorage.getItem(itemKey);

    if (!asString)
    {
      value = parse(value);
    }

    if (value === 'true')
    {
      return true;
    }
    else if (value == 'false')
    {
      return false;
    }
    else
    {
      return value || null;
    }
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1] && sessionStorage) {
    const value = sessionStorage.getItem(itemKey);
    if (value === 'true')
    {
      return true;
    }
    else if (value == 'false')
    {
      return false;
    }
    else
    {
      return value || null;
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
