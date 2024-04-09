import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TravelDetail from './src/pages/travelDetail';
import Mine from './src/pages/mine';
import PublishTravel from './src/pages/publishTravel';
import LoginTest from './src/pages/login_test';

const Stack = createStackNavigator();

export default function App() {
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto"/>
  //   </View>
  // );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Mine'>
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
