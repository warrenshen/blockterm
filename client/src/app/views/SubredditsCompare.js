// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import { Link }            from 'react-router-dom';
import {
  DATA_STYLES,
  RANGE_SELECT_OPTIONS,
}                          from '../constants/plots'
import LineChartWithSelect from '../components/LineChartWithSelect';
import El                  from '../components/El';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: '#232b2e',
  },
  container: {
    gridColumn: '3 / 7',
  },
  description: {
    paddingTop: '12px',
  },
  header: {
    display: 'flex',
    padding: '24px 0px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  headerRight: {
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  tokens: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
});

class SubredditsCompare extends PureComponent {

  renderSubreddits(subreddits)
  {
    const {
      nightMode,
    } = this.props;
    console.log(subreddits);

    var labels = subreddits[0].postCounts.map(
      (postCount) => moment(postCount.timestamp).format('MM/DD')
    );
    const data = subreddits.map((subreddit, index) => {
      return Object.assign(
        {},
        {
          data: subreddit.postCounts.map((postCount) => postCount.count),
          label: subreddit.displayName,
          lineTension: 0,
          fill: false,
        },
        DATA_STYLES[index]
      );
    });

    var chart = {
      labels: labels,
      datasets: data,
    };

    return (
      <div>
        <LineChartWithSelect
          data={chart}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={''}
          title={''}
          onChange={(option) => option.value}
        />
      </div>
    );
  }

  render()
  {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.container)}>
          { data && data.subredditsByIds && this.renderSubreddits(data.subredditsByIds) }
        </div>
      </div>
    );
  }
}

export default SubredditsCompare;
