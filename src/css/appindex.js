import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#f0ffff',
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: (windowWidth - 32) / 2,
        height: 200,
        marginBottom: 16
    },
});

 
module.exports = styles; 