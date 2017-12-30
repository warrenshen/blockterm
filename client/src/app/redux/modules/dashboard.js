 // @flow weak

import { List, Map } from 'immutable';
import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';
import {
  DEFAULT_PAGES_OBJECTS,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  parseIdentifer,
  parseIdentiferKey,
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
  [TOTAL_MARKET_CAP] : {
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
const APOLLO_QUERY_RESULT_CLIENT = 'APOLLO_QUERY_RESULT_CLIENT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_DASHBOARD_ITEM_STATE = 'CHANGE_DASHBOARD_PAGE_STATE';
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
  dashboardItemStates: {},
  dashboardPages: [],
  keySelectValue: '',
  selectedTab: 0,
  scrollActive: false,
  valueSelectValue: '',
};

function generateItemStatesFromPages(dashboardPages)
{
  const dashboardItemStates = {};

  dashboardPages.forEach((dashboardPage) => {
    dashboardPage.dashboardItems.forEach((dashboardItem) => {
      let {
        id,
        identifier,
      } = dashboardItem;

      const identifierKey = parseIdentiferKey(identifier);
      dashboardItemStates[identifier] = IDENTIFIER_KEY_TO_STATE_MAP[identifierKey];
    });
  });

  return dashboardItemStates;
}

export default function(state = initialState, action)
{
  let data;
  let dashboardItems;
  let dashboardPages;
  let newDashboardItems;
  let newDashboardItemStates;
  let newDashboardPage;
  let newDashboardPages;
  let oldDashboardItems;
  let oldDashboardPage;

  switch (action.type)
  {
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'CreateDashboardItemMutation':
          data = action.result.data;
          dashboardPages = state.dashboardPages;
          if (data.createDashboardItem)
          {
            dashboardPages = data.createDashboardItem.dashboardPages;
          }
          return {
            ...state,
            dashboardPages: dashboardPages,
          };
        case 'DestroyDashboardItemMutation':
          data = action.result.data;
          dashboardPages = state.dashboardPages;
          if (data.destroyDashboardItem)
          {
            dashboardPages = data.destroyDashboardItem.dashboardPages;
          }
          return {
            ...state,
            dashboardPages: dashboardPages,
          };
      }
      return state;
    case APOLLO_QUERY_RESULT:
    case APOLLO_QUERY_RESULT_CLIENT:
      switch (action.operationName)
      {
        case 'DashboardPagesQuery':
          data = action.result.data;
          if (data)
          {
            if (data.user === null)
            {
              const cookieDashboardPages = getItem(DASHBOARD_COOKIE);
              if (cookieDashboardPages)
              {
                // TODO: validate cookie here and clear if invalid.
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
              dashboardPages = data.user.dashboardPages;
            }
          }

          return {
            ...state,
            dashboardItemStates: generateItemStatesFromPages(dashboardPages),
            dashboardPages: dashboardPages,
          };
        case 'DynamicDashboardQuery':
          return {
            ...state,
            dashboardData: {
              ...state.dashboardData,
              ...action.result.data,
            },
          };
      }
      return state;
    case CHANGE_DASHBOARD_ITEM_STATE:
      newDashboardItemStates = {
        ...state.dashboardItemStates,
        [action.identifier]: {
          ...state.dashboardItemStates[action.identifier],
          [action.key]: action.value,
        },
      };
      return {
        ...state,
        dashboardItemStates: newDashboardItemStates,
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
      const newDashboardItem = action.value;
      oldDashboardPage = Map(state.dashboardPages[state.selectedTab]);
      oldDashboardItems = oldDashboardPage.get('dashboardItems');
      newDashboardItems = List(oldDashboardItems).push(newDashboardItem);
      newDashboardPage = oldDashboardPage.set('dashboardItems', newDashboardItems);
      newDashboardPages = List(state.dashboardPages).set(state.selectedTab, newDashboardPage);

      const newIdentifier = newDashboardItem.identifier;
      const identifierKey = parseIdentiferKey(newIdentifier);
      newDashboardItemStates = {
        ...state.dashboardItemStates,
        [newIdentifier]: IDENTIFIER_KEY_TO_STATE_MAP[identifierKey],
      };

      setItem(DASHBOARD_COOKIE, newDashboardPages.toJS());
      return {
        ...state,
        dashboardItemStates: newDashboardItemStates,
        dashboardPages: newDashboardPages.toJS(),
      };
    case DESTROY_DASHBOARD_ITEM_LOCAL:
      oldDashboardPage = Map(state.dashboardPages[state.selectedTab]);
      oldDashboardItems = oldDashboardPage.get('dashboardItems');
      newDashboardItems = oldDashboardItems.filter(
        (dashboardItem) => dashboardItem.id !== action.value
      );
      newDashboardPage = oldDashboardPage.set('dashboardItems', newDashboardItems);
      newDashboardPages = List(state.dashboardPages).set(state.selectedTab, newDashboardPage);
      setItem(DASHBOARD_COOKIE, newDashboardPages.toJS());
      return {
        ...state,
        dashboardPages: newDashboardPages.toJS(),
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
      oldDashboardPage = Map(state.dashboardPages[state.selectedTab]);
      newDashboardPage = oldDashboardPage.set('dashboardItems', action.value);
      newDashboardPages = List(state.dashboardPages).set(state.selectedTab, newDashboardPage);
      setItem(DASHBOARD_COOKIE, newDashboardPages.toJS());
      return {
        ...state,
        dashboardPages: newDashboardPages.toJS(),
      };
    default:
      return state;
  }
}

export function changeDashboardItemState(identifier, key, value)
{
  return {
    identifier: identifier,
    key: key,
    type: CHANGE_DASHBOARD_ITEM_STATE,
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
