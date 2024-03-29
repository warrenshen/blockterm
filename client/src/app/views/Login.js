// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import {
  Link,
  withRouter,
}                          from 'react-router-dom';
import {
  AUTH_TOKEN_COOKIE,
  SELECTED_TAB_COOKIE,
  clearItem,
  getItem,
  setItem,
}                          from '../services/cookie';
import El                  from '../components/El';
import {
  PROJECT_VERSION,
  PATCH_NOTES,
}                          from '../constants/items';
import * as STYLES         from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 10px 0px',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    borderTop: '1px solid rgba(0,0,0,0.15)',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
  },
  nightMode: {
    color: 'white',
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  nightModeText: {
    color: '#fff',
  },
  header: {
    display: 'flex',
    padding: '15px 20px',
  },
  loginPanel: {
    marginTop: '10px',
    backgroundColor: '#fff',
    border: `1px solid #000`,
  },
  infoPanel: {
    backgroundColor: '#fff',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    marginBottom: '10px',
  },
  panelsNight: {
    backgroundColor: '#000',
    border: `1px solid #fff`,
  },
  panelsLightNight: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
  },
  bolded: {
    fontWeight:'700 !important',
    display: 'block',
  },
  inputField: {
    fontWeight:'500',
    display: 'block',
    marginBottom: '8px',
    border: `1px solid #000`,
    width: '100%',
    letterSpacing: '0.5px',
  },
  fieldNight: {
    border: '1px solid #fff',
  },
  halfPanel: {
    width:'55%',
    display: 'inline-block',
    padding: '15px 15px',
  },
  rightHalf: {
    width:'45%',
    display: 'inline-flex',
    flexDirection: 'column',
    borderLeft: '1px solid #555',
    position: 'absolute',
    top: '0px',
    height: '100%',
  },
  bottomHeavy: {
    marginBottom: '8px',
  },
  squareList: {
    listStyleType: 'square',
    flex: '1',
    overflowY: 'auto',
  },
  blockli: {
    display: 'block',
  },
  submitButton: {
    border: `1px solid #000`,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '13px',
    padding: '8px 6px',
  },
  rightAlign: {
    flex: '1',
    textAlign: 'right',
  },
  boldedColor: {
    color: STYLES.GOLDINVERSEBLUE,
    fontWeight: '700',
  },
  nightBoldedColor: {
    color: STYLES.GOLD,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  section: {

  },
  column: {
    display:'flex',
    flex: '1',
    flexDirection: 'column',
    height: '100%',
  },
  growOne: {
    flex: '1 1 auto',
  },
  para: {
    lineHeight: '20px',
    marginBottom: '16px',
  },
  a: {
    fontWeight: '500',
    textDecoration: 'underline',
  },
  nightA: {
    color: '#fff',
  },
  boldedBottomHeavy: {
    fontWeight: '700',
    marginBottom: '8px',
  },
});

