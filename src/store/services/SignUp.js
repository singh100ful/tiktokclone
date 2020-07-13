import * as ActionTypes from '../actions/types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//SIGNUP
export const postSignup = (data) => (dispatch) => {
  dispatch(signupLoading(true));
  auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((res) => {
      firestore().collection('users').doc(res.user.uid).set({
        id: res.user.uid,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      });
      dispatch(addSignup(res));
    })
    .catch((error) => dispatch(signupFailed(error)));
};

export const signupLoading = () => ({
  type: ActionTypes.SIGNUP_LOADING,
});

export const signupFailed = (errmess) => ({
  type: ActionTypes.SIGNUP_FAILED,
  payload: errmess,
});

export const addSignup = (signup) => ({
  type: ActionTypes.ADD_SIGNUP,
  payload: signup,
});

export const removeSignup = () => ({
  type: ActionTypes.REMOVE_SIGNUP,
  payload: [],
});
