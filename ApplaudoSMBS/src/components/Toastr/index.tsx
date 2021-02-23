/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import Colors from './../../utils/Theme/Colors';

const Toastr = (props) => {
  const {children} = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const {isConnected} = state;
      console.log(isConnected);
      setVisible(!isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const renderAlert = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>Sin conexión a internet</Text>
      </View>
    );
  };

  return (
    <View style={styles.flex1}>
      {children}
      {visible ? renderAlert() : <Fragment />}
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: Colors.gradient1,
    position: 'absolute',
    bottom: DeviceInfo.hasNotch() ? 42 : 16,
    left: 0,
    right: 0,
    marginBottom: 50,
    marginHorizontal: 16,
    zIndex: 999,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Toastr;