class Login extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (nextProps.user !== null && getItem(AUTH_TOKEN_COOKIE) !== null)
    {
      nextProps.history.push('/');
    }
  }

  submit()
  {
    const {
      email,
      password,

      changeError,
      logIn,
    } = this.props;

    logIn(email, password)
      .then((response) => {
        clearItem(SELECTED_TAB_COOKIE);
        setItem(AUTH_TOKEN_COOKIE, response.data.logIn.authToken);
        window.location = '/';
      })
      .catch((error) => changeError(error.graphQLErrors[0].message));
  }

  render()
  {
    const {
      email,
      error,
      nightMode,
      password,

      changeEmail,
      changePassword,
    } = this.props;

    const isSubmitDisabled = !email || !password;
    const onClickSubmit = (event) => {
      event.preventDefault();
      this.submit();
    };
    const onKeyPress = (event) => {
      if (event.key === 'Enter')
      {
        event.preventDefault();
        this.submit();
      }
    };

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.loginPanel, nightMode && styles.panelsNight)}>
          <div className={css(styles.halfPanel)}>
            <El
              style={styles.boldedBottomHeavy}
              nightMode={nightMode}
              type={'h4'}
            >
                Login to your account:
            </El>
            <input
              autoFocus={true}
              className={css(styles.inputField, nightMode && styles.fieldNight)}
              placeholder='email'
              required='required'
              value={email}
              onChange={(event) => changeEmail(event.target.value)}
            />
            <input
              className={css(styles.inputField, nightMode && styles.fieldNight)}
              placeholder='password'
              required='required'
              type='password'
              value={password}
              onChange={(event) => changePassword(event.target.value)}
              onKeyPress={onKeyPress}
            />
            {
              error && (
                <El
                  nightMode={nightMode}
                  type={'span'}
                >
                  {error}
                </El>
              )
            }
            <div className={css(styles.row)}>
              <div className={css(styles.section)}>
                <button
                  className={css(styles.bolded, styles.submitButton)}
                  disabled={isSubmitDisabled}
                  type='submit'
                  onClick={onClickSubmit}
                >
                  Log in
                </button>
              </div>
              <div className={css(styles.section, styles.rightAlign)}>
                <El nightMode={nightMode} type={'span'}>
                  Need an account? <Link className={css(styles.boldedColor, nightMode && styles.nightBoldedColor)} to={'/join'}><u>Register here.</u></Link>
                </El>
                <El nightMode={nightMode} type={'span'}>
                  &nbsp;
                </El>
                <El nightMode={nightMode} type={'span'}>
                  Forgot your password? <Link className={css(styles.boldedColor, nightMode && styles.nightBoldedColor)} to={'/forgot'}><u>Reset it here.</u></Link>
                </El>
              </div>
            </div>
          </div>
          <div className={css(styles.halfPanel, styles.rightHalf)}>
            <El style={styles.boldedBottomHeavy}
                nightMode={nightMode}
                type={'h4'}>
                Latest Updates: (ver. {PROJECT_VERSION})
            </El>
            <ul className={css(styles.squareList, nightMode && styles.nightModeText)}>
              {
                PATCH_NOTES.map((string, index) => (
                  <li key={index} className={'patchlist ' + css(styles.blockli)}>{string}</li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className={css(styles.infoPanel, nightMode && styles.panelsLightNight)}>
          <div className={css(styles.row)}>
            <div className={css(styles.column)}>
              <div className={css(styles.row)}>
                <El style={styles.boldedBottomHeavy}
                  nightMode={nightMode}
                  type={'h4'}>
                  Roadmap:
                </El>
              </div>
              <div className={css(styles.column)} style={{'paddingRight':'15px'}}>
                <El nightMode={nightMode}
                style={styles.para}
                type={'p'}>
                  <strong><u>Profit Loss Tracking Tool:</u></strong> &nbsp;profit/loss tracking via a widget on the dashboard is another feature we see high demand for. We look forward to adding this feature and helping the community, and ourselves better track collective investments.
                </El>
                <El nightMode={nightMode}
                style={styles.para}
                type={'p'}>
                  <strong><u>Correlation Graphs:</u></strong> &nbsp;cross coin correlation graphs have been requested, and seem lacking in the current cryptocurrency space. We intend to remedy this.
                </El>
                <El nightMode={nightMode}
                style={styles.para}
                type={'p'}>
                  <strong><u>Depth charts:</u></strong> &nbsp;depth chart (order book) in candle chart widget and full screen mode.
                </El>
                <El nightMode={nightMode}
                style={styles.para}
                type={'p'}>
                  <strong><u>Low Intensity Mode:</u></strong> &nbsp;a mode with less frequent updates of data is planned for the less aggressive trader/investor, or for leaving the terminal on idle.
                </El>
                <El nightMode={nightMode}
                style={styles.para}
                type={'p'}>
                  <strong><u>More widgets:</u></strong> &nbsp;tons of more widgets are in the works. We would love your feedback! This will help us decide what to prioritize.
                </El>
              </div>
            </div>
            <div className={css(styles.column)} style={{'paddingLeft':'15px', 'borderLeft':'1px dashed #777'}}>
              <El
                style={styles.boldedBottomHeavy}
                nightMode={nightMode}
                type={'h5'}
                >
                  How to Buy and Sell Altcoins (such as VEN, REQ, XRP, SUB, ICX etc.):
              </El>
              <El
                nightMode={nightMode}
                style={styles.para}
                type={'p'}
              >
                2018 is undoubtedly the year of altcoins (alternative cryptocurrencies), with Bitcoin stealing the show of 2017. With altcoins like <a href="https://coinmarketcap.com/currencies/substratum/" className={css(styles.a, nightMode && styles.nightA)} target="_blank">Substratum (SUB)</a> and <a href="https://coinmarketcap.com/currencies/icon/" className={css(styles.a, nightMode && styles.nightA)} target="_blank">Icon (ICX)</a> rallying hard, it's wise to learn how to get a part of the action. There is lots of money to be made in the more volatile, fast-paced altcoin market.<br /><br />
                Thus the natural question is: How does one get involved?
                Our preferred answer is: <a href="https://www.binance.com/?ref=11786793" className={css(styles.a, styles.boldedColor, nightMode && styles.nightBoldedColor)} target="_blank">with Binance.</a>
                &nbsp;Currently most altcoins can only be purchased using Bitcoin/Ethereum, and are seldom available by fiat-to-cryptocurrency vendors. Thus you will first need a traditional Dollar-to-Bitcoin broker such as <a href="https://www.coinbase.com/join/59d710a13d5d8000d2267f0c" className={css(styles.a, styles.boldedColor, nightMode && styles.nightBoldedColor)} target="_blank">Coinbase</a> to trade dollars for BTC/LTC, which you will send to your Binance account.<br /><br />
                Then, using your Binance account, you would trade BTC for any altcoin you desire. We prefer Binance as they have one of the largest, if not the largest, selections of altcoins available, and immediately pay out coin-fork distributions when they are announced (similar to dividends for the stock market); other brokers have been known to keep these distributions to themselves. They also have some of the lowest, if not the lowest fees, at 0.1% (reducible to 0.05%)!<br /><br />
                <span style={{'fontWeight':'500'}}>Important note: in order to avoid costly transaction fees from transferring Bitcoin, it is recommended to buy LTC off of Coinbase or other vendors and then send the LTC to Binance. LTC transaction fees are <b>much lower</b>. After doing so, trade LTC to BTC and then BTC for your preferred altcoin on Binance.</span>
              </El>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
