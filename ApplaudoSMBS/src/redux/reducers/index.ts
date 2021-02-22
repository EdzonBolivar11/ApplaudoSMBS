/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import Series from './series.reducer';
import Favorites from './favorites.reducer';

const Reducers = combineReducers({
    Series,
    Favorites,
});

export default Reducers;
