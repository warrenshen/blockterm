import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from '../components/El';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'fixed',
    top: '65px',
    left: '0px',
    zIndex: '3',
    width: '100%',
    height: '100%',
    paddingBottom: '96px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  padded: {
    padding: '10px 10px',
  },
  squareList: {
    listStyleType: 'square',
  },
  nightModeText: {
    color: '#fff',
  },
});

class AccountPerks extends PureComponent {

  render()
  {
    const {
      nightMode,
    } = this.props;

    return(
      <div className={css(styles.padded)}>
        <El
          nightMode={nightMode}
          type={'h4'}
        >
          LOGIN or JOIN to use alerts
        </El>
        <El
          nightMode={nightMode}
          type={'h5'}
        >
          Benefits of creating a free account include:
        </El>
        <ul className={css(styles.squareList, nightMode && styles.nightModeText)}>
          <li>Portfolio tracking and historic value graph</li>
          <li>Configurable price alerts via browser notifications</li>
          <li>Customizable tab names on the dashboard</li>
          <li>Stored dashboard configuration cross-computer/browser</li>
        </ul>
      </div>
    );
  }
}

export default AccountPerks;


