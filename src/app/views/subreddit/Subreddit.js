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

class Subreddit extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
  };

  render() {
    const {
      data
    } = this.props;

    return (
      <div className={css(styles.fadeIn)}>
        { data && data.subredditById && data.subredditById.name }
      </div>
    );
  }
}

export default Subreddit;
