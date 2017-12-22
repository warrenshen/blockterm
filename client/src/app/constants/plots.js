export const ONE_DAY = 'ONE_DAY';
export const ONE_WEEK = 'ONE_WEEK';
export const TWO_WEEKS = 'TWO_WEEKS';
export const ONE_MONTH = 'ONE_MONTH';
export const THREE_MONTHS = 'THREE_MONTHS';
export const SIX_MONTHS = 'SIX_MONTHS';
export const ONE_YEAR = 'ONE_YEAR';
export const THREE_YEARS = 'THREE_YEARS';
export const ALL_TIME = 'ALL_TIME';

import * as STYLES from './styles';

const oneDay = {
  label: '24 hours',
  substract: { days: 1 },
  value: ONE_DAY,
};
const oneWeek = {
  label: '1 week',
  subtract: { weeks: 1 },
  value: ONE_WEEK,
};
const oneMonth = {
  label: '1 month',
  subtract: { months: 1 },
  value: ONE_MONTH,
};
const threeMonths = {
  label: '3 months',
  subtract: { months: 3 },
  value: THREE_MONTHS,
};
const sixMonths = {
  label: '6 months',
  subtract: { months: 6 },
  value: SIX_MONTHS,
};
const oneYear = {
  label: '1 year',
  subtract: { years: 1 },
  value: ONE_YEAR,
};
const threeYears = {
  label: '3 years',
  subtract: { years: 3 },
  value: THREE_YEARS,
};
const allTime = {
  label: 'All time',
  value: ALL_TIME,
};

export const SMALL_RANGE_SELECT_OPTIONS = [
  oneDay,
  oneWeek,
  oneMonth,
  threeMonths,
  oneYear,
  allTime,
];

export const RANGE_SELECT_OPTIONS = [
  oneWeek,
  oneMonth,
  threeMonths,
  sixMonths,
  oneYear,
  threeYears,
  allTime,
];

export const BAR_CHART_DATA_STYLES = [
  {
    // #3498db
    historical: {
      // backgroundColor: 'rgba(255,99,132,0.2)',
      backgroundColor: STYLES.ORANGE,
      // borderColor: 'rgba(255,99,132,1)',
      //borderColor: '#3498db',
      //borderWidth: 1,
      // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBackgroundColor: STYLES.GOLD,
      // hoverBorderColor: 'rgba(255,99,132,1)',
      //hoverBorderColor: '#2980b9',
    },
    now: {
      backgroundColor: STYLES.COMPBLUE,
      //borderColor: 'rgba(54, 162, 235, 1)',
      //borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
    }
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

export const LINE_CHART_DATA_STYLES = [
  {
    historical: {
      backgroundColor: 'rgba(52,152,219,0.4)',
      borderColor: '#006DDB',
      // hoverBackgroundColor: '#2980b9',
      // hoverBorderColor: '#2980b9',
      // backgroundColor: 'rgba(255,99,132,0.2)',
      //borderColor: 'rgba(255,99,132,0.2)',
      // borderWidth: 4,
      borderWidth: 2,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,99,132,0.2)',
      pointBorderColor: 'rgba(255,99,132,1)',
      // pointBorderWidth: 2,
      // pointRadius: 2,
      // pointHitRadius: 3,
      pointBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 2,
      // pointHoverBackgroundColor
      // pointHoverBorderColor
      // pointHoverBorderWidth
      // pointHoverRadius
    },
    // now: {
    //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //   borderColor: 'rgba(54, 162, 235, 1)',
    //   borderWidth: 1,
    //   hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
    //   hoverBorderColor: 'rgba(54, 162, 235, 1)',
    // },
  },
  {
    historical: {
      backgroundColor: '#e74c3c',
      borderColor: '#e74c3c',
      // backgroundColor: 'rgba(54, 162, 235, 0.2)',
      // borderColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 4,
      // borderCapStyle:
      // borderJoinStyle:
      fill: false,
      lineTension: 0,
      pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBorderColor: 'rgba(54, 162, 235, 1)',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
      // pointHoverBackgroundColor
      // pointHoverBorderColor
      // pointHoverBorderWidth
      // pointHoverRadius
    },
  },
  {
    historical: {
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 4,
      // borderCapStyle:
      // borderJoinStyle:
      fill: false,
      lineTension: 0,
      pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBorderColor: 'rgba(54, 162, 235, 1)',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
      // pointHoverBackgroundColor
      // pointHoverBorderColor
      // pointHoverBorderWidth
      // pointHoverRadius
    },
  },
]
