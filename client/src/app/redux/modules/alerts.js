 // @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const APOLLO_QUERY_ERROR = 'APOLLO_QUERY_ERROR';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  priceValue: '',
  expiresValue: '',
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case APOLLO_MUTATION_RESULT:
    default:
      return state;
  }
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
