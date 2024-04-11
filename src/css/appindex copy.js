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
    section: {
        // backgroundColor: 'red',
        // width: (windowWidth - 20) / 2,
        // display: 'flex',
        // flexDirection: 'row',
        // marginBottom: 100,
    },
    body: {
        marginLeft: 5,
        marginRight: 5,
        // width: (windowWidth - 20) / 2,
    },
    item: {
        width: (windowWidth - 32) / 2,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 5,
    },
    image: {
        height: 200,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
    },
    user: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
    },
    user_img: {
        flex: 1,
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    user_name: {
        flex: 4,
        height: 30,
        lineHeight: 30,
        marginLeft: 5,
    },
    date: {
        textAlign: 'right',
        marginLeft: 8,
        marginRight: 8,
        color: 'gray',
    },
    waterfall: {
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: '#e4f3e9',
    },
    waterfall_item: {
        marginLeft: 10,
        marginRight: 10,
    },
});

 
module.exports = styles; 