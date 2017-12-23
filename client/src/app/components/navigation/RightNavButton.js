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
    textTransform: 'uppercase',
    fontSize: '13px',
    letterSpacing: '2px',
  },
});

const RightNavButton = ({ action, label, link, nightMode, style }) => {
  return action ?
  (
    <li className={css(styles.container, style)}>
      <button onClick={action}>
        <El
          nightMode={nightMode}
          style={styles.boldedUpper}
          type={'span'}>
          {label}
        </El>
      </button>
    </li>
  ) :
  (
    <li className={css(styles.container, style)}>
      <Link to={link}>
        <El nightMode={nightMode} style={styles.boldedUpper} type={'span'}>{label}</El>
      </Link>
    </li>
  )
};

export default RightNavButton;
