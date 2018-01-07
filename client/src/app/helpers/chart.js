import moment from 'moment';
import {
  BAR_CHART_DATA_STYLES,
  LINE_CHART_DATA_STYLES,
  LINE_CHART_AUXILLARY_STYLES,
  COMPARE_CHART_DATA_STYLES,
  THREE_MONTHS,
  SIX_MONTHS,
  ONE_YEAR,
  THREE_YEARS,
  ALL_TIME,
} from '../constants/plots';

// Returns true if a chart with given plot range should include year in x axis.
export function isPlotRangeBig(plotRange)
{
  return plotRange === THREE_MONTHS ||
         plotRange === SIX_MONTHS ||
         plotRange === ONE_YEAR ||
         plotRange === THREE_YEARS ||
         plotRange === ALL_TIME;
}

export function disableChartOptions(earliestDate, options)
{
  if (!earliestDate)
  {
    return [];
  }

  const earliest = moment(earliestDate, 'YYYY-M-D H:m:s Z').startOf('day');
  return options.map((option) => {
    if (option.subtract)
    {
      const today = moment().startOf('day');
      const rangeStart = today.subtract(option.subtract);
      return Object.assign(
        {},
        option,
        { disabled: rangeStart < earliest ? true : false }
      );
    }
    else
    {
      return Object.assign({}, option);
    }
  });
}

export function generateChartData(
  points,
  key='value',
  recentCount=undefined,
  recentLabel='today',
  timeFormat='MM/DD')
{
  var x = points.map((point) => moment(point.timestamp, 'YYYY-M-D H:m:s Z').format(timeFormat));
  var y = points.map((point) => point[key]);
  var backgroundColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.backgroundColor);
  var borderColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.borderColor);
  var hoverBackgroundColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.hoverBackgroundColor);
  var hoverBorderColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.hoverBorderColor);

  if (recentCount !== undefined)
  {
    x = x.concat([recentLabel]);
    y = y.concat([recentCount]);
    backgroundColors = backgroundColors.concat([BAR_CHART_DATA_STYLES[0].now.backgroundColor]);
    borderColors = borderColors.concat([BAR_CHART_DATA_STYLES[0].now.borderColor]);
    hoverBackgroundColors = borderColors.concat([BAR_CHART_DATA_STYLES[0].now.hoverBackgroundColor]);
    hoverBorderColors = borderColors.concat([BAR_CHART_DATA_STYLES[0].now.hoverBorderColor]);
  }

  return {
    labels: x,
    datasets: [
      Object.assign(
        {},
        {
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          hoverBackgroundColor: hoverBackgroundColors,
          hoverBorderColor: hoverBorderColors,
          data: y,
        },
        LINE_CHART_DATA_STYLES[0].historical
      ),
    ],
  };
}

export function generateCountChartData(
  historicalCounts,
  recentCount=undefined,
  recentLabel='today',
  timeFormat='MM/DD')
{
  var x = historicalCounts.map(
    (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format(timeFormat)
  );
  var y = historicalCounts.map(
    (historicalCount) => historicalCount.count
  );
  var backgroundColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.backgroundColor);
  var borderColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.borderColor);
  var hoverBackgroundColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.hoverBackgroundColor);
  var hoverBorderColors = x.map((_) => BAR_CHART_DATA_STYLES[0].historical.hoverBorderColor);

  if (recentCount !== undefined)
  {
    x = x.concat([recentLabel]);
    y = y.concat([recentCount]);
    backgroundColors = backgroundColors.concat([BAR_CHART_DATA_STYLES[0].now.backgroundColor]);
    borderColors = borderColors.concat([BAR_CHART_DATA_STYLES[0].now.borderColor]);
    hoverBackgroundColors = borderColors.concat([BAR_CHART_DATA_STYLES[0].now.hoverBackgroundColor]);
    hoverBorderColors = borderColors.concat([BAR_CHART_DATA_STYLES[0].now.hoverBorderColor]);
  }

  return {
    labels: x,
    datasets: [
      {
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverBackgroundColor: hoverBackgroundColors,
        hoverBorderColor: hoverBorderColors,
        data: y,
      },
    ],
  };
}

export function generateCountChartData2(
  historicalCountsList,
  legendLabels,
  timeFormat='MM/DD',
  colorScheme='normal')
{
  const labels = historicalCountsList[0].map(
    (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
  );

  const datasets = historicalCountsList.map((historicalCounts, index) => {
    return Object.assign(
      {},
      {
        data: historicalCounts.map((historicalCount) => historicalCount.count),
        label: legendLabels[index],
        // yAxisID: index,
      },    //offset index by one so as to not interfere with sub line graph color
      (colorScheme == 'compare') ? COMPARE_CHART_DATA_STYLES[index].historical : LINE_CHART_DATA_STYLES[index + 2].historical
    );
  });

  return {
    labels: labels,
    datasets: datasets,
  };
}

export function generateLineChartData(
  historicalCounts,
  recentCount=undefined,
  recentLabel='today',
  timeFormat='MM/DD',
  nightMode=false,
  auxillaryColor=false,)
{
  var x = historicalCounts.map(
    (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format(timeFormat)
  );
  var style = nightMode ? LINE_CHART_DATA_STYLES[1].historical : LINE_CHART_DATA_STYLES[0].historical;
  if(!auxillaryColor) style = nightMode ? LINE_CHART_AUXILLARY_STYLES[1].historical : LINE_CHART_AUXILLARY_STYLES[0].historical;
  return {
    labels: x,
    datasets: [
      Object.assign(
        {},
        {
          data: historicalCounts.map((historicalCount) => historicalCount.count),
          // yAxisID: index,
        },
        nightMode ? LINE_CHART_DATA_STYLES[1].historical : LINE_CHART_DATA_STYLES[0].historical
      )
    ],
  };
}

// Same as above function but uses .value instead of .count.
// TODO: refactoring.
export function generateLineChartDataValue(
  historicalCounts,
  recentCount=undefined,
  recentLabel='today',
  timeFormat='MM/DD',
  nightMode=false)
{
  var x = historicalCounts.map(
    (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format(timeFormat)
  );
  return {
    labels: x,
    datasets: [
      Object.assign(
        {},
        {
          data: historicalCounts.map((historicalCount) => historicalCount.value),
          // yAxisID: index,
        },
        nightMode ? LINE_CHART_DATA_STYLES[1].historical : LINE_CHART_DATA_STYLES[0].historical
      )
    ],
  };
}
