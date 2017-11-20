// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import SubredditBody from '../../components/SubredditBody';
import TokenWidget from '../../components/TokenWidget';
import El from '../../components/El';

const styles = StyleSheet.create({
  description: {
    paddingTop: '12px',
  },
  subredditHeader: {
    display: 'flex',
    padding: '24px 0px',
  },
  subredditHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  subredditHeaderRight: {
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  container: {
    gridColumn: '3 / 7',
  },
  wrapper: {
    width: '100vw',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: '#232b2e',
  },
  fadeIn: {
    animation: 'fadeIn 0.5s both ease-in',
    zIndex: 9999,
  },
  relatedCoins: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Subreddit extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // actions:
    changeActiveUserCountPlotRange: PropTypes.func.isRequired,
    changeCommentCountPlotRange: PropTypes.func.isRequired,
    changePostCountPlotRange: PropTypes.func.isRequired,
    // etc:
    activeUserCountPlotRange: PropTypes.string.isRequired,
    commentCountPlotRange: PropTypes.string.isRequired,
    postCountPlotRange: PropTypes.string.isRequired,
    nightMode: PropTypes.bool.isRequired,
  };

  renderTokens(tokens)
  {
    return (
      <div className={css(styles.relatedCoins)}>
        <h4>Related coins</h4>
        {tokens.map((token) => <TokenWidget key={token.id} token={token} />)}
      </div>
    );
  }

  renderSubreddit(subreddit)
  {
    const {
      nightMode,
      changeActiveUserCountPlotRange,
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      activeUserCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
    } = this.props;

    return (
      <div>
        <div className={css(styles.subredditHeader)}>
          <div className={css(styles.subredditHeaderLeft)}>
            <a
              href={`https://reddit.com/r/${subreddit.name}`}
              target='_blank'
            >
              <h2>{subreddit.displayName}</h2>
            </a>
            <El
              nightMode={nightMode}
              style={styles.description}
              type={'p'}
            >
              {subreddit.description}
            </El>
            {this.renderTokens(subreddit.tokens)}
          </div>
          <div className={css(styles.subredditHeaderRight)}>
            <p>128 active users</p>
          </div>
        </div>
        <SubredditBody
          subreddit={subreddit}
          changeActiveUserCountPlotRange={changeActiveUserCountPlotRange}
          changeCommentCountPlotRange={changeCommentCountPlotRange}
          changePostCountPlotRange={changePostCountPlotRange}
          activeUserCountPlotRange={activeUserCountPlotRange}
          commentCountPlotRange={commentCountPlotRange}
          postCountPlotRange={postCountPlotRange}
          nightMode={nightMode}
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
      <div className={css(styles.wrapper, nightMode && styles.nightMode, styles.fadeIn)}>
        <div className={css(styles.container)}>
          { data && data.subredditById && this.renderSubreddit(data.subredditById) }
        </div>
      </div>
    );
  }
}

export default Subreddit;
