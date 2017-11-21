// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const TOGGLE_NIGHT_MODE = 'TOGGLE_NIGHT_MODE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  nightMode: false,
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case TOGGLE_NIGHT_MODE:
      return {
        ...state,
        nightMode: !state.nightMode,
      };
    default:
      return state;
  }
}

export function toggleNightMode()
{
  return {
    type: TOGGLE_NIGHT_MODE,
  };
}
