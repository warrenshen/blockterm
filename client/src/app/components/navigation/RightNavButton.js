// @flow weak

import React              from 'react';
import PropTypes      from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }       from 'react-router-dom';
import El from '../El';
import * as STYLES from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    marginLeft: '24px',
    display: 'flex',
  },
  boldedUpper: {
    fontWeight: '700 !important',
    textTransform: 'uppercase !important',
    fontSize: '14px !important',
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
    ':hover': {
      color: STYLES.GOLD,
      borderColor: STYLES.GOLD,
    },
  },
});

const RightNavButton = ({ action, label, link, nightMode, nightModeStyle, style }) => {
  return action ?
  (
    <li className={css(styles.container)}>
      <button className={css(styles.flatButton, style, nightMode && nightModeStyle)} onClick={action}>
        <El
          nightMode={nightMode}
          nightModeStyle={styles.nightHover}
          style={styles.boldedUpper}
          type={'span'}>
          {label}
        </El>
      </button>
    </li>
  ) :
  (
    <li className={css(styles.container)}>
      <Link to={link} className={css(style, nightMode&& nightModeStyle)}>
        <El
          nightMode={nightMode}
          nightModeStyle={styles.nightHover}
          style={styles.boldedUpper}
          type={'span'}>
          {label}
        </El>
      </Link>
    </li>
  )
};

export default RightNavButton;
