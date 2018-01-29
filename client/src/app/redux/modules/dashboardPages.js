 // @flow weak

import { fromJS } from 'immutable';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const ADD_DASHBOARD_PAGE = 'ADD_DASHBOARD_PAGE';
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT';
const APOLLO_QUERY_RESULT_CLIENT = 'APOLLO_QUERY_RESULT_CLIENT';
const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
const CHANGE_DASHBOARD_PAGE_NAME = 'CHANGE_DASHBOARD_PAGE_NAME';
const REMOVE_DASHBOARD_PAGE = 'REMOVE_DASHBOARD_PAGE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  changeActive: false,
  dashboardPages: [],
};

function getNewIdAndIndex(dashboardPages)
{
  let newId = 0;
  let newIndex = 0;

  dashboardPages.forEach((dashboardPage) => {
    if (dashboardPage.get('id').indexOf('t') === 0)
    {
      newId = Math.max(newId, parseInt(dashboardPage.get('id').substring(1)) + 1);
    }
    newIndex = Math.max(newIndex, dashboardPage.get('index') + 1);
  });

  return [`t${newId}`, newIndex];
}

export default function(state = initialState, action)
{
  let dashboardPageIndex;
  let data;
  let newDashboardPages;
  let oldDashboardPages;

  switch (action.type)
  {
    case ADD_DASHBOARD_PAGE:
      oldDashboardPages = fromJS(state.dashboardPages);
      let [newId, newIndex] = getNewIdAndIndex(oldDashboardPages);
      const newDashboardPage = {
        dashboardItems: [],
        id: newId,
        index: newIndex,
        name: `Tab ${newIndex + 1}`,
      };
      newDashboardPages = oldDashboardPages.push(newDashboardPage);
      return {
        ...state,
        changeActive: true,
        dashboardPages: newDashboardPages.toJS(),
      };
    case APOLLO_MUTATION_RESULT:
      switch (action.operationName)
      {
        case 'CreateDashboardItemMutation':
          data = action.result.data;
          return {
            ...state,
            dashboardPages: data.user.dashboardPages,
          };
        case 'DestroyDashboardItemMutation':
          data = action.result.data;
          return {
            ...state,
            dashboardPages: data.user.dashboardPages,
          };
        case 'UpdateDashboardItemMutation':
          data = action.result.data;
          return {
            ...state,
            dashboardPages: data.user.dashboardPages,
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
          return {
            ...state,
            dashboardPages: data.user.dashboardPages,
          };
        default:
          return state;
      }
    case CHANGE_DASHBOARD_PAGE_NAME:
      oldDashboardPages = fromJS(state.dashboardPages);
      dashboardPageIndex = oldDashboardPages.findIndex(
        (dashboardPage) => dashboardPage.get('id') === action.dashboardPageId
      );
      newDashboardPages = oldDashboardPages.setIn(
        [dashboardPageIndex, 'name'],
        action.name,
      );
      return {
        ...state,
        changeActive: true,
        dashboardPages: newDashboardPages.toJS(),
      };
    case REMOVE_DASHBOARD_PAGE:
      oldDashboardPages = fromJS(state.dashboardPages);
      dashboardPageIndex = oldDashboardPages.findIndex(
        (dashboardPage) => dashboardPage.get('id') === action.dashboardPageId
      );
      newDashboardPages = oldDashboardPages.remove(dashboardPageIndex);
      newDashboardPages = newDashboardPages.map(
        (dashboardPage, index) => dashboardPage.set('index', index)
      );
      return {
        ...state,
        changeActive: true,
        dashboardPages: newDashboardPages.toJS(),
      };
    default:
      return state;
  }
}

export function addDashboardPage()
{
  return {
    type: ADD_DASHBOARD_PAGE,
  };
}

export function changeDashboardPageName(dashboardPageId, name)
{
  return {
    type: CHANGE_DASHBOARD_PAGE_NAME,
    dashboardPageId,
    name,
  };
}

export function removeDashboardPage(dashboardPageId)
{
  return {
    type: REMOVE_DASHBOARD_PAGE,
    dashboardPageId,
  };
}
