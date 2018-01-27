// GTChartItem.js
// <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1280_RC06/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"substratum","geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=substratum&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  frameNightMode: {
    filter: 'invert(100%) brightness(2)',
  },
});

class GTChartItem extends PureComponent
{
  componentDidMount()
  {
    this.update();
  }

  componentDidMount()
  {
    this.update();
  }

  update() {
    const {
      value,
    } = this.props;

    const iframeDocument = this.instance.contentWindow.document;
    while (iframeDocument.body.firstChild) iframeDocument.body.removeChild(iframeDocument.body.firstChild);

    const s = iframeDocument.createElement('script');
    s.async = true;
    s.type = 'text/javascript';
    s.src = 'https://ssl.gstatic.com/trends_nrtr/1280_RC06/embed_loader.js';
    s.onload = () => this.instance.contentWindow.window.trends.embed.renderExploreWidget(
      "TIMESERIES",
      {
        "comparisonItem": [
          {
            "keyword": value,
            "geo": "",
            // 12-m, 3-m, 1-m, 7-d, 1-d
            "time": "today 3-m",
          },
        ],
        "category": 0,
        "property": "",
      },
      // {
      //   "exploreQuery": `q=${value}&date=today 12-m`,
      //   "guestPath": "https://trends.google.com:443/trends/embed/",
      // },
    );

    iframeDocument.body.appendChild(s);
  }

  render()
  {
    const {
      dashboardAction,
      nightMode,
    } = this.props;

    return (
      <div className={css(styles.container, dashboardAction && styles.noPointerEvents)}>
        <iframe
          className={css(styles.frame, nightMode && styles.frameNightMode)}
          ref={(el) => this.instance = el}
        />
      </div>
    );
  }
}

export default GTChartItem;
