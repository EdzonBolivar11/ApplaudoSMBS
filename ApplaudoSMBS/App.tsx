import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Store, Persist} from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox} from 'react-native';
import Toastr from './src/components/Toastr';

LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Toastr>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persist}>
          <Navigation />
        </PersistGate>
      </Provider>
    </Toastr>
  );
};

export default App;
