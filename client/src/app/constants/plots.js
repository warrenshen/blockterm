export const ONE_WEEK = 'ONE_WEEK';
export const ONE_MONTH = 'ONE_MONTH';
export const THREE_MONTHS = 'THREE_MONTHS';
export const SIX_MONTHS = 'SIX_MONTHS';
export const ONE_YEAR = 'ONE_YEAR';
export const ALL_TIME = 'ALL_TIME';

export const RANGE_SELECT_OPTIONS = [
  {
    label: '1 week',
    subtract: { weeks: 1 },
    value: ONE_WEEK,
  },
  {
    label: '1 month',
    subtract: { months: 1 },
    value: ONE_MONTH,
  },
  {
    label: '3 months',
    subtract: { months: 3 },
    value: THREE_MONTHS,
  },
  {
    label: '6 months',
    subtract: { months: 6 },
    value: SIX_MONTHS,
  },
  {
    label: '1 year',
    subtract: { years: 1 },
    value: ONE_YEAR,
  },
  {
    label: 'All time',
    value: ALL_TIME,
  },
];

export const DATA_STYLES = [
  {
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
  },
  {
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
    hoverBorderColor: 'rgba(54, 162, 235, 1)',
  },
  {
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
    borderColor: 'rgba(255, 206, 86, 1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
    hoverBorderColor: 'rgba(255, 206, 86, 1)',
  },
];
