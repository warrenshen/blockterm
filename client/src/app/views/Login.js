// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El from '../components/El';

import { withRouter } from 'react-router-dom'
import * as STYLES from '../constants/styles';
import { PROJECT_VERSION } from '../constants/items';

const styles = StyleSheet.create({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    //padding: '0% 15%',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    color: 'white',
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  nightModeText: {
    color: '#fff',
  },
  mainContent: {
    width: '100%',
  },
  header: {
    display: 'flex',
    padding: '15px 20px',
  },
  body: {
    //left: '-24px',
    borderTop: '1px solid rgba(0,0,0,0.15)',
    padding: '0px 10px 0px',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    minHeight: '100vh',
    //borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  loginPanel: {
    marginTop: '20px',
    backgroundColor: '#fff',
    border: `1px solid #000`,
    borderBottom: `2px solid #000`,
  },
  infoPanel: {
    backgroundColor: '#fff',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  panelsNight: {
    backgroundColor: '#000',
    border: `1px solid #fff`,
    borderBottom: `2px solid #fff`,
  },
  panelsLightNight: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  bolded: {
    fontWeight:'700 !important',
    display: 'block',
  },
  inputField: {
    fontWeight:'700',
    display: 'block',
    marginBottom: '8px',
    border: `1px solid #000`,
    width: '100%',
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
    display: 'block',
  },
  blockli: {
    display: 'block',
  },
  submitButton: {
    border: `1px solid #000`,
  },
  rightAlign: {
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
    flex: '1',
  },
  section: {
    flex: '1',
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
    lineHeight: '24px',
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

class Login extends PureComponent {

  componentWillReceiveProps(nextProps)
  {
    if (!nextProps.data.loading && nextProps.data.user !== null)
    {
      nextProps.history.push('/');
    }
  }

  submit(event)
  {
    event.preventDefault();
    const {
      email,
      logIn,
      password,
    } = this.props;

    logIn(email, password);
  }

  render()
  {
    const {
      changeEmail,
      changePassword,
      email,
      password,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.body, styles.wrapper, nightMode && styles.bodyNightMode)}>
        <div className={css(styles.mainContent)}>
          <div className={css(styles.loginPanel, nightMode && styles.panelsNight)}>
            <div className={css(styles.halfPanel)}>
              <El style={styles.boldedBottomHeavy}
                  nightMode={nightMode}
                  type={'h4'}>
                  Login to your account:
              </El>
              <input
                autoFocus={true}
                className={css(styles.inputField, nightMode && styles.fieldNight)}
                placeholder='email/username'
                onChange={(event) => changeEmail(event.target.value)}
                value={email}
              />
              <input
                className={css(styles.inputField, nightMode && styles.fieldNight)}
                placeholder='password'
                onChange={(event) => changePassword(event.target.value)}
                type='password'
                value={password}
              />
              <div className={css(styles.row)}>
                <div className={css(styles.section)}>
                  <input
                    className={css(styles.bolded, styles.submitButton)}
                    onClick={(event) => this.submit(event)}
                    type='submit'
                  />
                </div>
                <div className={css(styles.section, styles.rightAlign)}>
                  <El nightMode={nightMode} type={'span'}>
                    Need an account? <Link className={css(styles.boldedColor, nightMode && styles.nightBoldedColor)} to={'/join'}><u>Register here.</u></Link>
                  </El>
                </div>
              </div>
            </div>
            <div className={css(styles.halfPanel, styles.rightHalf)}>
              <El style={styles.boldedBottomHeavy}
                  nightMode={nightMode}
                  type={'h4'}>
                  Latest Updates: (v. {PROJECT_VERSION})
              </El>
              <ul className={css(styles.squareList, nightMode && styles.nightModeText)}>
                <li className={css(styles.blockli)}>Market Overview widget added!</li>
                <li className={css(styles.blockli)}>In-depth chart widget added. </li>
                <li className={css(styles.blockli)}>Accounts and dashboard arrangement/state saving.</li>
                <li className={css(styles.blockli)}>Subreddit tracking data added by sub. </li>
                <li className={css(styles.blockli)}>Launch of Blockterm!</li>
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
                    <strong><u>Desktop Alerts:</u></strong> &nbsp;alerts/notifications is one of the features we feel most strongly about. We intend to add this as soon as possible in the next version of Blockterm.
                  </El>
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
                <El style={styles.boldedBottomHeavy}
                    nightMode={nightMode}
                    type={'h5'}>
                    How to Buy and Sell Altcoins (such as XMR, XRP, SUB, ICX etc.):
                </El>
                <El nightMode={nightMode}
                    style={styles.para}
                    type={'p'}>
                    2018 is undoubtedly the year of altcoins (alternative cryptocurrencies), with Bitcoin stealing the show of 2017. With altcoins like <a href="https://coinmarketcap.com/currencies/substratum/" className={css(styles.a, nightMode && styles.nightA)} target="_blank">Substratum (SUB)</a> and <a href="https://coinmarketcap.com/currencies/icon/" className={css(styles.a, nightMode && styles.nightA)} target="_blank">Icon (ICX)</a> rallying hard, it's wise to learn how to get a part of the action. There is lots of money to be made in the more volatile, fast-paced altcoin market.<br /><br />
                    Thus the natural question is: How does one get involved?
                    Our preferred answer is: <a href="https://www.binance.com/?ref=11786793" className={css(styles.a, styles.boldedColor, nightMode && styles.nightBoldedColor)} target="_blank">with Binance.</a>
                    &nbsp;Currently most altcoins can only be purchased using Bitcoin, and are seldom available by dollar-to-cryptocurrency vendors. Thus you will first need a traditional Dollar-to-Bitcoin broker such as <a href="https://www.coinbase.com/join/59d710a13d5d8000d2267f0c" className={css(styles.a, styles.boldedColor, nightMode && styles.nightBoldedColor)} target="_blank">Coinbase</a> to trade dollars for BTC/LTC.<br /><br />
                    Then, using your Binance account, you would trade BTC for any altcoin you desire. We prefer Binance as they have one of the largest, if not the largest, selections of altcoins available, and immediately pay out coin-fork distributions when they are announced (similar to dividends for the stock market). They also have some of the lowest, if not the lowest fees, at 0.5%!<br /><br />
                    <span style={{'fontWeight':'500'}}>Important note: in order to save on Bitcoin's costly transaction fees, it is recommended to buy LTC off of Coinbase or other vendors and then send the LTC to Binance. After doing so, trade LTC to BTC and then BTC for your preferred altcoin.</span>
                </El>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
