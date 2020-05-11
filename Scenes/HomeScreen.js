import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';


export default function HomeScreen({ route, navigation }) {

  const [array, setArray] = useState()
  const { userLogin } = route.params;

  const [a, setA] = useState(userLogin)
  useEffect(() => {
    if (a == userLogin) {
      fetch('http://192.168.0.103:9090/getAllproduct')
        .then(response => response.json())
        .then(json => {
          setArray(json)
        })
      setA('noload');
    }
  })
  return (
    <View style={styles.container}>

      <FlatList
        numColumns={2}
        data={array}
        renderItem={({ item }) =>

          <View style={styles.Item}>
            <Image
              style={styles.image}
              source={{
                uri: 'http://192.168.0.103:9090/public/images/' + item.image,
              }}>
            </Image>


            <View style={styles.infoProduct}>

              <Text>{item.name}</Text>
              <View style={{
                flexDirection: 'row',
              }}>
                <Text>Giá: {item.price} VNĐ</Text>
                <TouchableOpacity onPress={() => {
                  fetch('http://192.168.0.103:9090/postCart', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                      user: userLogin,
                      productID: item._id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      description: item.description,
                      type: item.type,
                      sl: item.sl,
                    }).toString()
                  })
                    .then(response => response.text())
                    .then(json => {
                      alert('Thêm vào giỏ hàng thành công')
                    })
                    .catch((error) => {
                      alert('Thêm vào giỏ hàng thất bại ' + error)
                    });
                }}>
                  <Image source={require('./cart.png')} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>

              </View>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Detail', {
                  title: 'Thêm vào giỏ hàng',
                  name: item.name,
                  price: item.price,
                  description: item.description,
                  type: item.type,
                  sl: item.sl,
                  image: item.image,
                  userLogin: userLogin,
                  productID: item.id
                });

              }}>
                <Text style={{ width: '100%', backgroundColor: '#FFD700', textAlign: 'right', paddingRight: 5 }}> Chi tiết >></Text>
              </TouchableOpacity>

            </View>

          </View>
        }
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.ButtonLogin} onPress={() => {
        navigation.navigate('Cart', { userLogin: userLogin, st: 'load' });
      }}>
        <Text style={styles.TextButtonLogin}>Giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },

  Item: {
    alignItems: 'flex-end',
    backgroundColor: '#1abc9c',
    width: 170,
    height: 200,
    margin: 4,
    borderRadius: 4
  },
  infoProduct: {
    width: '100%',
    backgroundColor: '#E5E5E580',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0
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
