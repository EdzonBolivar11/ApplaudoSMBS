/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Screen from './../../components/Screen';
import CategoryList from '../../components/Home/CategoryList';
import Skeleton from '../../components/Home/CategoryList/Skeleton';
import Tabs from '../../components/Home/CategoryList/Tabs';
import api from '../../utils/Constants';
import LoadingMore from '../../components/LoadingMore';
import {HomeProps} from '../../utils/Types';
import {GetCategories} from '../../redux/actions/Series/series.actions';

const Home: FunctionComponent<HomeProps> = (props) => {
  const {
    navigation,
    GetCategories,
    ClearCategories,
    animeCategory,
    mangaCategory,
    loading,
  } = props;
  const flatListRef = useRef<any>({});
  const [nextLink, setNextLink] = useState('');
  const [type, setType] = useState('anime');

  const getCategories = (url: string, clear: boolean) => {
    GetCategories(url, type, clear)
      .then((res: string) => setNextLink(res))
      .catch((err: any) => console.log(err.message));
  };

  const loadMore = async () => {
    if (nextLink === '' || !nextLink || loading) {
      return;
    }
    await getCategories(nextLink, false);
  };

  const toTop = () =>
    flatListRef.current.scrollToOffset({animated: true, offset: 0});

  useEffect(() => {
    getCategories(api.categories, true);
  }, []);

  useEffect(() => {
    toTop();
    getCategories(api.categories, true);
  }, [type]);

  return (
    <Screen useScrollview={false}>
      <Tabs
        types={['Anime', 'Manga']}
        setActiveType={async (activeType) => await setType(activeType)}
      />
      <View style={styles.home}>
        {
          /* categories?.data?.length > 0  */ false ? (
            <Skeleton type="category" />
          ) : (
            <FlatList
              ref={flatListRef}
              data={type === 'anime' ? animeCategory : mangaCategory}
              renderItem={({item}) => (
                <CategoryList list={item} type={type} navigation={navigation} />
              )}
              keyExtractor={(item: any, index: number) =>
                'c' + item?.id + index
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onEndReached={() => loadMore()}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => <LoadingMore loading={loading} />}
              onRefresh={() => getCategories(api.categories, true)}
              refreshing={loading}
            />
          )
        }
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  home: {
    marginLeft: 25,
    flex: 1,
  },
});

const mapPropsToState = (state: any) => {
  return {
    loading: state.Series.loading,
    animeCategory: state.Series.animeCategory,
    mangaCategory: state.Series.mangaCategory,
  };
};

const mapPropsToDispatch = (dispatch: any) => {
  return {
    ClearCategories: () => dispatch({type: 'RESTART_SERIES'}),
    GetCategories: (url: string, category: string, clear: boolean) =>
      dispatch(GetCategories(url, category, clear)),
  };
};

export default connect(mapPropsToState, mapPropsToDispatch)(Home);
