/* eslint-disable prettier/prettier */
import produce from 'immer';

const initState = {
    anime: [],
    manga: [],
};

const Series = (state = initState, action: any) =>
    produce(state, (draft) => {
        switch (action.type) {
            case 'SET_ANIME':
                draft.anime = action.payload;
                break;
            case 'SET_MANGA':
                draft.manga = action.payload;
                break;
            default:
                return state;
        }
    });

export default Series;
