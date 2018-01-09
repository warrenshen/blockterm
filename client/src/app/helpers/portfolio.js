
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
        nightMode ? '#fff' : '#000',
      ],
      borderWidth: [
        1.5,
      ],
    }],
  };
  return emptyDonut;
}

export function calculatePortfolioTotalValue(tokenUsers)
{
  return tokenUsers.reduce(
    (accum, tokenUser) => accum + (tokenUser.amount * tokenUser.token.priceUSD),
    0,
  );
}

export function calculatePortfolioChangeIn24h(tokenUsers)
{

}

export function calculatePortfolioChangeIn7d(tokenUsers)
{

}

export function calculatePortfolioDonutData(tokenUsers, nightMode=false)
{
  if (calculatePortfolioTotalValue(tokenUsers) <= 0) return generateEmptyDonut(nightMode);

  const legend = tokenUsers.map((tokenUser) => tokenUser.token.shortName);
  const distribution = tokenUsers.map(
    (tokenUser) => (tokenUser.amount * tokenUser.token.priceUSD)
  );
  let borderColor = nightMode ? '#fff' : '#000';

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
      ],
      borderColor: [borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor, borderColor],
      borderWidth: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
    }],
  });
}
