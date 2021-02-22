/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Serie from './Serie';
import {CategoryListProps} from '../../../utils/Types';
import Colors from '../../../utils/Theme/Colors';
import Skeleton from './Skeleton';
import axios from 'axios';
import LoadingMore from '../../LoadingMore';

const CategoryList: FunctionComponent<CategoryListProps> = (props) => {
  const {list, type, navigation} = props;

  const seriesRef = useRef<any>();
  const [nextLink, setNextLink] = useState('');
  const [series, setSeries] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [hasSeries, setHasSeries] = useState(true);

  const loadMore = async () => {
    if (nextLink === '' || nextLink === undefined) {
      return;
    }
    setLoading(true);
    await axios
      .get(nextLink)
      .then(({data}) => {
        setNextLink(data?.links?.next);
        setSeries([...series, ...data?.data]);
      })
      .catch(console.log);
    setLoading(false);
  };

  const loadSeries = async () =>
    await axios
      .get(list?.relationships[type]?.links?.related)
      .then(({data}) => {
        setHasSeries(data?.data.length > 0);
        setSeries([...data?.data]);
        setNextLink(data?.links?.next);
      })
      .catch(console.log);

  const toTop = () =>
    seriesRef?.current?.scrollToOffset({animated: true, offset: 0});

  useEffect(() => {
    loadSeries();
  }, []);

  useEffect(() => {
    toTop();
    loadSeries();
  }, [type]);

  return hasSeries ? (
    <View style={styles.list}>
      <Text style={styles.title}>{list?.attributes?.title}</Text>
      {series.length === 0 ? (
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
          keyExtractor={(item: any) => item?.id}
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

CategoryList.defaultProps = {};

CategoryList.propTypes = {};

export default CategoryList;
