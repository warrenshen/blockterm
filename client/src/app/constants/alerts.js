const ONE_HOUR = 'ONE_HOUR';
const SIX_HOURS = 'SIX_HOURS';
const ONE_DAY = 'ONE_DAY';
const ONE_WEEK = 'ONE_WEEK';
const NEVER = 'NEVER';

const LESS_THEN = 'LESS_THEN';
const GREATER_THEN = 'GREATER_THEN';

export const ALERT_CONDITION_SELECT_OPTIONS = [
  {
    label: 'Less then price',
    value: LESS_THEN,
  },
  {
    label: 'Greater then price',
    value: GREATER_THEN,
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
