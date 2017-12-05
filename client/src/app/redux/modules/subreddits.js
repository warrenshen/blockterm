// @flow weak

/* -----------------------------------------
  constants
 ------------------------------------------*/
const ADD_SUBREDDIT_ID = 'ADD_SUBREDDIT_ID';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  subredditIds: [],
};

export default function(state = initialState, action)
{
  switch (action.type)
  {
    case ADD_SUBREDDIT_ID:
      console.log(state);
      return {
        ...state,
        subredditIds: state.subredditIds.concat([action.value])
      };
    default:
      return state;
  }
}

export function addSubredditId(value)
{
  return {
    type: ADD_SUBREDDIT_ID,
    value: value,
  };
}
