// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import { Timeline }        from 'react-twitter-widgets';
import {
  TWITTER_VALUE_TO_DATA_SOURCE,
} from '../../constants/items.js';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflow: 'scroll',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
});

class TwitterItem extends PureComponent {

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

    return (
      <div className={css(styles.container, dashboardAction && styles.noPointerEvents)}>
        <Timeline
          dataSource={TWITTER_VALUE_TO_DATA_SOURCE[value]}
          options={{
            chrome: 'noheader nofooter transparent',
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
