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
    flexDirection: 'column',
    padding: '10px 10px',
  },
  squareList: {
    display: 'flex',
    flexDirection: 'column',
    listStylePosition: 'inside',
    listStyleType: 'square',
  },
  nightModeText: {
    color: '#fff',
  },
  listItem: {
    lineHeight: '24px',
  },
});

class AccountPerks extends PureComponent
{
  render()
  {
    const {
      nightMode,
    } = this.props;

    return(
      <div className={css(styles.container)}>
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
          <li className={css(styles.listItem)}>
            Portfolio tracking and historic value graph
          </li>
          <li className={css(styles.listItem)}>
            Configurable price alerts via browser notifications
          </li>
          <li className={css(styles.listItem)}>
            Customizable tab names on the dashboard
          </li>
          <li className={css(styles.listItem)}>
            Stored dashboard configuration cross-computer/browser
          </li>
        </ul>
      </div>
    );
  }
}

export default AccountPerks;


