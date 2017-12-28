// @flow weak

import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';
import {
  DEFAULT_PAGES_OBJECTS,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  parseIdentifer,
} from '../../constants/items';
import {
  DASHBOARD_COOKIE,
  getItem,
  setItem,
} from '../../services/cookie';

const IDENTIFIER_KEY_TO_STATE_MAP = {
  [SUBREDDIT_POST_COUNTS]: {
    plotRange: ONE_MONTH,
  },
  [SUBREDDIT_COMMENT_COUNTS]: {
    plotRange: ONE_MONTH,
  },
  [TV_CANDLE_CHART]: {},
  [TV_MARKET_OVERVIEW]: {},
  'TOKEN-PRICE': {
    plotRange: ONE_DAY,
  },
};

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_DASHBOARD_ITEM_PLOT_RANGE = 'CHANGE_DASHBOARD_ITEM_PLOT_RANGE';
const CHANGE_DASHBOARD_PAGE_STATE = 'CHANGE_DASHBOARD_PAGE_STATE';
const CHANGE_KEY_SELECT_VALUE = 'CHANGE_KEY_SELECT_VALUE';
const CHANGE_SCROLL_ACTIVE = 'CHANGE_SCROLL_ACTIVE';
const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
const CHANGE_VALUE_SELECT_VALUE = 'CHANGE_VALUE_SELECT_VALUE';
const CREATE_DASHBOARD_ITEM_LOCAL = 'CREATE_DASHBOARD_ITEM_LOCAL';
const DESTROY_DASHBOARD_ITEM_LOCAL = 'DESTROY_DASHBOARD_ITEM_LOCAL';
const LOG_DASHBOARD_ACTION_START = 'LOG_DASHBOARD_ACTION_START';
const LOG_DASHBOARD_ACTION_STOP = 'LOG_DASHBOARD_ACTION_STOP';
const SAVE_DASHBOARD_ITEMS_LOCAL = 'SAVE_DASHBOARD_ITEMS_LOCAL';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  dashboardAction: false,
  dashboardData: null,
  dashboardPages: {},
  keySelectValue: '',
  dashboardPagesStates: {},
  selectedTab: '0',
  scrollActive: false,
  valueSelectValue: '',
};

