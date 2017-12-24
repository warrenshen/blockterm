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
    borderLeft: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightbar: {
    backgroundColor: STYLES.SOFTGRAY,
    borderLeft: `1px solid ${STYLES.BORDERDARK}`,
  },
  alert: {
    width:'100%',
    padding:'10px',
    backgroundColor: 'white',
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  darkAlert: {
    backgroundColor: STYLES.BLUEGRAY,
    color: 'white !important',
  },
});

const Sidebar = ({
  nightMode,
}) => {
  return (
    <div className={css(styles.sidebar, nightMode && styles.nightbar)}>
      <div className={css(styles.alert, nightMode && styles.darkAlert)}>
        <El style={styles.bolded}
            nightMode={nightMode}
            type={'h5'}>
            Hi, I'm an Alert
        </El>

      </div>
    </div>
  );
}

Sidebar.propTypes = {
  nightMode: PropTypes.bool.isRequired,
};

export default Sidebar;
