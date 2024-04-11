import React,{  useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';
import styles from '../css/search_header copy';

function SearchHeader({onSearch, reFresh}){
    const [searchName, setSearchName] = useState('');

    const handleSearch = () => {
        onSearch(searchName);
    };
    const onFresh = () => {
        reFresh();
    }

    return (
        <View style={styles.header}>
            <TextInput style={styles.search_input} value={searchName} onChangeText={text=>setSearchName(text)} />
            <Pressable style={styles.search_button} onPress={handleSearch}>
                <Text>搜索</Text>
            </Pressable>
            <Pressable style={styles.search_button} onPress={onFresh}>
                <Text>刷新</Text>
            </Pressable>
        </View>
        
    );
};

export default SearchHeader;