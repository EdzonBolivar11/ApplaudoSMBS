/* eslint-disable prettier/prettier */
import { ImageSourcePropType } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

//Navigation
type SearchStack = {
    Search: undefined;
    DetailsSerie: undefined;
};

export interface Field {
    id: string;
    icon: ImageSourcePropType;
    value: string;
}

export interface Section {
    id: string;
    title: string;
    fields: Field[];
}

export interface SectionProps {
    section: Section;
}

export interface FieldProps {
    field: Field;
}

//Components
//Screen
export interface ScreenProps {
    scrollBounces?: boolean;
    scroll?: boolean;
    safeArewViewColor?: boolean;
    useScrollview?: boolean;
}

//Categories
export interface CategoryListProps {
    list: any;
    type: string;
}

export interface SerieProps {
    serie: any;
}

//SearchBar
export interface SearchBarProps {
    searchText: string;
    setSearchText: (value: string) => {};
    selectedItem: string;
    onChangeSelectedItem: (value: string) => {};
}

//SearchedItem
export interface SearchedItemProps {
    item: any;
    onPressItem: (item: any) => {};
}

//Search
type SearchScreenNavigationProp = StackNavigationProp<SearchStack, 'Search'>;
export interface SearchProps {
    navigation: SearchScreenNavigationProp;
}


//LoadingMore
export interface LoadingMoreProps {
    loading: boolean;
    horizontalFlatList?: boolean;
}

//Skeleton
export interface SkeletonProps {
    type: string;
}

//Tabs
export interface TabsProps {
    types: string[];
    setActiveType: (index: string) => {};
}
