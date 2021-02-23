/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  GetOfflineSeries,
  GetSeries,
} from '../../../redux/actions/Series/series.actions';

import Serie from './Serie';
import {CategoryListProps} from '../../../utils/Types';
import Colors from '../../../utils/Theme/Colors';
import Skeleton from './Skeleton';
import LoadingMore from '../../LoadingMore';
import {CLEAR_SERIES} from '../../../redux/reducers/Series/types';

const CategoryList: FunctionComponent<CategoryListProps> = (props) => {
  const {
    list,
    type,
    navigation,
    GetSeries,
    GetOfflineSeries,
    ClearSeries,
    loading,
  } = props;

  const seriesRef = useRef<any>();
  const [nextLink, setNextLink] = useState('');
  const [series, setSeries] = useState<any>([]);

  const getSeries = (url: string, clear: boolean) => {
    GetSeries(url, type, list?.id, clear)
      .then((res: any) => {
        if (clear) {
          setSeries(res.series);
        } else {
          setSeries([...series, ...res.series]);
        }
        setNextLink(res.nextLink);
      })
      .catch((err: any) => {
        if (err === 'Network Error') {
          GetOfflineSeries(type, list?.id)
            .then((res: any) => setSeries(res))
            .catch(console.log);
        }
      });
  };

  const loadMore = async () => {
    if (nextLink === '' || !nextLink || loading) {
      return;
    }

    await getSeries(nextLink, false);
  };

  const toTop = () =>
    seriesRef?.current?.scrollToOffset({animated: true, offset: 0});

  useEffect(() => {
    /*  ClearSeries(); */
    getSeries(list?.relationships[type]?.links?.related, true);
  }, []);

  useEffect(() => {
    toTop();
    getSeries(list?.relationships[type]?.links?.related, true);
  }, [type]);

  return series.length > 0 ? (
    <View style={styles.list}>
      <Text style={styles.title}>{list?.attributes?.title}</Text>
      {false ? (
        <Skeleton type="series" />
      ) : (
        <FlatList
          ref={seriesRef}
          data={series}
          renderItem={({item}) => (
            <Serie serie={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any, index: number) => 's' + item?.id + index}
          horizontal={true}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <LoadingMore loading={loading} horizontalFlatList={true} />
          )}
        />
      )}
    </View>
  ) : null;
};

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
  },
});

const mapPropsToState = (state: any) => {
  return {
    loading: state.Series.loading,
  };
};

const mapPropsToDispatch = (dispatch: any) => {
  return {
    ClearSeries: () => dispatch({type: CLEAR_SERIES}),
    GetSeries: (url: string, category: string, categoryId: number) =>
      dispatch(GetSeries(url, category, categoryId)),
    GetOfflineSeries: (category: string, categoryId: number) =>
      dispatch(GetOfflineSeries(category, categoryId)),
  };
};

export default connect(mapPropsToState, mapPropsToDispatch)(CategoryList);
