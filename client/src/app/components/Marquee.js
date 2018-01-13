// @flow weak

import React, { PureComponent } from 'react';
import PropTypes           from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import El from './El';

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    s.innerHTML = 'var cccTheme = {"General":{"background":"#000","priceText":"#fff","enableMarquee":true},"Currency":{"color":"#fff"}};';

    this.instance.appendChild(s);
  }

  render()
  {
    return (
      <div
        className={css(styles.container)}
        ref={(el) => this.instance = el}
      />
    );
  }
}

export default Marquee;
