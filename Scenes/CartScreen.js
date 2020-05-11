import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button, ScrollView } from 'react-native';

export default function CartScreen({ route, navigation }) {


  const [array, setArray] = useState();
  const [a, setA] = useState();
  const { userLogin } = route.params;
  const { st } = route.params;
  const { stt } = route.params;

  const [status, setStatus] = useState(st);
  const [price, setPrice] = useState('Tổng tiền');
  useEffect(() => {
    if (stt == 'del') {
      setPrice('Tổng tiền')
      fetch('http://192.168.0.103:9090/getUserCart')
        .then(response => response.json())
        .then(a => {
          setArray(a);
        })
    }
    if (status == 'load') {
      setStatus('end')
      fetch('http://192.168.0.103:9090/postUserOnline', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          userLogin: userLogin
        }).toString()
      })
        .then(response => response.text())
        .then(json => {

          fetch('http://192.168.0.103:9090/getUserCart')
            .then(response => response.json())
            .then(a => {
              setArray(a);
            })
        })
        .catch((error) => {
          alert('Chưa thêm sản phẩm nào. ' + error)
        });
    }
  })
  return (
    <View style={styles.container}>
      <ScrollView>
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

                    fetch('http://192.168.0.103:9090/postUserOnline', {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      body: new URLSearchParams({
                        userLogin: userLogin,
                        stt: item._id
                      }).toString()
                    })
                      .then(response => response.text())
                      .then(json => {
                        setPrice('Tổng tiền')
                        alert('Đã gỡ khỏi giỏ hàng.')
                        fetch('http://192.168.0.103:9090/getUserCart')
                          .then(response => response.json())
                          .then(a => {
                            setArray(a);
                          })
                      })
                      .catch((error) => {
                        alert('Xóa thất bại. ' + error)
                      });
                  }
                  }>
                    <Image source={require('./close.png')} style={{ width: 20, height: 20, marginLeft: 5 }} />
                  </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Detail', {
                    title: 'Xóa',
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    type: item.type,
                    sl: item.sl,
                    image: item.image,
                    id: item._id,
                    userLogin: userLogin
                  });

                }}>
                  <Text style={{ width: '100%', backgroundColor: '#FFD700', textAlign: 'right', paddingRight: 5 }}> Chi tiết >></Text>
                </TouchableOpacity>

              </View>

            </View>
          }
          keyExtractor={item => item._id}
        />


      </ScrollView>
      <TouchableOpacity style={styles.ButtonLogin} onPress={() => {
        var x = 0;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          x += element.price;
        }
        setPrice('Tổng tiền: ' + x + ' VNĐ');
      }}>
        <Text style={styles.TextButtonLogin}>{price}</Text>
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
    backgroundColor: '#32CD32',
  },

  TextButtonLogin: {
    alignSelf: "center",
    lineHeight: 50,
    fontSize: 16,
    color: '#fff'
  },
});
