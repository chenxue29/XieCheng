import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: '#e4f3e9',
        marginTop: 40,
    },
    scrollView: {
        backgroundColor: '#f0ffff',
    },
    main: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100,
    },
    title: {
       fontSize: 30,
       fontWeight: 'bold',
       color: 'green',
    },
    user: {
        width: 300,
        height: 40,
        backgroundColor: '#b3ecbc',
        marginTop: 25,
        borderRadius: 20,
        paddingRight: 10,
        paddingLeft: 10,
    },
    input_error: {
        width: 300,
        color: 'red',
    },
    switch_container: {
        width: windowWidth-70,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        marginTop: 15,
    },
    switch: {
        width: 15,
        height: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 10,
        textAlign: 'center',
    },
    switch_text: {
        marginLeft: 5,
    },
    login_button: {
        width: 300,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#7fc199',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    login_text: {
        fontSize: 25,
    },
    register_login: {
        width: windowWidth-70,
        textAlign: 'left',
        color: 'blue',
        marginTop: 8,
        textDecorationLine: 'underline',
    },
});

 
module.exports = styles; 