import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Alert, ImageBackground, Dimensions, ScrollView } from 'react-native';

export default function DetailScreen({ route, navigation }) {

  const { userLogin } = route.params;
  const { productID } = route.params;
  const { title } = route.params;
  const { name } = route.params;
  const { price } = route.params;
  const { description } = route.params;
  const { type } = route.params;
  const { sl } = route.params;
  const { image } = route.params;
  const { id } = route.params;


  return (
    <View style={{ flex: 2, flexDirection: 'column', }}>
      <Text style={styles.titleText}>{name}</Text>
      <Image style={{ width: '100%', height: '40%', borderRadius: 5 }}
        source={{
          uri: 'http://192.168.0.103:9090/public/images/' + image,
        }} />
      <View style={styles.box}>
        <ScrollView>
          <View style={{ flexDirection: 'row', }}>
            <Text style={styles.text}>Giá sản phẩm: </Text>
            <Text style={styles.text1}>{price} VNĐ </Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={styles.text}>Loại sản phẩm: </Text>
            <Text style={styles.text1}>{type}</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={styles.text}>Số lượng: </Text>
            <Text style={styles.text1}>{sl}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text style={styles.text}>Mô tả: </Text>
            <Text style={styles.text1}>{description}</Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.ButtonLogin}
          onPress={() => {

            if (title == 'Xóa') {
              fetch('http://192.168.0.103:9090/postUserOnline', {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                  userLogin: userLogin,
                  stt: id
                }).toString()
              })
                .then(response => response.text())
                .then(json => {
                  alert('Đã gỡ khỏi giỏ hàng.')
                  navigation.navigate('Cart', { stt: 'del' })
                })
                .catch((error) => {
                  alert('Xóa thất bại. ' + error)
                });


            } else {

              //them gio hang
              fetch('http://192.168.0.103:9090/postCart', {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                  user: userLogin,
                  productID: productID,
                  name: name,
                  price: price,
                  image: image,
                  description: description,
                  type: type,
                  sl: sl,
                }).toString()
              })
                .then(response => response.text())
                .then(json => {
                  alert('Thêm vào giỏ hàng thành công')
                  navigation.navigate('Home')
                })
                .catch((error) => {
                  alert('Thêm vào giỏ hàng thất bại ' + error)
                });
            }
          }}><Text style={styles.TextButtonLogin}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const { height, width } = Dimensions.get('window');
const size = width;
const styles = StyleSheet.create({

  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flex: 1,
    flexDirection: 'column',
    padding: 40,
    backgroundColor: 'white',
  },
  titleText: {
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold"
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold"
  }, text1: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  btn: {
    flex: 1,

  },
  ButtonLogin: {
    height: 50,
    width: '100%',
    backgroundColor: '#32CD32'
  },

  TextButtonLogin: {
    alignSelf: "center",
    lineHeight: 50,
    fontSize: 16,
    color: '#fff'
  },

});





