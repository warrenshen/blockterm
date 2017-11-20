// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  white: {
    color: '#c3c3c5',
  },
});

const El = ({ children, nightMode, style, type }) => {
  switch (type) {
    case 'p':
      return (
        <p className={css(style, nightMode && styles.white)}>
          {children}
        </p>
      );
    case 'span':
      return (
        <span className={css(style, nightMode && styles.white)}>
          {children}
        </span>
      );
  }
};

export default El;
