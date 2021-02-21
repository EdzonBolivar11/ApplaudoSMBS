/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Serie from './Serie';
import {CategoryListProps} from '../../../utils/Types';
import Colors from '../../../utils/Theme/Colors';
import Skeleton from './Skeleton';
import axios from 'axios';

const CategoryList: FunctionComponent<CategoryListProps> = (props) => {
  const {list, type} = props;

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

  useEffect(() => {
    loadSeries();
  }, []);

  useEffect(() => {
    loadSeries();
  }, [type]);

  const renderFooter: any = () =>
    loading && (
      <View style={styles.wrapperIndicator}>
        <ActivityIndicator
          style={styles.activityIndicator}
          size="small"
          color="#999"
        />
      </View>
    );

  return hasSeries ? (
    <View style={styles.list}>
      <Text style={styles.title}>{list?.attributes?.title}</Text>
      {series.length === 0 ? (
        <Skeleton type="series" />
      ) : (
        <FlatList
          data={series}
          renderItem={({item}) => <Serie serie={item} />}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item?.id}
          horizontal={true}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => renderFooter()}
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
  activityIndicator: {
    marginRight: 10,
  },
  wrapperIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

CategoryList.defaultProps = {};

CategoryList.propTypes = {};

export default CategoryList;
