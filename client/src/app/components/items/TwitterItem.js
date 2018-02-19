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
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
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
    const onLoad = (event) => {
      // This is necessary because the Timeline component has an extra div
      // wrapping the twitter iframe, which we want to stretch to match the height
      // of the container div (but don't have an easier way to add flex: 1 to it).
      this.instance.firstChild.style = 'flex: 1;';
    };
    return (
      <div
        className={css(styles.container, dashboardAction && styles.noPointerEvents)}
        ref={(el) => this.instance = el}
      >
        <Timeline
          dataSource={dataSource}
          options={{
            chrome: 'noheader nofooter transparent',
            width: '100%',
            height: '100%',
            theme: nightMode ? 'dark' : 'light',
            transparent: true,
          }}
          onLoad={onLoad}
        />
      </div>
    );
  }
}

export default TwitterItem;
