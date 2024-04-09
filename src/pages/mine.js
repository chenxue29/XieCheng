import React, {useState} from "react";
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
import { useNavigation } from '@react-navigation/native';
import icon_add from '../assets/icon_add.png';
import icon_setting from '../assets/icon_setting.png';
import FootBar from '../components/foot_bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Mine () {
   
    const [tabIndex, setTabIndex] = useState(0);

    const renderInfo = () => {
        const styles = StyleSheet.create({
            avatarLayout: {
                width: '100%',
                height: 160,
                flexDirection: 'row',
                alignItems: 'flex-end',
                padding: 18,
                backgroundColor: '#F8F8FF'
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
            idLayout: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                marginBottom: 20,
            },
            idTxt: {
                fontSize: 12,
                color: '#bbb',
            },
            qrcodeImg: {
                width: 12,
                height: 12,
                marginLeft: 6,
                tintColor: '#bbb'
            },
            descTxt: {
                fontSize: 14,
                color: 'white',
                paddingHorizontal: 16,
            },
            sexLayout: {
                width: 32,
                height: 24,
                backgroundColor: '#ffffff50',
                borderRadius: 12,
                marginTop: 12,
                marginLeft: 16,
                justifyContent: 'center',
                alignItems: 'center',
            },
            sexImg: {
                width: 12,
                height: 12,
                resizeMode: 'contain',
            },
            infoLayout: {
                width: '100%',
                paddingRight: 16,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 28,
            },
            infoItem: {
                alignItems: 'center',
                paddingHorizontal: 16,
            },
            infoValue: {
                fontSize: 18,
                color: 'white',
            },
            infoLabel: {
                fontSize: 12,
                color: '#ddd',
                marginTop: 6,
            },
            infoButton: {
                height: 32,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
            },
            editTxt: {
                fontSize: 14,
                color: '#ffffff'
            },
            settingImg: {
                width: 20,
                height: 20,
                marginLeft: 90,
                tintColor: 'black'
            },
        });
        return (
            <View>
                <View style={styles.avatarLayout}>
                    <Image style={styles.avatarImg} source={require('../assets/favicon.png')} />
                    {/* <Image style={styles.addImg} source={icon_add} /> */}
                    <View style={styles.nameLayout}>
                        <Text style={styles.nameTxt}>春天的明知山</Text>
                        <Text style={styles.namenologin}>退出登录</Text>
                    </View>
                    <Image style={styles.settingImg} source={icon_setting} />
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
        const openList = [{
            id: 0,
            image: require('../assets/article/img_01.jpg'),
            title: '啥时候撒哈哈',
            avatarUrl: require('../assets/favicon.png'),
            name: 'aaaaa',
        }]
        const closeList = [{
            id: 1,
            image: require('../assets/article/img_02.jpg'),
            title: '啥时候撒哈哈',
            avatarUrl: require('../assets/favicon.png'),
            name: 'aaaaa',
        }]
        const waitList = [{
            id: 2,
            image: require('../assets/article/img_03.jpg'),
            title: '啥时候撒哈哈',
            avatarUrl: require('../assets/favicon.png'),
            name: 'aaaaa',
        }]
        const refuseList = [{
            id: 0,
            image: require('../assets/article/img_04.jpg'),
            title: '啥时候撒哈哈',
            avatarUrl: require('../assets/favicon.png'),
            name: 'dddaa',
        }]

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
                    return (
                        <TouchableOpacity
                            key={`${item.id}-${index}`}
                            style={styles.item}
                            onPress={() => navigation.navigate('TravelDetail', { item })}
                        >
                            <Image style={styles.itemImg} source={item.image}/>
                            <Text style={styles.titleTxt}>{item.title}</Text>
                            <View style={styles.nameLayout}>
                                <Image style={styles.avatarImg} source={item.avatarUrl} />
                                <Text style={styles.nameTxt}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
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
            <FootBar/>
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
})
