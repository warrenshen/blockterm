const ONE_HOUR = 'ONE_HOUR';
const SIX_HOURS = 'SIX_HOURS';
const ONE_DAY = 'ONE_DAY';
const ONE_WEEK = 'ONE_WEEK';
const NEVER = 'NEVER';

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
    label: 'Never',
    value: NEVER,
  },
];

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
      console.log('Invalid identifier');
    }
    return null;
  }
  else
  {
    return identifier.split(DELIMETER, 3);
  }
}
