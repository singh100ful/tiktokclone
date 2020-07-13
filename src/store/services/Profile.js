import * as ActionTypes from '../actions/types';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const getProfile = (data) => (dispatch) => {
  dispatch(profileLoading(true));
  firestore()
    .collection('users')
    .doc(data.user.uid)
    .get()
    .then((data) => {
      dispatch(fetchProfile(data._data));
    })
    .catch((error) => dispatch(profileFailed(error)));
};

export const postProfile = (data) => (dispatch) => {
  dispatch(profileLoading(true));

  if (data.picture) {
    storage()
      .ref('profile/' + data.user.uid + '.jpg')
      .putFile(data.picture.uri)
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
            .ref('profile/')
            .child(data.user.uid + '.jpg')
            .getDownloadURL()
            .then((res) => {
              firestore().collection('users').doc(data.user.uid).update({
                picture: res,
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,
              });
              dispatch(addProfile(res));
            })
            .catch((error) => dispatch(profileFailed(error)));
        },
      );
  } else {
    firestore()
      .collection('users')
      .doc(data.user.uid)
      .update({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
      })
      .then((res) => {
        dispatch(addProfile(res));
      })
      .catch((error) => dispatch(profileFailed(error)));
  }
};

export const profileLoading = () => ({
  type: ActionTypes.PROFILE_LOADING,
});

export const profileFailed = (errmess) => ({
  type: ActionTypes.PROFILE_FAILED,
  payload: errmess,
});

export const addProfile = (add) => ({
  type: ActionTypes.ADD_PROFILE,
  payload: add,
});

export const fetchProfile = (profile) => ({
  type: ActionTypes.FETCH_PROFILE,
  payload: profile,
});

export const removeProfile = () => ({
  type: ActionTypes.REMOVE_PROFILE,
  payload: [],
});
