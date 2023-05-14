import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import * as Animatable from 'react-native-animatable';
import i18n from '@src/ultis/i18n';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoState } from '@src/atom/user';

const RegisHotelScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.RegisHotelScreen>> = () => {
  
  const { navigate, goBack } = useNavigation();
  const [userInfo, setUserInfo] = useUserInfoState(); 

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="black" />
      <View style={{marginTop: 10, height: 50, backgroundColor: '#E6E6E6', alignItems: 'center', 
                    flexDirection: 'row', borderRadius: 5, marginHorizontal: 15}}>
        <TouchableOpacity 
          style={{padding: 10}}
          onPress={() => goBack()}>
          <Image
            style={{resizeMode: 'contain', width: 20, height: 30, tintColor: 'orange'}}
            source= {{uri: 'https://i.imgur.com/1RCGweh.png'}}
        />
        </TouchableOpacity>
        <Text style={{color: 'black', fontWeight: '500', marginLeft: 10, fontSize: 15}}>Đăng ký thông tin</Text>
      </View>
      <ScrollView style={{ backgroundColor: '#F9F9F9', marginHorizontal: 15}}>
        <Text style={{marginTop: 30, fontWeight: 'bold', color: 'black',fontSize: 18}}>Chủ nhà</Text>
        <View style={{marginTop: 20,height: 180, backgroundColor: '#F7F7F7', borderRadius: 10, 
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,                                 
                    }}>
            <Text style={{marginTop: 15, marginLeft: 20,fontWeight: '700', fontSize: 16, color: 'black'}}>
                Ngô Phương Mai</Text> 
            <Text style={{position: 'absolute', top: 40, left: 20,fontSize: 12, fontWeight: '400',
                        paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#E8E8E8', borderRadius: 10, color: '#606060'}}>
                3 chỗ ở</Text>     
            <View style={{marginTop: 40, marginLeft: 20, flexDirection: 'row'}}>
                <Text style={{fontSize: 13, color: '#606060'}}>Phản hồi: </Text>
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>100% </Text>
                <Text style={{fontSize: 13, marginLeft: 20, color: '#606060'}}>Hủy phòng </Text>
                <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>0% </Text>
            </View>
            <TouchableOpacity style={{marginTop: 25, backgroundColor: '#E8E8E8',paddingVertical: 10, alignItems: 'center', marginHorizontal: 30, borderRadius: 15}}>  
                <Text style={{ fontWeight: '600', color: 'black', fontSize: 13,
                            }}>Xem thêm chỗ ở của Ngô Phương Mai
                </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export {RegisHotelScreen}

const styles = StyleSheet.create({})