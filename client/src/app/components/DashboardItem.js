// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import BarChartWithSelect  from './BarChartWithSelect';
import {
  disableChartOptions,
  generateCountChartData,
} from '../helpers/chart';
import {
  RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import TokenPriceItem from './TokenPriceItem';
import TVChartItem from './items/TVChartItem';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  full: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px !important',
    position: 'relative',
  },
});

class DashboardItem extends PureComponent {
  renderItem(dashboardItem)
  {
    const {
      changeDashboardItemPlotRange,
      data,
      nightMode,
      storeState,
    } = this.props;

    const {
      plotRange,
    } = storeState;

    const identifier = dashboardItem.identifier;
    if (true)
    {
      return (
        <TVChartItem />
      );
    }
    else if (identifier.indexOf('SUBREDDIT-POSTS') === 0)
    {
      const {
        postCount,
        postCounts,
      } = data;
      const postsX = postCounts.map(
        (postCount) => moment(postCount.timestamp).format('MM/DD')
      );
      const postsData = generateCountChartData(postCounts, postCount);
      return (
        <div className={css(styles.full)}>
          <BarChartWithSelect
            data={postsData}
            nightMode={nightMode}
            selectOptions={RANGE_SELECT_OPTIONS}
            selectValue={plotRange}
            title={'Number of new posts'}
            onChange={(option) => changeDashboardItemPlotRange(dashboardItem.id, option.value)}
          />
        </div>
      );
    }
    else if (identifier.indexOf('SUBREDDIT-COMMENTS') === 0)
    {
      console.log('comments');
    }
    else if (identifier.indexOf('TOKEN-PRICE') === 0)
    {
      return (
        <TokenPriceItem
          changeDashboardItemPlotRange={changeDashboardItemPlotRange}
          id={dashboardItem.id}
          nightMode={nightMode}
          storeState={storeState}
          token={data}
        />
      );
    }
    else
    {
      return <div>Unmatched identifier</div>;
    }
  }

  render()
  {
    const {
      dashboardItem,
      nightMode,
    } = this.props;

    return (
      <div
        className={css(styles.container)}
        key={dashboardItem.id}
      >
        {this.renderItem(dashboardItem)}
      </div>
    );
  }
}

export default DashboardItem;
