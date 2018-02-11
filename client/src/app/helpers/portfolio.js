export function calculatePortfolioTotalValue(tokenUsers, attributePrice)
{
  return tokenUsers.reduce(
    (accum, tokenUser) => {
      const price = tokenUser.tokenExchange[attributePrice];
      if (price === undefined)
      {
        return accum;
      }
      else
      {
        return accum + tokenUser.amount * price;
      }
    },
    0,
  );
}

export function calculatePortfolioChange(
  tokenUsers,
  attributePrice, // ex. priceUSD
  attributePercentChange, // ex. percentChange24hUSD
)
{
  const totalValue = calculatePortfolioTotalValue(tokenUsers, attributePrice);
  return tokenUsers.reduce(
    (accum, tokenUser) => {
      const percentChange = tokenUser.tokenExchange.token[attributePercentChange];
      return accum + tokenUser.amount * tokenUser.tokenExchange[attributePrice] / totalValue * percentChange / 100;
    },
    0,
  );
}

export function generateEmptyDonut(nightMode = false) {
    const emptyDonut = {
    labels: [
      'N/A',
    ],
    datasets: [{
      data: [1],
      backgroundColor: [
        nightMode? '#aaa': '#ddd',
      ],
      borderColor: [
        nightMode ? '#fff' : '#999',
      ],
      borderWidth: [
        1.5,
      ],
    }],
  };
  return emptyDonut;
}

export function calculatePortfolioDonutData(
  tokenUsers,
  priceAttribute,
  nightMode,
)
{
  // TODO: hide small assets.
  if (tokenUsers.length === 0)
  {
    return generateEmptyDonut(nightMode);
  }

  const portfolioTotalValue = calculatePortfolioTotalValue(tokenUsers, priceAttribute);

  const shortNameToValue = {};
  tokenUsers.forEach((tokenUser) => {
    const shortName = tokenUser.tokenExchange.token.shortName;
    const tokenUserValue = tokenUser.amount * tokenUser.tokenExchange[priceAttribute]
    if (shortNameToValue[shortName] !== undefined)
    {
      shortNameToValue[shortName] += tokenUserValue;
    }
    else
    {
      shortNameToValue[shortName] = tokenUserValue;
    }
  });

  // Tokens that make up at least 0.5% of portfolio.
  const distribution = Object.entries(shortNameToValue)
    .filter(
      ([shortName, value]) => value / portfolioTotalValue > 0.005
    )
    .map(
      ([shortName, value]) => value
    );
  const legend = Object.entries(shortNameToValue)
    .filter(
      ([shortName, value]) => value / portfolioTotalValue > 0.005
    )
    .map(
      ([shortName, value]) => shortName
    );

  if (distribution.reduce((a, b) => a + b, 0) <= 0 || distribution.includes(NaN))
  {
    return generateEmptyDonut(nightMode);
  }

  const borderColor = nightMode ? '#fff' : '#999';

  return ({
    labels: legend,
    datasets: [{
      data: distribution,
      backgroundColor: [
        '#F44336',
        '#3F51B5',
        '#009688',
        '#FFEB3B',
        '#795548',

        '#E91E63',
        '#2196F3',
        '#4CAF50',
        '#FFC107',
        '#607D8B',

        '#9C27B0',
        '#03A9F4',
        '#8BC34A',
        '#FF9800',
        '#9E9E9E',

        '#673AB7',
        '#00BCD4',
        '#CDDC39',
        '#FF5722', //18 total right now

        '#FFC312',  //dutch palette flat ui colors
        '#C4E538',
        '#12CBC4',
        '#FDA7DF',
        '#ED4C67',
        '#F79F1F',
        '#A3CB38',
        '#1289A7',
        '#D980FA',
        '#B53471',
        '#EE5A24',
        '#009432',
        '#0652DD',
        '#9980FA',
        '#833471',
        '#EA2027',
        '#006266',
        '#1B1464',
        '#5758BB',
        '#6F1E51',
      ],
      borderColor: [borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor],
      borderWidth: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
    }],
  });
}
