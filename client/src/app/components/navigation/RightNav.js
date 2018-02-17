// @flow weak

import React                from 'react';
import PropTypes            from 'prop-types';
import { withApollo }       from 'react-apollo';
import { StyleSheet, css }  from 'aphrodite/no-important';
import RightNavButton       from './RightNavButton';
import Select               from 'react-select';
import Switch               from 'react-toggle-switch'
import El                   from '../El';
import FontAwesome          from 'react-fontawesome';
import * as STYLES          from '../../constants/styles';
import * as CURRENCY          from '../../helpers/currency';
import { Link }       from 'react-router-dom';

import {
  AUTH_TOKEN_COOKIE,
  SELECTED_TAB_COOKIE,
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
    padding: '7px 10px',
  },
  logoutButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '7px 10px',
  },
  nightModeButton: {
    border: '1px solid #fff',
    borderRadius: '1px',
    ':before': {
      color: "#fff !important",
    },
  },
  switch: {
    borderColor: '#555',
    backgroundColor:'#fff',
  },
  switchNight: {
    borderColor: '#fff',
  },
  joinButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '7px 10px',
    ':before': {
      content: '"or"',
      position: 'absolute',
      top: '6px',
      left: '-22px',
      fontSize: '13px',
      fontWeight: '500',
    },
  },
  nightBurger: {
    backgroundColor: 'white',
  },
  signOutButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '7px 6px 7px 10px !important',
    whiteSpace: 'nowrap',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: '0.7',
  },
  tooltip: {
    fontWeight: '500',
    opacity: '1 !important',
    borderRadius: '0px',
    backgroundColor: `${STYLES.ROYAL_BLUE} !important`,
    ':after': {
      borderBottomColor: '#304FFE !important',
    },
  },
  select: {
    width: '60px',
    marginLeft: '30px',
  },
  nightSelectStyle: {
    backgroundColor: '#000',
    color: '#fff',
  },
  nightHover: {
    color: '#fff',
    ':hover': {
      color: STYLES.GOLD,
      borderColor: STYLES.GOLD,
    },
  },
  dashbutton: {
    marginLeft: '30px',
    fontSize: '18px',
  },
});

const nightSelectStyles = {
  backgroundColor: '#000',
  color: '#fff',
}

function logOut(event, client)
{
  clearItem(AUTH_TOKEN_COOKIE);
  clearItem(SELECTED_TAB_COOKIE);
  window.location = '/';
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
  currency,
  client,
  changeCurrency,
  rightLinks,
  nightMode,
  toggleNightMode,
  user,
}) => (
  <ul className={css(styles.container)}>
    <Switch
      className={css(styles.switch, nightMode && styles.switchNight)}
      on={nightMode}
      onClick={toggleNightMode}
      title="Toggle on/off night mode"
    />
    <Select
      className={css(styles.select, nightMode && styles.nightSelect) + `${nightMode ? ' nightnav' : ''}`}
      clearable={false}
      options={CURRENCY.currencySelectOptions}
      onChange={changeCurrency}
      searchable={false}
      value={currency}
    />
    <Link to={'/'} className={css()}>
      <El
        nightMode={nightMode}
        nightModeStyle={styles.nightHover}
        style={styles.dashbutton}
        type={'span'}>
        <FontAwesome name={'th'} />
      </El>
    </Link>
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
          key={'portfolio'}
          label={'Portfolio'}
          link={'/portfolio'}
          nightMode={nightMode}
        />,
        // <RightNavButton
        //   key={'alerts'}
        //   label={'Alerts'}
        //   link={'/alerts'}
        //   nightMode={nightMode}
        // />,
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
        <div
          data-tip='LOGIN or JOIN to use portfolio.'
          data-place='bottom'
          data-type='info'
          data-effect='solid'
          data-class={css(styles.tooltip)}
          key={'portfolio'}
        >
          <RightNavButton
            style={styles.disabled}
            key={'portfolio'}
            label={'Portfolio'}
            link={'#'}
            icon='lock'
            absolute={true}
            nightMode={nightMode}
          />
        </div>,
        // <div
        //   data-tip='LOGIN or JOIN to use alerts.'
        //   data-place='bottom'
        //   data-type='info'
        //   data-effect='solid'
        //   data-class={css(styles.tooltip)}
        //   key={'alerts'}
        // >
        //   <RightNavButton
        //     style={styles.disabled}
        //     key={'portfolio'}
        //     label={'Alerts'}
        //     link={'#'}
        //     icon='lock'
        //     absolute={true}
        //     nightMode={nightMode}
        //   />
        // </div>,
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
