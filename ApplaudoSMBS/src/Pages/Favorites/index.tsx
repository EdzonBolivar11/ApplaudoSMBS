import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Screen from '../../components/Screen';
import SearchBar from '../../components/Search/SearchBar';
import SearchedItem from '../../components/Search/SearchedItem';
import LoadingMore from '../../components/LoadingMore';

const Favorites = (props) => {
  const {navigation, favoriteSeries} = props;
  const [searchText, setSearchText] = useState('');

  const onPressItem = (item: any) =>
    navigation.navigate('DetailsSerie', {item});

  return (
    <Screen>
      <Text style={styles.title}>Series favoritas</Text>
      <SearchBar
        searchText={searchText}
        setSearchText={(value: string) => setSearchText(value)}
        typeEnabled={false}
      />
      <View style={styles.wrapperList}>
        <FlatList
          data={favoriteSeries}
          renderItem={({item}) => (
            <SearchedItem
              item={item}
              onPressItem={(serie: any) => onPressItem(serie)}
            />
          )}
          keyExtractor={(item: any) => item?.id}
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

const mapStateToProps = (state) => {
  return {
    favoriteSeries: state.Favorites.favoriteSeries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
