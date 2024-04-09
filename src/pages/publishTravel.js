// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     Image,
//     Button,
//     ScrollView,
//     TouchableOpacity,
//     LayoutChangeEvent,
//     Dimensions,
//     RefreshControl,
// } from 'react-native'
// import ImagePicker from 'react-native-image-picker';

// export default function PublishTravel() {

//     const renderTabs = () => {
//         return (
//             <View style={styles.topContainer}>
//                 <Text style={styles.concealBtn}>取消</Text>
//                 <Text style={styles.titleTxt}>发表游记</Text>
//                 <View style={styles.publishContainer}>
//                     <Text style={styles.publishBtn}>发表</Text>
//                 </View>
//             </View>
//         );

//     }

//     const mainContent = () => {
//         return (
//             <View style={styles.mainContainer}>
//                 <Text style={styles.titleTag}>#</Text>
//                 <TextInput style={styles.titleContainer} placeholder="带个标题叭～"></TextInput>
//                 <TextInput style={styles.contentContainer} multiline={true} maxLength={20} placeholder="这一刻的想法..."></TextInput>
//             </View>
//         );
//     }


//     const [image, setImage] = useState(null);

//     const pickImage = () => {
//         ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else {
//                 const source = { uri: response.uri };
//                 setImage(source);
//             }
//         });
//     };


//     return (
//         <View style={styles.root}>
//             {renderTabs()}
//             {mainContent()}
//             <Button title="Pick Image" onPress={pickImage} />
//             {image && <Image source={image} style={styles.image} />}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     root: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'white'
//     },
//     topContainer: {
//         width: '100%',
//         height: 56,
//         marginTop: 34,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     concealBtn: {
//         // width: '100%',
//         fontSize: 17,
//         paddingLeft: 15,
//     },
//     titleTxt: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginLeft: 100,
//     },
//     publishContainer: {
//         marginLeft: 100,
//         paddingVertical: 7,
//         paddingHorizontal: 9,
//         borderRadius: 7,
//         backgroundColor: '#e1e0db'
//     },
//     publishBtn: {
//         fontSize: 17,


//     },
//     mainContainer: {
//         width: '100%',
//         height: 'auto',
//         // backgroundColor: 'red'
//     },
//     titleTag: {
//         fontSize: 17,
//         fontWeight: '600',
//         color: '#484742',
//         paddingLeft: 13,
//     },
//     titleContainer: {
//         height: 48,
//         fontSize: 17,
//         fontWeight: '600',
//         color: '#484742',
//         paddingLeft: 13,
//         marginTop: -34,
//         marginLeft: 15
//         // backgroundColor: 'green'
//     },
//     contentContainer: {
//         height: 'auto',
//         fontSize: 16,
//         paddingLeft: 13,
//         // paddingHorizontal: 13,
//         // backgroundColor: 'red',
//     }
// })



import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PublishTravel() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('没有相册访问权限');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.5,
    });

    if (!pickerResult.cancelled) {
      setSelectedImage(pickerResult.uri);
      console.log('height',pickerResult.canceled)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="选择图片" onPress={openImagePicker} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginTop: 20 }} />
      )}
    </View>
  );
}