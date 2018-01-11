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
  shield: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: '9000',
  },
});

var isScrolling;

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

  constructor(props)
  {
    super(props);

    const {
      changeScrollActive,
    } = props;

    this.handleScroll = (event) => {
      changeScrollActive(true);
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
        changeScrollActive(false);
      }, 256);
    };
  }

  componentDidMount()
  {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount()
  {
    window.removeEventListener('scroll', this.handleScroll);
  }

  renderToken(token)
  {
    const {
      createDashboardItem,
      changePricePlotRange,
      changeMentionTotalPlotRange,
      changeMentionSubredditPlotRange,
      changeSelectedTicker,
      pricePlotRange,
      mentionTotalPlotRange,
      mentionSubredditPlotRange,
      nightMode,
      selectedTicker,
    } = this.props;

    return (
      <div className={css(styles.mainContent)}>
        <TokenHead
          nightMode={nightMode}
          token={token}
        />
        <TokenBody
          changeSelectedTicker={changeSelectedTicker}
          changePricePlotRange={changePricePlotRange}
          changeMentionTotalPlotRange={changeMentionTotalPlotRange}
          changeMentionSubredditPlotRange={changeMentionSubredditPlotRange}
          createDashboardItem={createDashboardItem}
          pricePlotRange={pricePlotRange}
          mentionTotalPlotRange={mentionTotalPlotRange}
          mentionSubredditPlotRange={mentionSubredditPlotRange}
          nightMode={nightMode}
          selectedTicker={selectedTicker}
          token={token}
        />
      </div>
    );
  }

  renderScrollShield()
  {
    const {
      scrollActive,
    } = this.props;

    if (scrollActive)
    {
      return <div className={css(styles.shield)} />;
    }
  }

  render() {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        {this.renderScrollShield()}
        { data && data.tokenByShortName && this.renderToken(data.tokenByShortName) }
      </div>
    );
  }
}

export default Token;
