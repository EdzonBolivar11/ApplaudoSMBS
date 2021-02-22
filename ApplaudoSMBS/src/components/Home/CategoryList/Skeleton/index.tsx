import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SkeletonProps} from '../../../../utils/Types';

const Skeleton: FunctionComponent<SkeletonProps> = (props) => {
  const {type} = props;
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderSkeleton = () => {
    switch (type) {
      case 'category':
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
      case 'series':
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
      case 'search':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <SkeletonPlaceholder>
              <View style={styles.wrapperSearched}>
                {items.map((itemSerie) => (
                  <View
                    style={styles.wrapperSerieSearched}
                    key={itemSerie + 'sSkeleton'}
                  />
                ))}
              </View>
            </SkeletonPlaceholder>
          </ScrollView>
        );
      default:
        return null;
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
  wrapperSearched: {
    flexDirection: 'column',
    marginTop: 10,
  },
  wrapperSerieSearched: {
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
    height: 130,
  },
  skeletonSearchImage: {
    height: 130,
    width: 130,
    marginRight: 10,
  },
  skeletonSearchText: {
    flex: 1,
    height: 130,
    marginLeft: 10,
  },
});

Skeleton.defaultProps = {
  type: '',
};

Skeleton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Skeleton;
