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
      password,

      changeError,
      createNotificationSuccess,
      // logIn,
    } = this.props;

    // logIn(email, password)
    //   .then((response) => {
    //     setItem(AUTH_TOKEN_COOKIE, response.data.logIn.authToken);
    //     window.location = '/';
    //   })
    //   .catch((error) => changeError(error.graphQLErrors[0].message));
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
        <div className={css(styles.mainContent)}>
        </div>
      </div>
    );
  }
}

export default withRouter(Reset);
