import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Screen from './../../components/Screen';
import CategoryList from '../../components/Home/CategoryList';
import useAxios from 'axios-hooks';
import { Item } from 'native-base';

const index = () => {
    const [{ data, loading, error }, refetch] = useAxios('https://kitsu.io/api/edge/categories/');
    return (
        <Screen>
            <View>
                <FlatList
                data={data?.data}
                renderItem={({ item, index }) => <CategoryList list={item} type='anime'/>}
                keyExtractor={(item) => item?.id}
                showsVerticalScrollIndicator={false}
                />
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({});

index.defaultProps = {};

index.propTypes = {};

export default index;