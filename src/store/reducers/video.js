import * as ActionTypes from '../actions/types';

export const Video = (
  state = {isLoading: false, errMess: null, add: [], video: []},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_VIDEO:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        add: data,
      };

    case ActionTypes.FETCH_VIDEO:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        video: action.payload,
      };

    case ActionTypes.VIDEO_LOADING:
      return {...state, isLoading: true, errMess: null, add: []};

    case ActionTypes.VIDEO_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        video: [],
      };

    case ActionTypes.REMOVE_VIDEO:
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
