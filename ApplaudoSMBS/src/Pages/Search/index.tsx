/* eslint-disable react-hooks/exhaustive-deps */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SearchBar from '../../components/Search/SearchBar';
import Screen from '../../components/Screen';
import SearchedItem from '../../components/Search/SearchedItem';
import api from '../../utils/Constants';
import Skeleton from '../../components/Home/CategoryList/Skeleton';
import {FlatList} from 'react-native-gesture-handler';
import LoadingMore from '../../components/LoadingMore';
import {SearchProps} from '../../utils/Types';
import {
  GetOfflineSearch,
  GetSearch,
} from '../../redux/actions/Series/series.actions';

const Search: FunctionComponent<SearchProps> = (props) => {
  const {navigation, loading, GetSearch, GetOfflineSearch} = props;
  const [searchText, setSearchText] = useState('');
  const [series, setSeries] = useState<any>([]);
  const [type, setType] = useState('anime');
  const [nextLink, setNextLink] = useState('');

  const handleSearch = async (text: string, more: boolean) => {
    if (more) {
      if (loading || nextLink === '' || nextLink === undefined) {
        return;
      }
      GetSearch(nextLink)
        .then((res: any) => {
          setNextLink(res.nextLink);
          setSeries([...series, ...res.series]);
        })
        .catch();
    } else {
      if (text !== '') {
        GetSearch(api.searchText(type, text))
          .then((res: any) => {
            setNextLink(res.nextLink);
            setSeries([...series, ...res.series]);
          })
          .catch((err: any) => {
            if (err === 'Network Error') {
              GetOfflineSearch(type, text.toLowerCase())
                .then((res: any) => setSeries(res))
                .catch(console.log);
            }
          });
      } else {
        setSeries([]);
        setNextLink('');
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText !== '') {
        handleSearch(searchText, false);
      } else {
        setSeries([]);
        setNextLink('');
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
            keyExtractor={(item: any, index: number) =>
              'search' + item?.id + index
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => handleSearch('', true)}
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

const mapPropsToState = (state: any) => {
  return {
    loading: state.Series.loading,
  };
};

const mapPropsToDispatch = (dispatch: any) => {
  return {
    GetSearch: (url: string) => dispatch(GetSearch(url)),
    GetOfflineSearch: (category: string, text: string) =>
      dispatch(GetOfflineSearch(category, text)),
  };
};

export default connect(mapPropsToState, mapPropsToDispatch)(Search);
