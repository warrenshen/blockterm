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
import TokenWidget from '../../components/TokenWidget';
import BarChartWithSelect from '../../components/BarChartWithSelect';

const styles = StyleSheet.create({
  description: {
    paddingTop: '12px',
  },
  section: {
    width: '100%',
    padding: '24px 0px',
    display: 'flex',
    flexDirection: 'column',
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
    changeActiveUserCountPlotRange: PropTypes.func.isRequired,
    changeCommentCountPlotRange: PropTypes.func.isRequired,
    changePostCountPlotRange: PropTypes.func.isRequired,
    // etc:
    activeUserCountPlotRange: PropTypes.string.isRequired,
    commentCountPlotRange: PropTypes.string.isRequired,
    postCountPlotRange: PropTypes.string.isRequired,
  };

  renderTokens(tokens)
  {
    return (
      <div className={css(styles.relatedCoins)}>
        <h4>Related coins</h4>
        {tokens.map((token) => <TokenWidget token={token} />)}
      </div>
    );
  }

  renderSubreddit(subreddit)
  {
    const {
      changeActiveUserCountPlotRange,
      changeCommentCountPlotRange,
      changePostCountPlotRange,
      activeUserCountPlotRange,
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

    var activeUsersX = subreddit.activeUserCounts.map(
      (activeUserCount) => moment(activeUserCount.timestamp).format('MM/DD h:mm')
    );
    var activeUsersY = subreddit.activeUserCounts.map(
      (activeUserCount) => activeUserCount.count
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

    var activeUsersData = {
      labels: activeUsersX,
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: activeUsersY,
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
            <a
              href={`https://reddit.com/r/${subreddit.name}`}
              target='_blank'
            >
              <h2>{subreddit.displayName}</h2>
            </a>
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
            <BarChartWithSelect
              data={postsData}
              selectOptions={RANGE_SELECT_OPTIONS}
              selectValue={postCountPlotRange}
              title={'Number of new posts'}
              onChange={(option) => changePostCountPlotRange(option.value)}
            />
            <BarChartWithSelect
              data={commentsData}
              selectOptions={RANGE_SELECT_OPTIONS}
              selectValue={commentCountPlotRange}
              title={'Number of new comments'}
              onChange={(option) => changeCommentCountPlotRange(option.value)}
            />
            <BarChartWithSelect
              data={activeUsersData}
              selectOptions={RANGE_SELECT_OPTIONS}
              selectValue={activeUserCountPlotRange}
              title={'Number of active users'}
              onChange={(option) => changeActiveUserCountPlotRange(option.value)}
            />
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
