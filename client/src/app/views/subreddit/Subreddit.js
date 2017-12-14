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

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: '#232b2e',
  },
  container: {
    gridColumn: '3 / 7',
  },
  description: {
    paddingTop: '12px',
  },
  header: {
    display: 'flex',
    padding: '24px 0px',
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
      tokens,
    } = subreddit;

    const blob = JSON.parse(subreddit.blob);

    return (
      <div>
        <div className={css(styles.header)}>
          <div className={css(styles.headerLeft)}>
            <a
              href={`https://reddit.com/r/${name}`}
              target='_blank'
            >
              <El
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
              {`${blob.subscriberCountNow} total subscribers`}
            </El>
            <El
              nightMode={nightMode}
              type={'span'}
            >
              {`Created ${moment(startDate).format("MMM Do YYYY")}`}
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
        <div className={css(styles.container)}>
          { data && data.subredditById && this.renderSubreddit(data.subredditById) }
        </div>
      </div>
    );
  }
}

export default Subreddit;
