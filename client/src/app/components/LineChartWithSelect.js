// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import { Line }            from 'react-chartjs-2';
import El                  from './El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    flex: '1',
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0px',
  },
  select: {
    width: '128px',
    zIndex: '1',
    backgroundColor:'white',
    color:'#777',
    borderColor: '#777',
  },
  chart: {
    flex: '1',
    display: 'inline-flex',
    width: '100%',
  },
});

const LineChartWithSelect = ({
  data,
  displayLegend,
  nightMode,
  selectOptions,
  selectValue,
  title,
  onChange,
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
    display: displayLegend,
    labels: {
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <El nightMode={nightMode} type={'h4'}>{title}</El>
        <div className={css(styles.select)}>
          <Select
            className={css(styles.select)}
            clearable={false}
            onChange={onChange}
            options={selectOptions}
            searchable={false}
            value={selectValue}
          />
        </div>
      </div>
      <div className={css(styles.chart)}>
        <Line
          height={312}
          data={data}
          redraw={true}
          responsive={true}
          options={{
            legend: legendConfig,
            maintainAspectRatio: false,
            tooltips: { displayColors: true, intersect: false, mode: 'x' },
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

// static propTypes = {
//     data: PropTypes.object.isRequired,
//     nightMode: PropTypes.bool.isRequired,
//     selectOptions: PropTypes.array.isRequired,
//     selectValue: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//   };

export default LineChartWithSelect;
