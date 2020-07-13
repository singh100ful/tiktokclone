import * as ActionTypes from '../actions/types';

export const Profile = (
  state = {isLoading: false, errMess: null, add: [], profile: []},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROFILE:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        add: data,
      };

    case ActionTypes.FETCH_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        profile: action.payload,
      };

    case ActionTypes.PROFILE_LOADING:
      return {...state, isLoading: true, errMess: null, add: []};

    case ActionTypes.PROFILE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        profile: [],
      };

    case ActionTypes.REMOVE_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        add: [],
      };

    default:
      return state;
  }
};
