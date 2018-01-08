export const PROJECT_VERSION = '0.1.6.4';
export const PATCH_NOTES = [
  '0.1.6.4: Edit dashboard widget operation now supported.',
  '0.1.6.3: All Bittrex coins above 5MIL daily volume added to Candle Charts.',
  'FAQ added for users that are signed in.',
  'Join/Login bugs fixed, sorry about that!',
  '0.1.6.2: All Binance coins/currencies now supported via Candle Chart.',
  'Locking and unlocking of widgets now supported.',
  '[...]',
];
//<li className={css(styles.blockli)}>0.1.6.2: All Binance coins/currencies now supported via Candle Chart.</li>
//<li className={css(styles.blockli)}>Locking and unlocking of widgets now supported.</li>
//<li className={css(styles.blockli)}>[...]</li>

const DELIMETER = '__';

export const PORTFOLIO_ITEM = 'PORTFOLIO_ITEM';
export const SUBREDDIT_COMMENT_COUNTS = 'SUBREDDIT_COMMENT_COUNTS';
export const SUBREDDIT_POST_COUNTS = 'SUBREDDIT_POST_COUNTS';
export const TOTAL_MARKET_CAP = 'TOTAL_MARKET_CAP';
export const TV_CANDLE_CHART = 'TV_CANDLE_CHART';
export const TV_MARKET_OVERVIEW = 'TV_MARKET_OVERVIEW';

export const ITEM_KEY_WHITELIST = [
  PORTFOLIO_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
];

// Array of dashboard page objects.
export const DEFAULT_PAGES_OBJECTS = [
  {
    dashboardItems: [
      {
        "id":"3","w":6,"h":4,"x":0,"y":0,"static":false,"identifier":"TV_CANDLE_CHART__BITSTAMP:BTCUSD"
      },
      {
        "id":"6","w":6,"h":4,"x":0,"y":4,"static":false,"identifier":"TV_CANDLE_CHART__BITSTAMP:ETHUSD"
      },
      {
        "id":"7","w":3,"h":8,"x":6,"y":0,"static":false,"identifier":"TV_MARKET_OVERVIEW__Default"
      },
      {
        "id":"9","w":3,"h":3,"x":6,"y":8,"static":false,"identifier":"SUBREDDIT_COMMENT_COUNTS__Bitcoin"
      },
      {
        "id":"10","w":3,"h":3,"x":0,"y":8,"static":false,"identifier":"TOTAL_MARKET_CAP__Default"
      },
      {
        "id":"11","w":3,"h":3,"x":3,"y":8,"static":false,"identifier":"SUBREDDIT_POST_COUNTS__Bitcoin"
      }
    ],
    "index":0,
    "name":"Tab 1",
  },
  {
    dashboardItems: [
    ],
    index: 1,
    name: 'Tab 2',
  },
  {
    dashboardItems: [
    ],
    index: 2,
    name: 'Tab 3',
  },
  {
    dashboardItems: [
    ],
    index: 3,
    name: 'Tab 4',
  },
];

// Keys should be all lowercase.
export const DEFAULT_ITEM_OBJECTS_BY_SUBREDDIT = {
  monero: [
    {
      id: '1',
      identifier: generateIdentifier(TV_CANDLE_CHART, 'KRAKEN:XMRUSD'),
      w: 4,
      h: 4,
      x: 0,
      y: 0,
    },
    {
      id: '2',
      identifier: generateIdentifier(SUBREDDIT_POST_COUNTS, 'Monero'),
      w: 4,
      h: 4,
      x: 4,
      y: 0,
    },
    {
      id: '3',
      identifier: generateIdentifier(TV_CANDLE_CHART, 'BITTREX:XMRBTC'),
      w: 4,
      h: 4,
      x: 0,
      y: 4,
    },
    {
      id: '4',
      identifier: generateIdentifier(SUBREDDIT_COMMENT_COUNTS, 'Monero'),
      w: 4,
      h: 4,
      x: 4,
      y: 4,
    },
  ],
};

