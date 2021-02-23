import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {LoadingMoreProps} from '../../utils/Types';

const LoadingMore: FunctionComponent<LoadingMoreProps> = (props) => {
  const {loading, horizontalFlatList} = props;

  if (!horizontalFlatList) {
    return loading ? (
      <ActivityIndicator style={styles.mb10} size="small" color="#999" />
    ) : null;
  } else {
    return loading ? (
      <View style={styles.wrapperIndicator}>
        <ActivityIndicator style={styles.mr10} size="small" color="#999" />
      </View>
    ) : null;
  }
};

const styles = StyleSheet.create({
  mb10: {marginBottom: 10},
  mr10: {
    marginRight: 10,
  },
  wrapperIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

LoadingMore.defaultProps = {
  loading: false,
  horizontalFlatList: false,
};

LoadingMore.propTypes = {
  loading: PropTypes.bool,
  horizontalFlatList: PropTypes.bool,
};

export default LoadingMore;
