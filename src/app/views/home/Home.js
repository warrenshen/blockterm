// @flow weak

import React, {
  PureComponent,
}                     from 'react';
import PropTypes      from 'prop-types';
import Jumbotron      from '../../components/jumbotron/Jumbotron';
import cx             from 'classnames';
import { Link }       from 'react-router-dom';

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
  };

  renderSubreddits(subreddits)
  {
    var ret = subreddits.map((subreddit) => {
      return <div key={subreddit.id}><h2>{subreddit.name}</h2></div>;
    });
    return ret;
  }

  render() {
    const {
      data
    } = this.props;

    return(
      <div
        key="homeView"
        className={ cx({ 'view-enter': true }) }>
        {
          data.allSubreddits &&
          this.renderSubreddits(data.allSubreddits)
        }
      </div>
    );
  }
}

export default Home;
