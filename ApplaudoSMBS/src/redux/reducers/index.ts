/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';
import Series from './Series/series.reducer';
import Favorites from './Favorites/favorites.reducer';

const Reducers = combineReducers({
    Series,
    Favorites,
});

export default Reducers;
