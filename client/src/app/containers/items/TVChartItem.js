// @flow weak

import { connect } from 'react-redux';
import TVChartItem from '../../components/items/TVChartItem';

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state, ownProps) => {
  const [exchange, symbol] = ownProps.value.split(':', 2);
  const exchangesData = state.exchanges;

  return {
    ...ownProps,
    alerts: state.alerts.alerts,
    exchangeData: exchangesData[exchange] !== undefined ?
                  (exchangesData[exchange][symbol] !== undefined ?
                   exchangesData[exchange][symbol] : null) : null,
  };
};

export default connect(mapStateToProps)(TVChartItem);
