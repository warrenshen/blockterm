// @flow weak

import React                from 'react';
import PropTypes            from 'prop-types';
import { withApollo }       from 'react-apollo';
import { StyleSheet, css }  from 'aphrodite';
import RightNavButton       from './RightNavButton';
import Switch               from 'react-toggle-switch'
import El                   from '../El';
import FontAwesome          from 'react-fontawesome';

import {
  AUTH_TOKEN_COOKIE,
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
  },
  logoutButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '4px 12px',
  },
  nightModeButton: {
    border: '1px solid #fff',
    borderRadius: '1px',
    //padding: '4px 12px',
    ':before': {
      color: "#fff !important",
    },
  },
  switch: {
    ':before': {
      content: 'NIGHT',
      position: 'absolute',
      left: '-57px',
      top: '3px',
      letterSpacing: '2px',
      fontWeight: '700',
      fontSize: '13px',
    },
    borderColor: '#555',
  },
  switchNight: {
    borderColor: '#fff',
  },
  joinButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '4px 12px',
    ':before': {
      content: '"or"',
      position: 'absolute',
      left: '-19px',
      fontWeight: '700',
    },
  },
  nightBurger: {
    backgroundColor: 'white',
  },
  signOutButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '4px 8px 4px 13px !important',
  }
});

function logOut(event, client)
{
  clearItem(AUTH_TOKEN_COOKIE);
  client.resetStore();
  window.location.reload();
}

function truncateEmail(email)
{
  const TARGET_LENGTH = 6;
  var re =/.+(?=@.+)/;
  var result = re.exec(email);
  if(!result) {
    return email.length > TARGET_LENGTH ? email.substring(0, TARGET_LENGTH) + "**": email.substring(0, TARGET_LENGTH);
  } else {
    return result[0].substring(0, TARGET_LENGTH) + "**"; //truncate email
  }
}

//<FontAwesome name='lightbulb-o' size='2x' style={{'position':'absolute', 'left':'-16px', 'top':'3px', 'fontSize':'20px',}}/>
const RightNav = ({
  client,
  rightLinks,
  nightMode,
  toggleNightMode,
  // sidebarActive,
  // toggleSidebar,
  user,
}) => (
  <ul className={css(styles.container)}>
    <Switch
      className={css(styles.switch, nightMode && styles.switchNight)}
      on={nightMode}
      onClick={toggleNightMode}
      title="Toggle on/off night mode"
    />
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
      [
        <RightNavButton
          key={'faq'}
          label={'FAQ'}
          link={'/faq'}
          nightMode={nightMode}
        />,
        <RightNavButton
          key={'sign-out'}
          action={(event) => logOut(event, client)}
          label={`${truncateEmail(user.email)} | `}
          icon='sign-out'
          nightMode={nightMode}
          nightModeStyle={styles.nightModeButton}
          style={styles.signOutButton}
        />
      ] :
      [
        <RightNavButton
          key={'login'}
          label={'Login'}
          link={'/login'}
          nightMode={nightMode}
          nightModeStyle={styles.nightModeButton}
          style={styles.loginButton}
        />,
        <RightNavButton
          key={'join'}
          label={'Join/FAQ'}
          link={'/join'}
          nightMode={nightMode}
          nightModeStyle={styles.nightModeButton}
          style={styles.joinButton}
        />,
      ]
    }
    {
    // <button
    //   className={`hamburger hamburger--arrow ${sidebarActive ? 'is-active' : ''}  ${nightMode ? css(styles.nightBurger) : ''}`}
    //   type="button"
    //   aria-label="Menu"
    //   aria-controls="navigation"
    //   onClick={(event) => toggleSidebar()}
    // >
    //   <span className="hamburger-box">
    //     <span className="hamburger-inner"></span>
    //   </span>
    // </button>
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
  // toggleSidebar: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default withApollo(RightNav);
