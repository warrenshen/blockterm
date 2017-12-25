// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  white: {
    color: '#f3f3f3',
  },
});

const El = ({ children, nightMode, nightModeStyle, style, type }) => {
  const Tag = type;
  var className = css(
    style,
    nightMode && styles.white,
    nightMode && nightModeStyle
  );
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
};

export default El;
