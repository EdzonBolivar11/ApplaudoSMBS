import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SkeletonProps} from '../../../../utils/Types';

const Skeleton: FunctionComponent<SkeletonProps> = (props) => {
  const {type} = props;
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderSkeleton = () => {
    if (type === 'category') {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <SkeletonPlaceholder key={item + 'cSkeleton'}>
              <View style={styles.wrapper}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonImageWrapper}>
                  {items.map((itemSerie) => (
                    <View
                      key={itemSerie + 'csSkeleton'}
                      style={styles.skeletonImage}
                    />
                  ))}
                </View>
              </View>
            </SkeletonPlaceholder>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <SkeletonPlaceholder>
          <View style={styles.wrapperSeries}>
            <View style={styles.skeletonImageWrapper}>
              {items.map((itemSerie) => (
                <View
                  key={itemSerie + 'ssSkeleton'}
                  style={styles.skeletonImage}
                />
              ))}
            </View>
          </View>
        </SkeletonPlaceholder>
      );
    }
  };

  return renderSkeleton();
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
  },
  wrapperSeries: {},
  skeletonTitle: {
    width: Dimensions.get('window').width / 2,
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonImageWrapper: {
    flexDirection: 'row',
  },
  skeletonImage: {
    width: 200,
    height: 130,
    borderRadius: 4,
    marginRight: 10,
  },
});

Skeleton.defaultProps = {
  type: '',
};

Skeleton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Skeleton;
