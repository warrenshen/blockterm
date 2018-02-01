
export function generateEmptyDonut(nightMode=false) {
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

export function calculatePortfolioTotalValue(
  tokenUsers,
  attributePrice,
)
{
  return tokenUsers.reduce(
    (accum, tokenUser) => accum + (tokenUser.amount * tokenUser.token[attributePrice]),
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
      const percentChange = tokenUser.token[attributePercentChange];
      return accum +  tokenUser.amount * tokenUser.token[attributePrice] / totalValue * percentChange / 100;
    },
    0,
  );
}

export function calculatePortfolioDonutData(
  tokenUsers,
  priceAttribute,
  nightMode,
)
{
  if (tokenUsers.length <= 0 || calculatePortfolioTotalValue(tokenUsers) <= 0)
  {
    return generateEmptyDonut(nightMode);
  }

  const legend = tokenUsers.map((tokenUser) => tokenUser.token.shortName);
  const distribution = tokenUsers.map(
    (tokenUser) => tokenUser.amount * tokenUser.token[priceAttribute]
  );
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
