// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const UPDATE_EXCHANGE_TICKER = 'UPDATE_EXCHANGE_TICKER';

const initialState = {};

export default function(state = initialState, action)
{
  const exchange = action.exchange;
  const symbol = action.symbol;

  switch (action.type)
  {
    case UPDATE_EXCHANGE_TICKER:
      return {
        ...state,
        [exchange]: {
          [symbol]: action.ticker,
        },
      };
    default:
      return state;
  }
}

export function updateExchangeTicker(exchange, symbol, ticker)
{
  return {
    exchange,
    symbol,
    ticker,
    type: UPDATE_EXCHANGE_TICKER,
  };
}
