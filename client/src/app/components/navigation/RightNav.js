// @flow weak

import React                from 'react';
import PropTypes            from 'prop-types';
import { withApollo }       from 'react-apollo';
import { StyleSheet, css }  from 'aphrodite';
import RightNavButton       from './RightNavButton';
import Switch from 'react-toggle-switch'

import {
  AUTH_TOKEN,
  clearItem,
} from '../../services/cookie';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '4px 12px',
  }
});

function logOut(event, client)
{
  clearItem(AUTH_TOKEN);
  client.resetStore()
}

const RightNav = ({
  client,
  rightLinks,
  nightMode,
  toggleNightMode,
  user,
}) => (
  <ul className={css(styles.container)}>
    <Switch on={nightMode} onClick={toggleNightMode} />
    {
      rightLinks.map((aLinkBtn, index) => (
        <RightNavButton
          key={index}
          link={aLinkBtn.link}
          label={aLinkBtn.label}
          nightMode={nightMode}
        />
      ))
    }
    {
      user ?
      (
        <RightNavButton
          action={(event) => logOut(event, client)}
          label={'Logout'}
          nightMode={nightMode}
          style={styles.loginButton}
        />
      ) :
      (
        <RightNavButton
          label={'Login/Join'}
          link={'/login'}
          nightMode={nightMode}
          style={styles.loginButton}
        />
      )
    }
  </ul>
);

RightNav.propTypes = {
  client: PropTypes.object.isRequired,
  rightLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link:     PropTypes.string,
      label:    PropTypes.string,
      viewName: PropTypes.string
    })
  ),
  toggleNightMode: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default withApollo(RightNav);
