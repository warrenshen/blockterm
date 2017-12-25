// @flow weak

import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';
import {
  SUBREDDIT_POST_COUNTS,
  TV_CANDLE_CHART,
  parseIdentifer,
} from '../../constants/items';

const IDENTIFIER_KEY_TO_STATE_MAP = {
  [SUBREDDIT_POST_COUNTS]: {
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
const CHANGE_KEY_SELECT_VALUE = 'CHANGE_KEY_SELECT_VALUE';
const CHANGE_VALUE_SELECT_VALUE = 'CHANGE_VALUE_SELECT_VALUE';
const REGISTER_DASHBOARD_ITEM = 'REGISTER_DASHBOARD_ITEM';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  keySelectValue: '',
  valueSelectValue: '',
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case CHANGE_DASHBOARD_ITEM_PLOT_RANGE:
      var id = action.id;
      var value = action.value;
      return {
        ...state,
        [id]: Object.assign({}, state[id], { plotRange: value }),
      };
    case CHANGE_KEY_SELECT_VALUE:
      return {
        ...state,
        keySelectValue: action.value,
      };
    case CHANGE_VALUE_SELECT_VALUE:
      return {
        ...state,
        valueSelectValue: action.value,
      };
    case REGISTER_DASHBOARD_ITEM:
      const dashboardItem = action.value;
      var {
        id,
        identifier,
      } = dashboardItem;

      const arr = parseIdentifer(identifier);
      const identifierKey = arr[0];
      const identifierValue = arr[1];

      return {
        ...state,
        [id]: Object.assign({}, IDENTIFIER_KEY_TO_STATE_MAP[identifierKey]),
      };
    default:
      return state;
  }
}

export function changeDashboardItemPlotRange(dashboardItemId, value)
{
  return {
    id: dashboardItemId,
    type: CHANGE_DASHBOARD_ITEM_PLOT_RANGE,
    value: value,
  };
}

export function changeKeySelectValue(value)
{
  return {
    type: CHANGE_KEY_SELECT_VALUE,
    value: value,
  };
}

export function changeValueSelectValue(value)
{
  return {
    type: CHANGE_VALUE_SELECT_VALUE,
    value: value,
  };
}

export function registerDashboardItem(dashboardItem)
{
  return {
    type: REGISTER_DASHBOARD_ITEM,
    value: dashboardItem,
  };
}
