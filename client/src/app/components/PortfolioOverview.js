// @flow weak

import React, {
  PureComponent,
}                              from 'react';
import PropTypes               from 'prop-types';
import { StyleSheet, css }     from 'aphrodite';
import numeral                 from 'numeral';
import {
  calculatePortfolioChange,
  calculatePortfolioTotalValue,
  calculatePortfolioDonutData,
}                              from '../helpers/portfolio';
import * as CURRENCY           from '../helpers/currency';
import {
  disableChartOptions,
  generatePortfolioHistoryChartData,
}                              from '../helpers/chart';
import {
  PORTFOLIO_RANGE_SELECT_OPTIONS,
}                              from '../constants/plots.js';
import * as STYLES             from '../constants/styles';
import DonutChartWithSelect    from '../components/DonutChartWithSelect'
import LineChartWithSelectItem from '../components/items/LineChartWithSelectItem';
import El                      from '../components/El';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  sectionTop: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '24px 0px 36px 0px',
  },
  sectionBottom: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
  },
  sectionLeft: {
    display: 'flex',
    flexDirection: 'column',
    width: '312px',
    padding: '6px 12px 12px 12px',
  },
  sectionRight: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    marginLeft: '8px',
  },
  card: {
    backgroundColor: 'white',
  },
  cardNightMode: {
    backgroundColor: 'black',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  change: {
    marginRight: '4px',
  },
  redDelta: {
    color: `${STYLES.TICKER_RED} !important`,
    fontWeight: '500',
  },
  greenDelta: {
    color: `${STYLES.TICKER_GREEN} !important`,
    fontWeight: '500',
  },
});

class PortfolioOverview extends PureComponent
{
  static propTypes = {
    currency: PropTypes.string.isRequired,
    nightMode: PropTypes.bool.isRequired,
    portfolioHistoryPlotRange: PropTypes.string.isRequired,
    tokenUsers: PropTypes.array.isRequired,
    user: PropTypes.object,

    changePortfolioHistoryPlotRange: PropTypes.func.isRequired,
  };

  renderHeroTable()
  {
    const {
      currency,
      nightMode,
      tokenUsers,
    } = this.props;

    const portfolioChange24h = calculatePortfolioChange(tokenUsers, 'priceUSD', 'percentChange24h');
    const portfolioChange7d = calculatePortfolioChange(tokenUsers, 'priceUSD', 'percentChange7d');

    return (
      <div className={css(styles.sectionTop)}>
        <div className={css(styles.cardRow)}>
          <El
            nightMode={nightMode}
            type={'h1'}
            style={styles.boldedColor}
            nightModeStyle={styles.nightBoldedColor}
          >
             {CURRENCY.convertCurrencyToString(calculatePortfolioTotalValue(tokenUsers, 'priceUSD'), currency, '$0,0.00')}
          </El>
        </div>
        <div className={css(styles.cardRow)}>
          <El
            nightMode={nightMode}
            style={styles.change}
            type={'span'}
          >
            Change (24h):
          </El>
          <El
            nightMode={nightMode}
            type={'h3'}
            style={(portfolioChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(portfolioChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
             {numeral(portfolioChange24h).format('0.00%')}
          </El>
        </div>
        <div className={css(styles.cardRow)}>
          <El
            nightMode={nightMode}
            style={styles.change}
            type={'span'}
          >
            Change (7d):
          </El>
          <El
            nightMode={nightMode}
            type={'h3'}
            style={(portfolioChange7d < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(portfolioChange7d < 0) ? styles.redDelta : styles.greenDelta}
          >
             {numeral(portfolioChange7d).format('0.00%')}
          </El>
        </div>
      </div>
    );
  }

  renderPortfolioHistory()
  {
    const {
      nightMode,
      portfolioHistoryPlotRange,
      user,

      changePortfolioHistoryPlotRange,
    } = this.props;

    if (user)
    {
      const {
        earliestPortfolioTickerDate,
        portfolioTickers,
      } = user;

      const [chartData, chartOptions] = generatePortfolioHistoryChartData(
        portfolioTickers,
        nightMode,
      );

      const selectOptions = disableChartOptions(
        earliestPortfolioTickerDate,
        PORTFOLIO_RANGE_SELECT_OPTIONS,
      );

      const onChange = (option) => changePortfolioHistoryPlotRange(option.value);

      return (
        <div className={css(styles.sectionRight, styles.card, nightMode && styles.cardNightMode)}>
          <LineChartWithSelectItem
            chartOptions={chartOptions}
            data={chartData}
            options={selectOptions}
            nightMode={nightMode}
            selectValue={portfolioHistoryPlotRange}
            title={`Portfolio history`}
            onChange={onChange}
          />
        </div>
      );
    }
  }

  render()
  {
    const {
      nightMode,
      tokenUsers,
    } = this.props;

    const donutData = calculatePortfolioDonutData(tokenUsers, 'priceUSD', nightMode);

    return (
      <div className={css(styles.container)}>
        {this.renderHeroTable()}
        <div className={css(styles.sectionBottom)}>
          <div className={css(styles.sectionLeft, styles.card, nightMode && styles.cardNightMode)}>
            <DonutChartWithSelect
              data={donutData}
              nightMode={nightMode}
              title="Portfolio distribution"
            />
          </div>
          {this.renderPortfolioHistory()}
        </div>
      </div>
    );
  }
}

export default PortfolioOverview;
