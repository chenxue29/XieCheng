import React, { Component, useState } from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    ScrollView,
    TextInput,
    Switch,
    Pressable,
    Alert
} from 'react-native';
import styles from '../css/login';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import userLogin from '../store/actions/action';

const url = '10.101.108.241'

function Login(props) {
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [userId, setUserId] = useState(0);
    const [userAgree, setUserAgree] = useState(false);
    const [agreeTrue, setAgreeTrue] = useState('');
    const [inputError, setInputError] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { userID, UserLogin } = props;
    const navigation = useNavigation();

    const checkLogin = () => {
        if (userName == '' || passWord == '') {
            Alert.alert('请填写完整的用户名或密码！');
        } else if (agreeTrue === '') {
            Alert.alert('请勾选用户协议！');
        } else {
            const requestData = {
                username: userName,
                password: passWord,
            };
            fetch(`http://${url}:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then((response) => response.json()).then((data) => {
                console.log(data)
                if (data.status == 200) {
                    // 密码验证成功
                    console.log("我的登录信息",data.data.id);
                    // const userData = data.data
                    // setUserId(data.data.id)
                    console.log('id',userId)
                    UserLogin({login: 'login', userID: data.data.id});
                    console.log('现在的状态是：', )
                    navigation.navigate('Mine',{userId: data.data.id});

                } else if (data.status == 401) {
                    // 用户名失败
                    Alert.alert('用户名不存在！！！');
                } else {
                    // 密码验证失败
                    Alert.alert('密码错误！！！');
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    // 从数据库中判断用户名与密码
    // const checkFromDatabase = async () => {
    //     const sendMessage = {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //     try {
    //         const users = fetch('http://127.0.0.1/api/users', sendMessage)
    //                         .then((response) => response.json())
    //                         .then((responseJson) => {console.log(responseJson);console.log('response')});
    //         if (!users){Alert.alert('用户名或密码不正确')}
    //         else{Alert.alert('response1')};
    //         console.log(users)
    //       }
    //       catch(err) {
    //         setError(true);
    //         Alert.alert(err)
    //       }
    //       finally {
    //         setLoading(false);
    //       }
    // };
    // 勾选用户协议
    const press = () => {
        setUserAgree(!userAgree);
        if (userAgree) {
            setAgreeTrue('√');
        } else {
            setAgreeTrue('');
        }
    };
    return (
        
        <SafeAreaView style={styles.safe_area_view}>
            <View style={styles.main}>
                <Text style={styles.title}>鸭先知 & 明知山</Text>
                <TextInput style={styles.user} placeholder='请输入用户名' value={userName} onChangeText={text => setUserName(text)} />
                <TextInput style={styles.user} placeholder='密码' value={passWord} onChangeText={text => setPassWord(text)} />
                <Text style={styles.input_error}>{inputError}</Text>
                <Pressable style={styles.switch_container} onPress={press}>
                    <Text style={styles.switch} >{agreeTrue}</Text>
                    <Text style={styles.switch_text}>同意用户协议</Text>
                </Pressable>
                {/* <Pressable onPress={() => {navigation.navigate('首页')}} style={styles.login_button}>
                        <Text style={styles.login_text}>登录</Text>
                    </Pressable> */}
                <Pressable onPress={checkLogin} style={styles.login_button}>
                    <Text style={styles.login_text}>登录</Text>
                </Pressable>
                <Text style={styles.register_login} onPress={() => navigation.navigate('Register')}>注册新账号</Text>
            </View>
        </SafeAreaView>

    );
};

// 将状态存入props中
const mapStateToProps = (state) => {
    return {
        login: state.login,
        name: state.name,
        userID: state.userID,
    }
};
// 将dispatch存入props中
const mapDispatchToProps = (dispatch) => {
    return {
        UserLogin: (user) => dispatch(userLogin(
            { login: user.login, name: user.name, userID: user.userID }
        ))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);