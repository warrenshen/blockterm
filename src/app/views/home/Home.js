// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';

const styles = StyleSheet.create({
    fadeIn: {
     animation: 'fadeIn 0.5s both ease-in',
     zIndex: 9999,
    },
});

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
  };

  renderSubreddits(subreddits)
  {
    return (
      <ul>
        {
          subreddits.map((subreddit) => {
            return (
              <li key={subreddit.id}>
                <Link to={`/subreddit/${subreddit.id}`}>
                  <h2>{subreddit.name}</h2>
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
      data
    } = this.props;


    return (
      <div className={css(styles.fadeIn)}>
        {
          data.allSubreddits &&
          this.renderSubreddits(data.allSubreddits)
        }
      </div>
    );
  }
}

export default Home;
