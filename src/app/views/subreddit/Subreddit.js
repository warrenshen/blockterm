// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import Plot                from 'react-plotly.js'
import Select from 'react-select';
import { RANGE_SELECT_OPTIONS } from '../../constants/plots';

const styles = StyleSheet.create({
  plotHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subredditHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  container: {
    gridColumn: '3 / 7',
  },
  wrapper: {
    width: '100vw',
    height: '100%',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
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
    // actions:
    changePostCountPlotRange: PropTypes.func.isRequired,
    // etc:
    postCountPlotRange: PropTypes.string.isRequired,
  };

  renderSubreddit(subreddit)
  {
    const {
      changePostCountPlotRange,
      postCountPlotRange,
    } = this.props;
    var postsX = subreddit.postCounts.map(
      (postCount) => postCount.when.substring(0, 20)
    );
    var postsY = subreddit.postCounts.map(
      (postCount) => postCount.count
    );

    var config = {
      modeBarButtonsToRemove: [
        'autoScale2d',
        'hoverClosestCartesian',
        'hoverCompareCartesian',
        'pan',
        'pan2d',
        'resetScale2d',
        'sendDataToCloud',
        'toggleSpikelines',
        'zoom2d',
        'zoomIn2d',
        'zoomOut2d',
      ],
      displaylogo: false,
    };
    return (
      <div>
        <div className={css(styles.subredditHeader)}>
          <h2>{subreddit.displayName}</h2>
          <h4>{}</h4>
        </div>
        <div className={css(styles.card)}>
          <div className={css(styles.plotSection)}>
            <div className={css(styles.plotHeader)}>
              <span># posts over time</span>
              <Select
                clearable={false}
                value={postCountPlotRange}
                options={RANGE_SELECT_OPTIONS}
                onChange={(option) => changePostCountPlotRange(option.value)}
              />
            </div>
            <Plot
              config={config}
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
                width: '100%',
                height: '100%',
                title: 'A Fancy Plot'
              }}
            />
          </div>
        </div>
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
