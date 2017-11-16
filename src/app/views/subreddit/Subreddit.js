// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import Plot                from 'react-plotly.js'

const styles = StyleSheet.create({
  container: {
    gridColumn: '3 / 7',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  fadeIn: {
    animation: 'fadeIn 0.5s both ease-in',
    zIndex: 9999,
  },
});

class Subreddit extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
  };

  renderSubreddit(subreddit)
  {
    var postsX = subreddit.postCounts.map(
      (postCount) => postCount.when.substring(0, 20)
    );
    var postsY = subreddit.postCounts.map(
      (postCount) => postCount.count
    );
    return (
      <div>
        <div>
          <h2>{subreddit.name}</h2>
          <h4>{}</h4>
        </div>
        <h3># posts over time</h3>
        <Plot
          data={[
            {
              type: 'scatter',
              mode: 'lines+points',
              x: postsX,
              y: postsY,
              marker: {color: 'blue'}
            },
          ]}
          layout={{
            width: 720,
            height: 480,
            title: 'A Fancy Plot'
          }}
        />
      </div>
    );
  }

  render() {
    const {
      data
    } = this.props;

    return (
      <div className={css(styles.wrapper, styles.fadeIn)}>
        <div className={css(styles.container)}>
          { data && data.subredditById && this.renderSubreddit(data.subredditById) }
        </div>
      </div>
    );
  }
}

export default Subreddit;
