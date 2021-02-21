import React, {Fragment, FunctionComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import Item from './item';
import Colors from '../../../utils/Theme/Colors';

import {SectionProps} from './../../../utils/Types';

const Section: FunctionComponent<SectionProps> = (props) => {
  const {section} = props;
  return (
    <Fragment>
      <Text style={styles.title}>{section.title}</Text>
      {section.fields.map((field) => (
        <Item key={field.id} field={field} />
      ))}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  field: {
    color: Colors.black,
    fontSize: 13,
  },
});

Section.defaultProps = {};

Section.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.node,
        value: PropTypes.string,
      }),
    ),
  }),
};

export default Section;
