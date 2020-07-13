import * as ActionTypes from '../actions/types';

export const Offline = (
  state = {
    isOnline: true,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_ONLINE:
      return {
        ...state,
        isOnline: action.payload,
      };

    default:
      return state;
  }
};
