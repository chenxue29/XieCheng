import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    LayoutChangeEvent,
    Dimensions,
    RefreshControl,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import icon_add from '../assets/icon_add.png';
import icon_setting from '../assets/icon_setting.png';
import icon_profile from '../assets/icon_profile.png';
import FootBar from '../components/foot_bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const backgroundImage = ['#F8F8FF', '#D6E4FF', '#F2FCCF', '#D7FAFE', '#FFF6D9', '#FFE5D7']

const url = '10.101.108.241'
let formData = new FormData();
export default function Mine() {
    const user_id = 1

    const [tabIndex, setTabIndex] = useState(0);
    const [image, setImage] = useState(null);
    const [userData, setUserData] = useState([]);
    const [travelData, setTravelData] = useState([])
    const [imageData, setImageData] = useState([])



    useEffect(() => {
        fetchUserData()
        fetchTravelData()
        fetchImageData()

    }, []);

    const fetchUserData = async () => {
        try {
            // 发起后端接口调用
            const response = await fetch(`http://${url}:3000/getUserInfo?user_id=${user_id}`);
            const data = await response.json();

            // 更新用户数据状态
            setUserData(data);
            console.log('用户信息sss', userData[0])
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchTravelData = async () => {
        try {
            // 发起后端接口调用
            const response = await fetch(`http://${url}:3000/getTravelInfo?user_id=${user_id}`);
            const data = await response.json();

            // 更新用户数据状态
            setTravelData(data);
            console.log('游记信息ss', travelData[0])
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchImageData = async () => {
        try {
            // 发起后端接口调用
            const response = await fetch(`http://${url}:3000/getImageInfo?user_id=${user_id}`);
            const data = await response.json();

            // 更新用户数据状态
            setImageData(data);
            console.log('图片信息ss', imageData[0])
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            const newImage = result.assets[0].uri
            // console.log(newImage)
            const name = result.assets[0].fileName;
            formData.append('profile', {
                uri: newImage,
                name: name,
                type: 'image/jepg'
            })
            setImage(newImage);
        }
        try {
            formData.append('user_id', 1)
            console.log(formData.getAll('profile'))
            const response = await axios.post(`http://${url}:3000/publishProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            formData = new FormData();
            console.log(response.data); // 打印后端返回的响应数据
        } catch (error) {
            formData = new FormData();
            console.error('Error:', error);
        }
    };

    const renderInfo = () => {
        if (userData.length === 0 || travelData.length === 0 || imageData.length === 0) {
            // 数据尚未加载完成，可以显示加载中的UI或其他处理
            return <Text>Loading...</Text>;
        }
        return (
            <View style={styles.container}>
                <View style={styles.avatarLayout}>
                    <TouchableOpacity>
                        {userData[0].profile ?
                            (<Image style={styles.avatarImg} source={{ uri: userData[0].profile }} />) :
                            (<Image style={styles.avatarImg} source={icon_profile} />)
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImage}>
                        <Image style={styles.addImg} source={icon_add} />
                    </TouchableOpacity>
                    <View style={styles.nameLayout}>
                        <Text style={styles.nameTxt}>{userData[0].username}</Text>
                        <Text style={styles.namenologin}>退出登录</Text>
                    </View>
                    <TouchableOpacity>
                        <Image style={styles.settingImg} source={icon_setting} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const renderTabs = () => {
        const styles = StyleSheet.create({
            titleLayout: {
                width: '100%',
                height: 48,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 16,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
            },
            icon: {
                width: 28,
                height: 28,
            },
            line: {
                width: 28,
                height: 2,
                backgroundColor: '#ff2442',
                borderRadius: 1,
                position: 'absolute',
                bottom: 6,
            },
            tabButton: {
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 14,
            },
            tabTxt: {
                fontSize: 17,
                color: '#999',
            },
            tabTxtSelected: {
                fontSize: 17,
                color: '#333',
            },
        });
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(0);
                    }}
                >
                    <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>公开</Text>
                    {tabIndex === 0 && <View style={styles.line} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(1);
                    }}
                >
                    <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>私密</Text>
                    {tabIndex === 1 && <View style={styles.line} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(2);
                    }}
                >
                    <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>待审核</Text>
                    {tabIndex === 2 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(3);
                    }}
                >
                    <Text style={tabIndex === 3 ? styles.tabTxtSelected : styles.tabTxt}>未通过</Text>
                    {tabIndex === 3 && <View style={styles.line} />}
                </TouchableOpacity>
            </View>
        );
    }

    const renderList = () => {
        const navigation = useNavigation();
        const openList = []
        const closeList = []
        const waitList = []
        const refuseList = []
        console.log(imageData)
        if (userData.length === 0 || travelData.length === 0 || imageData.length === 0) {
            // 数据尚未加载完成，可以显示加载中的UI或其他处理
            return <Text>Loading...</Text>;
        } else {
            travelData.forEach(item => {
                if (item.state == '1') {
                    if (item.open == 1) {
                        const travel_image = []
                        imageData.forEach(imageItem => {
                            if (imageItem.travel_id == item.id) {
                                travel_image.push(imageItem.picture)
                            }
                        })
                        // console.log("找到对应图像",travel_image)
                        const openlist = {
                            id: 0,
                            image: travel_image[0],
                            imageList: travel_image,
                            title: item.title,
                            content: item.content,
                            date: item.date,
                            position: item.position,
                            open: item.open,
                            avatarUrl: userData[0].profile,
                            name: userData[0].username,
                        }
                        openList.push(openlist)
                    } else {
                        const travel_image = []
                        imageData.forEach(imageItem => {
                            if (imageItem.travel_id == item.id) {
                                travel_image.push(imageItem.picture)
                            }
                        })
                        const closelist = {
                            id: 1,
                            image: travel_image[0],
                            imageList: travel_image,
                            title: item.title,
                            content: item.content,
                            date: item.date,
                            position: item.position,
                            open: item.open,
                            avatarUrl: userData[0].profile,
                            name: userData[0].username,
                        }
                        closeList.push(closelist)
                    }
                } else if (item.state == '0') {
                    const travel_image = []
                    imageData.forEach(imageItem => {
                        if (imageItem.travel_id == item.id) {
                            travel_image.push(imageItem.picture)
                        }
                    })
                    const waitlist = {
                        id: 2,
                        image: travel_image[0],
                            imageList: travel_image,
                            title: item.title,
                            content: item.content,
                            date: item.date,
                            position: item.position,
                            open: item.open,
                            avatarUrl: userData[0].profile,
                            name: userData[0].username,
                    }
                    waitList.push(waitlist)
                } else {
                    const travel_image = []
                    imageData.forEach(imageItem => {
                        if (imageItem.travel_id == item.id) {
                            travel_image.push(imageItem.picture)
                        }
                    })
                    const refuselist = {
                        id: 3,
                        image: travel_image[0],
                            imageList: travel_image,
                            title: item.title,
                            content: item.content,
                            date: item.date,
                            position: item.position,
                            open: item.open,
                            avatarUrl: userData[0].profile,
                            name: userData[0].username,
                    }
                    refuseList.push(refuselist)
                }
            })

            // const openList = [{
            //     id: 0,
            //     image: imageData[0].picture,
            //     title: travelData[0].title,
            //     avatarUrl: userData[0].profile,
            //     name: userData[0].username,
            // }]
            // const closeList = [{
            //     id: 1,
            //     image: require('../assets/article/img_02.jpg'),
            //     title: '啥时候撒哈哈',
            //     avatarUrl: require('../assets/favicon.png'),
            //     name: 'aaaaa',
            // }]
            // const waitList = [{
            //     id: 2,
            //     image: require('../assets/article/img_03.jpg'),
            //     title: '啥时候撒哈哈',
            //     avatarUrl: require('../assets/favicon.png'),
            //     name: 'aaaaa',
            // }]
            // const refuseList = [{
            //     id: 0,
            //     image: require('../assets/article/img_04.jpg'),
            //     title: '啥时候撒哈哈',
            //     avatarUrl: require('../assets/favicon.png'),
            //     name: 'dddaa',
            // }]

            const currentList = [openList, closeList, waitList, refuseList][tabIndex];
            const styles = StyleSheet.create({
                listContainer: {
                    width: '100%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    backgroundColor: 'white',
                },
                item: {
                    width: SCREEN_WIDTH - 18 >> 1,
                    backgroundColor: 'white',
                    marginLeft: 6,
                    marginBottom: 6,
                    borderRadius: 8,
                    overflow: 'hidden',
                    marginTop: 8,
                },
                titleTxt: {
                    fontSize: 14,
                    color: '#333',
                    marginHorizontal: 10,
                    marginVertical: 4,
                },
                nameLayout: {
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginBottom: 10,
                },
                avatarImg: {
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                    borderRadius: 10,
                },
                nameTxt: {
                    fontSize: 12,
                    color: '#999',
                    marginLeft: 6,
                    flex: 1,
                },
                heart: {
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                },
                countTxt: {
                    fontSize: 14,
                    color: '#999',
                    marginLeft: 4,
                },
                itemImg: {
                    width: SCREEN_WIDTH - 18 >> 1,
                    height: 240,
                },
            })
            return (
                <View style={styles.listContainer}>
                    {currentList.map((item, index) => {
                        console.log("传到细节的Item是啥",item)
                        return (
                            <TouchableOpacity
                                key={`${item.id}-${index}`}
                                style={styles.item}
                                onPress={() => navigation.navigate('TravelDetail', { item })}
                            >
                                <Image style={styles.itemImg} source={{ uri: item.image }} />
                                <Text style={styles.titleTxt}>{item.title}</Text>
                                <View style={styles.nameLayout}>
                                    <Image style={styles.avatarImg} source={{ uri: item.avatarUrl }} />
                                    <Text style={styles.nameTxt}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
        }
    }
    return (
        <View style={styles.root}>
            {/* <Image
                style={[styles.bgImg, { height: bgImgHeight + 64 }]}
                source={icon_mine_bg}
            /> */}
            <ScrollView
                style={styles.scrollView}
            >
                {renderInfo()}
                {renderTabs()}
                {renderList()}
            </ScrollView>
            <FootBar />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 400,
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    // container: {
    //     position: 'absolute', // 或者使用其他布局方式，如flex等，取决于你的具体需求
    //     width: '100%', // 设置宽度为100%以覆盖整个视图区域
    //     height: '100%', // 设置高度为100%以覆盖整个视图区域
    //     backgroundColor: 'transparent', // 设置背景颜色为透明，以便显示背景图片
    // },
    avatarLayout: {
        width: '100%',
        height: 160,
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 18,
        backgroundColor: '#F8F8FF',
    },
    newAvatarLayout: {
        width: '100%',
        height: 160,
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 18,
        backgroundColor: backgroundImage[0],
    },
    avatarImg: {
        width: 88,
        height: 88,
        resizeMode: 'cover',
        borderRadius: 48,
        marginTop: 30,
    },
    addImg: {
        width: 28,
        height: 28,
        marginLeft: -25,
        marginBottom: 2,
    },
    nameLayout: {
        marginLeft: 30,
        marginTop: 58
    },
    nameTxt: {
        fontSize: 20,
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
    },
    namenologin: {
        fontSize: 15,
        flex: 1,
        color: 'gray',
    },
    settingImg: {
        width: 20,
        height: 20,
        marginLeft: 70,
        tintColor: 'black'
    },

})
