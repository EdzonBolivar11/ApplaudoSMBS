/* eslint-disable prettier/prettier */
export const SET_FAVORITE = 'SET_FAVORITE';
export const SEARCH_FAVORITE = 'SEARCH_FAVORITE';

export interface FavoritesState {
    favoriteSeries: any[];
    filteredSeries: any[];
}
