// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { withRouter } from 'react-router-dom'

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
      createUser,
      email,
      password,
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
    } = this.props;

    return (
      <div>
        <input
          onChange={(event) => changeEmail(event.target.value)}
          value={email}
        />
        <input
          onChange={(event) => changePassword(event.target.value)}
          type='password'
          value={password}
        />
        <input
          onClick={(event) => this.submit(event)}
          type='submit'
        />
      </div>
    );
  }
}

export default withRouter(Login);
