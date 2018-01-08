// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select from 'react-select';
//import { Bar } from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
import El from './El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0px 0px 0px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: '6px',
  },
  range: {
    padding: '5px 6px',
    border: '1px solid #bdc3c7',
    borderRadius: '3px',
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
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
  },
});

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
});

class DonutChartWithSelect extends PureComponent {
  static propTypes = {
    //data: PropTypes.object.isRequired,
    displayLegend: PropTypes.bool,
    nightMode: PropTypes.bool.isRequired,
    //selectOptions: PropTypes.array.isRequired,
    //selectValue: PropTypes.string.isRequired,
    //title: PropTypes.string.isRequired,
    //onChange: PropTypes.func.isRequired,
  };

  render()
  {
    const {
      data,
      displayLegend,
      hasSelect,
      nightMode,
      selectOptions,
      selectValue,
      title,
      //onChange,
    } = this.props;

    const legendConfig = {
      display: true,
      labels: {
        fontColor: nightMode ? 'rgba(255, 255, 255, 1)' :
                               'rgba(0, 0, 0, 1)',
        padding: 6,
      },
    };
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.header)}>
          <El nightMode={nightMode} style={styles.title} type={'h4'}>{title}</El>
          <div className={css(styles.headerRight)}>
            {
              hasSelect && (
                <div className={css(styles.select, nightMode && styles.night)}>
                  <Select
                    className={css(styles.select, nightMode && styles.nightSelect)}
                    clearable={false}
                    options={selectOptions}
                    onChange={onChange}
                    searchable={false}
                    value={selectValue}
                  />
                </div>
              )
            }
          </div>
        </div>
        <div className={css(styles.chart)}>
          <Doughnut
            redraw={true}
            height={300}
            options={{
              maintainAspectRatio: false,
              legend: legendConfig,
            }}
            data={getState()}
          />
        </div>
      </div>
    );
  }
}

export default DonutChartWithSelect;