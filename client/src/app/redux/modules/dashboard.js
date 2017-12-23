// @flow weak

import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';

const IDENTIFIER_TO_STATE_MAP = {
  'SUBREDDIT-POSTS': {
    plotRange: ONE_WEEK,
  },
  'TOKEN-PRICE': {
    plotRange: ONE_DAY,
  },
};

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHANGE_DASHBOARD_ITEM_PLOT_RANGE = 'CHANGE_DASHBOARD_ITEM_PLOT_RANGE';
const REGISTER_DASHBOARD_ITEM = 'REGISTER_DASHBOARD_ITEM';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case CHANGE_DASHBOARD_ITEM_PLOT_RANGE:
      var id = action.id;
      var value = action.value;
      console.log(id);
      console.log(value);
      return {
        ...state,
        [id]: Object.assign({}, state[id], { plotRange: value }),
      };
    case REGISTER_DASHBOARD_ITEM:
      const dashboardItem = action.value;
      var {
        id,
        identifier,
      } = dashboardItem;
      const prefix = identifier.substring(0, identifier.lastIndexOf('-'));
      return {
        ...state,
        [id]: Object.assign({}, IDENTIFIER_TO_STATE_MAP[prefix]),
      };
    default:
      return state;
  }
}

export function registerDashboardItem(dashboardItem)
{
  return {
    type: REGISTER_DASHBOARD_ITEM,
    value: dashboardItem,
  };
}

export function changeDashboardItemPlotRange(dashboardItemId, value)
{
  console.log("yello");
  console.log(dashboardItemId);
  console.log(value);
  return {
    id: dashboardItemId,
    type: CHANGE_DASHBOARD_ITEM_PLOT_RANGE,
    value: value,
  };
}
