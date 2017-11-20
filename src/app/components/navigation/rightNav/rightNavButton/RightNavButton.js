// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Link }       from 'react-router-dom';

class RightNavButton extends PureComponent {
  static propTypes = {
    link:     PropTypes.string,
    label:    PropTypes.string,
    viewName: PropTypes.string,
  };

  render() {
    const {
      link,
      label
    } = this.props;

    return (
      <li>
        <Link to={link}>
          {label}
        </Link>
      </li>
    );
  }
}

export default RightNavButton;
