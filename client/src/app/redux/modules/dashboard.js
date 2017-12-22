// @flow weak

import {
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';

const IDENTIFIER_TO_STATE_MAP = {
  'SUBREDDIT-POSTS': {
    plotRange: ONE_WEEK,
  },
  'TOKEN-PRICE': {
    plotRange: ONE_DAY,
  },
};

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
