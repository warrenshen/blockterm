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
    borderTop: '1px solid rgba(0,0,0,0.15)',
    padding: '0px 10px 0px',
    boxSizing: 'content-box',
    backgroundColor: '#fff',
    minHeight: '100vh',
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
  faqPanel: {
    backgroundColor: '#fff',
    marginTop: '20px',
    padding: '15px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
    display:'flex',
    flexDirection:'column',
    minHeight: '450px',
  },
  row: {
    display:'flex',
    flex: '1',
    flexDirection: 'row',
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
    fontWeight:'700',
    display: 'block',
  },
  semibolded: {
    fontWeight:'500',
  },
  boldedColor: {
    color: STYLES.GOLDINVERSEBLUE,
    fontWeight: '700',
  },
  nightBoldedColor: {
    color: STYLES.GOLD,
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
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  section: {
    flex: '1',
  },
  rightAlign: {
    textAlign: 'right',
  },
  para: {
    lineHeight: '24px',
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

class Signup extends PureComponent {

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
      password,

      createUser,
    } = this.props;

    createUser(email, password);
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
              <El
                style={styles.boldedBottomHeavy}
                nightMode={nightMode}
                type={'h4'}
              >
                  Join our army of HODLers:
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
                    Already have an account? <Link className={css(styles.boldedColor, nightMode && styles.nightBoldedColor)} to={'/login'}><u>Login here.</u></Link>
                  </El>
                </div>
              </div>
            </div>
            <div className={css(styles.halfPanel, styles.rightHalf)}>
              <El
                style={styles.boldedBottomHeavy}
                nightMode={nightMode}
                type={'h4'}
              >
                Why should I join?
              </El>
              <ul className={css(styles.squareList, nightMode && styles.nightModeText)}>
                <li className={css(styles.blockli, styles.boldedColor, nightMode && styles.nightBoldedColor)}>Beta-access HODLers get grandfathered into any future premium-only features!</li>
                <li className={css(styles.blockli)}>We have big plans for the near future.</li>
                <li className={css(styles.blockli, styles.boldedColor, nightMode && styles.nightBoldedColor)}>Customize and save/load your configurations across workstations.</li>
                <li className={css(styles.blockli)}>We want your feedback!</li>
                <li className={css(styles.blockli)}>Motivate us to continue improving this tool.</li>
              </ul>
            </div>
          </div>

          <div className={css(styles.faqPanel, nightMode && styles.panelsLightNight)}>
            <div className={css(styles.row)}>
              <El
                style={styles.boldedBottomHeavy}
                nightMode={nightMode}
                type={'h4'}
              >
                FAQ:
              </El>
            </div>

            <div className={css(styles.row)} style={{'marginBottom':'32px'}}>
              <div className={css(styles.column, styles.dashBorder)}>
                <El
                  style={styles.bolded}
                  nightMode={nightMode}
                  type={'h5'}
                >
                  What is Blockterm?
                </El>
                <El
                  nightMode={nightMode}
                  type={'p'}
                  style={styles.para}
                >
                Blockterm hopes to be the premier blockchain terminal. Blockterm is a fully customizable cryptocurrency monitoring terminal designed for the avid investor/trader. We hope to empower you to set up different tabs/pages of charts and tools, separated by coin/token, for example.<br /><br />
                We were inspired to build Blockterm due to the hassle of continuously having to tab in/out of different webpages when keeping up with cryptocurrencies. We want to help this community have all their tools in one snug place!
                </El>
              </div>

              <div className={css(styles.column)}>
                <El
                  style={styles.bolded}
                  nightMode={nightMode}
                  type={'h5'}
                >
                  How do I use the 'Dashboard' tab?
                </El>
                <El
                  nightMode={nightMode}
                  type={'p'}
                  style={styles.para}
                >
                  The 'dashboard' tab is your workbench/playground to build your perfect cryptocurrency monitoring/trading terminal. By default it has real time charts on Bitcoin, Ethereum, and Litecoin's prices. You can customize it to fulfill your needs by adding or removing other widgets for different coins/tokens such as XMR, NEO, ZEC, etc. You can also re-position and scale the different panels to suit your needs! Your feedback is appreciated!<br /><br />
                  To add widgets, use the 'add widget' button located near the bottom of the dashboard panel, or the menu bar button while on the dashboard page.
                </El>
              </div>


            </div>

            <div className={css(styles.row)}>
              <div className={css(styles.column, styles.dashBorder)}>
                <El
                  style={styles.bolded}
                  nightMode={nightMode}
                  type={'h5'}
                >
                  What is the 'Subreddits' tab for?
                </El>
                <El
                  nightMode={nightMode}
                  type={'p'}
                  style={styles.para}
                >
                  The 'subreddits' tab is used to monitor activity on each respective coin/token's subreddit on <a href="https://www.reddit.com" target="_blank" className={css(styles.a, nightMode && styles.nightA)}>Reddit.com.</a> The data is updated live every few minutes and has in the past shown extremely high correlation to price movements of the coins/tokens in the past.<br /><br />
                  You can also use this page to follow the approximate size of the community surrounding a given coin in order to understand how much developer support, community input, and mainstream adoption looks like.
                </El>
              </div>

              <div className={css(styles.column, styles.dashBorder)}>
                <El
                  style={styles.bolded}
                  nightMode={nightMode}
                  type={'h5'}
                >
                  What is the 'Coins/Tokens' tab for?
                </El>
                <El
                  nightMode={nightMode}
                  type={'p'}
                  style={styles.para}
                >
                  The 'coins/tokens' tab is currently in most need of work. We have plans for the coins page to include cross-coin correlation graphs, market cap data, etc.<br /><br />
                  However, at this time it contains the proportion/distribution of a given coin's Reddit forum activity across different subreddits. This is intended to show the interconnectivity of certain coins to others, for example, the LTC:BTC trading pair.
                </El>
              </div>

              <div className={css(styles.column)}>
                <El
                  style={styles.bolded}
                  nightMode={nightMode}
                  type={'h5'}
                >
                  I love this! How can I contribute?
                </El>
                <El
                  nightMode={nightMode}
                  type={'p'}
                  style={styles.para}
                >
                  We love you back! First and foremost, the best way to contribute is to SEND US YOUR BEAUTIFUL feedback! Send us every issue, no matter how big or small, here! We'll try to nail each one.<br /><br />
                  If you like us even more than that. You could send some coins our way at:<br />
                  <strong>ETH:</strong> 0x72fB44C1a3F910ed4a979fBDed2c600f7c14f3B7<br />
                </El>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
