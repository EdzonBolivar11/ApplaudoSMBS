import { ImageSourcePropType } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

//Navigation
export type RootStack = {
    Profile: undefined;
    Home: undefined;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStack, 'Profile'>;

//Profile
export interface ProfileProps {
    navigation: ProfileScreenNavigationProp;
}

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
export interface ScreenProps {
    refreshEnabled?: boolean;
    scrollBounces?: boolean;
    refreshing?: boolean;
    onRefresh?: () => {};
    scroll?: boolean;
    gradientColors?: string[];
}