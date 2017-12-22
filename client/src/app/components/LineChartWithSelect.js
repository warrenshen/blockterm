// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select              from 'react-select';
import { Line }            from 'react-chartjs-2';
import El                  from './El';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //paddingTop: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    width: '100%',
    paddingTop: '12px',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  select: {
    width: '128px',
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
            clearable={false}
            searchable={false}
            value={selectValue}
            options={selectOptions}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={css(styles.chart)}>
        <Line
          height={312}
          data={data}
          responsive={true}
          redraw={true}
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
