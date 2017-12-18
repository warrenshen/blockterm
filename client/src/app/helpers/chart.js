import moment from 'moment';
import {
  BAR_CHART_DATA_STYLES,
  LINE_CHART_DATA_STYLES,
} from '../constants/plots';

export function disableChartOptions(earliestDate, options)
{
  const earliest = moment(earliestDate).startOf('day');
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
  var x = points.map((point) => moment(point.timestamp).format(timeFormat));
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
    (historicalCount) => moment(historicalCount.timestamp).format(timeFormat)
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
  timeFormat='MM/DD')
{
  const labels = historicalCountsList[0].map(
    (historicalCount) => moment(historicalCount.timestamp).format('MM/DD')
  );

  const datasets = historicalCountsList.map((historicalCounts, index) => {
    return Object.assign(
      {},
      {
        data: historicalCounts.map((historicalCount) => historicalCount.count),
        label: legendLabels[index],
        // yAxisID: index,
      },
      LINE_CHART_DATA_STYLES[index].historical
    );
  });

  return {
    labels: labels,
    datasets: datasets,
  };
}
