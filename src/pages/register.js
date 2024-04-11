// import React,{ Component, useState } from 'react';
// import {
//     View,
//     Text,
//     Button,
//     SafeAreaView,
//     ScrollView,
//     TextInput,
//     Switch,
//     Pressable,
//     Alert
// } from 'react-native';
// import styles from '../css/login';

// export default class Login extends Component{
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             switchValue: false,
//             userName: '用户名',
//             passWord: '密码'
//           };
//     };
//     toggleSwitch = (value) => {
//         this.setState({ switchValue: value });
//       };
//     setUserName = (value) => {
//         // this.setState({ userName: value });
//         Alert.alert(value);
//     };
//     setPassWord = (value) => {
//         this.setState({ passWord: value });
//     };
//     render(){
//         return (
//             <SafeAreaView style={styles.safe_area_view}>
//                 <ScrollView style={styles.scrollView}>
//                     <View style={styles.main}>
//                         <Text style={styles.title}>鸭先知 & 明知山</Text>
//                         <TextInput style={styles.user_name} value={this.state.userName} onChange={this.setUserName} />
//                         <TextInput style={styles.user_name} value={this.state.passWord} onChange={this.setPassWord} />
//                         <Switch onValueChange={this.toggleSwitch} value={this.state.switchValue} />
//                         <Pressable onPress={() => Alert.alert(this.state.userName, ':', this.state.passWord)} style={styles.login_button}>
//                             <Text style={styles.login_text}>登录</Text>
//                         </Pressable>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
            
//         )
//     }
// };


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
    Alert
} from 'react-native';
import styles from '../css/login';
import { useNavigation } from '@react-navigation/native';

import {connect} from 'react-redux';
import userLogin from '../store/actions/action';

const users = [
    {
        id: '00000',
        username: 'zjj',
        password: '123456zjj',
        profile: 'YXZ_MZS\DuckAndMountain\src\assets\profile.png'
    },
    {
        id: '00001',
        username: 'cx',
        password: '123456cx',
        profile: 'YXZ_MZS\DuckAndMountain\src\assets\profile.png'
    },
    {
        id: '00002',
        username: 'wxt',
        password: '123456wxt',
        profile: 'YXZ_MZS\DuckAndMountain\src\assets\profile.png'
    },
    {
        id: '00003',
        username: 'yhm',
        password: '123456yhm',
        profile: 'YXZ_MZS\DuckAndMountain\src\assets\profile.png'
    },
    {
        id: '00004',
        username: 'ljy',
        password: '123456ljy',
        profile: 'YXZ_MZS\DuckAndMountain\src\assets\profile.png'
    },
    {
        id: '00005',
        username: 'zqx',
        password: '123456zqx',
        profile: 'YXZ_MZS\DuckAndMountain\src\assets\profile.png'
    },
];

function Register(props){
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [userid, setUerid] = useState(0);
    const [userAgree, setUserAgree] = useState(false);
    const [agreeTrue, setAgreeTrue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const {UserLogin}=props;
    const navigation = useNavigation();
    // 判断用户名与密码
    const checkLogin = () => {
        var checkUser = false;
        if(userName=='' || passWord==''){
            Alert.alert('请填写完整的用户名或密码！')
        }else if(userAgree===false){
            Alert.alert('请勾选用户协议！') // 判断有问题
        }else if(userName=='用户名' || passWord=='密码'){
            Alert.alert('请填写正确的用户名或密码！')
        }else{
            Alert.alert('注册成功！', userid);
            checkUser = true;
            UserLogin({login: 'login', name: userName, userID: userid})
            navigation.navigate('AppIndex');
        };
    };
    // 从数据库中判断用户名与密码
    // const checkFromDatabase = async () => {
    //     const sendMessage = {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //     try {
    //         const users = fetch('http://127.0.0.1/api/users', sendMessage)
    //                         .then((response) => response.json())
    //                         .then((responseJson) => {console.log(responseJson);console.log('response')});
    //         if (!users){Alert.alert('用户名或密码不正确')}
    //         else{Alert.alert('response1')};
    //         console.log(users)
    //       }
    //       catch(err) {
    //         setError(true);
    //         Alert.alert(err)
    //       }
    //       finally {
    //         setLoading(false);
    //       }
    // };
    // 勾选用户协议
    const press = () => {
        setUserAgree(!userAgree);
        if(userAgree){
            setAgreeTrue('√');
        }else{
            setAgreeTrue('');
        }
    };

    return (
        <SafeAreaView style={styles.safe_area_view}>
            <View style={styles.main}>
                    <Text style={styles.title}>鸭先知 & 明知山</Text>
                    <TextInput style={styles.user} placeholder='请输入用户名' value={userName} onChangeText={text=>setUserName(text)} />
                    <TextInput style={styles.user} placeholder='密码' value={passWord} onChangeText={text=>setPassWord(text)} />
                    <Pressable style={styles.switch_container} onPress={press}>
                        <Text style={styles.switch} >{agreeTrue}</Text>
                        <Text style={styles.switch_text}>同意用户协议</Text>
                    </Pressable>
                    {/* <Pressable onPress={() => {navigation.navigate('首页')}} style={styles.login_button}>
                        <Text style={styles.login_text}>登录</Text>
                    </Pressable> */}
                    <Pressable onPress={checkLogin} style={styles.login_button}>
                        <Text style={styles.login_text}>注册</Text>
                    </Pressable>
                    <Text style={styles.register_login} onPress={()=>{navigation.navigate('Login');}}>登录账号</Text>
                </View>
        </SafeAreaView>
        
    );
};

// 将状态存入props中
const mapStateToProps = (state) => {
    return{
      login: state.login,
      name: state.name,
      userID: state.userID,
    }
  };
  // 将dispatch存入props中
  const mapDispatchToProps = (dispatch) => {
    return{
        UserLogin: (user) => dispatch(userLogin(
          {login: user.login, name: user.name, userID: user.userID}
        ))
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Register);