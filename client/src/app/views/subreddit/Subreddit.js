// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import moment              from 'moment';
import SubredditBody from '../../components/SubredditBody';
import TokenWidget from '../../components/TokenWidget';
import El from '../../components/El';
import Sidebar from '../../components/Sidebar';
import * as STYLES from '../../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    flex: '1',
    display: 'flex',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  container: {
    gridColumn: '3 / 7',
  },
  mainContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  sidebar: {
    width: '20vw',
    minWidth: '20vw',
    backgroundColor: STYLES.SOFTGRAY,
  },
  description: {
    paddingTop: '12px',
  },
  header: {
    display: 'flex',
    padding: '8px 10px',
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
    flexDirection: 'row !important',
    //paddingTop: '12px',
  },
  sideSpacing: {
    marginRight: '18px',
  },
  bolded: {
    fontWeight: '700',
  },
  hidden: {
    display: 'none !important',
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
    const {
      nightMode,
    } = this.props;

    if (tokens.length > 0)
    {
      return (
        <div className={css(styles.container, styles.sideSpacing)}>
          <El
              nightMode={nightMode}
              type={'h5'}
            >
              Related coins
          </El>
          <div className={css(styles.tokens)}>
            {
              tokens.map((token) => (
                <TokenWidget
                  key={token.id}
                  nightMode={nightMode}
                  token={token}
                />
              ))
            }
          </div>
        </div>
      );
    }
  }

  renderSubreddit(subreddit)
  {
    const {
      activeUserCountPlotRange,
      commentCountPlotRange,
      nightMode,
      postCountPlotRange,
      subscriberCountPlotRange,

      changeActiveUserCountPlotRange,
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      changeSubscriberCountPlotRange,
    } = this.props;

    const {
      description,
      displayName,
      name,
      startDate,
      updatedAt,
      subscriberCount,
      tokens,
    } = subreddit;

    return (
      <div className={css(styles.mainContent)}>
        <div className={css(styles.header)}>
          <div className={css(styles.headerLeft)}>
            <a
              href={`https://reddit.com/r/${name}`}
              target='_blank'
            >
              <El
                style={styles.bolded}
                nightMode={nightMode}
                type={'h3'}
              >
                {displayName}
              </El>
            </a>
            {
              description && (
                <El
                  nightMode={nightMode}
                  style={styles.description}
                  type={'p'}
                >
                  {description}
                </El>
              )
            }
            {this.renderTokens(tokens)}
          </div>
          <div className={css(styles.headerRight)}>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              <strong>{`${subscriberCount}`}</strong> total subscribers
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.hidden}
            >
              Created <strong>{`${moment(startDate, 'YYYY-M-D').format("MMM Do YYYY")}`}</strong>
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              Last updated <strong>{`${moment(updatedAt, 'YYYY-M-D H:m:s Z').fromNow()}`}</strong>
            </El>
          </div>
        </div>
        <SubredditBody
          activeUserCountPlotRange={activeUserCountPlotRange}
          commentCountPlotRange={commentCountPlotRange}
          nightMode={nightMode}
          postCountPlotRange={postCountPlotRange}
          subreddit={subreddit}
          subscriberCountPlotRange={subscriberCountPlotRange}

          changeActiveUserCountPlotRange={changeActiveUserCountPlotRange}
          changeCommentCountPlotRange={changeCommentCountPlotRange}
          changePostCountPlotRange={changePostCountPlotRange}
          changeSubscriberCountPlotRange={changeSubscriberCountPlotRange}
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
        {data.subreddit && this.renderSubreddit(data.subreddit)}
      </div>
    );
  }
}

export default Subreddit;
