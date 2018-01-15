// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import PortfolioItem       from '../components/items/PortfolioItem';
import El                  from '../components/El';
import * as STYLES         from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: '1',
    display: 'flex',
    width: '100%',
  },
  nightMode: {

  },
  grid: {
    flex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '33%',
    height: '512px',
    overflowY: 'scroll',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  elementHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
});

class AdminPortolios extends PureComponent
{
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // actions:
    // etc:
    nightMode: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.data.error)
    {
      nextProps.history.push('/');
    }
  }

  renderTokenUsers(tokenUsers)
  {
    const {
      nightMode,
    } = this.props;

    return (
      <PortfolioItem
        dashboardData={{tokenUsers: tokenUsers}}
        nightMode={nightMode}
      />
    );
  }

  renderUser(user)
  {
    const {
      nightMode,
    } = this.props;

    const {
      id,
      email,
    } = user;

    return (
      <div
        className={css(styles.element)}
        key={id}
      >
        <div className={css(styles.elementHeader)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {`ID: ${id}`}
          </El>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            {`Email: ${email.substring(0, 4)}**`}
          </El>
        </div>
        {this.renderTokenUsers(user.tokenUsers)}
      </div>
    );
  }

  renderUsers(users)
  {
    return (
      <div className={css(styles.grid)}>
        {users.map((user) => this.renderUser(user))}
      </div>
    );
  }

  render()
  {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        {
          data.usersByPage &&
          this.renderUsers(data.usersByPage)
        }
      </div>
    );
  }
}

export default AdminPortolios;
