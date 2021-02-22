import React, {FunctionComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {SerieProps} from '../../../../utils/Types';
import NoImage from './../../../../assets/img/no-img.jpg';
import Colors from '../../../../utils/Theme/Colors';

const Serie: FunctionComponent<SerieProps> = (props) => {
  const {serie, navigation} = props;
  const [failedImage, setFailedImage] = useState(false);

  const renderTitle = () =>
    serie?.attributes?.titles['en']
      ? serie?.attributes?.titles['en']
      : serie?.attributes?.titles['en_jp']
      ? serie?.attributes?.titles['en_jp']
      : serie?.attributes?.titles['en_kr']
      ? serie?.attributes?.titles['en_kr']
      : 'Sin título';

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('DetailsSerie', {item: serie})}>
      <View style={styles.serieCard}>
        <ImageBackground
          style={[styles.image, StyleSheet.absoluteFillObject]}
          source={
            !failedImage
              ? {uri: serie?.attributes?.posterImage?.large}
              : NoImage
          }
          onError={() => setFailedImage(true)}
        />
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>
            {renderTitle()}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  serieCard: {
    width: 200,
    height: 130,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    textAlign: 'center',
  },
});

Serie.defaultProps = {};

Serie.propTypes = {};

export default Serie;
