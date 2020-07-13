import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
//Reducers
import {Login} from './reducers/login';
import {SignUp} from './reducers/signup';
import {Video} from './reducers/video';
import {Profile} from './reducers/profile';
import {Like} from './reducers/like';
import {Offline} from './reducers/offline';

const config = {
  key: 'TikTik',
  version: 0,
  storage: AsyncStorage,
  whitelist: ['login'],
};

const rootReducer = persistCombineReducers(config, {
  login: Login,
  signup: SignUp,
  video: Video,
  profile: Profile,
  like: Like,
  offline: Offline,
});

let composeEnhancers = compose;

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  const persistor = persistStore(store);

  return {persistor, store};
};

export default configureStore;
