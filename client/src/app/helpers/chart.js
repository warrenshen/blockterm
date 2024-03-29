import moment from 'moment';
import numeral from 'numeral';
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
  nightMode=false,)
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
  nightMode=false,
  auxillaryColor=false,
)
{
  var x = historicalCounts.map(
    (historicalCount) => moment(historicalCount.timestamp, 'YYYY-M-D H:m:s Z').format(timeFormat)
  );
  var style = auxillaryColor ? LINE_CHART_AUXILLARY_STYLES : LINE_CHART_DATA_STYLES;
  return {
    labels: x,
    datasets: [
      Object.assign(
        {},
        {
          data: historicalCounts.map((historicalCount) => historicalCount.value),
          // yAxisID: index,
        },
        nightMode ? style[1].historical : style[0].historical
      )
    ],
  };
}

function generateLineStylesFromColor(lineColor, backgroundColor = null, fill = false)
{
  return {
    backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0)',
    borderColor: lineColor,
    borderWidth: 2,
    fill: fill,
    lineTension: 0,
    pointBackgroundColor: '#FFFFFF',
    pointBorderColor: lineColor,
    pointBorderWidth: 2,
    pointRadius: 2,
    pointHitRadius: 1.5,
  };
}

export function generatePortfolioHistoryChartData(portfolioTickers, nightMode)
{
  const FIAT_COLOR_DAY = '#27AE60';
  const FIAT_COLOR_NIGHT = '#27AE60';
  const BTC_COLOR_DAY = '#FF8800';
  const BTC_COLOR_NIGHT = '#FF8800';
  const ETH_COLOR_DAY = '#0050FF';
  const ETH_COLOR_NIGHT = '#0080FF';

  const chartData = {
    labels: portfolioTickers.map(
      // Note that we don't need to show year in the x-axis tickers for now.
      (portfolioTicker) => moment(portfolioTicker.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    ),
    datasets: [
      Object.assign(
        {},
        nightMode ? generateLineStylesFromColor(FIAT_COLOR_NIGHT) : generateLineStylesFromColor(FIAT_COLOR_DAY),
        {
          data: portfolioTickers.map((portfolioTicker) => portfolioTicker.valueUSD),
          fill: false,
          label: 'Fiat',
          yAxisID: 'fiat',
        }
      ),
      Object.assign(
        {},
        nightMode ? generateLineStylesFromColor(BTC_COLOR_NIGHT) : generateLineStylesFromColor(BTC_COLOR_DAY),
        {
          data: portfolioTickers.map((portfolioTicker) => portfolioTicker.valueBTC),
          fill: false,
          label: 'BTC',
          yAxisID: 'btc',
        }
      ),
      Object.assign(
        {},
        nightMode ? generateLineStylesFromColor(ETH_COLOR_NIGHT) : generateLineStylesFromColor(ETH_COLOR_DAY),
        {
          data: portfolioTickers.map((portfolioTicker) => portfolioTicker.valueETH),
          fill: false,
          label: 'ETH',
          yAxisID: 'eth',
        }
      ),
    ],
  };

  const gridLinesConfig = {
    color: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                       'rgba(0, 0, 0, 0.15)',
    zeroLineColor: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                               'rgba(0, 0, 0, 0.15)',
  };
  const xTicksConfig = {
    callback: (tick) => tick.substring(0, 5),
    fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                           'rgba(0, 0, 0, 0.5)',
    padding: 6,
  };
  const yTicksConfigFiat = {
    callback: (value, index, values) => numeral(value).format('$0,0a'),
    fontColor: nightMode ? FIAT_COLOR_NIGHT : FIAT_COLOR_DAY,
    padding: 6,
  };
  const yTicksConfigBTC = {
    callback: (value, index, values) => `${numeral(value).format('0.000')} BTC`,
    fontColor: nightMode ? BTC_COLOR_NIGHT : BTC_COLOR_DAY,
    fontSize: 11,
    padding: 6,
  };
  const yTicksConfigETH = {
    callback: (value, index, values) => `${numeral(value).format('0.00')} ETH`,
    fontColor: nightMode ? ETH_COLOR_NIGHT : ETH_COLOR_DAY,
    fontSize: 11,
    padding: 6,
  };
  const legendConfig = {
    display: false,
    labels: {
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
    },
  };

  const chartOptions = {
    animation: false,
    legend: legendConfig,
    maintainAspectRatio: false,
    tooltips: {
      // callbacks: {
      //   label: (tooltipItem, data) => numeral(tooltipItem.yLabel).format('$0,0'),
      //   title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
      // },
      displayColors: false,
      intersect: false,
      mode: 'index',
    },
    scales: {
      xAxes: [
        {
          gridLines: gridLinesConfig,
          ticks: xTicksConfig,
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: gridLinesConfig,
          id: 'fiat',
          position: 'right',
          ticks: yTicksConfigFiat,
          type: 'linear',
        },
        {
          display: true,
          gridLines: {
            drawOnChartArea: false,
          },
          id: 'btc',
          ticks: yTicksConfigBTC,
          type: 'linear',
        },
        {
          display: true,
          gridLines: {
            drawOnChartArea: false,
          },
          id: 'eth',
          ticks: yTicksConfigETH,
          type: 'linear',
        },
      ],
    },
  };

  return [chartData, chartOptions];
}
