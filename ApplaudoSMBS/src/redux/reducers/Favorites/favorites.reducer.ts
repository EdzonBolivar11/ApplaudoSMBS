/* eslint-disable prettier/prettier */
import produce from 'immer';
import { FavoritesState, SEARCH_FAVORITE, SET_FAVORITE } from './type';

const initState: FavoritesState = {
    favoriteSeries: [],
    filteredSeries: [],
};

const getTitle = (item: any) =>
    item?.attributes?.titles['en']
        ? item?.attributes?.titles['en']
        : item?.attributes?.titles['en_jp']
            ? item?.attributes?.titles['en_jp']
            : item?.attributes?.titles['en_kr']
                ? item?.attributes?.titles['en_kr']
                : 'Sin título';

const Favorites = (state = initState, action: any) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_FAVORITE:
                let currentSeries = [...state.favoriteSeries];
                if (currentSeries.some(item => item?.id === action.payload?.id)) {
                    const newSeries = currentSeries.filter(item => item?.id !== action.payload?.id);
                    draft.favoriteSeries = [...newSeries];
                    draft.filteredSeries = [...newSeries];
                } else {
                    currentSeries.push(action.payload);
                    draft.favoriteSeries = [...currentSeries];
                    draft.filteredSeries = [...currentSeries];
                }
                break;
            case SEARCH_FAVORITE:
                const text = action.payload.toLowerCase();
                if (action.payload !== '') {
                    draft.filteredSeries = draft.favoriteSeries.filter(item => getTitle(item).toLowerCase().includes(text));
                } else {
                    draft.filteredSeries = [...draft.favoriteSeries];
                }
                break;
            default:
                return state;
        }
    });

export default Favorites;
