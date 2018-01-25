// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import {
  Link,
  withRouter,
}                          from 'react-router-dom';
import { Helmet }          from 'react-helmet';
import {
  AUTH_TOKEN_COOKIE,
  getItem,
  setItem,
}                          from '../services/cookie';
import FAQBody             from '../components/FAQBody';
import El                  from '../components/El';
import * as STYLES         from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
    gridTemplateColumns: 'repeat(8, 1fr)',
    flex: '1',
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
    display: 'flex',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  loginPanel: {
    marginTop: '10px',
    backgroundColor: '#fff',
    border: `1px solid #000`,
    //borderBottom: `2px solid #000`,
  },
  faqPanel: {
    backgroundColor: '#fff',
    marginTop: '20px',
    padding: '15px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    //borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
    display:'flex',
    flexDirection:'column',
    minHeight: '450px',
  },
  row: {
    display:'flex',
    flex: '1',
    flexDirection: 'row',
  },
  panelsNight: {
    backgroundColor: '#000',
    border: `1px solid #fff`,
    //borderBottom: `2px solid #fff`,
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
    textTransform: 'uppercase',
    letterSpacing: '2px',
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
  boldedBottomHeavy: {
    fontWeight: '700',
    marginBottom: '8px',
  },
});

class Signup extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (nextProps.user !== null && getItem(AUTH_TOKEN_COOKIE) !== null)
    {
      nextProps.history.push('/');
    }
  }

  submit(event)
  {
    const {
      email,
      history,
      password,

      changeError,
      createNotificationSuccess,
      createUser,
    } = this.props;

    createUser(email, password)
      .then((response) => {
        setItem(AUTH_TOKEN_COOKIE, response.data.createUser.authToken);
        history.push('/');
      })
      .catch((error) => changeError(error.graphQLErrors[0].message));;
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
      <div className={css(styles.body, styles.wrapper, nightMode && styles.bodyNightMode)}>
        <Helmet>
          <title>Blockterm | Join Our Cryptocurrency Trading Community</title>
          <meta name="description" content="Manage and track your cryptocurrency portfolio/assets in one easy place. See your cryptocurrency assets total valuation, price by cryptocurrency, and distribution percentages with Blockterm." />
        </Helmet>

        <div className={css(styles.mainContent)}>
          <div className={css(styles.loginPanel, nightMode && styles.panelsNight)}>
            <div className={css(styles.halfPanel)}>
              <El
                style={styles.boldedBottomHeavy}
                nightMode={nightMode}
                type={'h4'}
              >
                  Join us:
              </El>
              <form>
                <input
                  autoFocus={true}
                  className={css(styles.inputField, nightMode && styles.fieldNight)}
                  placeholder='email/username'
                  type='email'
                  required="required"
                  onChange={(event) => changeEmail(event.target.value)}
                  value={email}
                />
                <input
                  className={css(styles.inputField, nightMode && styles.fieldNight)}
                  placeholder='password'
                  type='password'
                  required="required"
                  value={password}
                  onChange={(event) => changePassword(event.target.value)}
                  onKeyPress={onKeyPress}
                />
                {error && (
                  <El
                    nightMode={nightMode}
                    type={'span'}
                  >
                    {error}
                  </El>
                )}
                <div className={css(styles.row)}>
                  <div className={css(styles.section)}>
                    <button
                      className={css(styles.bolded, styles.submitButton)}
                      onClick={(event) => this.submit(event)}
                      type='submit'
                      onClick={onClickSubmit}
                    >
                      Join
                    </button>
                  </div>
                  <div className={css(styles.section, styles.rightAlign)}>
                    <El nightMode={nightMode} type={'span'}>
                      Already have an account? <Link className={css(styles.boldedColor, nightMode && styles.nightBoldedColor)} to={'/login'}><u>Login here.</u></Link>
                    </El>
                  </div>
                </div>
              </form>
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
                <li className={css(styles.blockli, styles.boldedColor, nightMode && styles.nightBoldedColor)}>
                  Create/save your portfolio and track it on your dashboard.
                </li>
                <li className={css(styles.blockli, styles.boldedColor, nightMode && styles.nightBoldedColor)}>
                  Customize and save/load your dashboard configuration across workstations.
                </li>
                <li className={css(styles.blockli)}>We have big plans for the near future (alerts, daily voting, chat).</li>
                <li className={css(styles.blockli)}>Motivate us to continue improving this tool!</li>
              </ul>
            </div>
          </div>

          <FAQBody nightMode={nightMode} />
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
