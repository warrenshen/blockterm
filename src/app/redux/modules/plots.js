// @flow weak

import {
  ONE_WEEK,
  ONE_MONTH,
} from '../../constants/plots';

/* -----------------------------------------
  constants
 ------------------------------------------*/
const CHANGE_ACTIVE_USER_COUNT_PLOT_RANGE = 'CHANGE_ACTIVE_USER_COUNT_PLOT_RANGE';
const CHANGE_COMMENT_COUNT_PLOT_RANGE = 'CHANGE_COMMENT_COUNT_PLOT_RANGE';
const CHANGE_POST_COUNT_PLOT_RANGE = 'CHANGE_POST_COUNT_PLOT_RANGE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  activeUserCountPlotRange: ONE_WEEK,
  commentCountPlotRange: ONE_MONTH,
  postCountPlotRange: ONE_MONTH,
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case CHANGE_ACTIVE_USER_COUNT_PLOT_RANGE:
      return {
        ...state,
        activeUserCountPlotRange: action.value,
      };
    case CHANGE_COMMENT_COUNT_PLOT_RANGE:
      return {
        ...state,
        commentCountPlotRange: action.value,
      };
    case CHANGE_POST_COUNT_PLOT_RANGE:
      return {
        ...state,
        postCountPlotRange: action.value,
      };
    default:
      return state;
  }
}

export function changeActiveUserCountPlotRange(value)
{
  return {
    type: CHANGE_ACTIVE_USER_COUNT_PLOT_RANGE,
    value: value,
  };
}

export function changeCommentCountPlotRange(value)
{
  return {
    type: CHANGE_COMMENT_COUNT_PLOT_RANGE,
    value: value,
  };
}

export function changePostCountPlotRange(value)
{
  return {
    type: CHANGE_POST_COUNT_PLOT_RANGE,
    value: value,
  };
}
