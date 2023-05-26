import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'

import i18n from '@src/ultis/i18n';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoState } from '@src/atom/user';
import { ButtonLinear } from '@src/components/ButtonLinear';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { StepRegisOwner } from '@src/components/StepRegisOwner';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRegisHotelInfoState } from '@src/atom/regis_hotel';

const windowWidth = Dimensions.get('window').width;




const RegisHotelScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.RegisHotelScreen>> = () => {
  
  const { navigate, goBack } : any = useNavigation();
  const [regisHotelInfo, setRegisHotelInfo] = useRegisHotelInfoState();
  const [numberOfPeople, setnumberOfPeople] = useState(1)

  const handleSubmit = () => {
    navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.RegisConfirmScreen}}) 
  };

  /* console.log(regisHotelInfo); */

  const openLibrary = async(number) => {
    console.log();
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
     if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let imgSelect = (response.assets)[0];
        imgSelect.name = imgSelect.fileName;
        console.log(imgSelect);
        switch(number){
          case 1:
            setRegisHotelInfo({...regisHotelInfo,  imageLocation1 : imgSelect})
            break;
          case 2:
            setRegisHotelInfo({...regisHotelInfo,  imageLocation2 : imgSelect})
            break;
          case 3:
            setRegisHotelInfo({...regisHotelInfo,  imageLocation3 : imgSelect})
            break;
          default:
            setRegisHotelInfo({...regisHotelInfo,  imageLocation4 : imgSelect})
        }
      }
      
    });
  };

  
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
        <Text style={{color: 'black', fontWeight: '500', marginLeft: 10, fontSize: 15}}>Đăng ký thông tin phòng</Text>
      </View>
      <ScrollView>
        <View className='mt-2'>
          <StepRegisOwner step={2}/>
          <Text style={{marginTop: 30, fontWeight: 'bold', color: 'black',fontSize: 18, marginLeft: 10}}>Thông tin phòng</Text>
          <View className={`flex-row ml-2.5 w-full my-2`}>
            <Text className='text-[14px] text-orange-500'>*</Text>
            <Text className='text-[14px] text-black'>Tải lên những bức ảnh trong căn phòng hoàn hảo của bạn 
            <Text className='text-[14px] text-black'> (Chụp ảnh tổng quan, giường ngủ, nhà vệ sinh...) </Text>
            </Text>
            
          </View>
          <View style={{shadowColor: "#696969", backgroundColor: '#F7F7F7', borderRadius: 10, marginTop: 10,
                        shadowOffset: {
                            width: 1,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,    }}>
            <TouchableOpacity className='w-full h-52 mt-1' onPress = {() => openLibrary(1) }>
              <Image source={{uri: regisHotelInfo.imageLocation1.uri}}
                    style={{resizeMode: "cover", width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
            <View className='flex-row space-x-0.5 mt-0.5 h-32'>
              <TouchableOpacity className='w-4/12 h-full' onPress = {() => openLibrary(2)}>
                <Image source={{uri: regisHotelInfo.imageLocation2.uri}}
                style={{resizeMode: "cover", width: '100%', height: '100%'}} />
              </TouchableOpacity>
              <TouchableOpacity className='w-4/12 h-full' onPress = {() => openLibrary(3)}>
                <Image source={{uri: regisHotelInfo.imageLocation3.uri}}
                style={{resizeMode: "cover", width: '100%', height: '100%'}} />
              </TouchableOpacity>
              <TouchableOpacity className='w-4/12 h-full' onPress = {() => openLibrary(4)}>
                <Image source={{uri: regisHotelInfo.imageLocation4.uri}}
                style={{resizeMode: "cover", width: '100%', height: '100%'}} />
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        <Text style={{marginTop: 20, fontWeight: 'bold', color: 'black',fontSize: 18, marginLeft: 10}}>Thông tin bổ sung</Text>
        <View style={{marginTop: 15, backgroundColor: '#F7F7F7', borderRadius: 10, marginHorizontal: 15,
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,    }}>
          <View style={{flexDirection: 'row',paddingVertical: 20, }}>
            <Text style={{color: 'red', marginLeft: 10}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Chi tiết :</Text>
            <View style={{position: 'absolute', left: 150, top: 6, height: 100, borderBottomColor: '#DCDCDC', borderBottomWidth: 0.5,}}>
              <TextInput
                multiline
                style={{ color: '#303030', width: windowWidth - 200, }}
                placeholderTextColor={'gray'}
                placeholder="Nhập gì đó.."
                onChangeText={text => {setRegisHotelInfo({...regisHotelInfo, detailRoom: text})}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 25, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC',  marginTop: 50}}>
            <Text style={{color: 'red', marginLeft: 10, marginTop: -5}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: -5}}>Giá phòng (ngày)</Text>
            <Text style={{position: 'absolute', left: 15, top: 40, color: 'black', fontSize: 14}}>Thứ 2 đến thứ 6</Text>
            <View style={{position: 'absolute', left: 150, top: 6, }}>
              <TextInput
                style={{ color: '#303030', width: windowWidth - 200}}
                placeholderTextColor={'gray'}
                placeholder="vd: 850.000 vnđ / ngày"
                keyboardType='numeric'
                onChangeText={price => {setRegisHotelInfo({...regisHotelInfo, priceMon_Fri: price})}}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 25, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC', paddingBottom: 35}}>
            <Text style={{color: 'red', marginLeft: 10, marginTop: -5}}>*</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, marginTop: -5}}>Giá phòng (ngày)</Text>
            <Text style={{position: 'absolute', left: 15, top: 40, color: 'black', fontSize: 14}}>Thứ 7, chủ nhật</Text>
            <View style={{position: 'absolute', left: 150, top: 6, }}>
              <TextInput
                style={{ color: '#303030', width: windowWidth - 200}}
                placeholderTextColor={'gray'}
                placeholder="vd: 850.000 vnđ / ngày"
                keyboardType='numeric'
                onChangeText={price => {setRegisHotelInfo({...regisHotelInfo, priceWeb_Sun: price})}}
              />
            </View>
          </View>
          
          <View style={{flexDirection: 'row',paddingVertical: 20, justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', marginTop: -10}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Số lượng phòng</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name={'minus'} color={regisHotelInfo.numberBed > 1? 'orange' : 'gray'} size={15} style={{marginLeft: 15, padding: 10, marginTop: 2}}
                         disabled={regisHotelInfo.numberBed === 1 ? true : false}  onPress={() => setRegisHotelInfo({...regisHotelInfo, numberBed: regisHotelInfo.numberBed -1})} 
              />
              <Text style={{ color:'black', fontSize: 16, marginLeft: 5}}>{regisHotelInfo.numberBed}</Text>
              <FontAwesome name={'plus'} color={'orange'} size={15} style={{marginLeft: 5, padding: 10, marginTop: 2}}
                    onPress={() => 
                      setRegisHotelInfo({...regisHotelInfo, numberBed: regisHotelInfo.numberBed +1})
                    }
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 20, paddingBottom: 30, justifyContent: 'space-between', marginHorizontal: 10, alignItems: 'center', marginTop: -35}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Số người tối đa</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name={'minus'} color={regisHotelInfo.numberPeople > 1 ? 'orange' : 'gray'} size={15} style={{marginLeft: 15, padding: 10, marginTop: 2}}
                          disabled={regisHotelInfo.numberPeople === 1 ? true : false} onPress={() => setRegisHotelInfo({...regisHotelInfo, numberPeople: regisHotelInfo.numberPeople -1})} 
              />
              <Text style={{ color:'black', fontSize: 16, marginLeft: 5}}>{regisHotelInfo.numberPeople}</Text>
              <FontAwesome name={'plus'} color={'orange'} size={15} style={{marginLeft: 5, padding: 10, marginTop: 2}}
                    onPress={() => setRegisHotelInfo({...regisHotelInfo, numberPeople: regisHotelInfo.numberPeople +1})}
              />
            </View>
          </View>
          <View style={{marginTop: -15, backgroundColor:'#F3F3F3', borderRadius: 5, marginHorizontal: 15}}>
            <Text style={{padding : 10, color: 'gray', fontSize: 13}}>Các thông tin bên dưới là thông tin trong 1 phòng hoặc chỗ ở của chủ sở hữu.</Text>
          </View>
          <View style={{flexDirection: 'row',paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC', justifyContent: 'space-between', marginHorizontal: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color:'black', fontSize: 15}}>Số giường</Text>
              <FontAwesome name={'minus'} color={regisHotelInfo.numberBedRoom >1? 'orange' : 'gray'} size={15} style={{padding: 10, marginTop: 2}}
                          disabled={regisHotelInfo.numberBedRoom === 1 ? true : false} onPress={() => setRegisHotelInfo({...regisHotelInfo, numberBedRoom: regisHotelInfo.numberBedRoom -1})} 
              />
              <Text style={{ color:'black', fontSize: 16}}>{regisHotelInfo.numberBedRoom}</Text>
              <FontAwesome name={'plus'} color={'orange'} size={15} style={{padding: 10, marginTop: 2}}
                    onPress={() => setRegisHotelInfo({...regisHotelInfo, numberBedRoom: regisHotelInfo.numberBedRoom +1})} 
              />
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color:'black', fontSize: 15}}>Số phòng tắm</Text>
                <FontAwesome name={'minus'} color={regisHotelInfo.numberBathRoom >1? 'orange' : 'gray'} size={15} style={{padding: 10, marginTop: 2}}
                            disabled={regisHotelInfo.numberBathRoom === 1 ? true : false} onPress={() => setRegisHotelInfo({...regisHotelInfo, numberBathRoom: regisHotelInfo.numberBathRoom -1})} 
                />
                <Text style={{ color:'black', fontSize: 16}}>{regisHotelInfo.numberBathRoom}</Text>
                <FontAwesome name={'plus'} color={'orange'} size={15} style={{padding: 10, marginTop: 2}}
                      onPress={() => setRegisHotelInfo({...regisHotelInfo, numberBathRoom: regisHotelInfo.numberBathRoom +1})} 
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 10, paddingBottom: 20}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>Các quy định dành cho khách khi ở :</Text>             
          <View style={{  marginTop: 15, backgroundColor: '#F7F7F7', borderRadius: 10, height: 200,
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,    }}>
              <TextInput
                multiline
                style={{ color: '#303030', paddingBottom: 10, marginBottom: 10, marginLeft: 5}}
                placeholderTextColor={'gray'}
                placeholder="Nhập gì đó.."
                onChangeText={text => {setRegisHotelInfo({...regisHotelInfo, detailRules: text})}}
              />
          </View>
          </View>
        </View> 
        <TouchableOpacity onPress = {() => handleSubmit()} className='rounded-xl mt-10 mx-6'>
            <ButtonLinear text={'Xác nhận thông tin'}/>
        </TouchableOpacity>
        <View style={{height: 100}}></View>
      </ScrollView>
    </View>
  )
}

export {RegisHotelScreen}

const styles = StyleSheet.create({})