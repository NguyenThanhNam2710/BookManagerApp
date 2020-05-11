import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Scenes/LoginScreen';
import DetailScreen from './Scenes/DetailScreen';
import HomeScreen from './Scenes/HomeScreen';
import CartScreen from './Scenes/CartScreen';
import SignupScreen from './Scenes/SignupScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>



        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            title: 'Đăng nhập',
            headerStyle: {
              backgroundColor: '#483D8B'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        <Stack.Screen
          name='Signup'
          component={SignupScreen}
          options={{
            title: 'Đăng ký',
            headerStyle: {
              backgroundColor: '#483D8B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

          }} />




        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Sản phẩm',
            headerStyle: {
              backgroundColor: '#483D8B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // headerRight: () => (
            //   <View>
            //     <TouchableOpacity
            //       onPress={({ navigation }) => navigation.navigate('Login')}>
            //       <Text>Go to Login</Text>
            //     </TouchableOpacity>
            //   </View>
            // ),
          }} />

        <Stack.Screen
          name='Detail'
          component={DetailScreen}
          options={{
            title: 'Chi tiết',
            headerStyle: {
              backgroundColor: '#483D8B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />


        <Stack.Screen
          name='Cart'
          component={CartScreen}
          options={{
            title: 'Giỏ hàng',
            headerStyle: {
              backgroundColor: '#483D8B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />


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
