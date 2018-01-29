// @flow weak

import {
  parseItemIdentifierValue,
} from './items';

const ONE_HOUR = 'ONE_HOUR';
const SIX_HOURS = 'SIX_HOURS';
const ONE_DAY = 'ONE_DAY';
const ONE_WEEK = 'ONE_WEEK';
const ONE_MONTH = 'ONE_MONTH';

export const LESS_THAN = 'LESS_THAN';
export const GREATER_THAN = 'GREATER_THAN';

export const ALERT_CONDITION_SELECT_OPTIONS = [
  {
    label: 'Less than price',
    value: LESS_THAN,
  },
  {
    label: 'Greater than price',
    value: GREATER_THAN,
  },
];

export const ALERT_EXPIRES_IN_SELECT_OPTIONS = [
  {
    label: '1 hour',
    value: ONE_HOUR,
  },
  {
    label: '6 hours',
    value: SIX_HOURS,
  },
  {
    label: '1 day',
    value: ONE_DAY,
  },
  {
    label: '1 week',
    value: ONE_WEEK,
  },
  {
    label: '1 month',
    value: ONE_MONTH,
  },
];

const EXCHANGES_WITH_ALERTS_SUPPORT = [
  'BINANCE',
  'BITTREX',
];

export function isIdentifierExchangeSupported(itemIdentifier)
{
  const itemIdentifierValue = parseItemIdentifierValue(itemIdentifier);
  const [market, ticker] = itemIdentifierValue.split(':', 2);
  return EXCHANGES_WITH_ALERTS_SUPPORT.includes(market);
}

const DELIMETER = '__';

export function generateAlertIdentifier(market, price, condition)
{
  return `${market}${DELIMETER}${price}${DELIMETER}${condition}`;
}

function isAlertIdentifierValid(identifier)
{
  const arr = identifier.split(DELIMETER, 3);
  if (arr.length != 3)
  {
    return false;
  }
  else
  {
    return true;
  }
}

export function parseAlertIdentifier(identifier)
{
  if (!isAlertIdentifierValid(identifier))
  {
    if (process.env.NODE_ENV === 'dev')
    {
      console.log(`Invalid identifier: ${identifier}`);
    }
    return null;
  }
  else
  {
    return identifier.split(DELIMETER, 3);
  }
}

export function generateAlertNotificationTitle(alert)
{
  return `Price alert: ${alert.identifier}!`;
}

export function generateAlertNotificationBody(alert)
{
  const [market, price, condition] = parseAlertIdentifier(alert.identifier);
  return `${price}`;
}

export function filterAlertsByItemIdentifier(alerts, itemIdentifier)
{
  return alerts.filter(
    (alert) => parseAlertIdentifier(alert.identifier)[0] === parseItemIdentifierValue(itemIdentifier)
  );
}
