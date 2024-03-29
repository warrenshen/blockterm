 // @flow weak

import { List, Map } from 'immutable';
import {
  GT_ONE_MONTH,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';
import {
  DEFAULT_PAGES_OBJECTS,
  GT_CHART_ITEM,
  PERCENT_DOMINANCE_ITEM,
  PORTFOLIO_ITEM,
  PORTFOLIO_HISTORY_ITEM,
  SUBREDDIT_COMMENT_COUNTS,
  SUBREDDIT_POST_COUNTS,
  TOTAL_MARKET_CAP,
  TV_CANDLE_CHART,
  TV_MARKET_OVERVIEW,
  parseIdentiferKey,
} from '../../constants/items';
import {
  AUTH_TOKEN_COOKIE,
  DASHBOARD_COOKIE,
  PORTFOLIO_DASHBOARD_SORT_BY_COOKIE,
  SELECTED_TAB_COOKIE,
  clearItem,
  getItem,
  setItem,
} from '../../services/cookie';

const IDENTIFIER_KEY_TO_STATE_MAP = {
  [GT_CHART_ITEM]: {
    plotRange: GT_ONE_MONTH,
  },
  [PERCENT_DOMINANCE_ITEM]: {
    plotRange: ONE_WEEK,
  },
  [PORTFOLIO_ITEM]: {},
  [PORTFOLIO_HISTORY_ITEM]: {
    plotRange: ONE_WEEK,
  },
  [SUBREDDIT_POST_COUNTS]: {
    plotRange: ONE_MONTH,
  },
  [SUBREDDIT_COMMENT_COUNTS]: {
    plotRange: ONE_MONTH,
  },
  [TOTAL_MARKET_CAP] : {
    plotRange: ONE_WEEK,
  },
  [TV_CANDLE_CHART]: {},
  [TV_MARKET_OVERVIEW]: {},
};

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_QUERY_RESULT_CLIENT = 'APOLLO_QUERY_RESULT_CLIENT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_DASHBOARD_ITEM_STATE = 'CHANGE_DASHBOARD_PAGE_STATE';
const CHANGE_KEY_SELECT_VALUE = 'CHANGE_KEY_SELECT_VALUE';
const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';
const CHANGE_PORTFOLIO_DASHBOARD_SORT_BY = 'CHANGE_PORTFOLIO_DASHBOARD_SORT_BY';
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

function getInitialDashboardPages()
{
  if (!getItem(AUTH_TOKEN_COOKIE))
  {
    let cookieDashboardPages = getItem(DASHBOARD_COOKIE);
    let dashboardItemStates;
    let dashboardPages;

    if (cookieDashboardPages)
    {
      dashboardPages = cookieDashboardPages;
    }
    else
    {
      setItem(DASHBOARD_COOKIE, DEFAULT_PAGES_OBJECTS);
      dashboardPages = DEFAULT_PAGES_OBJECTS;
    }

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

    return [dashboardPages, dashboardItemStates];
  }
  else
  {
    return [[], {}];
  }
}

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const cookiePortfolioSortBy = getItem(PORTFOLIO_DASHBOARD_SORT_BY_COOKIE);
const cookieSelectedTab = getItem(SELECTED_TAB_COOKIE) || 0;
const [initialDashboardPages, initialDashboardItemStates] = getInitialDashboardPages();
const initialState = {
  dashboardAction: false,
  dashboardData: null,
  dashboardItemStates: initialDashboardItemStates,
  dashboardPages: initialDashboardPages,
  keySelectValue: '',
  modalIdentifier: null,
  portfolioSortBy: cookiePortfolioSortBy,
  selectedTab: cookieSelectedTab,
  sidebarDashboardItemId: null,
  sidebarMode: null,
  valueSelectValue: '',
};

export default function(state = initialState, action)
{
  let cookieDashboardPages;
  let data;
  let dashboardItems;
  let dashboardItemStates
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
      data = action.result.data;
      switch (action.operationName)
      {
        case 'CreateDashboardItemMutation':
          dashboardPages = data.user.dashboardPages;
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
            valueSelectValue: initialState.valueSelectValue,
          };
        case 'DestroyDashboardItemMutation':
        case 'UpdateDashboardItemsMutation':
        case 'UpdateDashboardPagesMutation':
          dashboardPages = data.user.dashboardPages;
          const selectedTab = state.selectedTab > dashboardPages.length ? 0 : state.selectedTab;
          setItem(SELECTED_TAB_COOKIE, selectedTab);
          return {
            ...state,
            dashboardPages: data.user.dashboardPages,
            selectedTab: selectedTab,
          };
        case 'UpdateDashboardItemMutation':
          dashboardPages = data.user.dashboardPages;
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
            keySelectValue: initialState.keySelectValue,
            sidebarMode: initialState.sidebarMode,
            valueSelectValue: initialState.valueSelectValue,
          };
        default:
          return state;
      }
    case APOLLO_QUERY_RESULT:
    case APOLLO_QUERY_RESULT_CLIENT:
      switch (action.operationName)
      {
        case 'DashboardPagesQuery':
          data = action.result.data;
          try
          {
            dashboardPages = data.user.dashboardPages;
            dashboardItemStates = generateItemStatesFromPages(dashboardPages);
          }
          catch (err)
          {
            // TODO: log these errors to server.
            dashboardPages = DEFAULT_PAGES_OBJECTS;
            dashboardItemStates = generateItemStatesFromPages(dashboardPages);
            clearItem(AUTH_TOKEN_COOKIE);
            clearItem(DASHBOARD_COOKIE);
            window.location = '/';
          }

          return {
            ...state,
            dashboardItemStates: dashboardItemStates,
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
        default:
          return state;
      }
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
    case CHANGE_MODAL_STATE:
      return {
        ...state,
        modalIdentifier: action.modalIdentifier,
      };
    case CHANGE_PORTFOLIO_DASHBOARD_SORT_BY:
      const newPortfolioSortBy = state.portfolioSortBy !== action.sortBy ?
                                   action.sortBy :
                                   null;
      setItem(PORTFOLIO_DASHBOARD_SORT_BY_COOKIE, newPortfolioSortBy);
      return {
        ...state,
        portfolioSortBy: newPortfolioSortBy,
      };
    case CHANGE_SELECTED_TAB:
      setItem(SELECTED_TAB_COOKIE, action.value);
      return {
        ...state,
        modalIdentifier: null,
        selectedTab: action.value,
      };
    case CHANGE_SIDEBAR_MODE:
      return {
        ...state,
        keySelectValue: initialState.keySelectValue,
        modalIdentifier: null,
        sidebarDashboardItemId: action.dashboardItemId,
        sidebarMode: action.sidebarMode,
        valueSelectValue: initialState.valueSelectValue,
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
        valueSelectValue: initialState.valueSelectValue,
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
      oldDashboardItemIndex = oldDashboardItems.findIndex(
        (dashboardItem) => dashboardItem.id === action.id
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
        keySelectValue: initialState.keySelectValue,
        sidebarMode: initialState.sidebarMode,
        valueSelectValue: initialState.valueSelectValue,
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

export function changeModalState(modalIdentifier)
{
  return {
    type: CHANGE_MODAL_STATE,
    modalIdentifier: modalIdentifier,
  };
}

export function changePortfolioDashboardSortBy(sortBy)
{
  return {
    sortBy: sortBy,
    type: CHANGE_PORTFOLIO_DASHBOARD_SORT_BY,
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

export function saveDashboardItemsLocal(value)
{
  return {
    type: SAVE_DASHBOARD_ITEMS_LOCAL,
    value: value,
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
