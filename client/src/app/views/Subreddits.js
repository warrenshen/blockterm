// @flow weak

import React, {
PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Link }            from 'react-router-dom';
import El                  from '../components/El';
import Sidebar             from '../components/Sidebar';
import { Line }            from 'react-chartjs-2';
import {
  generateLineChartData,
} from '../helpers/chart';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  wrapper: {
    width: '100vw',
    display: 'flex',
    flex: '1',
    backgroundColor: STYLES.LIGHTBACKGROUNDGRAY,
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  mainContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebar: {
    width: '20vw',
    minWidth: '20vw',
    backgroundColor: STYLES.SOFTGRAY,
  },
  header: {
    display: 'flex',
    padding: '8px 10px',
  },
  body: {
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
    padding: '0px 12px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  bodyNightMode: {
    backgroundColor: '#000',
    borderTop: `1px solid ${STYLES.BORDERDARK}`,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
    //backgroundColor: STYLES.SOFTGRAY,
  },
  row: {
    width: '100%',
  },
  element: {
    padding: '12px',
    borderBottom: `1px solid #ccc`,
  },
  graphElement: {
    width: '450px',
  },
  bolded: {
    fontWeight: '700',
  },
  commentsTitle: {
    fontWeight: '700',
    flex:'1',
    marginTop:'6px',
  },
  flatButton: {
    marginRight: '-12px',
    border: '1px solid #000',
    borderRadius: '1px',
    padding: '4px 12px',
  },
  nightModeButton: {
    borderColor: '#fff',
    color: '#fff !important',
  },
  boldedUpper: {
    color: '#000 !important',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '13px',
    fontWeight: '700',
    ':hover': {
      color: STYLES.GOLDINVERSEBLUE,
      borderColor: STYLES.GOLDINVERSEBLUE,
    },
  },
  nightBoldedUpper: {
    color: '#fff',
    ':hover': {
      color: STYLES.GOLD,
      borderColor: STYLES.GOLD,
    },
  },
  link: {
    textDecoration: 'underline',
    fontSize: '15px',
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
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            #
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Name
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Active users
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Subscribers
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Posts (24h)
          </El>
        </td>
        <td className={css(styles.element)}>
          <El
            style={styles.bolded}
            nightMode={nightMode}
            type={'span'}
          >
            Comments (24h)
          </El>
        </td>
        <td className={css(styles.element)} style={{'display':'flex', 'borderBottom':'none'}}>
          <El
            style={styles.commentsTitle}
            nightMode={nightMode}
            type={'span'}
          >
            Comments graph (14d)
          </El>
          <Link to={'/subreddits/compare'} className={css(styles.flatButton, nightMode && styles.nightModeButton)}>
            <El
              nightMode={nightMode}
              style={styles.boldedUpper}
              nightModeStyle={styles.nightBoldedUpper}
              type={'span'}>
              Compare Subreddits
            </El>
          </Link>
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
      <div className={css(styles.mainContent)}>
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

                  const data = generateLineChartData(commentCounts, undefined, 'today', 'MM/DD', nightMode);

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
                        <Link to={`/subreddit/${subreddit.name}`}>
                          <El
                            style={styles.link}
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
                      <td className={css(styles.graphElement)}>
                        <Line
                          height={68}
                          responsive={true}
                          data={data}
                          redraw={true}
                          options={{
                            tooltips: {
                              xAlign: 'right',
                              yAlign:'no-transform',
                              xPadding: 11,
                            },
                            maintainAspectRatio : false,
                            legend: { display: false },
                            scales: {
                              xAxes: [{
                                ticks: {
                                  display: false,
                                }
                              }],
                              yAxes: [
                                {
                                  display: true,
                                  gridLines: {
                                    zeroLineColor: '#aa9000',
                                    color: '#bbb',
                                  }
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
        {
          data.allSubreddits &&
          this.renderSubreddits(data.allSubreddits)
        }
      </div>
    );
  }
}

export default Home;
