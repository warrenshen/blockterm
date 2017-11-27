// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import SubredditWidget     from '../../components/SubredditWidget';
import TokenBody           from '../../components/TokenBody';
import El                  from '../../components/El';

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
  header: {
    padding: '24px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  banner: {
    display: 'flex',
    alignItems: 'center',
  },
  names: {
    paddingLeft: '12px',
    display: 'flex',
  },
  subreddits: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '12px',
  },
});

class Token extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // etc:
    nightMode: PropTypes.bool.isRequired,
  };

  renderSubreddits(subreddits)
  {
    const {
      nightMode,
    } = this.props;

    if (subreddits.length > 0)
    {
      return (
        <div className={css(styles.subreddits)}>
          <El
            nightMode={nightMode}
            type={'h5'}
          >
            Related subreddits
          </El>
          {
            subreddits.map((subreddit) => (
              <SubredditWidget
                key={subreddit.id}
                nightMode={nightMode}
                subreddit={subreddit}
              />
            ))
          }
        </div>
      );
    }
  }

  renderToken(token)
  {
    const {
      nightMode,
    } = this.props;

    return (
      <div>
        <div className={css(styles.header)}>
          <div className={css(styles.banner)}>
            <img src={token.imageUrl} width={96} height={96}></img>
            <div className={css(styles.names)}>
              <El
                nightMode={nightMode}
                type={'h2'}
              >
                {token.longName}
              </El>
              <El
                nightMode={nightMode}
                type={'h3'}
              >
                {token.shortName}
              </El>
            </div>
          </div>
          {this.renderSubreddits(token.subreddits)}
        </div>
        <TokenBody
          token={token}
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
          { data && data.tokenById && this.renderToken(data.tokenById) }
        </div>
      </div>
    );
  }
}

export default Token;
