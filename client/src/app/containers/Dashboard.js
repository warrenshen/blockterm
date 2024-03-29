// @flow weak

import React, {
  PureComponent,
}                                 from 'react';
import { StyleSheet, css }        from 'aphrodite';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import { graphql }                from 'react-apollo';
import { isEqual }                from 'underscore';
import {
  HAS_ADDED_WIDGET_COOKIE,
  setItem,
}                                 from '../services/cookie';
import {
  buildDynamicDashboardQuery,
}                                 from '../queries';
import {
  ALERTS_ITEM,
  GT_CHART_ITEM,
  NEWS_ITEM,
  PERCENT_DOMINANCE_ITEM,
  PORTFOLIO_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  TWITTER_ITEM,
  computeDashboardFreeValues,
  parseIdentiferKey,
  parseItemIdentifierValue,
}                                 from '../constants/items';
import {
  WORKER_MESSAGE_TYPE_TICKERS,
  WORKER_REPLY_TYPE_TICKER,
}                                 from '../constants/workers';
import {
  Dashboard,
  Wrapped as WrappedComponent,
}                                 from '../views';
// import Worker                     from '../workers/index.worker';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  hidden: {
    display: 'none',
  },
});

function wrapDynamicGraphQL(ComponentToWrap)
{
  class DynamicDashboardQueryHOC extends PureComponent
  {
    constructor(props)
    {
      super(props);
      this.state = { wrapped: null };
    }

    componentDidMount()
    {
      this.update(this.props);
    }

    componentWillReceiveProps(nextProps)
    {
      const props = this.props;
      if (this.state.wrapped !== null &&
          props.selectedTab === nextProps.selectedTab &&
          isEqual(props.dashboardItemStates, nextProps.dashboardItemStates) &&
          isEqual(props.dashboardPages, nextProps.dashboardPages))
      {
        return;
      }
      else
      {
        this.update(nextProps);
      }
    }

    update(updateProps)
    {
      const {
        dashboardItemStates,
        dashboardPages,
        selectedTab,
      } = updateProps;

      if (dashboardPages.length <= 0)
      {
        return;
      }

      const dashboardItems = dashboardPages[selectedTab].dashboardItems;

      if (!dashboardItems || !dashboardItemStates)
      {
        console.log('no dashboard items and dashboard states');
        return;
      }

      // const tickers = dashboardItems
      //   .filter(
      //     ({ identifier }) => parseIdentiferKey(identifier) === TV_CANDLE_CHART
      //   )
      //   .map(
      //     ({ identifier }) => {
      //       const [exchange, symbol] = parseItemIdentifierValue(identifier).split(':');
      //       return {
      //         exchange: exchange,
      //         symbol: symbol,
      //       };
      //     }
      //   );

      // this.worker.postMessage({
      //   payload: tickers,
      //   type: WORKER_MESSAGE_TYPE_TICKERS,
      // });

      const { query, config } = buildDynamicDashboardQuery(
        dashboardItems,
        dashboardItemStates,
      );

      if (query === null)
      {
        this.state.wrapped = null;
      }
      else
      {
        this.setState({ wrapped: graphql(query, config)(ComponentToWrap) });
      }
    }

    render()
    {
      const W = this.state.wrapped;
      return (
        <div className={css(styles.hidden)}>
          { this.state.wrapped && <W /> }
        </div>
      );
    }
  }

  return DynamicDashboardQueryHOC;
}

const DataProvider = wrapDynamicGraphQL(WrappedComponent);

class Container extends PureComponent
{
  constructor(props)
  {
    super(props);
    // this.worker = new Worker();
  }

  componentDidMount()
  {
    const {
      updateExchangeTicker,
    } = this.props;

    // this.worker.onmessage = (event) => {
    //   switch (event.data.type)
    //   {
    //     case WORKER_REPLY_TYPE_TICKER:
    //       const payload = event.data.payload;
    //       const {
    //         exchange,
    //         symbol,
    //         ticker,
    //       } = payload;
    //       updateExchangeTicker(exchange, symbol, ticker);
    //       break;
    //     default:
    //       if (process.env.NODE_ENV == 'dev')
    //       {
    //         console.log('Unknown worker reply type');
    //       }
    //       break;
    //   }
    // };
  }

