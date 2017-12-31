import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import { Line }            from 'react-chartjs-2';
import numeral             from 'numeral';
import El                  from '../El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0px 16px',
  },
  header: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '8px 0px',
  },
  chart: {
    flex: '1',
    display: 'inline-flex',
    width: '100%',
  },
  select: {
    width: '128px',
    zIndex: '1',
    color:'#777 !important',
  },
});

export default ({
  chartOptions,
  data,
  onChange,
  options,
  nightMode,
  selectValue,
  title,
}) => {
  const gridLinesConfig = {
    color: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                       'rgba(0, 0, 0, 0.15)',
    zeroLineColor: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                               'rgba(0, 0, 0, 0.15)',
  };
  const ticksConfig = {
    beginAtZero: true,
    fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                           'rgba(0, 0, 0, 0.5)',
    padding: 6,
  };
  const legendConfig = {
    display: false,
    labels: {
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <El nightMode={nightMode} type={'h4'}>
          {title}
        </El>
        <div className={css(styles.select)}>
          <Select
            clearable={false}
            searchable={false}
            options={options}
            onChange={onChange}
            value={selectValue}
          />
        </div>
      </div>
      <div className={css(styles.chart)}>
        <Line
          data={data}
          redraw={true}
          responsive={true}
          options={chartOptions ? chartOptions : {
            legend: legendConfig,
            maintainAspectRatio: false,
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => numeral(tooltipItem.yLabel).format('0,0'),
              },
              displayColors: true,
              intersect: false,
              mode: 'nearest',
            },
            scales: {
              xAxes: [
                {
                  gridLines: gridLinesConfig,
                  ticks: ticksConfig,
                },
              ],
              yAxes: [
                {
                  gridLines: gridLinesConfig,
                  ticks: ticksConfig,
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}
