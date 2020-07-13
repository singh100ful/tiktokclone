import * as ActionTypes from '../actions/types';

export const Like = (
  state = {isLoading: false, errMess: null, add: [], like: []},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_LIKE:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        add: data,
      };

    case ActionTypes.FETCH_LIKE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        like: action.payload,
      };

    case ActionTypes.LIKE_LOADING:
      return {...state, isLoading: true, errMess: null, add: []};

    case ActionTypes.LIKE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        like: [],
      };

    case ActionTypes.REMOVE_LIKE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        add: action.payload,
      };

    default:
      return state;
  }
};
