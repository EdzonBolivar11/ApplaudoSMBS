import React from 'react';
import {Provider} from 'react-redux';
import {Store, Persist} from './src/redux/store';
import Navigation from './Navigation';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persist}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
