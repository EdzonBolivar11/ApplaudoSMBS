import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import {FieldProps} from './../../../utils/Types';

const index: FunctionComponent<FieldProps> = (props) => {
    const {field} = props;
    return (
        <View style={styles.itemWrapper}>
            <Image style={styles.icon} source={field.icon}/>
            <Text style={styles.field}>{field.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemWrapper:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical: 5,
        marginHorizontal: 15,
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 5,
    },
    field:{},
});

index.defaultProps = {};

index.propTypes = {};

export default index;