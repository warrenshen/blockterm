// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const REGISTER_ITEM = 'REGISTER_ITEM';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case REGISTER_ITEM:
      const item = action.value;
      const {
        id,
      } = item;

      return {
        ...state,
        [id]: {},
      };
    default:
      return state;
  }
}

export function registerItem(item)
{
  return {
    type: REGISTER_ITEM,
    value: item,
  };
}
