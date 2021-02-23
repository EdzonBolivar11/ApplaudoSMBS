import React, {FunctionComponent, useState} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {SearchedItemProps} from '../../../utils/Types';

//Images
const NoImage = require('./../../../assets/img/no-img.jpg');

const SearchedItem: FunctionComponent<SearchedItemProps> = (props) => {
  const {item, onPressItem} = props;

  const [failedImage, setFailedImage] = useState(false);

  const renderTitle = () =>
    item?.attributes?.titles['en']
      ? item?.attributes?.titles['en']
      : item?.attributes?.titles['en_jp']
      ? item?.attributes?.titles['en_jp']
      : item?.attributes?.titles['en_kr']
      ? item?.attributes?.titles['en_kr']
      : item?.attributes?.titles['en_us']
      ? item?.attributes?.titles['en_us']
      : item?.attributes?.titles['en_cn']
      ? item?.attributes?.titles['en_cn']
      : 'Sin título';

  return (
    <TouchableWithoutFeedback onPress={() => onPressItem(item)}>
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={
            !failedImage ? {uri: item?.attributes?.posterImage?.large} : NoImage
          }
          onError={() => setFailedImage(true)}
        />
        <View style={styles.wrapperInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {renderTitle()}
          </Text>
          <Text style={styles.synopsis} numberOfLines={6}>
            {item?.attributes?.synopsis && item?.attributes?.synopsis !== '\n\n'
              ? item?.attributes?.synopsis
              : 'No tiene sinopsis'}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 130,
    overflow: 'hidden',
    marginTop: 10,
  },
  image: {
    height: 130,
    width: '40%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  synopsis: {
    fontSize: 14,
    paddingTop: 5,
    textAlign: 'justify',
  },
  wrapperInfo: {
    width: '60%',
    paddingLeft: 10,
  },
});

SearchedItem.defaultProps = {
  item: {},
  onPressItem: () => {},
};

SearchedItem.propTypes = {
  item: PropTypes.object,
  onPressItem: PropTypes.func.isRequired,
};

export default SearchedItem;
