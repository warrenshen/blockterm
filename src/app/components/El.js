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
  const Tag = type;
  var className = css(style, nightMode && styles.white);
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

export default El;
