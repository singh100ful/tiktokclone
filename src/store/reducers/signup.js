import * as ActionTypes from '../actions/types';

export const SignUp = (
  state = {isLoading: false, errMess: null, signup: []},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_SIGNUP:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        signup: action.payload,
      };

    case ActionTypes.SIGNUP_LOADING:
      return {...state, isLoading: true, errMess: null};

    case ActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        signup: [],
      };

    case ActionTypes.REMOVE_SIGNUP:
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
