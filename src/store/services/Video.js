import * as ActionTypes from '../actions/types';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const getVideo = (input) => (dispatch) => {
  dispatch(videoLoading(true));
  firestore()
    .collection('videos')
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        storage()
          .ref('profile/')
          .child(doc.data().uid + '.jpg')
          .getDownloadURL()
          .then((res) => {
            doc.data().profile = res;
          });

        firestore()
          .collection('likes')
          .where('vid', '==', doc.id)
          .where('uid', '==', input.user.uid)
          .get()
          .then((snap) => {
            snap.forEach((data) => {
              if (data._exists === true) {
                doc.data().like = true;
              }
            });
          });
        data.push(doc.data());
      });
      dispatch(fetchVideo(data));
    })
    .catch((error) => dispatch(videoFailed(error)));
};

export const postVideo = (data) => (dispatch) => {
  let uuid = uuidv4();

  dispatch(videoLoading(true));
  storage()
    .ref(uuid + '.mp4')
    .putFile(data.video.uri)
    .on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage()
          .ref()
          .child(uuid + '.mp4')
          .getDownloadURL()
          .then((res) => {
            firestore()
              .collection('videos')
              .doc(uuid + '.mp4')
              .set({
                id: uuid + '.mp4',
                url: res,
                uid: data.user.uid,
              });
            dispatch(addVideo(res));
          })
          .catch((error) => dispatch(videoFailed(error)));
      },
    );
};

export const videoLoading = () => ({
  type: ActionTypes.VIDEO_LOADING,
});

export const videoFailed = (errmess) => ({
  type: ActionTypes.VIDEO_FAILED,
  payload: errmess,
});

export const addVideo = (add) => ({
  type: ActionTypes.ADD_VIDEO,
  payload: add,
});

export const fetchVideo = (video) => ({
  type: ActionTypes.FETCH_VIDEO,
  payload: video,
});

export const removeVideo = () => ({
  type: ActionTypes.REMOVE_VIDEO,
  payload: [],
});
