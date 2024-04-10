import React,{  useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';
import styles from '../css/search_header copy';

function SearchHeader(props){
    const [searchName, setSearchName] = useState('');

    return (
        <View style={styles.header}>
            <TextInput style={styles.search_input} value={searchName} onChangeText={text=>setSearchName(text)} />
            <Pressable style={styles.search_button} onPress={()=>{Alert.alert('搜索游记', searchName)}}>
                <Text>搜索</Text>
            </Pressable>
        </View>
        
    );
};

export default SearchHeader;