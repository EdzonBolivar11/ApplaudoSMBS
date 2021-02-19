import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import Item from './item';
import Colors from '../../../utils/Theme/Colors';

import {SectionProps} from './../../../utils/Types';

const index: FunctionComponent<SectionProps> = (props) => {
    const { section } = props;
    return (
        <>
            <Text style={styles.title}>{section.title}</Text>
            {section.fields.map(field => <Item key={field.id} field={field}/> )}
        </>
    )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:10,
    marginTop:15,
  },
  field: {
    color: Colors.black,
    fontSize: 13,
  }
});

index.defaultProps = {
    
};

index.propTypes = {
    section: PropTypes.shape({
        title: PropTypes.string,
        fields: PropTypes.arrayOf(
            PropTypes.shape({
            icon: PropTypes.string,
            value: PropTypes.string
        })
        )
    }),
};

export default index;