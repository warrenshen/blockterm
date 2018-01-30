// @flow weak

import React, {
  Component,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import Select              from 'react-select';
import {
  GT_SELECT_OPTIONS,
}                          from '../../constants/plots';
import El                  from '../El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0px 8px',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  header: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '4px 0px',
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  frameNightMode: {
    filter: 'invert(100%) brightness(2)',
  },
  select: {
    width: '128px',
    zIndex: '1',
    color:'#777 !important',
  },
});

class GTChartItem extends Component
{
  shouldComponentUpdate(nextProps, nextState)
  {
    return !isEqual(this.props.dashboardAction, nextProps.dashboardAction) ||
           !isEqual(this.props.dashboardData, nextProps.dashboardData) ||
           !isEqual(this.props.dashboardState, nextProps.dashboardState) ||
           !isEqual(this.props.identifier, nextProps.identifier) ||
           !isEqual(this.props.nightMode, nextProps.nightMode) ||
           !isEqual(this.props.value, nextProps.value);
  }

  componentDidMount()
  {
    this.update();
  }

  componentDidUpdate(prevProps)
  {
    if (
      !isEqual(prevProps.dashboardState, this.props.dashboardState) ||
      !isEqual(prevProps.value, this.props.value)
    )
    {
      this.update();
    }
  }

  update() {
    const {
      dashboardState,
      value,
    } = this.props;

    const {
      plotRange,
    } = dashboardState;

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
            // today 5-y, today 12-m, today 3-m, today 1-m, now 7-d, now 1-d
            "time": plotRange,
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
      dashboardState,
      identifier,
      nightMode,

      changeDashboardItemState,
    } = this.props;

    const {
      plotRange,
    } = dashboardState;

    const onChange = (option) =>
      changeDashboardItemState(identifier, 'plotRange', option.value);

    return (
      <div className={css(styles.container, dashboardAction && styles.noPointerEvents)}>
        <div className={css(styles.header)}>
          <El nightMode={nightMode} type={'h4'}>
            {'Google trends'}
          </El>
          <div className={css(styles.select)}>
            <Select
              clearable={false}
              searchable={false}
              options={GT_SELECT_OPTIONS}
              onChange={onChange}
              value={plotRange}
            />
          </div>
        </div>
        <iframe
          className={css(styles.frame, nightMode && styles.frameNightMode)}
          ref={(el) => this.instance = el}
        />
      </div>
    );
  }
}

export default GTChartItem;
