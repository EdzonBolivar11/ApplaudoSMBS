import React, { FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Serie from './Serie';
import { CategoryListProps } from '../../../utils/Types';
import useAxios from 'axios-hooks';
import Colors from '../../../utils/Theme/Colors';

const CategoryList: FunctionComponent<CategoryListProps> = (props) => {
    const { list, type } = props;
    const [animeManga, setAnimeManga] = useState(type);
    const [{ data, loading, error }, refetch] = useAxios(list?.relationships[animeManga]?.links?.related);

    console.log(data?.data);

    return (
        <View style={styles.list}>
            <Text style={styles.title}>{list?.attributes?.title}</Text>
            <FlatList
                data={data?.data}
                renderItem={({ item, index }) => <Serie serie={item}/>}
                 showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item?.id}
                horizontal={true}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

CategoryList.defaultProps = {};

CategoryList.propTypes = {};

export default CategoryList;