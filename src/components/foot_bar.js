import React,{ Component, useState, useEffect } from 'react';
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
    const [indexColor, setIndexColor] = useState('white');
    const [mineColor, setMineColor] = useState('white');
    const navigation = useNavigation();
    // const navigation = useNavigation();
    const {login} = props;

    const clickMine = () => {
        if(login === 'offlogin'){
            navigation.navigate('Login');
        }else{
            navigation.navigate('Mine');
        }
        navigation.navigate('Mine');
    };
    const clickAdd = () => {
        if(login === 'offlogin'){
            navigation.navigate('Login');
        }else{
            navigation.navigate('PublishTravel');
        }
        navigation.navigate('PublishTravel');
    };
    const clickIndex = () => {
        navigation.navigate('AppIndex');
    }

    return (
        <View style={styles.foot_container}>
            <Pressable onPress={clickIndex} style={[styles.foot_button, {backgroundColor: props.indexcolor}]}>
                <Text style={styles.foot_index}>首页</Text>
            </Pressable>
            <Pressable onPress={clickAdd}>
                <Text style={styles.foot_add}>+</Text>
            </Pressable>
            <Pressable onPress={clickMine} style={[styles.foot_button, {backgroundColor: props.minecolor}]}>
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
      userID: state.userID,
    }
  };
  // 将dispatch存入props中
  const mapDispatchToProps = (dispatch) => {
    return{
        UserLogin: (user) => dispatch(userLogin(
          {login: user.login, name: user.name, userID: user.userID}
        ))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(FootBar);