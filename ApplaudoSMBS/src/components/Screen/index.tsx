// Vendors
import React, {FunctionComponent} from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScreenProps} from './../../utils/Types';
import Colors from './../../utils/Theme/Colors';
import LinearGradient from 'react-native-linear-gradient';

const fadeIn = {
  from: {opacity: 0},
  to: {opacity: 1},
};

const Screen: FunctionComponent<ScreenProps> = (props) => {
  const {children, gradientColors = [], useScrollview} = props;

  const renderStatusBar = () => {
    if (gradientColors.length > 0) {
      return (
        <LinearGradient
          start={{x: 0.0, y: 1}}
          end={{x: 1, y: 1.0}}
          locations={[0, 0.2, 0.4, 0.55, 0.8]}
          colors={gradientColors}>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor="transparent"
          />
        </LinearGradient>
      );
    } else {
      return (
        <StatusBar translucent barStyle="dark-content" backgroundColor="red" />
      );
    }
  };

  return (
    <>
      {renderStatusBar()}
      <SafeAreaView style={styles.safeArea} />
      <Animatable.View
        style={styles.screen}
        animation={fadeIn}
        duration={350}
        easing="ease-out"
        useNativeDriver>
        {true ? (
          !useScrollview ? (
            children
          ) : (
            <ScrollView
              bounces={false}
              contentContainerStyle={styles.grow}
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          )
        ) : (
          children
        )}
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 0,
    backgroundColor: Colors.white,
  },
  grow: {
    flexGrow: 1,
  },
});

Screen.defaultProps = {
  scrollBounces: false,
  scroll: true,
  gradientColors: [],
  useScrollview: true,
};

Screen.propTypes = {
  scrollBounces: PropTypes.bool,
  scroll: PropTypes.bool,
  gradientColors: PropTypes.array,
  useScrollview: PropTypes.bool,
};

export default Screen;
