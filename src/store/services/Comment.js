import * as ActionTypes from '../actions/types';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';

export const postComment = (data) => (dispatch) => {
  dispatch(commentLoading(true));
  firestore()
    .collection('comments')
    .add({uid: data.user.uid, vid: data.video.id})
    .then((res) => {
      dispatch(addComment(res));
    })
    .catch((error) => commentFailed(error));
};

export const commentLoading = () => ({
  type: ActionTypes.VIDEO_LOADING,
});

export const commentFailed = (errmess) => ({
  type: ActionTypes.VIDEO_FAILED,
  payload: errmess,
});

export const addComment = (add) => ({
  type: ActionTypes.ADD_VIDEO,
  payload: add,
});

export const fetchComment = (comment) => ({
  type: ActionTypes.ADD_VIDEO,
  payload: comment,
});

export const removeComment = () => ({
  type: ActionTypes.REMOVE_VIDEO,
  payload: [],
});
