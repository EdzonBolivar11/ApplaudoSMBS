import React, { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Serie from './Serie';
import { CategoryListProps } from '../../../utils/Types';
import useAxios from 'axios-hooks';

const CategoryList: FunctionComponent<CategoryListProps> = (props) => {
    const { list, type } = props;
    const [animeManga, setAnimeManga] = useState(type);
    const [{ data, loading, error }, refetch] = useAxios(list?.relationships[animeManga]?.links?.related);

    console.log(data?.data);

    return (
        <View style={styles.list}>
            <Text>{list?.attributes?.title}</Text>
        <FlatList
                data={data?.data}
                renderItem={({ item, index }) => <Serie serie={item}/>}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item) => item?.id}
                horizontal={true}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: 'red',
    }
});

CategoryList.defaultProps = {};

CategoryList.propTypes = {};

export default CategoryList;