  componentWillUnmount()
  {
    // this.worker.terminate();
    // this.worker = null;
  }

  addToLayout(identifier)
  {
    const {
      dashboardPages,
      selectedTab,
      user,

      createDashboardItem,
      createDashboardItemLocal,
      createNotificationError,
      createNotificationSuccess,
    } = this.props;

    const identifierKey = parseIdentiferKey(identifier);
    let w = 4;
    let h = 5;

    if (identifierKey === NEWS_ITEM ||
        identifierKey === PORTFOLIO_ITEM ||
        identifierKey === TV_MARKET_OVERVIEW)
    {
      w = 4;
      h = 9;
    }
    else if (identifierKey === TWITTER_ITEM)
    {
      w = 3;
      h = 9;
    }
    else if (identifierKey === GT_CHART_ITEM)
    {
      w = 4;
      h = 6;
    }

    const dashboardItems = dashboardPages[selectedTab].dashboardItems;
    const [x, y, newId] = computeDashboardFreeValues(dashboardItems, w, h);

    if (user)
    {
      createDashboardItem(
        dashboardPages[selectedTab].id,
        identifier,
        w,
        h,
        x,
        y,
      )
        .then(
          () => {
            createNotificationSuccess({ position: 'bc', title: 'Success!' });
            setItem(HAS_ADDED_WIDGET_COOKIE, true);
          }
        )
        .catch(() => createNotificationError({ position: 'bc', title: 'Failure.' }));
    }
    else
    {
      createDashboardItemLocal({
        id: newId,
        identifier: identifier,
        w: w,
        h: h,
        x: x,
        y: y,
        static: false,
      });
      setItem(HAS_ADDED_WIDGET_COOKIE, true);
    }
  }

  updateLayoutItem(newIdentifier)
  {
    const {
      dashboardPages,
      selectedTab,
      sidebarDashboardItemId,
      sidebarMode,
      user,

      createNotificationError,
      createNotificationSuccess,
      updateDashboardItem,
      updateDashboardItemLocal,
    } = this.props;

    const dashboardPage = dashboardPages[selectedTab];

    if (user)
    {
      updateDashboardItem(
        dashboardPage.id,
        sidebarDashboardItemId,
        newIdentifier,
        null,
      )
      .then(
        () => createNotificationSuccess({ position: 'bc', title: 'Success!' }),
        () => createNotificationError({ position: 'bc', title: 'Failure.' }),
      );
    }
    else
    {
      updateDashboardItemLocal(
        sidebarDashboardItemId,
        newIdentifier,
        null,
      );
    }
  }

  render()
  {
    const {
      keySelectValue,
      modalIdentifier,
      nightMode,
      scrollActive,
      sidebarDashboardItemId,
      sidebarMode,
      user,
      valueSelectValue,

      changeKeySelectValue,
      changeModalState,
      changeScrollActive,
      changeSidebarMode,
      changeValueSelectValue,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <DataProvider
          {...this.props}
        />
        <Dashboard
          keySelectValue={keySelectValue}
          modalIdentifier={modalIdentifier}
          nightMode={nightMode}
          scrollActive={scrollActive}
          sidebarMode={sidebarMode}
          user={user}
          valueSelectValue={valueSelectValue}

          addToLayout={(identifier) => this.addToLayout(identifier)}
          changeKeySelectValue={changeKeySelectValue}
          changeModalState={changeModalState}
          changeScrollActive={changeScrollActive}
          changeSidebarMode={changeSidebarMode}
          changeValueSelectValue={changeValueSelectValue}
          updateLayoutItem={(newIdentifier) => this.updateLayoutItem(newIdentifier)}
        />
      </div>
    );
  }
}

export default Container;
