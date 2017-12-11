import moment from 'moment';
import { DATA_STYLES } from '../constants/plots';

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
  var backgroundColors = x.map((_) => DATA_STYLES[0].historical.backgroundColor);
  var borderColors = x.map((_) => DATA_STYLES[0].historical.borderColor);
  var hoverBackgroundColors = x.map((_) => DATA_STYLES[0].historical.hoverBackgroundColor);
  var hoverBorderColors = x.map((_) => DATA_STYLES[0].historical.hoverBorderColor);

  if (recentCount !== undefined)
  {
    x = x.concat([recentLabel]);
    y = y.concat([recentCount]);
    backgroundColors = backgroundColors.concat([DATA_STYLES[0].now.backgroundColor]);
    borderColors = borderColors.concat([DATA_STYLES[0].now.borderColor]);
    hoverBackgroundColors = borderColors.concat([DATA_STYLES[0].now.hoverBackgroundColor]);
    hoverBorderColors = borderColors.concat([DATA_STYLES[0].now.hoverBorderColor]);
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
