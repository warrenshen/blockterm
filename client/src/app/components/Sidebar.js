// @flow weak

import React               from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link }            from 'react-router-dom';
import El from './El';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  sidebar: {
    width: '20vw',
    minWidth: '20vw',
    backgroundColor: '#f3f3f3',
  },
  nightbar: {
    backgroundColor: STYLES.SOFTGRAY,
  },
  alert: {
    width:'100%',
    padding:'16px',
    backgroundColor: STYLES.ORANGE,
  }
});

const Sidebar = ({
  nightMode,
}) => {
  return (
    <div className={css(styles.sidebar, nightMode && styles.nightbar)}>
      <div className={css(styles.alert)}>
        <h3>Hi, I'm an Alert</h3>

      </div>
    </div>
  );
}

Sidebar.propTypes = {
  nightMode: PropTypes.bool.isRequired,
};

export default Sidebar;
