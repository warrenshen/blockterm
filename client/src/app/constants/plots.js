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

export const PORTFOLIO_RANGE_SELECT_OPTIONS = [
  oneWeek,
  oneMonth,
  threeMonths,
  allTime,
];

export const GT_ONE_DAY = 'now 1-d';
export const GT_SEVEN_DAYS = 'now 7-d';
export const GT_ONE_MONTH = 'today 1-m';
export const GT_THREE_MONTHS = 'today 3-m';
export const GT_TWELVE_MONTHS = 'today 12-m';
export const GT_FIVE_YEARS = 'today 5-y';

const oneDayGT = {
  label: '24 hours',
  value: GT_ONE_DAY,
};
const sevenDaysGT = {
  label: '7 days',
  value: GT_SEVEN_DAYS,
};
const oneMonthGT = {
  label: '1 month',
  value: GT_ONE_MONTH,
};
const threeMonthsGT = {
  label: '3 months',
  value: GT_THREE_MONTHS,
};
const twelveMonthsGT = {
  label: '12 months',
  value: GT_TWELVE_MONTHS,
};
const fiveYearsGT = {
  label: '5 years',
  value: GT_FIVE_YEARS,
};

export const GT_SELECT_OPTIONS = [
  oneDayGT,
  sevenDaysGT,
  oneMonthGT,
  threeMonthsGT,
  twelveMonthsGT,
  fiveYearsGT,
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
      backgroundColor: STYLES.FIREORANGE,
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
  { //day mode default color for line charts used in LineChartWithSelect(Item)
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
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#007DEB',
      // pointBorderWidth: 2,
      // pointRadius: 2,
      // pointHitRadius: 3,
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 1.5,
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
  { //night mode default color for line charts used in LineChartWithSelect(Item)
    historical: {
      backgroundColor: 'rgba(255,141,25,0.4)',
      borderColor: '#FF6519',
      borderWidth: 2,
      borderCapStyle: 'rgba(255,81,0,0.2)',
      borderJoinStyle: 'rgba(255,81,0,0.2)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#FF7529',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
    },
  },
  { //used for sats activity graphs in token.js
    historical: {
      backgroundColor: '#ffce00',
      borderColor: '#ffce00',
      borderWidth: 4,
      fill: false,
      lineTension: 0,
      pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBorderColor: 'rgba(54, 162, 235, 1)',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
    },
  },
  { //used for sats multi-bar graph
    historical: {
      backgroundColor: '#F93621',
      borderColor: '#F93621',
      borderWidth: 4,
      fill: false,
      lineTension: 0,
      pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
      pointBorderColor: 'rgba(54, 162, 235, 1)',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
    },
  },
  { //used for sats multi-bar graph
    historical: {
      backgroundColor: '#ff9a00',
      borderColor: '#ff9a00',
      borderWidth: 2,
      borderCapStyle: 'rgba(255,81,0,0.2)',
      borderJoinStyle: 'rgba(255,81,0,0.2)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#FF7529',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
    },
  },
  { //used for sats multi-bar graph
    historical: {
      backgroundColor: '#00E96D',
      borderColor: '#00E96D',
      borderWidth: 2,
      borderCapStyle: 'rgba(255,81,0,0.2)',
      borderJoinStyle: 'rgba(255,81,0,0.2)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#FF7529',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 3,
    },
  },
];

export const LINE_CHART_AUXILLARY_STYLES = [
  { //day total market cap color
    historical: {
      backgroundColor: 'rgba(0, 80, 255, 0.4)',
      borderColor: '#0050FF',
      borderWidth: 2,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#0050FF',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 1.5,
    },
  },
  { //night total market cap graph color
    historical: {
      backgroundColor: 'rgba(255, 185, 0, 0.4)',
      borderColor: '#FFB900',
      borderWidth: 2,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#FFB900',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 1.5,
    },
  },
  { //dominance bitcoin
    historical: {
      backgroundColor: 'rgba(255, 153, 0, 0.4)',
      borderColor: '#FF8800',
      borderWidth: 2,
      borderCapStyle: 'rgba(255, 153, 0, 0.4)',
      borderJoinStyle: 'rgba(255, 153, 0, 0.4)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#FF8800',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 1.5,
    },
  },
  { //dominance ethereum
    historical: {
      backgroundColor: 'rgba(150, 153, 149, 0.4)',
      borderColor: '#7A7D7A',
      borderWidth: 2,
      borderCapStyle: 'rgba(150, 153, 149, 0.4)',
      borderJoinStyle: 'rgba(150, 153, 149, 0.4)',
      fill: true,
      lineTension: 0,
      pointBackgroundColor: 'rgba(255,255,255,0.1)',
      pointBorderColor: '#7A7D7A',
      pointBorderWidth: 2,
      pointRadius: 2,
      pointHitRadius: 1.5,
    },
  },
];

export const COMPARE_CHART_DATA_STYLES = [
  {
    historical: {
      backgroundColor: '#006DDB',
      borderColor: '#006DDB',
      borderWidth: 3,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: false,
      lineTension: 0,
       pointBorderWidth: 0,
       pointRadius: 0,
    },
  },
  {
    historical: {
      backgroundColor: '#e74c3c',
      borderColor: '#e74c3c',
      borderWidth: 3,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: false,
      lineTension: 0,
       pointBorderWidth: 0,
       pointRadius: 0,
    },
  },
  { //used for sats
    historical: {
      backgroundColor: '#2ecc71',
      borderColor: '#2ecc71',
      borderWidth: 3,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: false,
      lineTension: 0,
       pointBorderWidth: 0,
       pointRadius: 0,
    },
  },
  { //used for sats multi-bar graph
    historical: {
      backgroundColor: '#e67e22',
      borderColor: '#e67e22',
      borderWidth: 3,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: false,
      lineTension: 0,
       pointBorderWidth: 0,
       pointRadius: 0,
    },
  },
  {
    historical: {
      backgroundColor: '#8e44ad',
      borderColor: '#8e44ad',
      borderWidth: 3,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: false,
      lineTension: 0,
       pointBorderWidth: 0,
       pointRadius: 0,
    },
  },
  {
    historical: {
      backgroundColor: '#f1c40f',
      borderColor: '#f1c40f',
      borderWidth: 3,
      borderCapStyle: 'rgba(255,99,132,0.2)',
      borderJoinStyle: 'rgba(255,99,132,0.2)',
      fill: false,
      lineTension: 0,
       pointBorderWidth: 0,
       pointRadius: 0,
    },
  },
];
