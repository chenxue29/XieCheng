import React,{ Component, useEffect, useState } from 'react';
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

import {connect} from 'react-redux';
import userLogin from '../store/actions/action';


const Item = ({title, userName, date, height}) => {
    const navigation = useNavigation();
    return(
            <View style={styles.section}>
                <Pressable style={styles.item} onPress={()=>{navigation.navigate('TravelDetail')}}>
                    <Image source={{ uri: 'https://p1.ssl.qhmsg.com/t01d40f0b5316c5f58d.jpg' }} style={[styles.image, {height: height}]} />
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
                    <View style={styles.user}>
                        <Image source={{ uri: 'https://p1.ssl.qhmsg.com/t01d40f0b5316c5f58d.jpg' }} style={styles.user_img} />
                        <Text style={styles.user_name} numberOfLines={1} ellipsizeMode={'tail'}>{userName}</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </Pressable>
            </View>
    )
};

function AppIndex() {
    // const [travelsLeft, setTravelsLeft] = useState([]);
    // const [travelsRight, setTravelsRight] = useState([]);

    useEffect(() => {
        getAllInfo();
    }, []);

    const getAllInfo = () => {
        fetch(`http://${url}:3000/searchManager`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => {
            // console.log(data)
            console.log(data.length)
            // if (data && data.length > 0) {
            //     const half = data.length / 2;
            //     const firstHalf = data.slice(0, half);
            //     const secondHalf = data.slice(half);

            //     const travelsLeftData = firstHalf
            //         .filter(item => item.state === '1' && item.open === 1)
            //         .map((item, index) => ({
            //             id: index + 1,
            //             image: item.imgurl[0],
            //             imageList: item.imgurl,
            //             title: item.title,
            //             content: item.content,
            //             date: item.date,
            //             position: item.position,
            //             open: item.open,
            //             user_id: item.userID,
            //             avatarUrl: item.profile,
            //             userName: item.username,
            //             height: 300,
            //         }));

            //     const travelsRightData = secondHalf
            //         .filter(item => item.state === '1' && item.open === 1)
            //         .map((item, index) => ({
            //             id: index + 1,
            //             image: item.imgurl[0],
            //             imageList: item.imgurl,
            //             title: item.title,
            //             content: item.content,
            //             date: item.date,
            //             position: item.position,
            //             open: item.open,
            //             user_id: item.userID,
            //             avatarUrl: item.profile,
            //             userName: item.username,
            //             height: 300,
            //         }));

            //     setTravelsLeft(travelsLeftData);
            //     setTravelsRight(travelsRightData);
            // }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    const travelsLeft = [
        {
            id: 1,
            title: '2024.3.31日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '周佳佳',
            date: '20240331',
            height: 300,
        },
        {
            id: 2,
            title: '2024.4.5日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '陈雪',
            date: '20240331',
            height: 200,
        },
        {
            id: 3,
            title: '2024.3.31日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '周佳佳',
            date: '20240331',
            height: 250,
        },
        {
            id: 4,
            title: '2024.4.5日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '陈雪',
            date: '20240331',
            height: 100,
        },
    ];
    const travelsRight = [
        {
            id: 1,
            title: '2024.3.31日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '周佳佳',
            date: '20240331',
            height: 200,
        },
        {
            id: 2,
            title: '2024.4.5日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '陈雪',
            date: '20240331',
            height: 200,
        },
        {
            id: 3,
            title: '2024.3.31日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '周佳佳',
            date: '20240331',
            height: 200,
        },
        {
            id: 4,
            title: '2024.4.5日的一天',
            content: '今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！今天什么都没干，度过了美妙的一天！',
            state: 1,
            open: 0,
            delete: 0,
            userName: '陈雪',
            date: '20240331',
            height: 200,
        },
    ];

    return (
        <SafeAreaView style={styles.safe_area_view}>
            <SearchHeader />
                <ScrollView>
                    <View style={styles.waterfall}>
                        <View style={styles.waterfall_item}>
                            {travelsLeft.map(element => {
                                return(
                                    <Item {...element} />
                                    )
                            })}
                        </View>
                        <View style={styles.waterfall_item}>
                            {travelsRight.map(element => {
                                    return(
                                        <Item {...element} />
                                        )
                                })}
                        </View>
                    </View>
                </ScrollView>    
            <FootBar/>
        </SafeAreaView>
        
    );
}

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