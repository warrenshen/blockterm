// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from './El';
import * as STYLES from '../constants/styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  banner: {
    width: '100vw',
    padding: '0px 20px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    borderBottom: `1px solid ${STYLES.BORDERLIGHT}`,
  },
  promotion: {
    position:'absolute',
    right: '0px',
    top: '0px',
    zIndex: '2',
    padding: '0px 10px',
    backgroundColor: STYLES.BLAZINGREEN,
    justifyContent: 'right !important',
    alignItems: 'right !important',
  },
  promotionNight: {
    backgroundColor: STYLES.GOLD,
  },
  bannerNight: {
    backgroundColor: '#000',
    borderBottom: `1px solid ${STYLES.BORDERDARK}`,
  },
  bolded: {
    fontWeight: '500',
  },
});

class Marquee extends PureComponent {

  componentDidMount()
  {
    this.update();
  }

  update() {
    var s = document.createElement('script');
    s.async = true;
    s.type = 'text/javascript';
    s.src = 'https://widgets.cryptocompare.com/serve/v3/coin/header?fsyms=BTC,ETH,XMR,LTC,BCH,XRP,DASH,ADA,USDT,NEO,IOT,SUB,XLM,ZEC,STEEM,LSK,TRX,GAS&tsyms=USD';

    this.instance.appendChild(s);
  }

  render()
  {
    const {
      nightMode,
    } = this.props;

    return (
      <nav className={css(styles.banner, nightMode && styles.bannerNight)}>
        <div
          className={css(styles.container)}
          ref={(el) => this.instance = el}
        />
        <div className={'promotional ' + css(styles.promotion, nightMode && styles.promotionNight)}>
          <a href='https://www.binance.com/?ref=10907326' target='_blank'>
           <El style={styles.bolded} type={'span'}>
             Trade Altcoins with Binance!
           </El>
          </a>
        </div>
      </nav>
    );
  }
}

export default Marquee;
