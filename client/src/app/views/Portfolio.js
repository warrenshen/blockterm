// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { isEqual }         from 'underscore';
import { Helmet }          from 'react-helmet';
import {
  Link,
  withRouter,
}                          from 'react-router-dom';
import {
  AUTH_TOKEN_COOKIE,
  getItem,
}                          from '../services/cookie';
import * as STYLES         from '../constants/styles';
import PortfolioOverview   from '../components/PortfolioOverview';
import PortfolioTokens     from '../components/PortfolioTokens';
import El                  from '../components/El';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0px 12px 128px 12px',
    margin: '0px auto',
  },
  section: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    padding: '12px 0px',
  },
  button: {
    textDecoration: 'underline',
  },
  text: {
    paddingRight: '6px',
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
      exchangeKeys,
      nightMode,
      portfolioHistoryPlotRange,
      sortBy,
      tokenExchangesAll,
      tokensAll,
      tokenUsers,

      addTokenUser,
      changeAddTokenExchangeId,
      changeAddTokenId,
      changePortfolioHistoryPlotRange,
      changePortfolioSortBy,
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
        <div className={css(styles.section)}>
          <El
            nightMode={nightMode}
            style={styles.text}
            type={'span'}
          >
            {`You have ${exchangeKeys.length} active API keys.`}
          </El>
          <Link to={'/apiKeys'}>
            <El
              nightMode={nightMode}
              style={styles.button}
              type={'span'}
            >
              Manage API keys
            </El>
          </Link>
        </div>
        <PortfolioTokens
          addTokenExchangeId={addTokenExchangeId}
          addTokenId={addTokenId}
          changeActive={changeActive}
          currency={currency}
          nightMode={nightMode}
          sortBy={sortBy}
          tokenExchangesAll={tokenExchangesAll}
          tokensAll={tokensAll}
          tokenUsers={tokenUsers}

          addTokenUser={addTokenUser}
          changeAddTokenExchangeId={changeAddTokenExchangeId}
          changeAddTokenId={changeAddTokenId}
          changePortfolioSortBy={changePortfolioSortBy}
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

export default withRouter(Portfolio);
