export const apiCategory =
    'https://kitsu.io/api/edge/categories/?page%5Blimit%5D=10&page%5Boffset%5D=';

export const apiSearchText = (type: string, text: string) => {
    return `https://kitsu.io/api/edge/${type}?filter[text]=${text.replace(
        ' ',
        '%20',
    )}`;
};
