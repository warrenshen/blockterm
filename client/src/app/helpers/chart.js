import moment from 'moment';

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
