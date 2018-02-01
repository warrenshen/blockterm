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
    display: 'flex',
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
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
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

      changeError,
      forgotPassword,
    } = this.props;

    forgotPassword(email)
      .catch((error) => changeError(error.graphQLErrors[0].message));
  }

  render()
  {
    const {
      email,
      error,
      nightMode,
      success,

      changeEmail,
    } = this.props;

    const isSubmitDisabled = !email;
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
        {
          success ? (
            <El
              nightMode={nightMode}
              type={'span'}
            >
              Please check your inbox for an email with a link to reset your password.
            </El>
          ) : (
            <form>
              <input
                autoFocus={true}
                className={css(styles.inputField, nightMode && styles.fieldNight)}
                placeholder='email'
                required='required'
                value={email}
                onChange={(event) => changeEmail(event.target.value)}
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
          )
        }
      </div>
    );
  }
}

export default withRouter(Reset);
