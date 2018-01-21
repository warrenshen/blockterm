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
const CHANGE_PRICE_PLOT_RANGE = 'CHANGE_PRICE_PLOT_RANGE';
const CHANGE_MENTION_TOTAL_PLOT_RANGE = 'CHANGE_MENTION_TOTAL_PLOT_RANGE';
const CHANGE_MENTION_SUBREDDIT_PLOT_RANGE = 'CHANGE_MENTION_SUBREDDIT_PLOT_RANGE';
const CHANGE_SUBSCRIBER_COUNT_PLOT_RANGE = 'CHANGE_SUBSCRIBER_COUNT_PLOT_RANGE';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  activeUserCountPlotRange: ONE_MONTH,
  commentCountPlotRange: ONE_MONTH,
  postCountPlotRange: ONE_MONTH,
  pricePlotRange: ONE_WEEK,
  mentionSubredditPlotRange: ONE_MONTH,
  mentionTotalPlotRange: ONE_MONTH,
  subscriberCountPlotRange: ONE_MONTH,
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
    case CHANGE_MENTION_SUBREDDIT_PLOT_RANGE:
      return {
        ...state,
        mentionSubredditPlotRange: action.value,
      };
    case CHANGE_MENTION_TOTAL_PLOT_RANGE:
      return {
        ...state,
        mentionTotalPlotRange: action.value,
      };
    case CHANGE_PRICE_PLOT_RANGE:
      return {
        ...state,
        pricePlotRange: action.value,
      };
    case CHANGE_SUBSCRIBER_COUNT_PLOT_RANGE:
      return {
        ...state,
        subscriberCountPlotRange: action.value,
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

export function changePricePlotRange(value)
{
  return {
    type: CHANGE_PRICE_PLOT_RANGE,
    value: value,
  };
}

export function changeMentionSubredditPlotRange(value)
{
  return {
    type: CHANGE_MENTION_SUBREDDIT_PLOT_RANGE,
    value: value,
  };
}

export function changeMentionTotalPlotRange(value)
{
  return {
    type: CHANGE_MENTION_TOTAL_PLOT_RANGE,
    value: value,
  };
}

export function changeSubscriberCountPlotRange(value)
{
  return {
    type: CHANGE_SUBSCRIBER_COUNT_PLOT_RANGE,
    value: value,
  };
}
