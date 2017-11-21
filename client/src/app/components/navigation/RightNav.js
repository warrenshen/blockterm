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
          viewName={aLinkBtn.view}
        />
      ))
    }
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
