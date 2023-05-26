import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, TextInput, Switch, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoState } from '@src/atom/user';
import { ButtonLinear } from '@src/components/ButtonLinear';
import Province from '@src/components/Province';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRegisHotelInfoState } from '@src/atom/regis_hotel';
import { StepRegisOwner } from '@src/components/StepRegisOwner';

const windowWidth = Dimensions.get('window').width;

const RegisInfoScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.RegisHotelScreen>> = () => {
  
  const { navigate, goBack } : any = useNavigation();
  const [userInfo, setUserInfo] = useUserInfoState(); 
  const [regisHotel, setRegisHotel] = useRegisHotelInfoState();

  const toggleSwitch = () => sethideSwitch(previousState => !previousState);
  const [hideSwitch, sethideSwitch] = useState(false);
  const [districtHotel, setDistrictHotel] = useState('');
  

  const handleRegisHotel = () => {
    setRegisHotel({...regisHotel, districtLocation : districtHotel + ', ' + regisHotel.districtLocation});
    navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.RegisHotelScreen}})
  }

  

  return (
    
   <View>
      <StatusBar
        animated={true}
        backgroundColor="black" />
      <ScrollView style={{}}>
        <View style={{marginTop: 10, height: 50, backgroundColor: '#E6E6E6', alignItems: 'center', 
                      flexDirection: 'row', borderRadius: 5, marginHorizontal: 20}}>
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
        <StepRegisOwner step={1}/>
        <Text style={{marginTop: 30, fontWeight: 'bold', color: 'black',fontSize: 18, marginHorizontal: 15}}>Chủ nhà</Text>
        <View style={{marginTop: 15, backgroundColor: '#F7F7F7', borderRadius: 10, marginHorizontal: 15,
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,                                 
                    }}>
          <Text style={{marginTop: 15, marginLeft: 20,fontWeight: '700', fontSize: 16.5, color: '#FF8C00'}}>
            {userInfo.name}
          </Text> 
          <Text className='w-16 mt-1' style={{marginLeft: 20,fontSize: 13, fontWeight: '400',
                      paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#E8E8E8', borderRadius: 10, color: '#606060'}}>
              3 chỗ ở</Text>    
          <View style={{marginTop: 10, marginLeft: 20, flexDirection: 'row'}}>
            <FontAwesome name={'phone'} color={'#444'} size={18} style={{marginHorizontal: 5}}/>
            <Text style={{fontSize: 14, color: '#606060'}}>Số điện thoại: </Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#FF8C00'}}>{userInfo.username}</Text>
          </View> 
          <View style={{marginTop: 10, marginLeft: 20, flexDirection: 'row'}}>
            <FontAwesome name={'envelope'} color={'#444'} size={18} style={{marginHorizontal: 5}}/>
            <Text style={{fontSize: 14, color: '#606060'}}>Email: </Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#FF8C00'}}>{userInfo.email}</Text>
          </View> 
          <View style={{marginTop: 20, flexDirection: 'row', marginLeft: 20}}>
              <Text style={{fontSize: 14, color: '#606060'}}>Phản hồi: </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>100% </Text>
              <Text style={{fontSize: 14, marginLeft: 20, color: '#606060'}}>Hủy phòng </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>0% </Text>
          </View>
          <TouchableOpacity style={{marginTop: 25, backgroundColor: '#E8E8E8',paddingVertical: 10, alignItems: 'center', marginHorizontal: 30, borderRadius: 15, marginBottom: 20}}>  
              <Text style={{ fontWeight: '600', color: 'black', fontSize: 14,
                          }}>Thay đổi thông tin cá nhân
              </Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 25, fontWeight: 'bold', color: 'black',fontSize: 18, marginHorizontal: 15}}>Thông tin chỗ ở</Text>
        <View style={{marginTop: 15, backgroundColor: '#F7F7F7', borderRadius: 10, marginHorizontal: 15,
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,    }}>
          <View style={{flexDirection: 'row',paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC',  }}>
            <Text style={{color: 'red', marginLeft: 10}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Tên chỗ ở :</Text>
            <View style={{position: 'absolute', left: 150, top: 6, }}>
              <TextInput
                style={{ color: '#303030', width: windowWidth - 200}}
                placeholderTextColor={'gray'}
                placeholder="vd: Pstay Hotel & Homestay"
                onChangeText={text => (setRegisHotel({...regisHotel, nameRoom : text}))}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC',  }}>
            <Text style={{color: 'red', marginLeft: 10}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Loại chỗ ở : </Text>
            <View style={{position: 'absolute', left: 150, top: 6, }}>
              <TextInput
                style={{ color: '#303030', width: windowWidth - 200}}
                placeholderTextColor={'gray'}
                placeholder="vd: hotel, homestay, biệt thự"
                onChangeText={text => (setRegisHotel({...regisHotel, typeRoom : text}))}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC',  }}>
            <Text style={{color: 'red', marginLeft: 10}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Diện tích (m²) : </Text>
            <View style={{position: 'absolute', left: 150, top: 6, }}>
              <TextInput
                style={{ color: '#303030', width: windowWidth - 200}}
                placeholderTextColor={'gray'}
                placeholder="vd: 30"
                onChangeText={text => (setRegisHotel({...regisHotel, type: (regisHotel.typeRoom).toUpperCase() + text + 'm²'}))}        
              />
            </View>
          </View>
          <Text className='text-black font-semibold text-base ml-2.5 mt-5'>Địa chỉ</Text>
          <View className=''>
            <Province />
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 22}}>
            <Text style={{color: 'red', marginLeft: 10}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Địa chỉ cụ thể :</Text>
            <View style={{position: 'absolute', left: 150, top: 8, }}>
              <TextInput
                style={{ color: '#303030', width: windowWidth - 200}}
                placeholderTextColor={'gray'}
                placeholder="vd: 22 đường số 7"
                onChangeText={setDistrictHotel}
              />
            </View>
          </View>
          
        </View>     

        <View style={{marginTop: 10,}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18, marginHorizontal: 15}}>Mã giới thiệu</Text>
            <View style={{position: 'absolute', right: 10}}>
            <Switch
                trackColor={{ false: "#767577", true: "orange" }}
                thumbColor={hideSwitch ? "#FF4500" : "#F3F3F3"}
                onValueChange={toggleSwitch}
                value={hideSwitch} 
            />
            </View>
            
          </View>
          {hideSwitch? 
          <TextInput
            style={{marginTop: 15, color: 'black', borderBottomColor: 'gray', borderBottomWidth: 0.5}}
            placeholderTextColor={'gray'}
            placeholder="Nhập mã giới thiệu              "
          />
          : null}
          <View style={{marginTop: 10, marginLeft: -20, height: 5, backgroundColor: '#F3F3F3'}}></View>
        </View> 
       
        <TouchableOpacity onPress = {() => handleRegisHotel() } className='rounded-xl mt-10 mx-5'>
            <ButtonLinear text={'Đăng ký thông tin'}/>
        </TouchableOpacity>
        <View style={{height: 30}}></View>
      </ScrollView>
    </View> 
  )
}

export {RegisInfoScreen}

const styles = StyleSheet.create({})