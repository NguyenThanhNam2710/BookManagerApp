import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [array, setArray] = useState()

  useEffect(() => {
    fetch('http://192.168.0.103:9090/getAlluser')
      .then(response => response.json())
      .then(json => {
        setArray(json);
      })
  })
  return (
    <View style={styles.container}>


      <Text style={{
        color: '#D3D3D3',
        position: 'absolute',
        bottom: 0
      }}>Design by: Nguyễn Thành Nam</Text>
      <ScrollView>
        <View style={styles.box} >
          <Text style={styles.TitleText}>Book Manager</Text>

          <TextInput style={styles.UseText}
            onChangeText={text => setUsername(text)}
            value={username}
            placeholderTextColor="gray"
            placeholder='Username' />

          <TextInput style={styles.PassText}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholderTextColor="gray"
            secureTextEntry={true}
            placeholder='Password' />

          <TouchableOpacity style={styles.ButtonLogin}
            onPress={() => {
              if (username == '') {
                Alert.alert('Vui lòng nhập tài khoản.');
              } else if (password == '') {
                Alert.alert('Vui lòng nhập mật khẩu.');
              } else {
                let status = 0;
                for (let index = 0; index < array.length; index++) {
                  const element = array[index];
                  if (username == element.username && password == element.password) {
                    status++;
                  }
                }
                if (status > 0) {
                  navigation.navigate('Home', { userLogin: username });
                  setPassword('');
                } else {
                  Alert.alert('Đăng nhập thất bại.\nKhông tìm thấy tài khoản ' + username);
                }

              }

            }}><Text style={styles.TextButtonLogin}>LOGIN</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection: "row",
            marginBottom: 10
          }}>
            <Text style={{
              color: '#D3D3D3',
            }}>Bạn chưa có tài khoản ?</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup', { aray: array });
              }}><Text>Đăng ký</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FF0050',
    alignItems: 'center',
  },
  box: {
    flex: 1,
    marginTop: 100,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5
  },

  TitleText: {
    marginTop: 20,
    marginBottom: 60,
    fontSize: 32,
    fontWeight: "bold"
  },

  UseText: {
    height: 50,
    width: 320,
    borderWidth: 1,
    color: '#000',
    padding: 10,
    borderRadius: 4
  },

  PassText: {
    height: 50,
    width: 320,
    borderWidth: 1,
    color: '#000',
    marginTop: 20,
    borderRadius: 4,
    padding: 10
  },

  ButtonLogin: {
    marginTop: 50,
    height: 50,
    width: 200,
    backgroundColor: '#32CD32'
  },

  TextButtonLogin: {
    alignSelf: "center",
    lineHeight: 50,
    fontSize: 16,
    color: '#fff'
  },


});
