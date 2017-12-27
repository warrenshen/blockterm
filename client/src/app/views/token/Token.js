// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import TokenHead           from '../../components/TokenHead';
import TokenBody           from '../../components/TokenBody';
import El                  from '../../components/El';
import Sidebar from '../../components/Sidebar';
import * as STYLES from '../../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  container: {
    gridColumn: '3 / 7',
  },
  mainContent: {
    width: '100vw',
    //width: '80vw',
  },
  sidebar: {
    width: '20vw',
    minWidth: '20vw',
    backgroundColor: STYLES.SOFTGRAY,
  },
});

class Token extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // actions:
    changeMentionSubredditPlotRange: PropTypes.func.isRequired,
    changeMentionTotalPlotRange: PropTypes.func.isRequired,
    // etc:
    mentionSubredditPlotRange: PropTypes.string.isRequired,
    mentionTotalPlotRange: PropTypes.string.isRequired,
    nightMode: PropTypes.bool.isRequired,
  };

  renderToken(token)
  {
    const {
      createDashboardItem,
      changePricePlotRange,
      changeMentionTotalPlotRange,
      changeMentionSubredditPlotRange,
      pricePlotRange,
      mentionTotalPlotRange,
      mentionSubredditPlotRange,
      nightMode,
    } = this.props;

    return (
      <div>
        <TokenHead
          nightMode={nightMode}
          token={token}
        />
        <TokenBody
          changePricePlotRange={changePricePlotRange}
          changeMentionTotalPlotRange={changeMentionTotalPlotRange}
          changeMentionSubredditPlotRange={changeMentionSubredditPlotRange}
          createDashboardItem={createDashboardItem}
          pricePlotRange={pricePlotRange}
          mentionTotalPlotRange={mentionTotalPlotRange}
          mentionSubredditPlotRange={mentionSubredditPlotRange}
          nightMode={nightMode}
          token={token}
        />
      </div>
    );
  }

  render() {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.mainContent)}>
          { data && data.tokenByShortName && this.renderToken(data.tokenByShortName) }
        </div>
      </div>
    );
  }
}

export default Token;
