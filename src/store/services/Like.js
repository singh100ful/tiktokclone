import * as ActionTypes from '../actions/types';
import firestore from '@react-native-firebase/firestore';

export const postLike = (data) => (dispatch) => {
  dispatch(likeLoading(true));
  if (data.like === true) {
    firestore()
      .collection('likes')
      .add({uid: data.user.uid, vid: data.video.id})
      .then((res) => {
        dispatch(addLike(res));
      })
      .catch((error) => likeFailed(error));
  } else {
    firestore()
      .collection('likes')
      .where('vid', '==', data.video.id)
      .where('uid', '==', data.user.uid)
      .get()
      .then((res) => {
        res.forEach((data) => {
          if (data._exists === true) {
            firestore().collection('likes').doc(data.id).delete();
          }
        });
        dispatch(addLike(res));
      })
      .catch((error) => likeFailed(error));
  }
};

export const likeLoading = () => ({
  type: ActionTypes.LIKE_LOADING,
});

export const likeFailed = (errmess) => ({
  type: ActionTypes.LIKE_FAILED,
  payload: errmess,
});

export const addLike = (add) => ({
  type: ActionTypes.ADD_LIKE,
  payload: add,
});

export const fetchLike = (like) => ({
  type: ActionTypes.FETCH_LIKE,
  payload: like,
});

export const removeLike = () => ({
  type: ActionTypes.REMOVE_LIKE,
  payload: [],
});
