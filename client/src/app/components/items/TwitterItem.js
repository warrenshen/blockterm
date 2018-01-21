// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import { Timeline }        from 'react-twitter-widgets';
import {
  TWITTER_VALUE_SEARCH_CRYPTOCURRENCY,
  TWITTER_VALUE_TO_DATA_SOURCE,
} from '../../constants/items.js';

const styles = StyleSheet.create({
  // The combination of flexDirection: 'row' and alignItems: 'stretch'
  // allow us to force the child of the container div to stretch to full width.
  // This is necessary because the Timeline component has an extra div
  // wrapping the twitter iframe, which we want to stretch to match the height
  // of the container div (but don't have an easy way to add flex: 1 to it).
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
});

class TwitterItem extends PureComponent
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.value, nextProps.value);
  }

  render()
  {
    const {
      dashboardAction,
      nightMode,
      value,
    } = this.props;

    const dataSource = value in TWITTER_VALUE_TO_DATA_SOURCE ?
                       TWITTER_VALUE_TO_DATA_SOURCE[value] :
                       TWITTER_VALUE_TO_DATA_SOURCE[TWITTER_VALUE_SEARCH_CRYPTOCURRENCY];

    return (
      <div className={css(styles.container, dashboardAction && styles.noPointerEvents)}>
        <Timeline
          dataSource={dataSource}
          options={{
            chrome: 'noheader nofooter transparent',
            height: '100%',
            theme: nightMode ? 'dark' : 'light',
            transparent: true,
          }}
          // onLoad={() => console.log('Timeline is loaded!')}
        />
      </div>
    );
  }
}

export default TwitterItem;
