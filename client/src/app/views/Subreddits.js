// @flow weak

import React, {
PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Link }            from 'react-router-dom';
import El                  from '../components/El';
import { Line }            from 'react-chartjs-2';
import {
  generateCountChartData,
} from '../helpers/chart';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: '#ecf0f1',
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  container: {
    width: '85vw',
  },
  header: {
    display: 'flex',
    padding: '24px 24px',
  },
  body: {
    padding: '0px 24px 24px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: '#000',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
  row: {
    width: '100%',
    border: '1px solid #ddd',
  },
  element: {
    padding: '12px',
    border: '1px solid #ddd',
  },
});

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    // etc:
    nightMode: PropTypes.bool.isRequired,
  };

  renderHeader()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <tr className={css(styles.row)}>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            #
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            Name
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            Active users
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            Subscribers
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            Number of posts (24h)
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            Number of comments (24h)
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            nightMode={nightMode}
            type={'span'}
          >
            Comments graph (7d)
          </El>
        </td>
      </tr>
    );
  }

  renderSubreddits(subreddits)
  {
    const {
      nightMode,
    } = this.props;

    const gridLinesConfig = {
      color: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                         'rgba(0, 0, 0, 0.15)',
      zeroLineColor: nightMode ? 'rgba(255, 255, 255, 0.15)' :
                                 'rgba(0, 0, 0, 0.15)',
    };
    const ticksConfig = {
      beginAtZero: true,
      fontColor: nightMode ? 'rgba(255, 255, 255, 0.5)' :
                             'rgba(0, 0, 0, 0.5)',
      padding: 6,
    };

    return (
      <div>
        <div className={css(styles.header)}>
          <El
            nightMode={nightMode}
            type={'h4'}
          >
            Subreddits
          </El>
        </div>
        <div className={css(styles.body, nightMode && styles.bodyNightMode)}>
          <table className={css(styles.table)}>
            <tbody>
              {this.renderHeader()}
              {
                subreddits.map((subreddit, index) => {
                  const {
                    activeUserCount,
                    commentCount,
                    postCount,
                    subscriberCount,
                    commentCounts,
                  } = subreddit;

                  const data = generateCountChartData(commentCounts);

                  return (
                    <tr className={css(styles.row)} key={subreddit.id}>
                      <td className={css(styles.element)}>
                        <El
                          nightMode={nightMode}
                          type={'span'}
                        >
                          {index + 1}
                        </El>
                      </td>
                      <td className={css(styles.element)}>
                        <Link to={`/subreddit/${subreddit.id}`}>
                          <El
                            nightMode={nightMode}
                            type={'h5'}
                          >
                            {subreddit.displayName}
                          </El>
                        </Link>
                      </td>
                      <td className={css(styles.element)}>
                        <El
                          nightMode={nightMode}
                          type={'span'}
                        >
                          {activeUserCount}
                        </El>
                      </td>
                      <td className={css(styles.element)}>
                        <El
                          nightMode={nightMode}
                          type={'span'}
                        >
                          {subscriberCount}
                        </El>
                      </td>
                      <td className={css(styles.element)}>
                        <El
                          nightMode={nightMode}
                          type={'span'}
                        >
                          {postCount}
                        </El>
                      </td>
                      <td className={css(styles.element)}>
                        <El
                          nightMode={nightMode}
                          type={'span'}
                        >
                          {commentCount}
                        </El>
                      </td>
                      <td className={css(styles.element)}>
                        <Line
                          height={48}
                          data={data}
                          responsive={false}
                          redraw={true}
                          options={{
                            legend: { display: false },
                            maintainAspectRatio: false,
                            tooltips: { enabled: false },
                            scales: {
                              xAxes: [
                                {
                                  display: false,
                                },
                              ],
                              yAxes: [
                                {
                                  display: false,
                                },
                              ],
                            },
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    const {
      data,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.wrapper, nightMode && styles.nightMode)}>
        <div className={css(styles.container)}>
          {
            data.allSubreddits &&
            this.renderSubreddits(data.allSubreddits)
          }
        </div>
      </div>
    );
  }
}

export default Home;
