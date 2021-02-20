import React, { FunctionComponent, useState, } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { SerieProps } from '../../../../utils/Types';
import NoImage from './../../../../assets/img/no-img.jpg';

const Serie: FunctionComponent<SerieProps> = (props) => {
    const {serie} = props;
    const [failedImage, setFailedImage] = useState(false);
    console.log('category',);

    return (
        <TouchableWithoutFeedback>
            <View style={styles.serieCard}>
                <ImageBackground style={styles.image} source={!failedImage ? { uri: serie?.attributes?.posterImage?.large} : NoImage} onError={(e) => setFailedImage(true)}>

                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    serieCard: {
        width:100,
        height:100,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

Serie.defaultProps = {};

Serie.propTypes = {};

export default Serie;