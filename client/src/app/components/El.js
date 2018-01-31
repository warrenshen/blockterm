// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import FontAwesome         from 'react-fontawesome';

const styles = StyleSheet.create({
  default: {
    letterSpacing: '0.5px',
  },
  white: {
    color: '#f3f3f3',
  },
  icon: {
    marginLeft: '4px',
  },
});

const El = ({ children, icon, inline, nightMode, nightModeStyle, style, type }) => {
  const Tag = type;
  var className = css(
    styles.default,
    style,
    nightMode && styles.white,
    nightMode && nightModeStyle
  );
  return (
    <Tag className={className} style={inline}>
      {children}
      {icon && <FontAwesome name={`${icon}`} className={css(styles.icon)}/>}
    </Tag>
  );
};

export default El;
