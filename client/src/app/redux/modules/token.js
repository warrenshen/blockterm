// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHANGE_SELECTED_TICKER = 'CHANGE_SELECTED_TICKER';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  selectedTicker: '',
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case CHANGE_SELECTED_TICKER:
      return {
        ...state,
        selectedTicker: action.value,
      };
    default:
      return state;
  }
}

export function changeSelectedTicker(value)
{
  return {
    type: CHANGE_SELECTED_TICKER,
    value: value,
  };
}
