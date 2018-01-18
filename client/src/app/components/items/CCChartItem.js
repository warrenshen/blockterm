// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from '../El';

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
    margin: '0px 0px',
    border: 'none',
  },
  nightFrame: {
    backgroundColor: '#000',
  },
});

class CCChartItem extends PureComponent
{
  componentDidMount()
  {
    this.update();
  }

  componentDidUpdate(prevProps)
  {
    if (prevProps.nightMode !== this.props.nightMode)
    {
      this.update();
    }
  }

  update()
  {
    const {
      nightMode,
    } = this.props;

    const iframeDocument = this.instance.contentWindow.document;
    while (iframeDocument.body.firstChild) iframeDocument.body.removeChild(iframeDocument.body.firstChild);

    const script = iframeDocument.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      var cccTheme = {
        "General": {
          "background": "${nightMode ? "#000" : "#fff"}",
          "borderWidth": "0px",
          "textColor": "${nightMode ? "#fff" : "#000"}"
        }
      };
    `;
    this.instance.contentWindow.document.body.appendChild(script);

    const s = iframeDocument.createElement('script');
    s.async = true;
    s.type = 'text/javascript';
    s.src = 'https://widgets.cryptocompare.com/serve/v3/coin/chart?fsym=BTC&tsyms=USD,EUR,CNY,GBP&theme=1';

    this.instance.contentWindow.document.body.appendChild(s);
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
          scrolling="no"
          className={css(styles.frame, nightMode && styles.nightFrame)}
          ref={(el) => this.instance = el}
        />
      </div>
    );
  }
}

export default CCChartItem;
