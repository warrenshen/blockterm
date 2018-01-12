// @flow weak

import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import moment              from 'moment';
import {
  LINE_CHART_DATA_STYLES,
  RANGE_SELECT_OPTIONS,
  SMALL_RANGE_SELECT_OPTIONS,
} from '../constants/plots';
import {
  disableChartOptions,
  generateChartData,
  generateCountChartData,
  generateCountChartData2,
  isPlotRangeBig,
} from '../helpers/chart';
import BarChartWithSelect  from './BarChartWithSelect';
import LineChartWithSelect from './LineChartWithSelect';
import El                  from './El';
import Select from 'react-select';
import * as STYLES from '../constants/styles';
import { TV_CANDLE_CHART, ITEM_KEY_TO_VALUES } from '../constants/items';

const styles = StyleSheet.create({
  container: {
    padding: '0px 12px 12px',
    boxSizing: 'content-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    borderTop: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  nightMode: {
    backgroundColor: '#000',
    borderTop: `1px solid ${STYLES.BORDERDARK}`,
  },
  section: {
    width: '100%',
    paddingTop: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  chart: {
    width: '100%',
    paddingTop: '12px',
  },
  sectionHeader: {
    paddingTop: '0px',
    marginBottom: '8px',
    borderBottom: '1px solid #bdc3c7',
  },
  frame: {
    width: '100%',
    height: '500px',
    border: 'none',
    marginBottom: '20px',
  },
  nightFrame: {
    backgroundColor: '#000',
  },
  row: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex:'1',
    flexDirection: 'column',
  },
});

function generateTVSymbols(token) {
  let options = ITEM_KEY_TO_VALUES[TV_CANDLE_CHART];
  let result = options.filter(symbol => (symbol.substring(symbol.indexOf(':') + 1, symbol.indexOf(':') + 6).includes(token.shortName)));
  return result;
}

function toObjectArray(arr) {
  for (let i = 0; i < arr.length; ++i)
    arr[i] = {label: arr[i], value: arr[i]};
  return arr;
}

class TokenBody extends PureComponent
{
  renderMentionTotalCounts()
  {
    const {
      changeMentionTotalPlotRange,
      mentionTotalPlotRange,
      nightMode,
      token,
    } = this.props;

    const {
      mentionTotalCounts,
    } = token;

    if (mentionTotalCounts.length > 0)
    {
      const totalMentionsData = generateCountChartData(
        mentionTotalCounts,
        undefined,
        'now',
        isPlotRangeBig(mentionTotalPlotRange) ? 'M/D/YY' : 'MM/DD'
      );

      return (
        <BarChartWithSelect
          data={totalMentionsData}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={mentionTotalPlotRange}
          title={`${token.shortName} total activity`}
          onChange={(option) => changeMentionTotalPlotRange(option.value)}
        />
      );
    }
  }

  renderMentionSubredditCounts()
  {
    const {
      changeMentionSubredditPlotRange,
      mentionSubredditPlotRange,
      nightMode,
      token,
    } = this.props;

    const {
      subredditMentions,
    } = token;

    if (subredditMentions.length > 0)
    {
      const subredditMentionsData = generateCountChartData2(
        subredditMentions.slice(0, 3).map((subredditMention) => subredditMention.mentionTotalCounts),
        subredditMentions.slice(0, 3).map((subredditMention) => subredditMention.subreddit.displayName)
      );

      return (
        <BarChartWithSelect
          data={subredditMentionsData}
          displayLegend={true}
          nightMode={nightMode}
          selectOptions={RANGE_SELECT_OPTIONS}
          selectValue={mentionSubredditPlotRange}
          stacked={true}
          title={`${token.shortName} activity distribution by subreddits`}
          onChange={(option) => changeMentionSubredditPlotRange(option.value)}
        />
      );
    }
  }

  componentDidMount() {
    const {
      changeSelectedTicker,
      selectedTicker,
      token,
    } = this.props;

    let relevantSymbols = generateTVSymbols(token);
    changeSelectedTicker(relevantSymbols[0]);
  }

  renderTVGraphAndSelect()
  {
    const {
      changeSelectedTicker,
      nightMode,
      selectedTicker,
      token,
    } = this.props;

    let relevantSymbols = generateTVSymbols(token)
    const url =
      'https://s.tradingview.com/widgetembed/?' +
      `symbol=${selectedTicker}&` +
      'interval=15&' +
      'withdateranges=1' +
      'hideideas=1&' +
      'hidesidetoolbar=0&' +
      'symboledit=0&' +
      'saveimage=1&' +
      'toolbarbg=rgba(0,0,0,0)&' +
      `theme=${nightMode ? "Dark" : "Light"}&` +
      `timezone=${moment.tz.guess()}`
      // news=stocktwits,headlines
    ;

    return (
      <div className={css(styles.section)}>
        <div className={css(styles.row)}>
          <div className={css(styles.column)}>
            <Select
              className={css(styles.select, nightMode && styles.nightSelect)}
              clearable={true}
              options={toObjectArray(relevantSymbols)}
              searchable={false}
              onChange={(option) => changeSelectedTicker(option ? option.value : '')}
              value={selectedTicker}
            />
          </div>
        </div>
        <div className={css(styles.row)}>
          <iframe
            scrolling="no"
            className={css(styles.frame, nightMode && styles.nightFrame)}
            src={url}
          />
        </div>
      </div>
    );
  }

  render()
  {
    const {
      nightMode,
      token,
    } = this.props;

    return (
      <div className={css(styles.container, nightMode && styles.nightMode)}>
        <div className={css(styles.section)}>
          {this.renderTVGraphAndSelect()}
          <El
            style={styles.sectionHeader}
            nightMode={nightMode}
            type={'h4'}
          >
            Historical activity
          </El>
          {this.renderMentionTotalCounts()}
          {this.renderMentionSubredditCounts()}
        </div>
      </div>
    );
  }
}

export default TokenBody;
