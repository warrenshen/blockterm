// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import Select from 'react-select';
import { RANGE_SELECT_OPTIONS } from '../../constants/plots';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const styles = StyleSheet.create({
  temp: {
    width: '100%',
  },
  description: {
    paddingTop: '12px',
  },
  section: {
    width: '100%',
    padding: '24px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  plotSection: {
    width: '100%',
    padding: '24px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  plotHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subredditHeader: {
    display: 'flex',
    padding: '24px 0px',
  },
  subredditHeaderLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  subredditHeaderRight: {
    width: '256px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  card: {
    left: '-24px',
    width: '100%',
    padding: '0px 24px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    width: '128px',
  },
  container: {
    gridColumn: '3 / 7',
  },
  wrapper: {
    width: '100vw',
    padding: '0% 15%',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  fadeIn: {
    animation: 'fadeIn 0.5s both ease-in',
    zIndex: 9999,
  },
  relatedCoins: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Subreddit extends PureComponent {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // actions:
    changeCommentCountPlotRange: PropTypes.func.isRequired,
    changePostCountPlotRange: PropTypes.func.isRequired,
    // etc:
    commentCountPlotRange: PropTypes.string.isRequired,
    postCountPlotRange: PropTypes.string.isRequired,
  };

  renderTokens(tokens)
  {
    return (
      <div className={css(styles.relatedCoins)}>
        <h4>Related coins</h4>
        {
          tokens.map(
            (token) => {
              return (
                <div key={token.id}>
                  <span>{token.shortName}</span>
                  <span>{token.longName}</span>
                </div>
              );
            }
          )
        }
      </div>
    );
  }

  renderSubreddit(subreddit)
  {
    const {
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      commentCountPlotRange,
      postCountPlotRange,
    } = this.props;

    var postsX = subreddit.postCounts.map(
      (postCount) => moment(postCount.timestamp).format('MM/DD')
    );
    var postsY = subreddit.postCounts.map(
      (postCount) => postCount.count
    );

    var commentsX = subreddit.commentCounts.map(
      (commentCount) => moment(commentCount.timestamp).format('MM/DD')
    );
    var commentsY = subreddit.commentCounts.map(
      (commentCount) => commentCount.count
    );

    var postsData = {
      labels: postsX,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: postsY,
        }
      ]
    };

    var commentsData = {
      labels: commentsX,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: commentsY,
        }
      ]
    };

    console.log(subreddit);
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
    var blob = JSON.parse(subreddit.blob);
    return (
      <div>
        <div className={css(styles.subredditHeader)}>
          <div className={css(styles.subredditHeaderLeft)}>
            <h2>{subreddit.displayName}</h2>
            <p className={css(styles.description)}>{subreddit.description}</p>
            {this.renderTokens(subreddit.tokens)}
          </div>
          <div className={css(styles.subredditHeaderRight)}>
            <p>128 active users</p>
          </div>
        </div>
        <div className={css(styles.card)}>
          <div className={css(styles.section)}>
            <h3>Recent activity</h3>
            <span>{`${blob.post_count_24h} new posts`}</span>
            <span>{`${blob.comment_count_24h} new comments`}</span>
          </div>
          <div>
            <h2>Historical activity</h2>
            <div className={css(styles.plotSection)}>
              <div className={css(styles.plotHeader)}>
                <h4>Number of posts per day</h4>
                <div className={css(styles.select)}>
                  <Select
                    clearable={false}
                    searchable={false}
                    value={postCountPlotRange}
                    options={RANGE_SELECT_OPTIONS}
                    onChange={(option) => changePostCountPlotRange(option.value)}
                  />
                </div>
              </div>
              <div className={css(styles.temp)}>
                <Bar
                  height={312}
                  data={postsData}
                  responsive={true}
                  options={{
                    legend: { display: false },
                    maintainAspectRatio: false,
                    tooltips: { displayColors: false, intersect: false, mode: 'x' },
                    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                  }}
                />
              </div>
            </div>
            <div className={css(styles.plotSection)}>
              <div className={css(styles.plotHeader)}>
                <span>Number of comments per day</span>
                <Select
                  clearable={false}
                  searchable={false}
                  value={commentCountPlotRange}
                  options={RANGE_SELECT_OPTIONS}
                  onChange={(option) => changeCommentCountPlotRange(option.value)}
                />
              </div>
              <div className={css(styles.temp)}>
                <Bar
                  height={312}
                  data={commentsData}
                  responsive={true}
                  options={{
                    legend: { display: false },
                    maintainAspectRatio: false,
                    tooltips: { displayColors: false, intersect: false, mode: 'x' },
                    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      data,
      postCountPlotRange,
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
