import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const url = '10.101.89.184'
export default function LoginTest() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('用户名');
    const [passWord, setPassWord] = useState('密码');
    

    const checkLogin = () => {
        const requestData = {
            username: userName,
            password: passWord,
        };
        //解决同源策略限制:本机IP
        fetch(`http://${url}:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                // 处理响应数据
                console.log(data); // 假设返回的数据是一个 JSON 对象
                navigation.navigate('Mine')
            })
            .catch((error) => {
                // 处理请求错误
                console.error('Error:', error);
            });
    };

    return (
        <SafeAreaView>
            <View>
                <Text>鸭先知 & 明知山</Text>
                <TextInput value={userName} onChangeText={(text) => setUserName(text)} />
                <TextInput value={passWord} onChangeText={(text) => setPassWord(text)} />
                <Pressable onPress={checkLogin}>
                    <Text>登录</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}