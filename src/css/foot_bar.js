import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    foot_container: {
        width: windowWidth,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: 'white',
    },
    foot_button: {
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    foot_index: {
        fontSize: 20,
    },
    foot_add: {
        width: 60,
        height: 35,
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 35,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
    },
    foot_mine: {
        fontSize: 20,
    }
});

 
module.exports = styles; 