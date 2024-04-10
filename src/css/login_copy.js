import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: '#f0ffff',
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
        backgroundColor: 'wheat',
        marginTop: 25,
        marginBottom: 25,
        borderRadius: 20,
        paddingRight: 10,
        paddingLeft: 10,
    },
    switch_container: {
        width: windowWidth-70,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    switch: {
        width: 10,
        height: 10,
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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    login_text: {
        fontSize: 25,
    }
});

 
module.exports = styles; 