// These array values should be in user-facing order.
// The order does affect user-facing order.
export const ITEM_KEY_TO_LABELS = {
  [TV_CANDLE_CHART]: 'Candle chart',
  [TV_MARKET_OVERVIEW]: 'Market overview',
  [TOTAL_MARKET_CAP]: 'Total market cap chart',
  [SUBREDDIT_POST_COUNTS]: 'Subreddit posts chart',
  [SUBREDDIT_COMMENT_COUNTS]: 'Subreddit comments chart',
  // [PORTFOLIO_ITEM]: 'Portfolio overview',
};

// These array values should be in user-facing order.
// The order does affect user-facing order.
const SUBREDDITS_IN_USER_FACING_ORDER = [
  'Bitcoin',
  'ethereum',
  'litecoin',
  'btc',
  'Ripple',
  'Iota',
  'NEO',
  'Lisk',
  'altcoin',
  'CryptoCurrency',
  'CryptoMarkets',
  'Monero',
  'Bitcoincash',
  'steemit',
  'SubstratumNetwork',
  'dogecoin',
  'Raiblocks',
  'RequestNetwork',
  'Vertcoin',
  'Electroneum',
  'Groestlcoin',
  'gridcoin',
  'icon',
];

export const ITEM_KEY_TO_VALUES = {
  [PORTFOLIO_ITEM]: [
    'Default',
  ],
  [SUBREDDIT_COMMENT_COUNTS]: SUBREDDITS_IN_USER_FACING_ORDER,
  [SUBREDDIT_POST_COUNTS]: SUBREDDITS_IN_USER_FACING_ORDER,
  [TOTAL_MARKET_CAP]: [
    'Default',
  ],
  [TV_CANDLE_CHART]: [
    'BINANCE:ADABTC',
    'BINANCE:ADAETH',
    'BINANCE:ADXBNB',
    'BINANCE:ADXBTC',
    'BINANCE:ADXETH',
    'BINANCE:AIONBNB',
    'BINANCE:AIONBTC',
    'BINANCE:AIONETH',
    'BINANCE:AMBBNB',
    'BINANCE:AMBBTC',
    'BINANCE:AMBETH',
    'BINANCE:ARKBTC',
    'BINANCE:ARKETH',
    'BINANCE:ARNBTC',
    'BINANCE:ARNETH',
    'BINANCE:ASTBTC',
    'BINANCE:ASTETH',
    'BINANCE:BATBNB',
    'BINANCE:BATBTC',
    'BINANCE:BATETH',
    'BINANCE:BCDBTC',
    'BINANCE:BCDETH',
    'BINANCE:BCPTBNB',
    'BINANCE:BCPTBTC',
    'BINANCE:BCPTETH',
    'BINANCE:BNBBTC',
    'BINANCE:BNBETH',
    'BINANCE:BNBUSDT',
    'BINANCE:BNTBTC',
    'BINANCE:BNTETH',
    'BINANCE:BQXBTC',
    'BINANCE:BQXETH',
    'BINANCE:BRDBNB',
    'BINANCE:BRDBTC',
    'BINANCE:BRDETH',
    'BINANCE:BTGBTC',
    'BINANCE:BTGETH',
    'BINANCE:BTSBNB',
    'BINANCE:BTSBTC',
    'BINANCE:BTSETH',
    'BINANCE:CDTBTC',
    'BINANCE:CDTETH',
    'BINANCE:CMTBNB',
    'BINANCE:CMTBTC',
    'BINANCE:CMTETH',
    'BINANCE:CNDBNB',
    'BINANCE:CNDBTC',
    'BINANCE:CNDETH',
    'BINANCE:CTRBTC',
    'BINANCE:CTRETH',
    'BINANCE:DGDBTC',
    'BINANCE:DGDETH',
    'BINANCE:DLTBNB',
    'BINANCE:DLTBTC',
    'BINANCE:DLTETH',
    'BINANCE:DNTBTC',
    'BINANCE:DNTETH',
    'BINANCE:EDOBTC',
    'BINANCE:EDOETH',
    'BINANCE:ELFBTC',
    'BINANCE:ELFETH',
    'BINANCE:ENGBTC',
    'BINANCE:ENGETH',
    'BINANCE:ENJBTC',
    'BINANCE:ENJETH',
    'BINANCE:EOSBTC',
    'BINANCE:ETCBTC',
    'BINANCE:EVXBTC',
    'BINANCE:EVXETH',
    'BINANCE:FUELBTC',
    'BINANCE:FUELETH',
    'BINANCE:FUNBTC',
    'BINANCE:GASBTC',
    'BINANCE:GTOBNB',
    'BINANCE:GTOBTC',
    'BINANCE:GTOETH',
    'BINANCE:GVTBTC',
    'BINANCE:GVTETH',
    'BINANCE:GXSBTC',
    'BINANCE:GXSETH',
    'BINANCE:HSRBTC',
    'BINANCE:HSRETH',
    'BINANCE:ICNBTC',
    'BINANCE:ICXBNB',
    'BINANCE:ICXBTC',
    'BINANCE:ICXETH',
    'BINANCE:IOTABNB',
    'BINANCE:IOTAETH',
    'BINANCE:KMDBTC',
    'BINANCE:KMDETH',
    'BINANCE:KNCBTC',
    'BINANCE:KNCETH',
    'BINANCE:LENDBTC',
    'BINANCE:LENDETH',
    'BINANCE:LINKBTC',
    'BINANCE:LINKETH',
    'BINANCE:LRCBTC',
    'BINANCE:LRCETH',
    'BINANCE:LSKBNB',
    'BINANCE:LSKBTC',
    'BINANCE:LSKETH',
    'BINANCE:LTCBNB',
    'BINANCE:LTCETH',
    'BINANCE:LUNBTC',
    'BINANCE:LUNETH',
    'BINANCE:MANABTC',
    'BINANCE:MANAETH',
    'BINANCE:MCOBNB',
    'BINANCE:MCOBTC',
    'BINANCE:MCOETH',
    'BINANCE:MDABTC',
    'BINANCE:MDAETH',
    'BINANCE:MODBTC',
    'BINANCE:MODETH',
    'BINANCE:MTHBTC',
    'BINANCE:MTHETH',
    'BINANCE:MTLBTC',
    'BINANCE:MTLETH',
    'BINANCE:NAVBNB',
    'BINANCE:NAVBTC',
    'BINANCE:NAVETH',
    'BINANCE:NEBLBNB',
    'BINANCE:NEBLBTC',
    'BINANCE:NEBLETH',
    'BINANCE:NEOBTC',
    'BINANCE:NULSBNB',
    'BINANCE:NULSBTC',
    'BINANCE:NULSETH',
    'BINANCE:OAXBTC',
    'BINANCE:OAXETH',
    'BINANCE:OMGBTC',
    'BINANCE:OMGETH',
    'BINANCE:OSTBNB',
    'BINANCE:OSTBTC',
    'BINANCE:OSTETH',
    'BINANCE:POEBTC',
    'BINANCE:POEETH',
    'BINANCE:POWRBNB',
    'BINANCE:POWRBTC',
    'BINANCE:POWRETH',
    'BINANCE:PPTBTC',
    'BINANCE:PPTETH',
    'BINANCE:QSPBNB',
    'BINANCE:QSPBTC',
    'BINANCE:QSPETH',
    'BINANCE:QTUMBTC',
    'BINANCE:QTUMETH',
    'BINANCE:RCNBNB',
    'BINANCE:RCNBTC',
    'BINANCE:RCNETH',
    'BINANCE:RDNBNB',
    'BINANCE:RDNBTC',
    'BINANCE:RDNETH',
    'BINANCE:REQBTC',
    'BINANCE:REQETH',
    'BINANCE:SALTBTC',
    'BINANCE:SALTETH',
    'BINANCE:SNGLSBTC',
    'BINANCE:SNGLSETH',
    'BINANCE:SNMBTC',
    'BINANCE:SNMETH',
    'BINANCE:SNTBTC',
    'BINANCE:SNTETH',
    'BINANCE:STORJBTC',
    'BINANCE:STORJETH',
    'BINANCE:STRATBTC',
    'BINANCE:SUBBTC',
    'BINANCE:SUBETH',
    'BINANCE:TNBBTC',
    'BINANCE:TNBETH',
    'BINANCE:TNTBTC',
    'BINANCE:TNTETH',
    'BINANCE:TRIGBNB',
    'BINANCE:TRIGBTC',
    'BINANCE:TRIGETH',
    'BINANCE:TRXBTC',
    'BINANCE:TRXETH',
    'BINANCE:VENBNB',
    'BINANCE:VENBTC',
    'BINANCE:VENETH',
    'BINANCE:VIBBTC',
    'BINANCE:VIBETH',
    'BINANCE:WABIBNB',
    'BINANCE:WABIBTC',
    'BINANCE:WABIETH',
    'BINANCE:WAVESBTC',
    'BINANCE:WAVESETH',
    'BINANCE:WINGSBTC',
    'BINANCE:WINGSETH',
    'BINANCE:WTCBNB',
    'BINANCE:WTCBTC',
    'BINANCE:WTCETH',
    'BINANCE:XLMBNB',
    'BINANCE:XLMBTC',
    'BINANCE:XLMETH',
    'BINANCE:XMRBTC',
    'BINANCE:XMRETH',
    'BINANCE:XRPBTC',
    'BINANCE:XVGBTC',
    'BINANCE:XVGETH',
    'BINANCE:XZCBNB',
    'BINANCE:XZCBTC',
    'BINANCE:XZCETH',
    'BINANCE:YOYOBNB',
    'BINANCE:YOYOBTC',
    'BINANCE:ZECBTC',
    'BINANCE:ZRXBTC',
    'BINANCE:ZRXETH',
    'BITFINEX:BCHBTC',
    'BITFINEX:BCHETH',
    'BITFINEX:BTCEUR',
    'BITFINEX:BTCUSD',
    'BITFINEX:BTGUSD',
    'BITFINEX:EDOBTC',
    'BITFINEX:EDOUSD',
    'BITFINEX:EOSBTC',
    'BITFINEX:EOSETH',
    'BITFINEX:EOSUSD',
    'BITFINEX:ETHUSD',
    'BITFINEX:GNTBTC',
    'BITFINEX:GNTETH',
    'BITFINEX:GNTUSD',
    'BITFINEX:IOTBTC',
    'BITFINEX:IOTETH',
    'BITFINEX:IOTEUR',
    'BITFINEX:IOTUSD',
    'BITFINEX:LTCUSD',
    'BITFINEX:NEOBTC',
    'BITFINEX:OMGUSD',
    'BITFINEX:QTMUSD',
    'BITFINEX:SNTBTC',
    'BITFINEX:SNTETH',
    'BITFINEX:SNTUSD',
    'BITFINEX:XMRBTC',
    'BITFINEX:XMRUSD',
    'BITFINEX:YYWBTC',
    'BITFINEX:YYWUSD',
    'BITFINEX:ZECBTC',
    'BITFINEX:ZECUSD',
    'BITFLYER:BTCJPY',
    'BITMEX:BCHXBT',
    'BITSO:BTCMXN',
    'BITSO:ETHMXN',
    'BITSO:XRPMXN',
    'BITSTAMP:BCHBTC',
    'BITSTAMP:BCHUSD',
    'BITSTAMP:BTCEUR',
    'BITSTAMP:BTCUSD',
    'BITSTAMP:ETHBTC',
    'BITSTAMP:ETHEUR',
    'BITSTAMP:ETHUSD',
    'BITSTAMP:LTCBTC',
    'BITSTAMP:LTCUSD',
    'BITSTAMP:XRPBTC',
    'BITSTAMP:XRPUSD',
    'BITTREX:1STBTC',
    'BITTREX:1STETH',
    'BITTREX:1STUSD',
    'BITTREX:ADABTC',
    'BITTREX:ADAETH',
    'BITTREX:ADAUSDT',
    'BITTREX:ADTBTC',
    'BITTREX:ADTETH',
    'BITTREX:ADTUSD',
    'BITTREX:ADXBTC',
    'BITTREX:ADXETH',
    'BITTREX:ADXUSD',
    'BITTREX:AEONBTC',
    'BITTREX:AEONUSD',
    'BITTREX:AMPBTC',
    'BITTREX:AMPUSD',
    'BITTREX:ARDRBTC',
    'BITTREX:ARDRUSD',
    'BITTREX:ARKBTC',
    'BITTREX:ARKUSD',
    'BITTREX:BATBTC',
    'BITTREX:BATUSD',
    'BITTREX:BAYBTC',
    'BITTREX:BLKBTC',
    'BITTREX:BLKUSD',
    'BITTREX:BNTBTC',
    'BITTREX:BNTETH',
    'BITTREX:BNTUSD',
    'BITTREX:BTGBTC',
    'BITTREX:BTGUSDT',
    'BITTREX:BTSUSD',
    'BITTREX:BURSTBTC',
    'BITTREX:BURSTUSD',
    'BITTREX:CANNBTC',
    'BITTREX:CANNUSD',
    'BITTREX:CFIBTC',
    'BITTREX:CFIETH',
    'BITTREX:CFIUSD',
    'BITTREX:CLOAKBTC',
    'BITTREX:CLOAKUSD',
    'BITTREX:CVCBTC',
    'BITTREX:CVCETH',
    'BITTREX:CVCUSD',
    'BITTREX:DASHBTC',
    'BITTREX:DASHETH',
    'BITTREX:DCRBTC',
    'BITTREX:DCRUSD',
    'BITTREX:DGBBTC',
    'BITTREX:DGBETH',
    'BITTREX:DGBUSD',
    'BITTREX:DGDBTC',
    'BITTREX:DGDUSD',
    'BITTREX:DMDBTC',
    'BITTREX:DMDUSD',
    'BITTREX:DNTBTC',
    'BITTREX:DOGEBTC',
    'BITTREX:DOGEUSD',
    'BITTREX:EDGBTC',
    'BITTREX:EMC2BTC',
    'BITTREX:EMC2USD',
    'BITTREX:ENGBTC',
    'BITTREX:ENGETH',
    'BITTREX:ETHUSDT',
    'BITTREX:FCTBTC',
    'BITTREX:FCTETH',
    'BITTREX:FCTUSD',
    'BITTREX:FUNBTC',
    'BITTREX:FUNUSD',
    'BITTREX:GAMEBTC',
    'BITTREX:GAMEUSD',
    'BITTREX:GCRBTC',
    'BITTREX:GCRUSD',
    'BITTREX:GNTBTC',
    'BITTREX:GNTETH',
    'BITTREX:GNTUSD',
    'BITTREX:GRCBTC',
    'BITTREX:GRCUSD',
    'BITTREX:GUPBTC',
    'BITTREX:GUPETH',
    'BITTREX:GUPUSD',
    'BITTREX:HMQBTC',
    'BITTREX:HMQETH',
    'BITTREX:HMQUSD',
    'BITTREX:IOPBTC',
    'BITTREX:IOPUSD',
    'BITTREX:KMDBTC',
    'BITTREX:KMDUSD',
    'BITTREX:LBCBTC',
    'BITTREX:LBCUSD',
    'BITTREX:LSKBTC',
    'BITTREX:LSKUSD',
    'BITTREX:LUNBTC',
    'BITTREX:LUNETH',
    'BITTREX:LUNUSD',
    'BITTREX:MAIDBTC',
    'BITTREX:MAIDUSD',
    'BITTREX:MCOBTC',
    'BITTREX:MCOETH',
    'BITTREX:MCOUSD',
    'BITTREX:MEMEBTC',
    'BITTREX:MEMEUSD',
    'BITTREX:MERBTC',
    'BITTREX:MONABTC',
    'BITTREX:MONAUSD',
    'BITTREX:NAVBTC',
    'BITTREX:NBTBTC',
    'BITTREX:NBTUSD',
    'BITTREX:NEOBTC',
    'BITTREX:NEOUSD',
    'BITTREX:NMRBTC',
    'BITTREX:NMRETH',
    'BITTREX:NMRUSD',
    'BITTREX:NXTBTC',
    'BITTREX:NXTUSD',
    'BITTREX:OKBTC',
    'BITTREX:OKUSD',
    'BITTREX:OMGBTC',
    'BITTREX:OMGUSD',
    'BITTREX:PAYBTC',
    'BITTREX:PAYETH',
    'BITTREX:PAYUSD',
    'BITTREX:PIVXBTC',
    'BITTREX:PIVXUSD',
    'BITTREX:POWRBTC',
    'BITTREX:PTOYBTC',
    'BITTREX:PTOYETH',
    'BITTREX:PTOYUSD',
    'BITTREX:QTUMBTC',
    'BITTREX:QTUMETH',
    'BITTREX:QTUMUSD',
    'BITTREX:RCNBTC',
    'BITTREX:RCNETH',
    'BITTREX:RDDBTC',
    'BITTREX:RDDUSD',
    'BITTREX:REPBTC',
    'BITTREX:REPETH',
    'BITTREX:REPUSD',
    'BITTREX:RISEBTC',
    'BITTREX:RISEUSD',
    'BITTREX:RLCBTC',
    'BITTREX:RLCETH',
    'BITTREX:RLCUSD',
    'BITTREX:SALTBTC',
    'BITTREX:SALTETH',
    'BITTREX:SBDBTC',
    'BITTREX:SBDUSD',
    'BITTREX:SCBTC',
    'BITTREX:SCETH',
    'BITTREX:SCUSD',
    'BITTREX:SLSBTC',
    'BITTREX:SLSUSD',
    'BITTREX:SNGLSUSD',
    'BITTREX:SNTBTC',
    'BITTREX:SNTETH',
    'BITTREX:SNTUSD',
    'BITTREX:SPRBTC',
    'BITTREX:SPRUSD',
    'BITTREX:STEEMBTC',
    'BITTREX:STEEMUSD',
    'BITTREX:STORJBTC',
    'BITTREX:STRATBTC',
    'BITTREX:STRATUSD',
    'BITTREX:SYSBTC',
    'BITTREX:SYSUSD',
    'BITTREX:THCBTC',
    'BITTREX:THCUSD',
    'BITTREX:TRIGBTC',
    'BITTREX:TRIGUSD',
    'BITTREX:TRSTBTC',
    'BITTREX:TRSTETH',
    'BITTREX:TRSTUSD',
    'BITTREX:TRUSTBTC',
    'BITTREX:TRUSTUSD',
    'BITTREX:UBQBTC',
    'BITTREX:UBQUSD',
    'BITTREX:UKGBTC',
    'BITTREX:UKGETH',
    'BITTREX:VIBBTC',
    'BITTREX:VIBETH',
    'BITTREX:VOXBTC',
    'BITTREX:VOXUSD',
    'BITTREX:VTCBTC',
    'BITTREX:WAVESBTC',
    'BITTREX:WAVESUSD',
    'BITTREX:WINGSBTC',
    'BITTREX:WINGSUSD',
    'BITTREX:XELBTC',
    'BITTREX:XELUSD',
    'BITTREX:XEMBTC',
    'BITTREX:XEMUSD',
    'BITTREX:XLMBTC',
    'BITTREX:XLMETH',
    'BITTREX:XLMUSD',
    'BITTREX:XMRBTC',
    'BITTREX:XMRUSD',
    'BITTREX:XVGBTC',
    'BITTREX:XVGUSD',
    'BITTREX:XZCBTC',
    'BITTREX:XZCUSD',
    'BITTREX:ZCLBTC',
    'BITTREX:ZCLUSD',
    'BITTREX:ZECBTC',
    'BITTREX:ZECUSD',
    'BITTREX:ZENBTC',
    'BITTREX:ZENUSD',
    'BTCE:DSHRUR',
    'BTCE:USDRUR',
    'BXTH:BTCTHB',
    'BXTH:ETHTHB',
    'COINBASE:BCHUSD',
    'COINBASE:BTCGBP',
    'COINBASE:BTCUSD',
    'COINBASE:ETHEUR',
    'COINBASE:ETHUSD',
    'COINBASE:LTCEUR',
    'COINBASE:LTCUSD',
    'COINFLOOR:BTCGBP',
    'HITBTC:BTCUSD',
    'HITBTC:DNTBTC',
    'HITBTC:DOGEUSD',
    'HITBTC:XEMBTC',
    'HITBTC:XEMUSD',
    'KORBIT:BCHKRW',
    'KORBIT:BTCKRW',
    'KORBIT:BTGKRW',
    'KORBIT:ETHKRW',
    'KORBIT:XRPKRW',
    'KRAKEN:BCHEUR',
    'KRAKEN:DASHEUR',
    'KRAKEN:DASHUSD',
    'KRAKEN:DASHXBT',
    'KRAKEN:EOSXBT',
    'KRAKEN:ETCEUR',
    'KRAKEN:ETCUSD',
    'KRAKEN:ETCXBT',
    'KRAKEN:ETHEUR',
    'KRAKEN:ETHJPY',
    'KRAKEN:ETHUSD',
    'KRAKEN:ETHXBT',
    'KRAKEN:ICNUSD',
    'KRAKEN:LTCEUR',
    'KRAKEN:LTCUSD',
    'KRAKEN:REPETH',
    'KRAKEN:REPEUR',
    'KRAKEN:REPXBT',
    'KRAKEN:USDTUSD',
    'KRAKEN:XMRUSD',
    'KRAKEN:XMRXBT',
    'KRAKEN:XRPEUR',
    'KRAKEN:XRPUSD',
    'KRAKEN:XRPXBT',
    'KRAKEN:ZECEUR',
    'KRAKEN:ZECXBT',
    'MERCADO:BCHBRL',
    'MERCADO:BTCBRL',
    'MERCADO:LTCBRL',
    'POLONIEX:AMPBTC',
    'POLONIEX:AMPUSD',
    'POLONIEX:ARDRBTC',
    'POLONIEX:ARDRUSD',
    'POLONIEX:BCHUSDT',
    'POLONIEX:BLKBTC',
    'POLONIEX:BLKUSD',
    'POLONIEX:BLKXMR',
    'POLONIEX:BTMBTC',
    'POLONIEX:BTSBTC',
    'POLONIEX:BTSUSD',
    'POLONIEX:BURSTBTC',
    'POLONIEX:BURSTUSD',
    'POLONIEX:CVCBTC',
    'POLONIEX:CVCETH',
    'POLONIEX:DASHBTC',
    'POLONIEX:DASHUSDT',
    'POLONIEX:DCRBTC',
    'POLONIEX:DCRUSD',
    'POLONIEX:DGBBTC',
    'POLONIEX:EMC2BTC',
    'POLONIEX:EMC2USD',
    'POLONIEX:FCTBTC',
    'POLONIEX:FCTUSD',
    'POLONIEX:GAMEBTC',
    'POLONIEX:GAMEUSD',
    'POLONIEX:GASBTC',
    'POLONIEX:GASETH',
    'POLONIEX:GNTBTC',
    'POLONIEX:GNTETH',
    'POLONIEX:GNTUSD',
    'POLONIEX:GRCBTC',
    'POLONIEX:LBCBTC',
    'POLONIEX:LBCUSD',
    'POLONIEX:LSKBTC',
    'POLONIEX:MAIDBTC',
    'POLONIEX:MAIDUSD',
    'POLONIEX:NAVBTC',
    'POLONIEX:NXTBTC',
    'POLONIEX:NXTUSD',
    'POLONIEX:NXTUSDT',
    'POLONIEX:REPBTC',
    'POLONIEX:REPETH',
    'POLONIEX:REPUSD',
    'POLONIEX:REPUSDT',
    'POLONIEX:SBDBTC',
    'POLONIEX:SCBTC',
    'POLONIEX:SCUSD',
    'POLONIEX:STEEMBTC',
    'POLONIEX:STEEMETH',
    'POLONIEX:STORJBTC',
    'POLONIEX:STRATBTC',
    'POLONIEX:SYSBTC',
    'POLONIEX:SYSUSD',
    'POLONIEX:USDTBTC',
    'POLONIEX:USDTUSD',
    'POLONIEX:VTCBTC',
    'POLONIEX:XEMBTC',
    'POLONIEX:XRPUSDT',
    'THEROCKTRADING:BTCXRP',
    'WEX:BCHRUR',
    'WEX:DSHEUR',
    'WEX:ETHRUR',
    'WEX:LTCRUR',
    'WEX:USDRUR',
  ],
  [TV_MARKET_OVERVIEW]: [
    'Default',
  ],
};

