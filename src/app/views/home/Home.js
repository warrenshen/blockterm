// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
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
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

class Home extends PureComponent {
  static propTypes= {
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

    return (
      <ul className={css(styles.list)}>
        {
          subreddits.map((subreddit) => {
            return (
              <li key={subreddit.id}>
                <Link to={`/subreddit/${subreddit.id}`}>
                  <El
                    nightMode={nightMode}
                    type={'h2'}
                  >
                    {subreddit.name}
                  </El>
                </Link>
              </li>
            );
          })
        }
      </ul>
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
          {
            data.allSubreddits &&
            this.renderSubreddits(data.allSubreddits)
          }
        </div>
      </div>
    );
  }
}

export default Home;
