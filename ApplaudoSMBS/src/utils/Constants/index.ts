/* eslint-disable prettier/prettier */
const categories = 'https://kitsu.io/api/edge/categories/';

const searchText = (type: string, text: string) => {
    return `https://kitsu.io/api/edge/${type}?filter[text]=${text.replace(
        ' ',
        '%20',
    )}`;
};

export default {
    categories,
    searchText,
};
