// Vendors
import React, {FunctionComponent} from 'react';
import {Platform, ScrollView, StatusBar, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScreenProps} from './../../utils/Types';
import Colors from './../../utils/Theme/Colors';

const fadeIn = {
  from: {opacity: 0},
  to: {opacity: 1},
};

const Screen: FunctionComponent<ScreenProps> = (props) => {
  const {children, safeArewViewColor = false, useScrollview} = props;

  const renderStatusBar = () =>
    Platform.OS === 'ios' ? (
      <StatusBar translucent barStyle="dark-content" />
    ) : (
      <StatusBar translucent barStyle="light-content" />
    );

  const renderChildren = () =>
    !useScrollview ? (
      children
    ) : (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.grow}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    );

  return (
    <>
      {renderStatusBar()}
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: safeArewViewColor
              ? Colors.gradient1
              : Colors.white,
          },
        ]}
      />
      <Animatable.View
        style={styles.screen}
        animation={fadeIn}
        duration={350}
        easing="ease-out"
        useNativeDriver>
        {renderChildren()}
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
  },
  grow: {
    flexGrow: 1,
  },
});

Screen.defaultProps = {
  scrollBounces: false,
  scroll: true,
  safeArewViewColor: false,
  useScrollview: true,
};

Screen.propTypes = {
  scrollBounces: PropTypes.bool,
  scroll: PropTypes.bool,
  safeArewViewColor: PropTypes.bool,
  useScrollview: PropTypes.bool,
};

export default Screen;
