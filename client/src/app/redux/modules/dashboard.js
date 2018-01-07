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
  SELECTED_TAB_COOKIE,
  clearItem,
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
const APOLLO_QUERY_ERROR = 'APOLLO_QUERY_ERROR';
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_QUERY_RESULT_CLIENT = 'APOLLO_QUERY_RESULT_CLIENT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_DASHBOARD_ITEM_STATE = 'CHANGE_DASHBOARD_PAGE_STATE';
const CHANGE_KEY_SELECT_VALUE = 'CHANGE_KEY_SELECT_VALUE';
const CHANGE_SCROLL_ACTIVE = 'CHANGE_SCROLL_ACTIVE';
const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
const CHANGE_SIDEBAR_MODE = 'CHANGE_SIDEBAR_MODE';
const CHANGE_VALUE_SELECT_VALUE = 'CHANGE_VALUE_SELECT_VALUE';
const CREATE_DASHBOARD_ITEM_LOCAL = 'CREATE_DASHBOARD_ITEM_LOCAL';
const DESTROY_DASHBOARD_ITEM_LOCAL = 'DESTROY_DASHBOARD_ITEM_LOCAL';
const LOG_DASHBOARD_ACTION_START = 'LOG_DASHBOARD_ACTION_START';
const LOG_DASHBOARD_ACTION_STOP = 'LOG_DASHBOARD_ACTION_STOP';
const SAVE_DASHBOARD_ITEMS_LOCAL = 'SAVE_DASHBOARD_ITEMS_LOCAL';
const UPDATE_DASHBOARD_ITEM_LOCAL = 'UPDATE_DASHBOARD_ITEM_LOCAL';

const SIDEBAR_MODE_ADD = 'SIDEBAR_MODE_ADD';
const SIDEBAR_MODE_EDIT = 'SIDEBAR_MODE_EDIT';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const cookieSelectedTab = getItem(SELECTED_TAB_COOKIE) || 0;
const initialState = {
  dashboardAction: false,
  dashboardData: null,
  dashboardItemStates: {},
  dashboardPages: [],
  keySelectValue: '',
  scrollActive: false,
  selectedTab: cookieSelectedTab,
  sidebarDashboardItemId: null,
  sidebarMode: null,
  user: null,
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
  let identifierKey;
  let newDashboardItem;
  let newDashboardItems;
  let newDashboardItemStates;
  let newDashboardPage;
  let newDashboardPages;
  let newIdentifier;
  let oldDashboardItem;
  let oldDashboardItemIndex;
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
            newDashboardItemStates = generateItemStatesFromPages(dashboardPages);
            return {
              ...state,
              dashboardItemStates: {
                // Note `newDashboardItemStates` is before, this is because
                // we don't want to overwrite previous dashboard item state.
                ...newDashboardItemStates,
                ...state.dashboardItemStates,
              },
              dashboardPages: dashboardPages,
            };
          }
          return state;
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
        case 'UpdateDashboardItemMutation':
          data = action.result.data;
          dashboardPages = state.dashboardPages;
          if (data.updateDashboardItem)
          {
            dashboardPages = data.updateDashboardItem.dashboardPages;
            newDashboardItemStates = generateItemStatesFromPages(dashboardPages);
            return {
              ...state,
              dashboardItemStates: {
                // Note `newDashboardItemStates` is before, this is because
                // we don't want to overwrite previous dashboard item state.
                ...newDashboardItemStates,
                ...state.dashboardItemStates,
              },
              dashboardPages: dashboardPages,
            };
          }
          return state;
        default:
          return state;
      }
    case APOLLO_QUERY_ERROR:
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
              let cookieDashboardPages = getItem(DASHBOARD_COOKIE);
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
              dashboardPages = data.user.dashboardPages;
            }
          }

          let dashboardItemStates;
          try
          {
            dashboardItemStates = generateItemStatesFromPages(dashboardPages);
          }
          catch (err)
          {
            // TODO: log these errors to server.
            dashboardPages = DEFAULT_PAGES_OBJECTS;
            dashboardItemStates = generateItemStatesFromPages(dashboardPages);
            clearItem(DASHBOARD_COOKIE);
          }

          return {
            ...state,
            dashboardItemStates: dashboardItemStates,
            dashboardPages: dashboardPages,
            user: data.user,
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
      setItem(SELECTED_TAB_COOKIE, action.value);
      return {
        ...state,
        selectedTab: action.value,
      };
    case CHANGE_SIDEBAR_MODE:
      return {
        ...state,
        keySelectValue: initialState.keySelectValue,
        valueSelectValue: initialState.valueSelectValue,
        sidebarDashboardItemId: action.dashboardItemId,
        sidebarMode: action.sidebarMode,
      };
    case CHANGE_VALUE_SELECT_VALUE:
      return {
        ...state,
        valueSelectValue: action.value,
      };
    case CREATE_DASHBOARD_ITEM_LOCAL:
      newDashboardItem = action.value;
      oldDashboardPage = Map(state.dashboardPages[state.selectedTab]);
      oldDashboardItems = oldDashboardPage.get('dashboardItems');
      newDashboardItems = List(oldDashboardItems).push(newDashboardItem);
      newDashboardPage = oldDashboardPage.set('dashboardItems', newDashboardItems);
      newDashboardPages = List(state.dashboardPages).set(state.selectedTab, newDashboardPage);

      newIdentifier = newDashboardItem.identifier;
      identifierKey = parseIdentiferKey(newIdentifier);
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
    case UPDATE_DASHBOARD_ITEM_LOCAL:
      oldDashboardPage = Map(state.dashboardPages[state.selectedTab]);
      oldDashboardItems = List(oldDashboardPage.get('dashboardItems'));
      oldDashboardItemIndex = oldDashboardItems.findIndex((dashboardItem) =>
        dashboardItem.id === action.id
      );
      oldDashboardItem = Map(oldDashboardItems.get(oldDashboardItemIndex));
      newDashboardItem = oldDashboardItem;
      if (action.static !== null)
      {
        newDashboardItem = newDashboardItem.set('static', action.static);
      }
      if (action.identifier !== null)
      {
        newDashboardItem = newDashboardItem.set('identifier', action.identifier);
      }
      newDashboardItems = oldDashboardItems.set(oldDashboardItemIndex, newDashboardItem);
      newDashboardPage = oldDashboardPage.set('dashboardItems', newDashboardItems);
      newDashboardPages = List(state.dashboardPages).set(state.selectedTab, newDashboardPage);

      // TODO: shouldn't always set item states.
      newIdentifier = newDashboardItem.get('identifier');
      identifierKey = parseIdentiferKey(newIdentifier);
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

export function changeSidebarMode(sidebarMode, dashboardItemId=null)
{
  return {
    type: CHANGE_SIDEBAR_MODE,
    dashboardItemId,
    sidebarMode,
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

export function updateDashboardItemLocal(id, identifier, staticActive)
{
  return {
    type: UPDATE_DASHBOARD_ITEM_LOCAL,
    id: id,
    identifier: identifier,
    static: staticActive,
  };
}
