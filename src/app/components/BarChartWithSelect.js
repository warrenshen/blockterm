// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '24px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    width: '100%',
  },
  header: {
    width: '100%',
    paddingBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  select: {
    width: '128px',
  },
});

class BarChartWithSelect extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selectOptions: PropTypes.array.isRequired,
    selectValue: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render()
  {
    const {
      data,
      selectOptions,
      selectValue,
      title,
      onChange,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.header)}>
          <h4>{title}</h4>
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
          <Bar
            height={312}
            data={data}
            responsive={true}
            options={{
              legend: { display: false },
              maintainAspectRatio: false,
              tooltips: { displayColors: false, intersect: false, mode: 'x' },
              scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
            }}
          />
        </div>
      </div>
    );
  }
}

export default BarChartWithSelect;