export default function(state = initialState, action)
{
  let data;
  let dashboardItems;
  let dashboardPages;
  let dashboardPagesStates;
  let newDashboardItems;
  let newDashboardPages;

  switch (action.type)
  {
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'CreateDashboardItemMutation':
          data = action.result.data;
          if (data.createDashboardItem)
          {
            dashboardItems = data.createDashboardItem.dashboardItems;
          }
          return {
            ...state,
            dashboardItems: dashboardItems,
          };
        case 'DestroyDashboardItemMutation':
          data = action.result.data;
          if (data.destroyDashboardItem)
          {
            DashboardItemsQuery = data.destroyDashboardItem.dashboardItems;
          }
          return {
            ...state,
            dashboardItems: dashboardItems,
          };
      }
      return state;
    case APOLLO_QUERY_RESULT:
      switch (action.operationName)
      {
        case 'DashboardItemsQuery':
          data = action.result.data;
          if (data)
          {
            if (data.user === null)
            {
              const cookieDashboardPages = getItem(DASHBOARD_COOKIE);
              if (cookieDashboardPages)
              {
                dashboardPages = cookieDashboardPages;
              }
              else
              {
                setItem(DASHBOARD_COOKIE, DEFAULT_PAGES_OBJECTS);
                dashboardPages = DEFAULT_PAGES_OBJECTS;
              }
            }
            else
            {
              // dashboardItems = data.user.dashboardItems;
            }
          }

          dashboardPagesStates = {};

          Object.entries(dashboardPages).forEach((arr) => {
            let pageId = arr[0]
            dashboardItems = arr[1];
            let dashboardPageStates = {};
            dashboardItems.forEach((dashboardItem) => {
              let {
                id,
                identifier,
              } = dashboardItem;

              const arr = parseIdentifer(identifier);
              const identifierKey = arr[0];
              dashboardPageStates[identifier] = IDENTIFIER_KEY_TO_STATE_MAP[identifierKey];
            });

            dashboardPagesStates[pageId] = dashboardPageStates;
          });

          return {
            ...state,
            dashboardPages: dashboardPages,
            dashboardPagesStates: dashboardPagesStates,
          };
        case 'DynamicDashboardQuery':

          return {
            ...state,
            dashboardData: action.result.data,
          };
      }
      return state;
    case CHANGE_DASHBOARD_ITEM_PLOT_RANGE:
      let id = action.id;
      let value = action.value;
      return {
        ...state,
        [id]: Object.assign({}, state[id], { plotRange: value }),
      };
    case CHANGE_DASHBOARD_PAGE_STATE:
      const newDashboardPagesStates = {
        ...state.dashboardPagesStates,
        [state.selectedTab]: {
          ...state.dashboardPagesStates[state.selectedTab],
          [action.identifier]: {
            ...state.dashboardPagesStates[state.selectedTab][action.identifier],
            [action.key]: action.value,
          },
        },
      };
      return {
        ...state,
        dashboardPagesStates: newDashboardPagesStates,
      };
    case CHANGE_KEY_SELECT_VALUE:
      return {
        ...state,
        keySelectValue: action.value,
      };
    case CHANGE_SCROLL_ACTIVE:
      return {
        ...state,
        scrollActive: action.value,
      };
    case CHANGE_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.value,
      };
    case CHANGE_VALUE_SELECT_VALUE:
      return {
        ...state,
        valueSelectValue: action.value,
      };
    case CREATE_DASHBOARD_ITEM_LOCAL:
      newDashboardItems = state.dashboardPages[state.selectedTab].concat([action.value]);
      newDashboardPages = {
        ...state.dashboardPages,
        [state.selectedTab]: newDashboardItems,
      };
      setItem(DASHBOARD_COOKIE, newDashboardPages);
      return {
        ...state,
        dashboardPages: newDashboardPages,
      };
    case DESTROY_DASHBOARD_ITEM_LOCAL:
      newDashboardItems = state.dashboardPages[state.selectedTab].filter(
        (dashboardItem) => dashboardItem.id !== action.value
      );
      newDashboardPages = {
        ...state.dashboardPages,
        [state.selectedTab]: newDashboardItems,
      };
      setItem(DASHBOARD_COOKIE, newDashboardPages);
      return {
        ...state,
        dashboardPages: newDashboardPages,
      };
    case LOG_DASHBOARD_ACTION_START:
      return {
        ...state,
        dashboardAction: true,
      };
    case LOG_DASHBOARD_ACTION_STOP:
      return {
        ...state,
        dashboardAction: false,
      };
    case SAVE_DASHBOARD_ITEMS_LOCAL:
      newDashboardItems = action.value;
      newDashboardPages = {
        ...state.dashboardPages,
        [state.selectedTab]: newDashboardItems,
      };
      setItem(DASHBOARD_COOKIE, newDashboardPages);
      return {
        ...state,
        dashboardPages: newDashboardPages,
      };
    default:
      return state;
  }
}

export function changeDashboardPageState(identifier, key, value)
{
  return {
    identifier: identifier,
    key: key,
    type: CHANGE_DASHBOARD_PAGE_STATE,
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

export function changeScrollActive(value)
{
  return {
    type: CHANGE_SCROLL_ACTIVE,
    value: value,
  };
}

export function changeSelectedTab(value)
{
  return {
    type: CHANGE_SELECTED_TAB,
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

export function logDashboardActionStart()
{
  return {
    type: LOG_DASHBOARD_ACTION_START,
  };
}

export function logDashboardActionStop()
{
  return {
    type: LOG_DASHBOARD_ACTION_STOP,
  };
}
