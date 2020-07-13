import * as ActionTypes from '../actions/types';

export const Comment = (
  state = {isLoading: false, errMess: null, add: [], comment: []},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        add: action.payload,
      };

    case ActionTypes.FETCH_COMMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comment: action.payload,
      };

    case ActionTypes.COMMENT_LOADING:
      return {...state, isLoading: true, errMess: null, add: []};

    case ActionTypes.COMMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comment: [],
      };

    case ActionTypes.REMOVE_COMMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comment: action.payload,
      };

    default:
      return state;
  }
};
