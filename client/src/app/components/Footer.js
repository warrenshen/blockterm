import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from '../components/El';
import { Link }       from 'react-router-dom';
import RightNavButton       from './navigation/RightNavButton';

import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    padding: '5px 10px 20px 10px !important',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
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
    letterSpacing: '1px',
    lineHeight: '16px',
  },
  a: {
    fontWeight: '500',
    textDecoration: 'underline',
  },
  nightA: {
    color: '#fff',
  },
  button: {
    width: '100%',
    border: '1px solid #333',
    color: '#333',
    borderRadius: '1px',
    padding: '4px 12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid #111',
    borderRadius: '1px',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '1px',
  },
  nightModeButton: {
    color: '#eee',
    border: '1px solid #ccc',
  },
});

class Footer extends PureComponent {

  componentDidMount()
  {
    const {
      changeIsPageLoaded,
    } = this.props;

    // This line is very important - it updates the store
    // to know the page has been "loaded".
    window.onload = () => changeIsPageLoaded(true);
  }

  render()
  {
    const {
      nightMode,
    } = this.props;

    return(
      <div className={css(styles.container, nightMode && styles.panelsLightNight)}>
        <El
          nightMode={nightMode}
          type={'p'}
          style={styles.para}
        >
          If you want to support this project further, you can send coins our way at:<br />
          <strong>ETH Wallet Address: 0x72fB44C1a3F910ed4a979fBDed2c600f7c14f3B7</strong><br />
        </El>
        <div className={css(styles.column)} style={{'marginRight':'-10px'}}>
          <a
            href='https://docs.google.com/forms/d/e/1FAIpQLSc0r_OJiNCw8Bz9vXyTKyJoFPYxCRkJ4mQAkfOLfXiZjw6SVw/viewform'
            target='_blank'
          >
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.button}
              nightModeStyle={styles.nightModeButton}
            >
              Request Feature / Feedback
            </El>
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
