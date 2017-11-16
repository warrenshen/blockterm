// @flow weak

import { LAST_DAY } from '../../constants/plots';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHANGE_POST_COUNT_PLOT_RANGE = 'CHANGE_POST_COUNT_PLOT_RANGE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  postCountPlotRange: LAST_DAY,
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case CHANGE_POST_COUNT_PLOT_RANGE:
      return {
        ...state,
        postCountPlotRange: action.value,
      };
    default:
      return state;
  }
}

export function changePostCountPlotRange(value)
{
  return {
    type: CHANGE_POST_COUNT_PLOT_RANGE,
    value: value,
  };
}
