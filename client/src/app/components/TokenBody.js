// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import { DATA_STYLES }     from '../constants/plots'
import BarChartWithSelect  from './BarChartWithSelect';
import { Line } from 'react-chartjs-2';
import El                  from './El';

const styles = StyleSheet.create({
  container: {
    left: '-24px',
    width: '100%',
    padding: '0px 24px 24px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  nightMode: {
    backgroundColor: '#373b3e',
  },
  section: {
    width: '100%',
    paddingTop: '24px',
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    width: '100%',
    paddingTop: '12px',
  },
});

class TokenBody extends PureComponent {

  render()
  {
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

    const {
      nightMode,
      token,
    } = this.props;

    var labels = token.subredditMentions[0].mentionTotalCounts.map(
      (mentionTotalCount) => moment(mentionTotalCount.timestamp).format('MM/DD')
    );
    var data = token.subredditMentions.map((subredditMention, index) => {
      return Object.assign(
        {},
        {
          data: subredditMention.mentionTotalCounts.map((mentionTotalCount) => mentionTotalCount.count),
        },
        DATA_STYLES[index]
      );
    });

    var chart = {
      labels: labels,
      datasets: data,
    };
    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          <El
            nightMode={nightMode}
            type={'h3'}
          >
            Recent activity
          </El>
          <div className={css(styles.chart)}>
            <Line
              height={312}
              data={chart}
              responsive={true}
              redraw={true}
              options={{
                maintainAspectRatio: false,
                tooltips: { intersect: false, mode: 'x' },
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
      </div>
    );
  }
}

export default TokenBody;
