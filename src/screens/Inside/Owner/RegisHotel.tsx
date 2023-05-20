import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import * as Animatable from 'react-native-animatable';
import i18n from '@src/ultis/i18n';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoState } from '@src/atom/user';
import { ButtonLinear } from '@src/components/ButtonLinear';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useRequest } from 'ahooks';
import { listImgApi } from '@src/services/api/HotelApi';
import axios from 'axios';

const RegisHotelScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.RegisHotelScreen>> = () => {
  
  const { navigate, goBack } : any = useNavigation();
  const [userInfo, setUserInfo] = useUserInfoState(); 
  const [uriImg, setUriImg] = useState('https://i.imgur.com/W7AJbjR.png');
  
  const openLibrary = async() => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 1,
      mediaType: 'photo',
      allowsEditing: false,
      multiple: true,
    };
    
    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        /* const uri = (response.assets)[0].uri
        setUriImg(uri); */
        uploadImg(response.assets[0]);
        /* console.log(response.assets); */
      }
      
    });
  };

  const uploadImg = async (img : any) => {
    try {
      const formData = new FormData();
      const imgUpload = {
        uri : img.uri,
        name: img.fileName,
        type: img.type,
        index: 0
      };
      const imgUpload2 = {
        uri : img.uri,
        name: img.fileName,
        type: img.type,
        index: 1
      };
      const dataHotel = {
        user: '62e3f40a1c26529bfeab6778',
        location: '62bc563074566b1417c880e4',
        nameRoom: 'Test Hotel upload Image'
      }
      let title = 'titles';
      formData.append('pstay', imgUpload);
      formData.append('pstay', imgUpload2);
      formData.append('dataHotel', JSON.stringify(dataHotel));
      await fetch('http://192.168.1.2:3000/add-hotel', {
        method: "POST",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
          },
      }).then((resp)=>{        
        resp.json().then((data) => {
            console.log(data)
        })
        .catch((err) => {
          console.log(err);
        })
      });
        
      
    } catch (error) {
      console.error(error.message);
    }
  }
  
  /* useEffect(() => {
    const fetchData = async () =>{
      await runAsync().then((res: any) => {
        setRoomFavourite(res);
      }).catch((error) => {
        console.log(error);
      })
    }
    fetchData();
  }, []); */

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
        <Text style={{color: 'black', fontWeight: '500', marginLeft: 10, fontSize: 15}}>Đăng ký thông tin chỗ ở</Text>
      </View>
      <ScrollView style={{ /* backgroundColor: '#F9F9F9', */ marginHorizontal: 15}}>
        <Text style={{marginTop: 30, fontWeight: 'bold', color: 'black',fontSize: 18}}>Chủ nhà</Text>
        <View style={{marginTop: 10, backgroundColor: '#F7F7F7', borderRadius: 10,
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,                                 
                    }}>
          <Text style={{marginTop: 15, marginLeft: 20,fontWeight: '700', fontSize: 16.5, color: 'black'}}>
            {userInfo.name}
          </Text> 
          <Text className='w-16 mt-1' style={{marginLeft: 20,fontSize: 13, fontWeight: '400',
                      paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#E8E8E8', borderRadius: 10, color: '#606060'}}>
              3 chỗ ở</Text>    
          <View style={{marginTop: 10, marginLeft: 20, flexDirection: 'row'}}>
              <Text style={{fontSize: 14, color: '#606060'}}>Số điện thoại: </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>{userInfo.username}</Text>
          </View> 
          <View style={{marginTop: 10, marginLeft: 20, flexDirection: 'row'}}>
              <Text style={{fontSize: 14, color: '#606060'}}>Email: </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>{userInfo.email}</Text>
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
        <Image source={{uri : uriImg}} className='h-60 w-60'/>
        
        <TouchableOpacity onPress = {() => openLibrary() } className='rounded-xl mt-10 mx-6'>
            <ButtonLinear text={'Xác nhận thông tin'}/>
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export {RegisHotelScreen}

const styles = StyleSheet.create({})