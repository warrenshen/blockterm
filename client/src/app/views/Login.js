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
    //left: '-24px',
    borderTop: '1px solid rgba(0,0,0,0.15)',
    padding: '0px 20px 0px',
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
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  joinPanel: {
    backgroundColor: '#fff',
    marginTop: '20px',
    padding: '10px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
  },
  panelsNight: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
    borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  bolded: {
    fontWeight:'700',
    display: 'block',
  },
  inputField: {
    fontWeight:'700',
    display: 'block',
    marginBottom: '8px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    width: '100%',
  },
  fieldNight: {
    border: '1px solid #fff',
  },
  halfPanel: {
    width:'60%',
    display: 'inline-block',
    padding: '10px 15px',
  },
  rightHalf: {
    width:'40%',
    borderLeft: '1px solid #555',
    position: 'absolute',
    top: '0px',
    height: '100%',
  },
  bottomHeavy: {
    marginBottom: '12px',
  },
  squareList: {
    listStyleType: 'square',
    display: 'block',
  },
  blockli: {
    display: 'block',
  },
  submitButton: {
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  }
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
              <El style={styles.bolded, styles.bottomHeavy}
                  nightMode={nightMode}
                  type={'h4'}>
                  Login to your Account:
              </El>
              <input
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
              <input
                className={css(styles.bolded, styles.submitButton)}
                onClick={(event) => this.submit(event)}
                type='submit'
              />
            </div>
            <div className={css(styles.halfPanel, styles.rightHalf)}>
              <El style={styles.bolded, styles.bottomHeavy}
                  nightMode={nightMode}
                  type={'h4'}>
                  Latest Updates:
              </El>
              <ul className={css(styles.squareList, nightMode && styles.nightModeText)}>
                <li className={css(styles.blockli)}>In-depth chart widget added </li>
                <li className={css(styles.blockli)}>Accounts and dashboard arrangement/state saving</li>
                <li className={css(styles.blockli)}>Subreddit tracking data added by sub </li>
                <li className={css(styles.blockli)}>Launch of Blockterm!</li>
              </ul>
            </div>
          </div>
          <div className={css(styles.joinPanel, nightMode && styles.panelsNight)}>
            <El style={styles.bolded}
                nightMode={nightMode}
                type={'h4'}>
                Join the Army of HODLers:
            </El>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
