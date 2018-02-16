// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import { isEqual }         from 'underscore';
import { Timeline }        from 'react-twitter-widgets';
import El                  from '../El';
import * as STYLES         from '../../constants/styles';
import moment              from 'moment';
import {
  NEWS_ITEM,
} from '../../constants/items.js';

const RSS_URLS = [
  'https://news.google.com/news/rss/search/section/q/cryptocurrency/cryptocurrency?hl=en&gl=US&ned=us',
  'https://cointelegraph.com/rss',
];

const styles = StyleSheet.create({
  // The combination of flexDirection: 'row' and alignItems: 'stretch'
  // allow us to force the child of the container div to stretch to full width.
  // This is necessary because the Timeline component has an extra div
  // wrapping the twitter iframe, which we want to stretch to match the height
  // of the container div (but don't have an easy way to add flex: 1 to it).
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '5px 5px',
    width: '100%',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowY: 'scroll',
  },
  newsElement: {
    display: 'inline-flex',
    width: '100%',
    flexDirection: 'row',
    borderBottom: '1px solid #555',
    minHeight: '40px',
    position: 'relative',
    ':hover': {
      backgroundColor: '#eef',
    },
  },
  newsElementNight: {
    ':hover': {
      backgroundColor: '#113',
    },
  },
  content: {
    flex: '1',
    flexDirection: 'column',
    display: 'inline',
  },
  contentText: {
    fontSize: '12px',
    display: 'inline',
  },
  row: {
    flex: '1',
  },
  tags: {
    backgroundColor: '#00E676',
    color: '#000',
    borderRadius: '2px',
    display: 'inline',
    marginLeft: '5px',
    padding: '0px 3px',
    textDecoration: 'none',
  },
  link: {
    textDecoration: 'none',
  },
  outlinkLight: {
    color: '#7348BF',
  },
  outlink: {
    color: '#B388FF',
  },
  timestamp: {
    float: 'right',
    display:'block',
    fontSize: '11px',
    opacity: '0.7',
  },
  thumb: {
    width: '40px',
    height: '40px',
    marginRight: '5px',
  },
});

class NewsItem extends PureComponent
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.value, nextProps.value);
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount()
  {
    this.getData();
  }

  getData()
  {
    RSS_URLS.forEach((url) => {
      fetch('https://api.rss2json.com/v1/api.json?rss_url='+url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: [...this.state.data, ...responseJson.items]});
        this.forceUpdate();
      })
      .catch((error) => {
        //console.log(error);
      });
    });

    const redditFeed = 'https://www.reddit.com/r/cryptocurrency.json?limit=10';
    fetch(redditFeed)
    .then((response) => response.json())
    .then((responseJson) => {
      const filtered = responseJson.data.children.slice(2).map(
        (entry, index) => {
          return {
            title: entry.data.title,
            thumbnail: entry.data.thumbnail,
            link: entry.data.url,
            ups: entry.data.ups,
            categories: ['reddit'],
            color: '#FF9100',
            pubDate: moment.unix(entry.data.created).format('YYYY-MM-DD HH:mm:ss'),
          };
        }
      );
      //url, title, ups
      this.setState({data: [...this.state.data, ...filtered]});
      this.forceUpdate();
    })
    .catch((error) => {
      //this.setState({error: true});
    });
  }

  // JSON elements:
  // categories
  // author
  // description
  // link
  // pubDate
  // thumbnail
  renderFeed() {
    const {
      nightMode,
    } = this.props;

    if (this.state.error)
    {
      return (
        <El
          nightMode={nightMode}
          type={'p'}
        >
        Oops, failed to load news..
        </El>
      );
    }
    else if (this.state.data.length > 0)
    {
      const feed = this.state.data;
      return feed
        .sort((a, b) => {
          // console.log(a.pubDate);
          // console.log(b.pubDate);
          return moment(a.pubDate).isBefore(moment(b.pubDate));
        })
        .map((entry, index) =>
          (
            <a key={index} href={entry.link} target="_blank" className={css(styles.link)}>
              <div
                className={css(styles.newsElement, nightMode && styles.newsElementNight)}
              >
                <img src={entry.thumbnail} className={css(styles.thumb)}/>
                <div className={css(styles.content)}>
                  <div className={css(styles.row)}>
                    <El
                      style={styles.contentText}
                      key={index}
                      nightMode={nightMode}
                      type={'p'}
                    >
                      {entry.title}
                    </El>
                    {
                      entry.categories[0] && (
                        <div className={css(styles.tags)} style={{backgroundColor: `${entry.color}`}}>
                          {entry.categories[0].toLowerCase()}
                        </div>
                      )
                    }
                    <El
                      style={styles.outlinkLight}
                      nightModeStyle={styles.outlink}
                      nightMode={nightMode}
                      type={'span'}
                    >
                      &nbsp;[{(entry.link.replace('https://','').replace('www.','').substring(0,25))}...]
                    </El>
                  </div>
                  <div className={css(styles.row)}>
                    <El
                      style={styles.timestamp}
                      nightMode={nightMode}
                      type={'span'}
                    >
                      {/** `${moment(entry.pubDate).fromNow()}` */}
                    </El>
                  </div>
                </div>
              </div>
            </a>
          ));
    }
    else {
      return (
        <El
          nightMode={nightMode}
          type={'p'}
        >
        Loading news...
        </El>
      );
    }
  }

  render()
  {
    const {
      dashboardAction,
      nightMode,
      value,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.feed)}>
          {this.renderFeed()}
        </div>
      </div>
    );
  }
}

export default NewsItem;
