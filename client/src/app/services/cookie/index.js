// @flow weak

const APP_PERSIST_STORES_TYPES = [
  'localStorage',
  'sessionStorage'
];

const parse     = JSON.parse;
const stringify = JSON.stringify;

export function getToken(tokenKey, fromStorage=APP_PERSIST_STORES_TYPES[0])
{
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
    return (localStorage && parse(localStorage.getItem(tokenKey))) || null;
  }
  // sessionStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
    return (sessionStorage && parse(sessionStorage.getItem(tokenKey))) || null;
  }
  // default:
  return null;
}

export function setToken(tokenKey, value, toStorage=APP_PERSIST_STORES_TYPES[0])
{
  value = stringify(value);

  // localStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
    if (localStorage) {
      localStorage.setItem(tokenKey, value);
    }
  }
  // sessionStorage:
  if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
    if (sessionStorage) {
      sessionStorage.setItem(tokenKey, value);
    }
  }
}
