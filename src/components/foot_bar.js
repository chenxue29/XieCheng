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

function FootBar(props){
    // const {navigation}=props;
    const navigation = useNavigation();
    return (
        <View style={styles.foot_container}>
            <Pressable>
                <Text style={styles.foot_index}>首页</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate('PublishTravel')}>
                <Text style={styles.foot_add}>+</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.foot_mine}>我的</Text>
            </Pressable>
        </View>
        
    );
};

export default FootBar;