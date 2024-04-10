import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import icon_arrow from '../assets/icon_arrow.png';
import icon_eye_close from '../assets/icon_eye_close.png';
import icon_eye_open from '../assets/icon_eye_open.png';
import icon_share from '../assets/icon_share.png';

export default function TravelDetail() {
    const navigation = useNavigation();
    // 导航栏部分：头像+昵称
    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.pop()}
                >
                    <Image style={styles.backImg} source={icon_arrow} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Mine')}>
                    <Image style={styles.avatarImg} source={require('../assets/favicon.png')} />
                </TouchableOpacity>
                <Text style={styles.userNameTxt}>春天的明知山</Text>
                <Image style={styles.shareImg} source={icon_share} />
            </View>
        );
    }
    // 轮播图部分：图片
    const renderImages = () => {
        const images = [
            require('../assets/article/img_01.jpg'),
            require('../assets/article/img_02.jpg'),
            require('../assets/article/img_03.jpg'),
            require('../assets/article/img_04.jpg')
        ]
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = sliderWidth - 20; // 设置轮播项的宽度，可以根据需要进行调整
        const [activeSlide, setActiveSlide] = React.useState(0);
        return (
            <View style={{ paddingBottom: 30 }}>
                <Carousel
                    data={images}
                    renderItem={({ item }) => (
                        <Image source={item} style={{ width: itemWidth, height: 400 }} />
                    )}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    autoplay
                    loop
                    onSnapToItem={(index) => setActiveSlide(index)}
                />
                <Pagination
                    dotsLength={images.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{ paddingVertical: 10 }}
                    dotStyle={{
                        width: 10,
                        height: 5,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'gray'
                    }}
                    inactiveDotStyle={{
                        // 自定义非活动状态的小点样式
                        width: 10,
                        height: 5,
                        borderRadius: 5,
                        marginHorizontal: 8,
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.8}
                />
            </View>
        );
    }
    // 文字内容部分：标题+内容+时间+地点+私密状态(单击切换)
    const renderInfo = () => {
        const [open, setOpen] = useState(true);
        const toggleOpen = () => {
            setOpen(!open);
        };
        return (
            <>
                <Text style={styles.articleTitleTxt}>记录一个简陋的页面</Text>
                <Text style={styles.descTxt}>在春天的清晨，微风轻拂着脸颊，带来了一股温暖的气息。阳光透过云层洒下来，照亮了大地，让一切焕发出勃勃生机。树木披上了嫩绿色的新叶，花朵绽放出五彩斑斓的花瓣，散发着芬芳的香气。草地上涌现出一片翠绿的海洋，细嫩的草芽从土壤中钻出来，向着阳光伸展。</Text>
                <Text style={styles.timeAndLocationTxt}>2024年4月2日  上海 徐汇</Text>
                <TouchableOpacity onPress={toggleOpen}>
                    {!open ?
                        (<Image style={styles.openImg} source={icon_eye_close} />) :
                        (<Image style={styles.openImg} source={icon_eye_open} />)
                    }
                </TouchableOpacity>
            </>
        );
    }

    return (
        <View style={styles.root}>
            {renderTitle()}
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {renderImages()}
                {renderInfo()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    titleLayout: {
        width: '100%',
        height: 56,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
    },
    backImg: {
        width: 20,
        height: 20,
    },
    openImg: {
        width: 18,
        height: 18,
        marginTop: -32,
        marginLeft: 170,
    },
    avatarImg: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    userNameTxt: {
        fontSize: 15,
        flex: 1,
        color: '#333',
        marginLeft: 16,
    },
    followTxt: {
        paddingHorizontal: 16,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff2442',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        color: '#ff2442',
    },
    shareImg: {
        width: 28,
        height: 28,
        marginHorizontal: 16,
    },
    activeDot: {
        width: 6,
        height: 6,
        backgroundColor: '#ff2442',
        borderRadius: 3,
    },
    inActiveDot: {
        width: 6,
        height: 6,
        backgroundColor: '#c0c0c0',
        borderRadius: 3,
    },
    articleTitleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginTop: -10
    },
    descTxt: {
        fontSize: 15,
        color: '#333',
        marginTop: 16,
        paddingHorizontal: 16,
    },
    tagsTxt: {
        fontSize: 15,
        color: '#305090',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    timeAndLocationTxt: {
        fontSize: 12,
        color: '#bbb',
        marginVertical: 16,
        marginLeft: 16,
    },
    line: {
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
    },
    bottomLayout: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    bottomEditLayout: {
        height: 40,
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginRight: 12,
    },
    editImg: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },
    bottomCommentInput: {
        height: '100%',
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
    },
    bottomCount: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    bottomIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 12,
    },
});