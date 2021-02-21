// Vendors
import React, {FunctionComponent} from 'react';
import {ScrollView, RefreshControl, StatusBar, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScreenProps} from './../../utils/Types';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';

const fadeIn = {
  from: {opacity: 0},
  to: {opacity: 1},
};

const index: FunctionComponent<ScreenProps> = (props) => {
  const {
    refreshEnabled,
    scrollBounces,
    refreshing,
    onRefresh,
    scroll,
    children,
    gradientColors,
    useScrollview
  } = props;

  const renderStatusBar = () => {
    if(gradientColors.length > 0) {
      return (
        <LinearGradient
          start={{x: 0.0, y: 1}}
          end={{x: 1, y: 1.0}}
          locations={[0, 0.2, 0.4, 0.55, 0.8]}
          colors={gradientColors}>
           <StatusBar translucent  barStyle="light-content" backgroundColor='transparent'/>
        </LinearGradient>
      )
    } else {
      return <StatusBar translucent  barStyle="dark-content" backgroundColor='red' />
    }
  }

  return (
    <>
    {renderStatusBar()}
    <SafeAreaView style={{flex: 1 }}>
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
            <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          )
        ) : (
          children
        )}
      </Animatable.View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  }
});

index.propTypes = {
  refreshEnabled: PropTypes.bool,
  scrollBounces: PropTypes.bool,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  scroll: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  gradientColors: PropTypes.array,
  useScrollview: PropTypes.bool,
};

index.defaultProps = {
  refreshEnabled: false,
  scrollBounces: false,
  refreshing: false,
  onRefresh: () => {},
  scroll: true,
  gradientColors: [],
  useScrollview: true,
};

export default index;
