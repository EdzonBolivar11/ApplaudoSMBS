/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import Reducers from './reducers';

const StorageConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0,
};

const PersistedReducer = persistReducer(StorageConfig, Reducers);

const configureStore = () => {
    return createStore(
        PersistedReducer,
        compose(applyMiddleware(thunk, promise, logger)),
    );
};

const Store = configureStore();
const Persist = persistStore(Store);

export { Store, Persist };
