/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import Layout from './src/layout/Layout';
//Redux Store
import {Provider} from 'react-redux';
import configureStore from './src/store/store';
import {PersistGate} from 'redux-persist/es/integration/react';
//Store Config
const {persistor, store} = configureStore();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar barStyle="dark-content" />
        <Layout />
      </PersistGate>
    </Provider>
  );
};

export default App;
