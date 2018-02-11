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
    width: '100%',
  },
  nightMode: {
    backgroundColor: STYLES.LIGHTNIGHT,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionRight: {
    flex: '1',
    padding: '8px',
    marginLeft: '6px',
  },
  card: {
    backgroundColor: 'white',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  cardTop: {
    padding: '12px',
    marginBottom: '6px',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      <div className={css(styles.card, styles.cardTop, nightMode && styles.cardNightMode)}>
        <div className={css(styles.cardRow)}>
          <El
            nightMode={nightMode}
            style={styles.block}
            type={'span'}
          >
            Total value:
          </El>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={styles.boldedColor}
            nightModeStyle={styles.nightBoldedColor}
          >
             {CURRENCY.convertCurrencyToString(calculatePortfolioTotalValue(tokenUsers, 'priceUSD'), currency, '$0,0.00')}
          </El>
        </div>
        <div className={css(styles.cardRow)}>
          <El
            nightMode={nightMode}
            style={styles.block}
            type={'span'}
          >
            Total change (24h):
          </El>
          <El
            nightMode={nightMode}
            type={'h4'}
            style={(portfolioChange24h < 0) ? styles.redDelta : styles.greenDelta}
            nightModeStyle={(portfolioChange24h < 0) ? styles.redDelta : styles.greenDelta}
          >
             {numeral(portfolioChange24h).format('0.00%')}
          </El>
        </div>
        <div className={css(styles.cardRow)}>
          <El
            nightMode={nightMode}
            style={styles.block}
            type={'span'}
          >
            Total change (7d):
          </El>
          <El
            nightMode={nightMode}
            type={'h4'}
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
        <div className={css(styles.section, styles.sectionRight, styles.card)}>
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
        <div className={css(styles.section)}>
          {this.renderHeroTable()}
          <div className={css(styles.card, nightMode && styles.cardNightMode)}>
            <DonutChartWithSelect
              data={donutData}
              nightMode={nightMode}
              title="Portfolio distribution"
            />
          </div>
        </div>
        {this.renderPortfolioHistory()}
      </div>
    );
  }
}

export default PortfolioOverview;
