import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import { ScreensName, InsideRouteScreenProps, RootRouteScreenProps} from '@src/routes/types'
import { useRequest } from 'ahooks';
import { HotelByLocationApi } from '@src/services/api/hotelApi';
import { useNavigation, useRoute } from '@react-navigation/native';

const RoomOfLocationScreen: React.FC<
InsideRouteScreenProps<ScreensName.RoomOfLocationScreen>> = () => {
  const { params }: any = useRoute();
  const navigation : any = useNavigation();
  const [colorEvent, setColorEvent] = useState(false);

  let idLocation = params.idLocation;
  let nameLocation = params.nameLocation;

  const { data : dataLocation, loading, runAsync} = useRequest(async () => 
  HotelByLocationApi(idLocation),{ debounceWait: 300, manual: true });

  useEffect(() => {
    runAsync();
  }, []);


  return (
    <View style={{}}>
      {/* Header */}
      <StatusBar
        animated={true}
        backgroundColor="black" />
      <View style={{marginTop: 10, height: 50, backgroundColor: '#E6E6E6', alignItems: 'center', 
                    flexDirection: 'row', borderRadius: 5, marginHorizontal: 15}}>
        <TouchableOpacity style={{padding: 10}}
                          onPress={() => navigation.goBack()}>
          <Image
              style={{resizeMode: 'contain', width: 20, height: 30, tintColor: 'orange'}}
              source= {{uri: 'https://i.imgur.com/1RCGweh.png'}}/>
        </TouchableOpacity>
        <Text style={{color: 'black', fontWeight: '500', marginLeft: 10, fontSize: 15}}>{nameLocation}</Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 20, backgroundColor: '#E6E6E6', paddingBottom: 15}}>
        <TouchableOpacity style={styles.shadow}>
          <Image
              style={{resizeMode: 'contain', width: 10, height: 10, tintColor: '#6B6B6B'}}
              source= {{uri: 'https://i.imgur.com/Xcolnnq.png'}}/>
          <Text style={{color: 'black', fontSize: 12, marginLeft: 10}}>Khuyến mại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shadow}>
          <Image
              style={{resizeMode: 'contain', width: 10, height: 10}}
              source= {{uri: 'https://i.imgur.com/8Bgr7Ds.png'}}/>
          <Text style={{color: 'black', fontSize: 12, marginLeft: 10}}>Đặt phòng nhanh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shadow}>
          <Text style={{color: 'black', fontSize: 12}}>Gần nhất</Text>
        </TouchableOpacity>
      </View>

    {/* Body */}
      {loading && (
        <View style={{justifyContent: 'center', marginTop: 30, flexDirection: 'row'}}>
        <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
        <ActivityIndicator size="large" color="orange" />
        </View>
      )}
      <ScrollView>
      {!loading && (
        <View>
          {dataLocation?.map((item, index) => 
            <View key={index} style={{backgroundColor: '#E6E6E6', paddingBottom: 20}}> 
              <TouchableOpacity style={{marginTop: 15, marginHorizontal: 20, backgroundColor: 'white', borderRadius: 10,
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: 6,
                                      },
                                      shadowOpacity: 0.37,
                                      shadowRadius: 7.49,
                                      elevation: 12,}}
                                onPress= {() => navigation.navigate('Thông tin phòng', {idRoomSuggest : item._id})}> 
                <Image
                  style={{resizeMode: 'cover', width: '100%', height: 170, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                  source= {{uri: item.img}}/>
                <TouchableOpacity style={{position: 'absolute', right: 20, top: 15}}
                                  onPress= {() => setColorEvent(!colorEvent) }>
                  {(colorEvent== true && index ==0)?
                   <Image
                    style={{resizeMode: 'contain', width: 25, height: 25,}}
                    source= {{uri: 'https://i.imgur.com/5rzdwQu.png'}}/>
                   : 
                   <Image
                    style={{resizeMode: 'contain', width: 25, height: 25,}}
                    source= {{uri: 'https://i.imgur.com/PiqUVqT.png'}}/>
                  }
                 
                </TouchableOpacity>
                
            <View style={{marginTop: 10, flexDirection: 'row',marginLeft: 10}}>
              <Image
                style={{resizeMode: 'contain', width: 10, height: 20, tintColor: 'orange' }}
                source= {{uri: 'https://i.imgur.com/UpBoUkc.png'}}/>
              <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', marginLeft: 5, marginRight: 30}}>
                {item.nameRoom}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', marginLeft: 20}}>
              <Image
                style={{resizeMode: 'contain', width: 10, height: 20, tintColor: '#6B6B6B' }}
                source= {{uri: 'https://i.imgur.com/OILahL1.png'}}/>
              <Text style={{color: '#383838', fontSize: 11, marginLeft: 10, marginRight: 30}}>
                {item.detailLocation}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 20}}>
              <Image
                      style={{resizeMode: 'contain', width: 13, height: 20, tintColor: '#6B6B6B' }}
                      source= {{uri: 'https://i.imgur.com/QfbNL3x.png'}}/>
              <Text style={{color: '#383838', fontSize: 11, marginLeft: 7, marginRight: 30}}>
                {item.numberPeople} khách • {item.numberBedRoom} phòng ngủ • {item.numberBathRoom} phòng tắm
              </Text>
            </View>
            <Text style={{color: 'black', margin: 15, fontWeight: 'bold', fontSize: 15}}>{item.priceMon_Fri}đ̲</Text>
          </TouchableOpacity>
        </View>
        )}        
        <View style={{height: 200}}></View>
          </View>
      )}
        
    </ScrollView>
  </View>
    
  )
}

export {RoomOfLocationScreen}

const styles = StyleSheet.create({
  shadow: {
    marginTop: 10, backgroundColor: 'white', borderRadius: 7, alignItems: 'center', flexDirection: 'row',
    marginLeft: 15, paddingHorizontal: 10, paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  }
})