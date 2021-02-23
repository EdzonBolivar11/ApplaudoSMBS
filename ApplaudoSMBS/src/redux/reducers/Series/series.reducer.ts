/* eslint-disable prettier/prettier */
import {
    CLEAR_CATEGORIES,
    CLEAR_SERIES,
    RESTART_SERIES,
    SAVE_SERIES,
    SET_CATEGORIES,
    SET_LOADING,
    SET_MANGA,
} from './types';
/* eslint-disable prettier/prettier */
import produce from 'immer';
import { SeriesState } from './types';

const initState: SeriesState = {
    animeCategory: [],
    mangaCategory: [],
    animeSeries: [],
    mangaSeries: [],
    loading: false,
};

const Series = (state = initState, action: any) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_LOADING:
                draft.loading = action.payload;
                break;
            case SET_CATEGORIES:
                const categories = action.payload;
                if (action.category === 'anime') {
                    draft.animeCategory = action.clear ? categories : [...state.animeCategory, ...categories];
                } else {
                    draft.mangaCategory = action.clear ? categories : [...state.mangaCategory, ...categories];
                }
                break;
            case SET_MANGA:
                draft.mangaCategory = action.payload;
                break;
            case SAVE_SERIES:
                const currentSeries = action.payload;
                if (action.category === 'anime') {
                    const animeSeries = [...state.animeSeries];

                    const index = animeSeries.findIndex(category => category?.categoryId === currentSeries.categoryId);
                    if (index === -1) {
                        animeSeries.push(currentSeries);
                    } else {
                        animeSeries[index] = currentSeries;
                    }

                    draft.animeSeries = animeSeries;
                } else {
                    const mangaSeries = [...state.mangaSeries];
                    const index = mangaSeries.findIndex(category => category?.categoryId === currentSeries.categoryId);

                    if (index === -1) {
                        mangaSeries.push(currentSeries);
                    } else {
                        mangaSeries[index] = currentSeries;
                    }
                    draft.mangaSeries = mangaSeries;
                }
                break;
            case CLEAR_CATEGORIES:
                draft.animeCategory = [];
                draft.mangaCategory = [];
                break;
            case CLEAR_SERIES:
                draft.animeSeries = [];
                draft.mangaSeries = [];
                break;
            case RESTART_SERIES:
                return { ...initState };
            default:
                return state;
        }
    });

export default Series;
