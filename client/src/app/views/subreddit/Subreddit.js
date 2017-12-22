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
    minHeight: '100vh',
    display: 'flex',
    //padding: '0px 20px',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  container: {
    gridColumn: '3 / 7',
  },
  mainContent: {
    width: '80vw',
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
    padding: '24px 24px',
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
    flexDirection: 'column',
    paddingTop: '12px',
  },
  bolded: {
    fontWeight: '700',
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
        <div className={css(styles.tokens)}>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            Related coins
          </El>
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
      );
    }
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
      <div>
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
              {`${subscriberCount} total subscribers`}
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {`Created ${moment(startDate).format("MMM Do YYYY")}`}
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {`Last updated ${moment(updatedAt).fromNow()}`}
            </El>
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
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.mainContent)}>
          { data && data.subredditById && this.renderSubreddit(data.subredditById) }
        </div>
        <Sidebar nightMode={nightMode}>

        </Sidebar>
      </div>
    );
  }
}

export default Subreddit;
