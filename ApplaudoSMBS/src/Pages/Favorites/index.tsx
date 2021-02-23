/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Screen from '../../components/Screen';
import SearchBar from '../../components/Search/SearchBar';
import SearchedItem from '../../components/Search/SearchedItem';

const Favorites = (props) => {
  const {navigation, filteredSeries, searchFavorites} = props;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchText !== '') {
        searchFavorites(searchText);
      } else {
        searchFavorites('');
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const onPressItem = (item: any) =>
    navigation.navigate('DetailsSerie', {item});

  return (
    <Screen useScrollview={false}>
      <Text style={styles.title}>Series favoritas</Text>
      <SearchBar
        searchText={searchText}
        setSearchText={(value: string) => setSearchText(value)}
        typeEnabled={false}
      />
      <View style={styles.wrapperList}>
        <FlatList
          data={filteredSeries}
          renderItem={({item}) => (
            <SearchedItem
              item={item}
              onPressItem={(serie: any) => onPressItem(serie)}
            />
          )}
          keyExtractor={(item: any, index: number) => 'f' + item?.id + index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          /*    onEndReached={() => loadMore()}
              onEndReachedThreshold={0.1} */
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    letterSpacing: 1,
    textAlign: 'center',
  },
  wrapperList: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
  },
});

Favorites.defaultProps = {};

Favorites.propTypes = {};

const mapStateToProps = (state: any) => {
  return {
    favoriteSeries: state.Favorites.favoriteSeries,
    filteredSeries: state.Favorites.filteredSeries,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchFavorites: (text: string) =>
      dispatch({type: 'SEARCH_FAVORITE', payload: text}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
