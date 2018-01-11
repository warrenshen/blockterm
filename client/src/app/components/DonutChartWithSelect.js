// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import numeral             from 'numeral';
import Select              from 'react-select';
import { Doughnut }        from 'react-chartjs-2';
import El                  from './El';

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
    paddingBottom: '5px',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '500',
  },
});

function getTooltip(tooltipItem, data)
{
  const itemValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
  const totalValue = data.datasets[tooltipItem.datasetIndex].data.reduce(
    (accum, value) => accum + value
  );
  return `${numeral(itemValue / totalValue).format('0.0%')}, ${numeral(itemValue).format('$0,0.0')}`;
}

class DonutChartWithSelect extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    displayLegend: PropTypes.bool,
    hasSelect: PropTypes.bool,
    height: PropTypes.number,
    nightMode: PropTypes.bool.isRequired,
    //selectOptions: PropTypes.array.isRequired,
    //selectValue: PropTypes.string.isRequired,
    title: PropTypes.string,
    //onChange: PropTypes.func.isRequired,
  };

  render()
  {
    const {
      data,
      // displayLegend,
      hasSelect,
      height,
      nightMode,
      // selectOptions,
      // selectValue,
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

    const chartOptions = {
      legend: legendConfig,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => getTooltip(tooltipItem, data),
        },
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
            data={data}
            height={height ? height : 300}
            options={chartOptions}
            redraw={true}
          />
        </div>
      </div>
    );
  }
}

export default DonutChartWithSelect;
