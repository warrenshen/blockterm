// @flow weak

import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';
import {
  DEFAULT_ITEM_OBJECTS,
  SUBREDDIT_POST_COUNTS,
  TV_CANDLE_CHART,
  parseIdentifer,
} from '../../constants/items';
import {
  DASHBOARD_COOKIE,
  getItem,
  setItem,
} from '../../services/cookie';

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
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const CHANGE_DASHBOARD_ITEM_PLOT_RANGE = 'CHANGE_DASHBOARD_ITEM_PLOT_RANGE';
const CHANGE_KEY_SELECT_VALUE = 'CHANGE_KEY_SELECT_VALUE';
const CHANGE_VALUE_SELECT_VALUE = 'CHANGE_VALUE_SELECT_VALUE';
const CREATE_DASHBOARD_ITEM_LOCAL = 'CREATE_DASHBOARD_ITEM_LOCAL';
const DESTROY_DASHBOARD_ITEM_LOCAL = 'DESTROY_DASHBOARD_ITEM_LOCAL';
const SAVE_DASHBOARD_ITEMS_LOCAL = 'SAVE_DASHBOARD_ITEMS_LOCAL';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  dashboardItems: [],
  keySelectValue: '',
  valueSelectValue: '',
};

export default function(state = initialState, action)
{
  let newDashboardItems;
  switch (action.type)
  {
    case APOLLO_QUERY_RESULT:
      if (action.operationName === 'DashboardItemsQuery')
      {
        const data = action.result.data;
        let dashboardItems;
        if (data)
        {
          if (data.user === null)
          {
            const cookieDashboardItems = getItem(DASHBOARD_COOKIE);
            if (cookieDashboardItems)
            {
              dashboardItems = cookieDashboardItems;
            }
            else
            {
              setItem(DASHBOARD_COOKIE, DEFAULT_ITEM_OBJECTS);
              dashboardItems = DEFAULT_ITEM_OBJECTS;
            }
          }
          else
          {
            dashboardItems = data.user.dashboardItems;
          }
          return {
            ...state,
            dashboardItems: dashboardItems,
          };
        }
      }
      return state;
    case CHANGE_DASHBOARD_ITEM_PLOT_RANGE:
      let id = action.id;
      let value = action.value;
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
    case CREATE_DASHBOARD_ITEM_LOCAL:
      newDashboardItems = state.dashboardItems.concat([action.value]);
      setItem(DASHBOARD_COOKIE, newDashboardItems);
      console.log(newDashboardItems);
      return {
        ...state,
        dashboardItems: newDashboardItems,
      };
    case DESTROY_DASHBOARD_ITEM_LOCAL:
      return {
        ...state,
      };
    case SAVE_DASHBOARD_ITEMS_LOCAL:
      newDashboardItems = action.value;
      setItem(DASHBOARD_COOKIE, newDashboardItems);
      console.log(newDashboardItems);
      return {
        ...state,
        dashboardItems: newDashboardItems,
      };
    // case REGISTER_DASHBOARD_ITEM:
    //   const dashboardItem = action.value;
    //   var {
    //     id,
    //     identifier,
    //   } = dashboardItem;

    //   const arr = parseIdentifer(identifier);
    //   const identifierKey = arr[0];
    //   const identifierValue = arr[1];

    //   return {
    //     ...state,
    //     [id]: Object.assign({}, IDENTIFIER_KEY_TO_STATE_MAP[identifierKey]),
    //   };
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

export function createDashboardItemLocal(value)
{
  return {
    type: CREATE_DASHBOARD_ITEM_LOCAL,
    value: value,
  };
}

export function destroyDashboardItemLocal(value)
{
  return {
    type: DESTROY_DASHBOARD_ITEM_LOCAL,
    value: value,
  };
}

export function saveDashboardItemsLocal(value)
{
  return {
    type: SAVE_DASHBOARD_ITEMS_LOCAL,
    value: value,
  };
}
