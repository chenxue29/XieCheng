import React, { Component, useEffect, useState } from 'react';
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
    Image,
    SectionList,
} from 'react-native';
import styles from '../css/appindex copy';
import SearchHeader from '../components/search_header';
import FootBar from '../components/foot_bar';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import userLogin from '../store/actions/action';
const url = '10.101.108.241'


function AppIndex() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        
        getAllInfo();
        
    }, []);
    let travelsLeft = [];
    let travelsRight = [];
    const getAllInfo = () => {
        setLoading(true)
        fetch(`http://${url}:3000/searchManager`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => {
            // console.log(data)
            // console.log(data.length)
            const newdata = data.filter(ele => ele.state == '1' && ele.open == 1)
            console.log(newdata.length)
            const half = Math.ceil(newdata.length / 2);
            const firstHalf = newdata.slice(0, half);
            const secondHalf = newdata.slice(half);

            let index = 0
            firstHalf.forEach(item => {
                
                const left = {
                    id: index + 1,
                    image: item.imgurl[0],
                    imageList: item.imgurl,
                    title: item.title,
                    content: item.content,
                    date: item.date,
                    position: item.position,
                    open: item.open,
                    user_id: item.userID,
                    avatarUrl: item.profile,
                    userName: item.username,
                    height: 300,
                }
                travelsLeft.push(left);
                index++;
            });
            let index1 = 0
            secondHalf.forEach(item => {
                const right = {
                    id: index1 + 1,
                    image: item.imgurl[0],
                    imageList: item.imgurl,
                    title: item.title,
                    content: item.content,
                    date: item.date,
                    position: item.position,
                    open: item.open,
                    user_id: item.userID,
                    avatarUrl: item.profile,
                    userName: item.username,
                    height: 300,
                }
                travelsRight.push(right);
                index1++;
            });
            console.log("左边",travelsLeft)
            console.log("右边",travelsRight)
        }).catch((error) => {
            console.error('Error:', error);
        });
        setLoading(false)
    }

    const Item = (props) => {
        const navigation = useNavigation();
        console.log("dfi",props.item)
        return (
            <View style={styles.section}>
                <Pressable style={styles.item} onPress={() => { navigation.navigate('TravelDetail') }}>
                    <Image source={{ uri: props.item.image }} style={[styles.image, { height: props.item.height }]} />
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{props.item.title}</Text>
                    <View style={styles.user}>
                        <Image source={{ uri: props.item.avatarUrl }} style={styles.user_img} />
                        <Text style={styles.user_name} numberOfLines={1} ellipsizeMode={'tail'}>{props.item.userName}</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>{props.item.date}</Text>
                    </View>
                </Pressable>
            </View>
        )
    };
    return (
        <SafeAreaView style={styles.safe_area_view}>
            <SearchHeader />
            <ScrollView>
                <View style={styles.waterfall}>
                    <View style={styles.waterfall_item}>
                        {!loading ? (travelsLeft.map(element => {
                            return (
                                <Item item={element} key={element.id}/>
                            )
                            })):(() => {
                                return(<div>loading</div>)
                            })
                        }
                        <Text>abb</Text>
                    </View>
                    <View style={styles.waterfall_item}>
                        {/* {travelsRight.map(element => {
                            return (
                                <Item item={element} key={element.id} />
                            )
                        })} */}
                        <Text>aaa</Text>
                    </View>
                </View>
            </ScrollView>
            <FootBar />
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


export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);