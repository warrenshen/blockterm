// @flow weak

import React                from 'react';
import PropTypes            from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import RightNavButton       from './RightNavButton';
import Switch from 'react-toggle-switch'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    border: '1px solid #aaa',
    borderRadius: '1px',
    padding: '4px 12px',
  }
});

const RightNav = ({
  rightLinks,
  nightMode,
  toggleNightMode,
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
    <RightNavButton
      style={styles.loginButton}
      link={''}
      label={'Login/Join'}
      nightMode={nightMode}
    />
  </ul>
);

RightNav.propTypes = {
  rightLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link:     PropTypes.string,
      label:    PropTypes.string,
      viewName: PropTypes.string
    })
  ),
  toggleNightMode: PropTypes.func.isRequired,
};

export default RightNav;
