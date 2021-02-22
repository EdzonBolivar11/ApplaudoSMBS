/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import Screen from '../../../components/Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Theme/Colors';
import Share from 'react-native-share';
/* import LocalStorage from './../../../utils/Storage'; */

//Images
const NoImage = require('./../../../assets/img/no-img.jpg');

const DetailsSerie = (props) => {
  const {route, navigation, SetFavorite, favoriteSeries} = props;

  const [failedCoverImage, setFailedCoverImage] = useState(false);
  const [failedPosterImage, setFailedPosterImage] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [item] = useState(route?.params?.item);

  const checkFavorite = () =>
    setFavorite(favoriteSeries.some((serie: any) => serie?.id === item?.id));

  useEffect(() => {
    checkFavorite();
  }, []);

  useEffect(() => {
    checkFavorite();
  }, [favoriteSeries]);

  const renderTitle = () =>
    item?.attributes?.titles['en']
      ? item?.attributes?.titles['en']
      : item?.attributes?.titles['en_jp']
      ? item?.attributes?.titles['en_jp']
      : item?.attributes?.titles['en_kr']
      ? item?.attributes?.titles['en_kr']
      : 'Sin título';

  const goBack = () => navigation.goBack();

  const renderImage = (type: string) => {
    if (type === 'cover') {
      if (item?.attributes?.coverImage?.large) {
        return !failedCoverImage
          ? {uri: item?.attributes?.coverImage?.large}
          : NoImage;
      }
    } else {
      if (item?.attributes?.posterImage?.large) {
        return !failedPosterImage
          ? {uri: item?.attributes?.posterImage?.large}
          : NoImage;
      }
    }
    return NoImage;
  };

  const shareSerie = async () => {
    const options = {
      title: renderTitle(),
      message:
        'Serie de ' + item?.type?.charAt(0).toUpperCase() + item?.type.slice(1),
    };

    try {
      await Share.open(options).then(console.log).catch(console.log);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressFavorite = () => {
    SetFavorite(item);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <View style={styles.backSection}>
            <Ionicons
              name="chevron-back-sharp"
              color={Colors.black}
              style={styles.backIcon}
            />
            <Text style={styles.backText}>Atrás</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.iconsWrapper}>
          {item?.attributes?.youtubeVideoId !== '' && (
            <TouchableWithoutFeedback
              onPress={() =>
                Linking.openURL(
                  'vnd.youtube://watch?v=' + item?.attributes?.youtubeVideoId,
                )
              }>
              <Ionicons
                name="logo-youtube"
                color={Colors.red}
                style={styles.backIcon}
              />
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={() => shareSerie()}>
            <Ionicons
              name="share-social-outline"
              color={Colors.share}
              style={styles.backIcon}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onPressFavorite()}>
            <Ionicons
              name={isFavorite ? 'ios-heart-sharp' : 'ios-heart-outline'}
              color={Colors.gradient1}
              style={styles.backIcon}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Image
        style={styles.coverImage}
        source={renderImage('cover')}
        onError={() => setFailedCoverImage(true)}
      />

      <View style={styles.wrapperInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {renderTitle()}
        </Text>
        <Text style={styles.synopsis}>
          {item?.attributes?.synopsis && item?.attributes?.synopsis !== '\n\n'
            ? item?.attributes?.synopsis
            : 'No tiene sinopsis'}
        </Text>
        <Text style={styles.mv5}>
          <Text style={styles.bold}>Popularity rank: </Text>
          {item?.attributes?.popularityRank
            ? item?.attributes?.popularityRank
            : 'Sin información'}
        </Text>
        <Text style={styles.mv5}>
          <Text style={styles.bold}>Rating rank: </Text>
          {item?.attributes?.ratingRank
            ? item?.attributes?.ratingRank
            : 'Sin información'}
        </Text>
        <Text style={styles.mv5}>
          <Text style={styles.bold}>Episodios: </Text>
          {item?.attributes?.episodeCount
            ? item?.attributes?.episodeCount
            : 'Sin información'}
        </Text>
        <Text style={styles.mv5}>
          <Text style={styles.bold}>Duración por episodio: </Text>
          {item?.attributes?.episodeLength
            ? item?.attributes?.episodeCount + 'minutos'
            : 'Sin información'}
        </Text>

        <Image
          style={styles.posterImage}
          source={renderImage('poster')}
          onError={() => setFailedPosterImage(true)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  backSection: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    marginBottom: 10,
  },
  backIcon: {
    padding: 13,
    fontSize: 20,
    marginRight: 10,
  },
  backText: {
    fontSize: 16,
  },
  coverImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  posterImage: {
    width: '40%',
    height: 200,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginVertical: 15,
  },
  wrapperInfo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    letterSpacing: 1,
  },
  synopsis: {
    fontSize: 14,
    textAlign: 'justify',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  mv5: {
    marginVertical: 5,
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

DetailsSerie.defaultProps = {};

DetailsSerie.propTypes = {};

const mapStateToProps = (state: any) => {
  return {
    favoriteSeries: state.Favorites.favoriteSeries,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    SetFavorite: (serie: any) =>
      dispatch({type: 'SET_FAVORITE', payload: serie}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSerie);
