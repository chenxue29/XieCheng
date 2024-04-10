import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TravelDetail from './src/pages/travelDetail';
import Mine from './src/pages/mine';
import PublishTravel from './src/pages/publishTravel';
import LoginTest from './src/pages/login_test';
import AppIndex from './src/pages/appindex';
import Login from './src/pages/login';
import Register from './src/pages/register';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './src/store/reducers/reducer';

const Stack = createStackNavigator();
const store = createStore(reducer);

export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto"/>
  //   </View>
  // );
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AppIndex'>
      <Stack.Screen
        name='AppIndex'
        component={AppIndex}
        options={{
          headerShown: false,
          // presentation: 'transparentModal',
        }}
        />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
          // presentation: 'transparentModal',
        }}
        />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
          // presentation: 'transparentModal',
        }}
        />
      <Stack.Screen 
          name='LoginTest' 
          component={LoginTest}
          options={{
            headerShown: false,
            // presentation: 'transparentModal',
          }}
          />
        <Stack.Screen 
          name='TravelDetail' 
          component={TravelDetail}
          options={{
            headerShown: false,
            // presentation: 'transparentModal',
          }}
          />
        <Stack.Screen 
          name='Mine' 
          component={Mine}
          options={{
            headerShown: false,
            // presentation: 'transparentModal',
          }}
          />
          <Stack.Screen 
          name='PublishTravel' 
          component={PublishTravel}
          options={{
            headerShown: false,
            // presentation: 'transparentModal',
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
