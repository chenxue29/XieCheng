import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  RefreshControl,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import * as LocationIQ from 'react-native-locationiq';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import icon_add_image from '../assets/icon_add_image.png';
import icon_position from '../assets/icon_position.png';
import icon_eye_close from '../assets/icon_eye_close.png';
import icon_eye_open from '../assets/icon_eye_open.png';

const url = '10.101.108.241'
let formData = new FormData();
export default function PublishTravel() {
  const navigation = useNavigation();
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setConInput] = useState('')
  const [images, setImages] = useState([]);
  const [images64, setImages64] = useState([]);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const position = `${province} ${city}`
  const [open, setOpen] = useState(true);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 月份从0开始计数，因此需要加1
  const currentDay = currentDate.getDate();
  const date = `${currentYear}年${currentMonth}月${currentDay}日`

  const renderTabs = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.topContainer}>
        <Text style={styles.concealBtn} onPress={() => {navigation.pop() 
          formData = new FormData()}}>取消</Text>
        <Text style={styles.titleTxt}>发表游记</Text>
        <View style={styles.publishContainer}>
          <Text onPress={dealPublish} style={styles.publishBtn}>发表</Text>
        </View>
      </View>
    );
  }

  const mainContent = () => {
    // 标题
    const handleTitleChange = (text) => {
      const hasValue = text.trim() !== '';
      hasValue && (setTitleInput(text));
    };
    console.log('标题：', titleInput)
    // 内容
    const handleConChange = (text) => {
      const hasValue = text.trim() !== '';
      hasValue && (setConInput(text));
    };
    console.log('内容：', contentInput)
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.titleTag}>#</Text>
        <TextInput onChangeText={handleTitleChange} style={styles.titleContainer} placeholder="带个标题叭～"></TextInput>
        <TextInput onChangeText={handleConChange} style={styles.contentContainer} multiline={true} placeholder="这一刻的想法..."></TextInput>
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      // aspect: [5, 5],
      quality: 0.001,
    });
    console.log(result);
    if (!result.canceled) {
      // const newImages = [...images, result.assets[0].uri];
      const newImages = result.assets.map(asset => asset.uri);

      //9张
      if (images.length + newImages.length > 9) {
        Alert.alert(
          '提示',
          '选择图片总数超过9张，请移除一些图片后再添加。',
          [
            {
              text: '确定',
              onPress: () => {
                // 可以选择在用户关闭警示框后执行一些操作
              },
            },
          ]
        );
        return;
      }
      // 将图片数据添加到 FormData 对象中
      for (let i = 0; i < result.assets.length; i++) {
        const image = result.assets[i];
        const name = image.fileName;
        console.log('ssaaa', image)
        formData.append('images', {
          uri: image.uri,
          name: `${i}_${name}`,
          type: 'image/jpeg',
        });
      }
      // console.log('ss',formData.get('images'))
      // setImages(newImages);
      setImages([...images, ...newImages]);
      // 将图片传到后端
      // console.log(newImages)
      //图片Base64编码
      // const response = await fetch(newImages[0]);
      // const blob = await response.blob();
      // const base64String = await blobToBase64(blob);
      // // console.log('64',base64String);
      // const newImages64 = [...images64, base64String];
      // setImages64(newImages64)
      // // console.log('64[]', newImages64.length);
      // }
      // // 将 Blob 对象转换为 Base64 编码的字符串
      // function blobToBase64(blob) {
      //   return new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onloadend = () => {
      //       resolve(reader.result);
      //     };
      //     reader.onerror = reject;
      //     reader.readAsDataURL(blob);
      //   });
    }
  };

  const dealPublish = async () => {
    // const requestData = {
    //   user_id: 0,
    //   title: titleInput,
    //   content: contentInput,
    //   date: date,
    //   state: 0,
    //   open: open ? 1 : 0,
    //   deleteOr: 0,
    //   position: position,
    //   images: formData,
    //   // images: images,
    // };
    // console.log('sss', images)

    // const queryParams = new URLSearchParams(requestData).toString();
    // const urlWithParams = `http://${url}:3000/publish?${queryParams}`;
    // fetch(urlWithParams)
    //   .then((response) => response.json())
    //   .then(() => {
    //     // 处理响应数据
    //     navigation.navigate('Mine');
    //   })
    //   .catch((error) => {
    //     // 处理请求错误
    //     console.error('Error:', error);
    //   });
    if(titleInput&&contentInput&&images.length>0){
      try {
        formData.append('user_id', 0);
        formData.append('title', titleInput);
        formData.append('content', contentInput);
        formData.append('date', date);
        formData.append('state', 0);
        formData.append('open', open ? 1 : 0);
        formData.append('deleteOr', 0);
        formData.append('position', position);
        console.log('所有图片', formData.getAll('images'));
        const response = await axios.post(`http://${url}:3000/publish`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response.data); // 打印后端返回的响应数据
        formData = new FormData();
        navigation.navigate('Mine');
      } catch (error) {
        formData = new FormData();
        console.error('Error:', error);
      }
    }else{
      Alert.alert("请输入完整的游记信息")
    }
    
  };

  const handleDeleteImage = (index) => {
    Alert.alert(
      '确认删除',
      '您确定要删除这张照片吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            const updatedImages = [...images];
            updatedImages.splice(index, 1);
            setImages(updatedImages);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  const locationScreen = () => {
    useEffect(() => {
      const getLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission denied');
            return;
          }
          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          getLocationDetails(latitude, longitude);
        } catch (error) {
          console.error(error);
        }
      };
      getLocation();
    }, []);
    const getLocationDetails = async (latitude, longitude) => {
      try {
        const apiKey = 'pk.0d5435efa0af336ffd6708efc2a3edf0';
        const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
        const response = await axios.get(url);
        const address = response?.data?.address || {};
        const province = address.state;
        const city = address.city;
        setProvince(province);
        setCity(city);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <View style={styles.positionContainer}>
        <Text style={styles.dateValue}>{currentYear}年{currentMonth}月{currentDay}日</Text>
        <Image style={styles.positionIcon} source={icon_position} />
        <Text style={styles.positionValue}>{province} {city}</Text>
        <TouchableOpacity onPress={toggleOpen}>
          {!open ?
            (<Image style={styles.openImg} source={icon_eye_close} />) :
            (<Image style={styles.openImg} source={icon_eye_open} />)
          }
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTabs()}
      {mainContent()}
      <View style={styles.imageContainer}>
        {images.map((imageUri, index) => (
          <TouchableOpacity key={index} style={styles.imageWrapper} onLongPress={() => handleDeleteImage(index)}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </TouchableOpacity>
        ))}
        {images.length < 9 && (
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <Image source={icon_add_image} style={styles.image} />
          </TouchableOpacity>
        )}
      </View>
      {locationScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  topContainer: {
    width: '100%',
    height: 56,
    marginTop: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  concealBtn: {
    // width: '100%',
    fontSize: 17,
    paddingLeft: 15,
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 100,
  },
  publishContainer: {
    marginLeft: 70,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 7,
    backgroundColor: '#e1e0db'
  },
  publishBtn: {
    fontSize: 17,
  },
  mainContainer: {
    width: '100%',
    height: 'auto',
    // backgroundColor: 'red'
  },
  titleTag: {
    fontSize: 17,
    fontWeight: '600',
    color: '#484742',
    paddingLeft: 13,
  },
  titleContainer: {
    height: 48,
    fontSize: 17,
    fontWeight: '600',
    color: '#484742',
    paddingLeft: 13,
    marginTop: -34,
    marginLeft: 15
    // backgroundColor: 'green'
  },
  contentContainer: {
    height: 'auto', // 根据需求调整高度
    maxHeight: 150, // 根据需求调整最大高度
    // textAlignVertical: 'top',
    fontSize: 16,
    paddingLeft: 13,
    // paddingHorizontal: 13,
    // backgroundColor: 'red',
  },
  imageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    width: 120,
    height: 120,
    margin: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  positionContainer: {
    flexDirection: 'row',
  },
  dateValue: {
    color: 'gray',
  },
  positionIcon: {
    marginLeft: 10,
    width: 15,
    height: 15,
  },
  positionValue: {
    color: 'gray',
  },
  openImg: {
    width: 18,
    height: 15,
    marginLeft: 10,
    justifyContent: 'flex-end'
  },
})
