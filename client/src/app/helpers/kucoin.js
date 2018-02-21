import ccxt from 'ccxt';

function getKucoin()
{
  const kucoin = new ccxt.kucoin();
  if (process.env.NODE_ENV === 'dev')
  {
    kucoin.proxy = 'http://localhost:9876/';
  }
  else
  {
    kucoin.proxy = 'https://cors.blockterm.com/';
  }
  return kucoin;
}

async function fetchOHLCVTickers(symbol, fromUnix, toUnix, resolution)
{
  const kucoin = getKucoin();

  try
  {
    const response = await kucoin.fetchOHLCV(
      symbol,
      undefined,
      undefined,
      undefined,
      {
        from: fromUnix,
        to: toUnix,
        resolution: resolution,
      },
    );
    return response;
  }
  catch (error)
  {
    console.log(error);
    return [];
  }
}

export async function fetchFormattedOHLCVTickers(symbol, fromUnix, toUnix, resolution)
{
  const response = await fetchOHLCVTickers(
    symbol,
    fromUnix,
    toUnix,
    resolution,
  );
  return response.map(
    ([time, open, high, low, close, volume]) => ({
      time: time,
      open,
      high,
      low,
      close,
      volume,
    })
  );
}
