// @flow weak

const APP_PERSIST_STORES_TYPES = [
  'localStorage',
  'sessionStorage'
];

const parse     = JSON.parse;
const stringify = JSON.stringify;

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const NIGHT_MODE = 'NIGHT_MODE';

export function getItem(itemKey, fromStorage=APP_PERSIST_STORES_TYPES[0])
{
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
    return (localStorage && parse(localStorage.getItem(itemKey))) || null;
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
    return (sessionStorage && parse(sessionStorage.getItem(itemKey))) || null;
  }
  // default:
  return null;
}

export function setItem(itemKey, value, toStorage=APP_PERSIST_STORES_TYPES[0])
{
  value = stringify(value);

  // localStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (localStorage) {
      localStorage.setItem(itemKey, value);
    }
  }
  // sessionStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (sessionStorage) {
      sessionStorage.setItem(itemKey, value);
    }
  }
}
