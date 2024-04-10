import React,{ Component, useState } from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    ScrollView,
    TextInput,
    Switch,
    Pressable,
    Alert,
    FlatList,
    Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from '../css/foot_bar';

import {connect} from 'react-redux';
import userLogin from '../store/actions/action';

function FootBar(props){
    // const {navigation}=props;
    const navigation = useNavigation();
    // const navigation = useNavigation();
    const {login} = props;

    const clickMine = () => {
        if(login === 'offlogin'){
            navigation.navigate('Login');
        }else{
            navigation.navigate('Mine');
        }
    };
    const clickAdd = () => {
        if(login === 'offlogin'){
            navigation.navigate('Login');
        }else{
            navigation.navigate('PublishTravel');
        }
    };
    const clickIndex = () => {
        navigation.navigate('AppIndex');
    }
    return (
        <View style={styles.foot_container}>
            <Pressable onPress={clickIndex}>
                <Text style={styles.foot_index}>首页</Text>
            </Pressable>
            <Pressable onPress={clickAdd}>
                <Text style={styles.foot_add}>+</Text>
            </Pressable>
            <Pressable onPress={clickMine}>
                <Text style={styles.foot_mine}>我的</Text>
            </Pressable>
        </View>
        
    );
};

// 将状态存入props中
const mapStateToProps = (state) => {
    return{
      login: state.login,
      name: state.name,
    }
  };
  // 将dispatch存入props中
  const mapDispatchToProps = (dispatch) => {
    return{
        UserLogin: (manager) => dispatch(userLogin(
          {login: manager.login, name: manager.name}
        ))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(FootBar);