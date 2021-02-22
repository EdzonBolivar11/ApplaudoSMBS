import React, {FunctionComponent, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import Colors from '../../../../utils/Theme/Colors';
import {TabsProps} from '../../../../utils/Types';

const Tabs: FunctionComponent<TabsProps> = (props) => {
  const {types, setActiveType} = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number, type: string) => {
    setActiveIndex(index);
    setActiveType(type);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperTabs}>
        {types.map((item: string, index: number) => (
          <TouchableOpacity
            key={item + index}
            style={[styles.tab, styles.center, styles.flex1]}
            onPress={() => handlePress(index, item.toLowerCase())}>
            <Text style={styles.titleTab}>{item}</Text>
            <View
              style={[
                styles.selector,
                {
                  backgroundColor:
                    activeIndex === index ? Colors.gradient1 : Colors.white,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  wrapper: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Platform.OS === 'android' ? 15 : 0,
  },
  wrapperTabs: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 36,
    position: 'relative',
    alignItems: 'center',
  },
  titleTab: {
    letterSpacing: 1,
  },
  selector: {
    width: '100%',
    height: 4,
    marginTop: 10,
  },
  tab: {
    marginHorizontal: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Tabs.defaultProps = {
  types: [],
  setActiveType: () => {},
};

Tabs.propTypes = {};

export default Tabs;
