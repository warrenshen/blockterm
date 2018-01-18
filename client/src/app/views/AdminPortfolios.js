// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import PortfolioItem       from '../components/items/PortfolioItem';
import El                  from '../components/El';
import { Link }       from 'react-router-dom';
import * as STYLES         from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: '1',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  flexElement: {
    flex:'1',
  },
  grid: {
    fex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  darkGrid: {
    backgroundColor: '#000',
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '33.3%',
    height: '512px',
    overflowY: 'scroll',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  elementHeader: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '100%',
    border: '1px solid #000',
    color: '#000',
    borderRadius: '1px',
    padding: '4px 12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '1px solid #111',
    borderRadius: '1px',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '1px',
    backgroundColor: '#fff',
  },
  nightModeButton: {
    color: '#fff',
    border: '1px solid #fff',
    backgroundColor: '#000',
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
    const {
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.grid, nightMode && styles.darkGrid)}>
        {users.map((user) => this.renderUser(user))}
      </div>
    );
  }

  render()
  {
    const {
      data,
      nightMode,
      match,
    } = this.props;
    const page = match.params.page ? parseInt(match.params.page) : 1;

    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.row)} style={{'marginTop':'10px',}}>
          <Link to={`${page-1}`} className={css(styles.flexElement)}>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.button}
              nightModeStyle={styles.nightModeButton}
            >
              Previous
            </El>
          </Link>
          <Link to={`${page+1}`} className={css(styles.flexElement)}>
            <El
              nightMode={nightMode}
              type={'span'}
              style={styles.button}
              nightModeStyle={styles.nightModeButton}
            >
              Next
            </El>
          </Link>
        </div>
        {
          data.usersByPage &&
          this.renderUsers(data.usersByPage)
        }
      </div>
    );
  }
}

export default AdminPortolios;
