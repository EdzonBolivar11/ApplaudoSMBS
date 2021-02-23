import React, {FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Text} from 'react-native';

import {FieldProps} from './../../../utils/Types';

const index: FunctionComponent<FieldProps> = (props) => {
  const {field} = props;
  return (
    <View style={styles.itemWrapper}>
      <Image style={styles.icon} source={field?.icon} />
      <Text>{field?.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
});

index.defaultProps = {
  field: {
    id: '',
    icon: {},
    value: '',
  },
};

index.propTypes = {
  field: PropTypes.object.isRequired,
};

export default index;
