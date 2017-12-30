// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import moment              from 'moment';
import Select              from 'react-select';
import { Line }            from 'react-chartjs-2';
import {
  generateLineChartData,
  isPlotRangeBig,
} from '../../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../../constants/plots';
import El                  from '../El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 16px',
  },
  header: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0px',
  },
  chart: {
    flex: '1',
    display: 'inline-flex',
    paddingBottom: '8px',
  },
  select: {
    width: '128px',
    zIndex: '1',
    color:'#777 !important',
  },
});

class SubredditPostCountsItem extends Component {

  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardItem, nextProps.dashboardItem) ||
           !isEqual(this.props.dashboardState, nextProps.dashboardState) ||
           !isEqual(this.props.nightMode, nextProps.nightMode);
  }

  render()
  {
    const {
      changeDashboardItemState,
      dashboardData,
      dashboardState,
      identifier,
      nightMode,
      specific,
    } = this.props;

    const {
      plotRange,
    } = dashboardState;


    let postCount;
    let postCounts;

    if (dashboardData)
    {
      postCount = dashboardData.postCount;
      postCounts = dashboardData.postCounts;
    }
    else
    {
      postCount = undefined;
      postCounts = [];
    }

    const postsX = postCounts.map(
      (postCount) => moment(postCount.timestamp, 'YYYY-M-D H:m:s Z').format('MM/DD')
    );
    const postsData = generateLineChartData(
      postCounts,
      postCount,
      'last 24 hours',
      isPlotRangeBig(plotRange) ? 'M/D/YY' : 'MM/DD',
      nightMode,
    );
    const onChange = (option) =>
      changeDashboardItemState(identifier, 'plotRange', option.value);

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

    // menuStyle={nightMode ? selectNight : selectDay}
    // menuContainerStyle={nightMode ? selectNight : selectDay}
    // optionClassName={css(nightMode && styles.night)}
    // Need redraw to be true so the axis ticks are rerendered on night mode change.
    return (
      <div className={css(styles.container)}>
        <div className={css(styles.header)}>
          <El nightMode={nightMode} type={'h4'}>
            {`# of daily posts in r/${specific}`}
          </El>
          <div className={css(styles.select)}>
            <Select
              clearable={false}
              searchable={false}
              options={RANGE_SELECT_OPTIONS}
              onChange={onChange}
              value={plotRange}
            />
          </div>
        </div>
        <div className={css(styles.chart)}>
          <Line
            data={postsData}
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
}

export default SubredditPostCountsItem;
