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
  getItem,
  setItem,
}                          from '../services/cookie';
import * as STYLES         from '../constants/styles';
import El                  from '../components/El';

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
});

class Reset extends PureComponent
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
      createNotificationError,
      createNotificationSuccess,
      resetPassword,
    } = this.props;

    resetPassword(password)
      .then((response) => {
        setItem(AUTH_TOKEN_COOKIE, response.data.resetPassword.authToken);
        createNotificationSuccess({ position: 'bc', title: 'Password reset.' });
        setTimeout(() => window.location = '/', 1500);
      })
      .catch((error) => {
        createNotificationError({ position: 'bc', title: 'Something went wrong.' });
        setTimeout(() => window.location = '/', 1500);
      });
  }

  render()
  {
    const {
      nightMode,
      password,

      changePassword,
    } = this.props;

    const isSubmitDisabled = !password;
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
        <form>
          <input
            autoFocus={true}
            className={css(styles.inputField, nightMode && styles.fieldNight)}
            placeholder='password'
            required='required'
            type='password'
            value={password}
            onChange={(event) => changePassword(event.target.value)}
            onKeyPress={onKeyPress}
          />
          <div className={css(styles.section)}>
            <button
              className={css(styles.bolded, styles.submitButton)}
              disabled={isSubmitDisabled}
              type='submit'
              onClick={onClickSubmit}
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Reset);
