/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import SearchBar from '../../components/Search/SearchBar';
import Screen from '../../components/Screen';
import SearchedItem from '../../components/Search/SearchedItem';
import axios from 'axios';
import {apiSearchText} from '../../utils/Constants';
import Skeleton from '../../components/Home/CategoryList/Skeleton';
import {FlatList} from 'react-native-gesture-handler';
import LoadingMore from '../../components/LoadingMore';
import {SearchProps} from '../../utils/Types';

const Search: FunctionComponent<SearchProps> = (props) => {
  const {navigation} = props;
  const [searchText, setSearchText] = useState('');
  const [series, setSeries] = useState<any>([]);
  const [type, setType] = useState('anime');
  const [loading, setLoading] = useState(false);
  const [nextLink, setNextLink] = useState('');
  const [firstSearch, setFirstSearch] = useState(false);

  const loadMore = async () => {
    console.log('loading', loading);
    if (loading) {
      return;
    }
    console.log('nextLink', nextLink);
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
      .catch((err: any) => console.log('Error in loadMore ', console.log(err)));
    setLoading(false);
  };

  const handleSearch = async (text: string) => {
    if (text !== '') {
      setLoading(true);
      await axios
        .get(apiSearchText(type, text))
        .then(({data}) => {
          setNextLink(data?.links?.next);
          setSeries([...series, ...data?.data]);
        })
        .catch(console.log);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText !== '') {
        handleSearch(searchText);
      } else {
        setSeries([]);
        setNextLink('');
        setFirstSearch(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const onPressItem = (item: any) =>
    navigation.navigate('DetailsSerie', {item});

  return (
    <Screen useScrollview={false}>
      <SearchBar
        searchText={searchText}
        setSearchText={(value: string) => setSearchText(value)}
        selectedItem={type}
        onChangeSelectedItem={(value: string) => setType(value)}
      />
      <View style={styles.wrapperList}>
        {loading && series.length === 0 ? (
          <Skeleton type="search" />
        ) : (
          <FlatList
            data={series}
            renderItem={({item}) => (
              <SearchedItem
                item={item}
                onPressItem={(serie: any) => onPressItem(serie)}
              />
            )}
            keyExtractor={(item: any) => item?.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => <LoadingMore loading={loading} />}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapperList: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
  },
});

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
