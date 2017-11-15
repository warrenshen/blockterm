// @flow weak

import React                from 'react';
import PropTypes            from 'prop-types';
import RightNavButton       from './rightNavButton/RightNavButton';
import Switch from 'react-toggle-switch'

const RightNav = ({
  rightLinks,
  onRightNavButtonClick,
  handleNightModeClick
}) => (
  <ul className="nav navbar-nav navbar-right">
    {
      rightLinks
        .map(
          (aLinkBtn, index) => {
            return (
                <RightNavButton
                  key={index}
                  link={aLinkBtn.link}
                  label={aLinkBtn.label}
                  viewName={aLinkBtn.view}
                  onClick={onRightNavButtonClick}
                />
              );
          }
        )
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
  onRightNavButtonClick: PropTypes.func,
};

export default RightNav;
