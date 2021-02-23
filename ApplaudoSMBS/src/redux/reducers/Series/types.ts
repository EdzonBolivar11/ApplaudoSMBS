/* eslint-disable prettier/prettier */
export const SET_LOADING = 'SET_LOADING';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_MANGA = 'SET_MANGA';
export const SAVE_SERIES = 'SAVE_SERIES';
export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';
export const CLEAR_SERIES = 'CLEAR_SERIES';
export const RESTART_SERIES = 'RESTART_SERIES';

export interface SeriesState {
    animeCategory: any[];
    mangaCategory: any[];
    animeSeries: any[];
    mangaSeries: any[];
    loading: boolean;
}
