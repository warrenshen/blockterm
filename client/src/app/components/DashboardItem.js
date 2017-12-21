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
import TokenPriceItem from './TokenPriceItem';

const styles = StyleSheet.create({
  full: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

class DashboardItem extends PureComponent {
  renderItem(dashboardItem)
  {
    const {
      data,
      nightMode,
    } = this.props;

    const identifier = dashboardItem.identifier;
    if (identifier.indexOf('SUBREDDIT-POSTS') === 0)
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
        <div style={styles.full}>
          <BarChartWithSelect
            data={postsData}
            nightMode={true}
            rangeStart={''}
            rangeEnd={''}
            selectOptions={[]}
            selectValue={''}
            title={'Number of new posts'}
            onChange={(option) => option.value}
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
          nightMode={nightMode}
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
        key={dashboardItem.id}
      >
        {this.renderItem(dashboardItem)}
      </div>
    );
  }
}

export default DashboardItem;
