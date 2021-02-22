import React, {Fragment, useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store, Persist} from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './Navigation';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persist}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
