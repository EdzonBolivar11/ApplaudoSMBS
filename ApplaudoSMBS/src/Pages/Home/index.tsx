/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Screen from './../../components/Screen';
import CategoryList from '../../components/Home/CategoryList';
import axios from 'axios';

import Skeleton from '../../components/Home/CategoryList/Skeleton';

const index = () => {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<any>([]);

  const loadMore = async () => {
    if (loading) {
      return;
    }
    if (offset > total) {
      return;
    } else {
      setLoading(true);
      await axios
        .get(
          `https://kitsu.io/api/edge/categories/?page%5Blimit%5D=10&page%5Boffset%5D=${offset}`,
        )
        .then(({data}) => {
          const tot = Math.floor(data?.meta?.count / 10) * 10;
          setTotal(tot);
          setOffset(offset + 10);
          setCategories([...categories, ...data?.data]);
        })
        .catch(console.log);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  const renderFooter: any = () =>
    loading && (
      <ActivityIndicator style={styles.mb10} size="small" color="#999" />
    );

  const refreshList = async () => {
    setRefreshing(true);
    await axios
      .get(
        `https://kitsu.io/api/edge/categories/?page%5Blimit%5D=10&page%5Boffset%5D=${0}`,
      )
      .then(({data}) => {
        const tot = Math.floor(data?.meta?.count / 10) * 10;
        setTotal(tot);
        setOffset(10);
        setCategories(data?.data);
      })
      .catch(console.log);
    setRefreshing(false);
  };

  return (
    <Screen useScrollview={false}>
      <View style={styles.home}>
        {categories?.data?.length > 0 ? (
          <Skeleton type="category" />
        ) : (
          <FlatList
            data={categories}
            renderItem={({item}) => <CategoryList list={item} type="anime" />}
            keyExtractor={(item: any) => item?.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => renderFooter()}
            onRefresh={() => refreshList()}
            refreshing={refreshing}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  home: {
    marginLeft: 25,
    flex: 1,
  },
  mb10: {marginBottom: 10},
});

index.defaultProps = {};

index.propTypes = {};

export default index;
