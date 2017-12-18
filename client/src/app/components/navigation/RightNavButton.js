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
  bolded: {
    fontWeight: '700',
  },
});

const RightNavButton = ({ link, label, nightMode, viewName }) => (
  <li className={css(styles.container)}>
    <Link className={css(styles.bolded)} to={link}>
      <El nightMode={nightMode} type={'span'}>{label}</El>
    </Link>
  </li>
);

export default RightNavButton;
