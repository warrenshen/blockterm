// @flow weak

const APP_PERSIST_STORES_TYPES = [
  'localStorage',
  'sessionStorage'
];

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const NIGHT_MODE = 'NIGHT_MODE';

export function getItem(itemKey, fromStorage=APP_PERSIST_STORES_TYPES[0])
{
  // localStorage:
  if (fromStorage === APP_PERSIST_STORES_TYPES[0] && localStorage) {
    const value = localStorage.getItem(itemKey);
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
