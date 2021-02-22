import React, {Fragment, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './Navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Fragment>
      <Navigation />
    </Fragment>
  );
};

export default App;
