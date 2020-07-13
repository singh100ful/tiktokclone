import * as ActionTypes from '../actions/types';

export const checkOnline = (isOnline) => ({
  type: ActionTypes.ADD_ONLINE,
  payload: isOnline,
});
