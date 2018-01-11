import React, {
  PureComponent,
}                          from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from '../components/El';

import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  faqPanel: {
    backgroundColor: '#fff',
    marginTop: '20px',
    padding: '15px 15px',
    border: `1px solid ${STYLES.BORDERLIGHT}`,
    //borderBottom: `2px solid ${STYLES.BORDERLIGHT}`,
    display:'flex',
    flexDirection:'column',
    minHeight: '450px',
  },
  panelsLightNight: {
    backgroundColor: '#000',
    border: `1px solid ${STYLES.BORDERDARK}`,
    //borderBottom: `2px solid ${STYLES.BORDERDARK}`,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  boldedBottomHeavy: {
    fontWeight: '700',
    marginBottom: '8px',
  },
  column: {
    display:'flex',
    flex: '1',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  dashBorder: {
    borderRight: `1px dashed ${STYLES.BORDERLIGHT}`,
  },
  bolded: {
    fontWeight:'700',
    display: 'block',
  },
  para: {
    lineHeight: '24px',
  },
  a: {
    fontWeight: '500',
    textDecoration: 'underline',
  },
  nightA: {
    color: '#fff',
  },
});

class FAQBody extends PureComponent {

  render()
  {
    const {
      nightMode,
    } = this.props;

    return(
      <div className={css(styles.faqPanel, nightMode && styles.panelsLightNight)}>
        <div className={css(styles.row)}>
          <El
            style={styles.boldedBottomHeavy}
            nightMode={nightMode}
            type={'h4'}
          >
            FAQ:
          </El>
        </div>

        <div className={css(styles.row)} style={{'marginBottom':'24px'}}>
          <div className={css(styles.column)}>
            <El
              style={styles.bolded}
              nightMode={nightMode}
              type={'h5'}
            >
              What is Blockterm?
            </El>
            <El
              nightMode={nightMode}
              type={'p'}
              style={styles.para}
            >
            Blockterm hopes to be the premier blockchain terminal. Blockterm is a fully customizable cryptocurrency monitoring terminal designed for the avid investor/trader. We hope to empower you to set up different tabs/pages of charts and tools, separated by coin/token, for example. We also enable you to monitor your portfolio and holdings values so you can keep on pace to reach your goals.<br /><br />
            We were inspired to build Blockterm due to the hassle of continuously having to tab in/out of different webpages when keeping up with cryptocurrencies. We also wanted to stop having to use spreadsheets! We strive to help this community have all their tools in one snug place!
            </El>
          </div>

          <div className={css(styles.column)} style={{'paddingLeft':'15px', 'borderLeft':'1px dashed #777'}}>
            <El
              style={styles.bolded}
              nightMode={nightMode}
              type={'h5'}
            >
              How do I use the 'Dashboard' tab?
            </El>
            <El
              nightMode={nightMode}
              type={'p'}
              style={styles.para}
            >
              The 'dashboard' tab is your workbench/playground to build your perfect cryptocurrency monitoring/trading terminal. By default it has real time charts on Bitcoin, Ethereum, and Litecoin's prices. You can customize it to fulfill your needs by adding or removing other widgets for different coins/tokens such as XMR, NEO, ZEC, etc. You can also re-position and scale any/all widgets to suit your needs! Your feedback is appreciated!<br /><br />
              To add widgets, use the 'Add Widget' button located near the bottom of the dashboard page, or the menu bar button at the top-right corner. Type to search for your preferred widget e.g. 'Candle Chart' > 'XRPUSD' for a Ripple : US Dollar chart.
            </El>
          </div>
        </div>

        <div className={css(styles.row)}>
          <div className={css(styles.column, styles.dashBorder)}>
            <El
              style={styles.bolded}
              nightMode={nightMode}
              type={'h5'}
            >
              What is the 'Subreddits' tab for?
            </El>
            <El
              nightMode={nightMode}
              type={'p'}
              style={styles.para}
            >
              The 'subreddits' tab is used to monitor activity on each respective coin/token's subreddit on <a href="https://www.reddit.com" target="_blank" className={css(styles.a, nightMode && styles.nightA)}>Reddit.com.</a> The data is updated live every few minutes and has in the past shown extremely high correlation to price movements of the coins/tokens in the past.<br /><br />
              You can also use this page to follow the approximate size of the community surrounding a given coin in order to understand how much developer support, community input, and mainstream adoption looks like.
            </El>
          </div>

          <div className={css(styles.column, styles.dashBorder)}>
            <El
              style={styles.bolded}
              nightMode={nightMode}
              type={'h5'}
            >
              What is the 'Price/Volume' tab for?
            </El>
            <El
              nightMode={nightMode}
              type={'p'}
              style={styles.para}
            >
              The 'price/volume' tab is used to keep track of the price, volume, and marketcap of the top 200 cryptocurrencies on the market. More currencies will be added soon! If you have a special request feel free to ask for it.<br /><br />
              We currently sort this page by descending order of trading volume, as we believe that the highest trading volume for a particular day is more interesting than market cap, for the most part. This page should help day traders find the hottest coins and hunt the action.
            </El>
          </div>

          <div className={css(styles.column)}>
            <El
              style={styles.bolded}
              nightMode={nightMode}
              type={'h5'}
            >
              I love this! How can I contribute?
            </El>
            <El
              nightMode={nightMode}
              type={'p'}
              style={styles.para}
            >
              We love you back! First and foremost, the best way to contribute is to SEND US YOUR BEAUTIFUL feedback! Send us every issue, no matter how big or small, here! We'll try to nail each one.<br /><br />
              If you like us even more than that. You could send some coins our way at:<br />
              <strong>ETH Wallet Address: 0x72fB44C1a3F910ed4a979fBDed2c600f7c14f3B7</strong><br />
            </El>
          </div>
        </div>
      </div>
    );
  }
}

export default FAQBody;
