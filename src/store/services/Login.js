import * as ActionTypes from '../actions/types';
import auth from '@react-native-firebase/auth';

//LOGIN
export const postLogin = (data) => (dispatch) => {
  dispatch(loginLoading(true));
  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((login) => {
      dispatch(addLogin(login));
    })
    .catch((error) => dispatch(loginFailed(error)));
};

//Logout
export const postLogout = (data) => (dispatch) => {
  dispatch(loginLoading(true));
  auth()
    .signOut()
    .then((login) => {
      dispatch(removeLogin(login));
    })
    .catch((error) => dispatch(loginFailed(error)));
};

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = (errmess) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess,
});

export const addLogin = (login) => ({
  type: ActionTypes.ADD_LOGIN,
  payload: login,
});

export const removeLogin = () => ({
  type: ActionTypes.REMOVE_LOGIN,
  payload: [],
});
