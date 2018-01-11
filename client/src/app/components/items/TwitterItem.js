// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Timeline }        from 'react-twitter-widgets';

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
          dataSource={{
            sourceType: 'url',
            url: 'https://twitter.com/snowycrypto/lists/blockterm-exchanges',
          }}
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
