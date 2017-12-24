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
    fontSize: '13px !important',
    letterSpacing: '2px !important',
  },
  flatButton: {
    background: 'none',
    border: 'none',
    //padding: '4px 12px',
  },
});

const RightNavButton = ({ action, label, link, nightMode, nightModeStyle, style }) => {
  return action ?
  (
    <li className={css(styles.container)}>
      <button className={css(styles.flatButton, style, nightMode&& nightModeStyle)} onClick={action}>
        <El
          nightMode={nightMode}
          //nightModeStyle={nightModeStyle}
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
          //nightModeStyle={nightModeStyle}
          style={styles.boldedUpper}
          type={'span'}>
          {label}
        </El>
      </Link>
    </li>
  )
};

export default RightNavButton;
