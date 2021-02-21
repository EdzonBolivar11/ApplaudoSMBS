/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Screen from './../../components/Screen';
import CategoryList from '../../components/Home/CategoryList';
import axios from 'axios';

import Skeleton from '../../components/Home/CategoryList/Skeleton';
import Tabs from '../../components/Home/CategoryList/Tabs';
import {apiCategory} from '../../utils/Constants';

const index = () => {
  const flatListRef = useRef<any>({});
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<any>([]);
  const [type, setType] = useState('anime');

  const loadMore = async () => {
    if (loading) {
      return;
    }
    if (offset > total) {
      return;
    } else {
      setLoading(true);
      await axios
        .get(apiCategory + offset)
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

  const reloadTypes = async () => {
    setRefreshing(true);
    await axios
      .get(apiCategory + 0)
      .then(({data}) => {
        const tot = Math.floor(data?.meta?.count / 10) * 10;
        setTotal(tot);
        setOffset(10);
        setCategories(data?.data);
      })
      .catch(console.log);
    setRefreshing(false);
  };

  const toTop = () =>
    flatListRef.current.scrollToOffset({animated: true, offset: 0});

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    toTop();
    reloadTypes();
  }, [type]);

  const renderFooter: any = () =>
    loading && (
      <ActivityIndicator style={styles.mb10} size="small" color="#999" />
    );

  return (
    <Screen useScrollview={false}>
      <Tabs
        types={['Anime', 'Manga']}
        setActiveType={async (activeType) => await setType(activeType)}
      />
      <View style={styles.home}>
        {categories?.data?.length > 0 ? (
          <Skeleton type="category" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={categories}
            renderItem={({item}) => <CategoryList list={item} type={type} />}
            keyExtractor={(item: any) => item?.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => renderFooter()}
            onRefresh={() => reloadTypes()}
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
