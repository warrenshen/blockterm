// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import { Helmet }          from 'react-helmet';
import {
  AUTH_TOKEN_COOKIE,
  getItem,
}                          from '../services/cookie';
import * as STYLES         from '../constants/styles';
import PortfolioOverview   from '../components/PortfolioOverview';
import PortfolioTokens     from '../components/PortfolioTokens';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '1024px',
    padding: '0px 12px 128px 12px',
    margin: '0px auto',
  },
  row: {
    display: 'flex',
    width: '100%',
  },
});

class Portfolio extends PureComponent
{
  componentWillReceiveProps(nextProps)
  {
    if (getItem(AUTH_TOKEN_COOKIE) === null)
    {
      nextProps.createNotificationError({
        position: 'bc',
        title: 'LOGIN or JOIN to use portfolio.',
      });
      nextProps.history.push('/');
    }
  }

  render()
  {
    const {
      addTokenExchangeId,
      addTokenId,
      changeActive,
      currency,
      data,
      nightMode,
      portfolioHistoryPlotRange,
      tokenExchangesAll,
      tokensAll,
      tokenUsers,

      addTokenUser,
      changeAddTokenExchangeId,
      changeAddTokenId,
      changePortfolioHistoryPlotRange,
      changeTokenUserAmount,
      createNotificationError,
      createNotificationSuccess,
      removeTokenUser,
      updateTokenUsers,
    } = this.props;

    return (
      <div className={css(styles.container)}>
        <Helmet>
          <title>Blockterm | Cryptocurrency Portfolio Tracking Tool</title>
          <meta name="description" content="Manage and track your cryptocurrency portfolio/assets in one easy place. See your cryptocurrency assets total valuation, price by cryptocurrency, and distribution percentages with Blockterm." />
        </Helmet>

        <PortfolioOverview
          currency={currency}
          nightMode={nightMode}
          portfolioHistoryPlotRange={portfolioHistoryPlotRange}
          tokenUsers={tokenUsers}
          user={data.user}

          changePortfolioHistoryPlotRange={changePortfolioHistoryPlotRange}
        />
        <PortfolioTokens
          addTokenExchangeId={addTokenExchangeId}
          addTokenId={addTokenId}
          changeActive={changeActive}
          currency={currency}
          nightMode={nightMode}
          tokenExchangesAll={tokenExchangesAll}
          tokensAll={tokensAll}
          tokenUsers={tokenUsers}

          addTokenUser={addTokenUser}
          changeAddTokenExchangeId={changeAddTokenExchangeId}
          changeAddTokenId={changeAddTokenId}
          changeTokenUserAmount={changeTokenUserAmount}
          createNotificationError={createNotificationError}
          createNotificationSuccess={createNotificationSuccess}
          removeTokenUser={removeTokenUser}
          updateTokenUsers={updateTokenUsers}
        />
      </div>
    );
  }
}

export default Portfolio;
