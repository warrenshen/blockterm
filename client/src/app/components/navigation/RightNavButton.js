// @flow weak

import React              from 'react';
import PropTypes      from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }       from 'react-router-dom';
import El from '../El';
import * as STYLES from '../../constants/styles';
import FontAwesome    from 'react-fontawesome';

const styles = StyleSheet.create({
  container: {
    marginLeft: '18px',
    display: 'flex',
  },
  boldedUpper: {
    fontWeight: '500 !important',
    textTransform: 'uppercase !important',
    fontSize: '12px !important',
    letterSpacing: '2px !important',
    ':hover': {
      color: STYLES.GOLDINVERSEBLUE,
      borderColor: STYLES.GOLDINVERSEBLUE,
    },
  },
  flatButton: {
    background: 'none',
    border: 'none',
  },
  nightHover: {
    color: '#fff',
    ':hover': {
      color: STYLES.GOLD,
      borderColor: STYLES.GOLD,
    },
  },
  icon: {
    marginLeft: '3px',
  },
  absolutePositionIcon: {
    position: 'absolute',
    top: '3px',
  },
  padRightIcon: {
    paddingRight: '11px',
  },
});

const RightNavButton = ({ absolute, action, label, link, icon, nightMode, nightModeStyle, style }) => {
  return action ?
  (
    <li className={css(styles.container, icon && absolute && styles.padRightIcon)}>
      <button className={css(styles.flatButton, style, nightMode && nightModeStyle)} onClick={action}>
        <El
          nightMode={nightMode}
          nightModeStyle={styles.nightHover}
          style={styles.boldedUpper}
          type={'span'}>
          {label}
          {icon && <FontAwesome name={`${icon}`} className={css(styles.icon, absolute && styles.absolutePositionIcon)}/>}
        </El>
      </button>
    </li>
  ) :
  (
    <li className={css(styles.container, icon && absolute && styles.padRightIcon)}>
      <Link to={link} className={css(style, nightMode&& nightModeStyle)}>
        <El
          nightMode={nightMode}
          nightModeStyle={styles.nightHover}
          style={styles.boldedUpper}
          type={'span'}>
          {label}
          {icon && <FontAwesome name={`${icon}`} className={css(styles.icon, absolute && styles.absolutePositionIcon)}/>}
        </El>
      </Link>
    </li>
  )
};

export default RightNavButton;
