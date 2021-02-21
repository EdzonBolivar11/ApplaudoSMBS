/* eslint-disable prettier/prettier */
import { ImageSourcePropType } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

//Navigation
export type RootStack = {
    Profile: undefined;
    Home: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStack, 'Profile'>;

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
    refreshEnabled?: boolean;
    scrollBounces?: boolean;
    refreshing?: boolean;
    onRefresh?: () => {};
    scroll?: boolean;
    gradientColors?: string[];
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

//Skeleton
export interface SkeletonProps {
    type: string;
}

//Tabs
export interface TabsProps {
    types: string[];
    setActiveType: (index: string) => {};
}
