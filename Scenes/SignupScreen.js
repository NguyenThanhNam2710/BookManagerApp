import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function SignupScreen({ route, navigation }) {
  const [array, setArray] = useState()
  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const [cfpassword, setcfPassword] = useState('');

  useEffect(() => {
    fetch('http://192.168.0.103:9090/getAlluser')
      .then(response => response.json())
      .then(json => {
        setArray(json);

      })
  })
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.box} >
          <Text style={styles.TitleText}>Book Manager</Text>

          <TextInput style={styles.UseText}
            onChangeText={text => setUsername(text)}
            value={user}
            placeholderTextColor="gray"
            placeholder='Username' />

          <TextInput style={styles.PassText}
            onChangeText={text => setPassword(text)}
            value={pass}
            secureTextEntry={true}
            placeholderTextColor="gray"
            placeholder='Password' />

          <TextInput style={styles.PassText}
            onChangeText={text => setcfPassword(text)}
            value={cfpassword}
            secureTextEntry={true}
            placeholderTextColor="gray"
            placeholder='Confirm Password' />



          <View style={{
            flexDirection: "row",
            marginBottom: 20,
          }}>
            <TouchableOpacity style={styles.ButtonLogin}
              onPress={() => {
                if (user == '') {
                  Alert.alert('Vui lòng nhập tài khoản.');
                } else if (pass == '') {
                  Alert.alert('Vui lòng nhập mật khẩu.');
                } else if (cfpassword == '') {
                  Alert.alert('Vui lòng xác nhận mật khẩu.');
                } else if (cfpassword != pass) {
                  Alert.alert('Xác nhận mật khẩu không thành công.');
                } else {
                  let s = 0;
                  for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    if (element.username == user) {
                      s++;
                    }
                  }
                  if (s <= 0) {
                    fetch('http://192.168.0.103:9090/postUser', {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      body: new URLSearchParams({
                        username: user,
                        password: pass,
                      }).toString()
                    })
                      .then(response => response.text())
                      .then(json => {
                        navigation.navigate('Login');
                        alert('Tạo tài khoản thành công')
                        setUsername('');
                        setPassword('');
                        setcfPassword('');
                      })
                      .catch((error) => {
                        alert('tạo tài khoản thất bại ' + error)
                      });
                  } else {
                    Alert.alert('Tạo tài khoản thất bại.\nTài khoản ' + user + ' đã tồn tại.');
                  }

                }
              }
              }><Text style={styles.TextButtonLogin}>Đăng ký</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ButtonCancel}
              onPress={() => {
                navigation.navigate('Login');
              }}><Text style={styles.TextButtonLogin}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
    width: 150,
    backgroundColor: '#32CD32'
  },

  TextButtonLogin: {
    height: 50,
    width: 150,
    textAlign: "center",
    lineHeight: 50,
    fontSize: 16,
    color: '#fff'
  },
  ButtonCancel: {
    marginTop: 50,
    height: 50,
    width: 150,
    marginLeft: 20,
    backgroundColor: '#32CD32'
  },

});