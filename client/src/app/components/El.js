// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  white: {
    color: '#e3e3e5',
  },
  //default: {
  //  color: '#000 !important',
  //},
});

const El = ({ children, nightMode, style, type }) => {
  const Tag = type;
  var className = css(style, styles.default, nightMode && styles.white);
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

export default El;
