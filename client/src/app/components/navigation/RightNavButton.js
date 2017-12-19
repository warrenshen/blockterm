// @flow weak

import React              from 'react';
import PropTypes      from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }       from 'react-router-dom';
import El from '../El';

const styles = StyleSheet.create({
  container: {
    paddingLeft: '12px',
    display: 'flex',
  },
  boldedUpper: {
    fontWeight: '700 !important',
    textTransform: 'uppercase',
    fontSize: '13px',
    letterSpacing: '3px',
  },
});

const RightNavButton = ({ link, label, nightMode, viewName }) => (
  <li className={css(styles.container)}>
    <Link to={link}>
      <El nightMode={nightMode} style={styles.boldedUpper} type={'span'}>{label}</El>
    </Link>
  </li>
);

export default RightNavButton;