// This map should be alphabetical for ease of development.
// The order does not affect user-facing order.
export const ITEM_VALUE_TO_LABELS = {
  'altcoin': 'r/Altcoin',
  'Bitcoin': 'r/Bitcoin',
  'Bitcoincash': 'r/Bitcoincash',
  'btc': 'r/BTC',
  'CryptoCurrency': 'r/Cryptocurrency',
  'CryptoMarkets': 'r/Cryptomarkets',
  'dogecoin': 'r/Dogecoin',
  'Electroneum': 'r/Electroneum',
  'ethereum': 'r/Ethereum',
  'gridcoin': 'r/gridcoin',
  'Groestlcoin': 'r/Groestlcoin',
  'icon': 'r/icon',
  'Iota': 'r/Iota',
  'litecoin': 'r/Litecoin',
  'Lisk': 'r/Lisk',
  'Monero': 'r/Monero',
  'NEO': 'r/NEO',
  'Raiblocks': 'r/Raiblocks',
  'RequestNetwork': 'r/RequestNetwork',
  'Ripple': 'r/Ripple',
  'steemit': 'r/steemit',
  'SubstratumNetwork': 'r/Substratumnetwork',
  'Vertcoin': 'r/Vertcoin',
};

// Returns an array of [next Y coordinate to use, next id to use].
export function computeDashboardFreeValues(dashboardItems)
{
  var maxId = 0;
  var maxY = 0;
  dashboardItems.forEach((dashboardItem) => {
    maxId = Math.max(maxId, parseInt(dashboardItem.id));
    maxY = Math.max(maxY, dashboardItem.y + dashboardItem.h);
  });
  return [maxY, String(maxId + 1)];
}

export function generateIdentifier(key, value)
{
  if (!ITEM_KEY_WHITELIST.includes(key))
  {
    console.log('Invalid identifier');
    return null;
  }
  else
  {
    return `${key}${DELIMETER}${value}`;
  }
}

export function isIdentifierValid(identifier)
{
  const arr = identifier.split(DELIMETER, 2);
  const identifierKey = arr[0];
  const identifierValue = arr[1];
  return ITEM_KEY_WHITELIST.includes(identifierKey);
}

export function parseIdentifer(identifier)
{
  if (!isIdentifierValid(identifier))
  {
    console.log('Invalid identifier');
    return null;
  }
  else
  {
    return identifier.split(DELIMETER, 2);
  }
}

export function parseIdentiferKey(identifier)
{
  const arr = parseIdentifer(identifier);
  if (arr)
  {
    return arr[0];
  }
  else
  {
    return null;
  }
}
