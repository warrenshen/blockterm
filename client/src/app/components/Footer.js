import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from '../components/El';
import { Link }       from 'react-router-dom';

import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: '5px 10px 0px 10px !important',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
    display:'flex',
  },
  panelsLightNight: {
    backgroundColor: '#000',
    borderTop: `1px solid ${STYLES.BORDERDARK}`,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  boldedBottomHeavy: {
    fontWeight: '700',
    marginBottom: '8px',
  },
  column: {
    display:'flex',
    flex: '1',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dashBorder: {
    borderRight: `1px dashed ${STYLES.BORDERLIGHT}`,
  },
  bolded: {
    fontWeight:'700',
    display: 'block',
  },
  para: {
    fontSize: '13px',
    lineHeight: '18px',
  },
  a: {
    fontWeight: '500',
    textDecoration: 'underline',
  },
  nightA: {
    color: '#fff',
  },
});

class Footer extends PureComponent {

  render()
  {
    const {
      nightMode,
    } = this.props;

    return(
      <div className={css(styles.container, nightMode && styles.panelsLightNight)}>
        <div className={css(styles.column)}>
          <El
            nightMode={nightMode}
            type={'p'}
            style={styles.para}
          >
            <strong>Please send us your feedback!</strong> We want to hear every issue, no matter how big/small! We'll try to nail each one.
          </El>
        </div>
        <div className={css(styles.column)}>

        </div>
        <El
          nightMode={nightMode}
          type={'p'}
          style={styles.para}
        >
          If you want to support this project further, you can send coins our way at:<br />
          <strong>ETH Wallet Address: 0x72fB44C1a3F910ed4a979fBDed2c600f7c14f3B7</strong><br />
        </El>
      </div>
    );
  }
}

export default Footer;
