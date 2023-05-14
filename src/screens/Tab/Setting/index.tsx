import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Modal } from 'react-native'
import React,{useState} from 'react'
import { ScreensName, SettingRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
import { useUserInfoState } from '@src/atom/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonLinearSizeSM } from '@src/components/ButtonLinear';
import Loading from '@src/components/Loading';
import { useNavigation } from '@react-navigation/native';


const SettingScreen: React.FC<
  SettingRouteScreenProps<ScreensName.SettingScreen>> = () => {

    const listItem = [
      {
        key: 'evaluate',
        img: 'https://i.imgur.com/EuY4zUh.png',
        title: 'Đánh giá',
        detail: 'Pstay 5 sao',
      },
      {
        key: 'support',
        img: 'https://i.imgur.com/Cvv3n0L.png',
        title: 'Hỗ trợ 24/7',
        detail: '19008198',
      },
      {
        key: 'languages',
        img: 'https://i.imgur.com/NkgMco7.png',
        title: 'Ngôn ngữ',
        detail: 'Tiếng Việt',
      },
      {
        key: 'currency',
        img: 'https://i.imgur.com/OnC8ipG.png',
        title: 'Tiền tệ',
        detail: 'VNĐ',
      },
      {
        key: 'payment',
        img: 'https://i.imgur.com/5lg9r4E.png',
        title: 'Thanh toán',
        detail: '0 thẻ',
      },
      {
        key: 'become_owner',
        img: 'https://i.imgur.com/WU5Fhd2.png',
        title: 'Trở thành chủ nhà',
        detail: '3 chỗ ở',
      },
    ];

    const [userInfo, setUserInfo] = useUserInfoState();
    const {navigate} : any = useNavigation();

    const handleLogout =() =>{
      AsyncStorage.clear();
      setUserInfo(user => ({...user, id: '' }))
    }

    const becomeOwner = async (item : string) => {
      switch(item) {
        case 'evaluate':
          // code block
          break;
        case 'support':
          console.log('not-oke');
          break;
        default:
          navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.BecomeOwnerScreen}});
      }
    }

  return (
    <ScrollView style={{flex: 1, marginHorizontal : 20,}}>
     
      <View style={{position: 'absolute', right: 12, top : 10}}>
        <Image
          style={{width: 25, height: 25, resizeMode: 'contain', tintColor: '#575555'}}
          source={{uri : 'https://i.imgur.com/YLUB8wi.png'}}
        />
      </View>
      <View style={{ height: '25%', marginTop: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,}}>
      
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 60, height: 60, resizeMode: 'contain', marginTop: 20, marginLeft: 20}}
            source={{uri : 'https://i.imgur.com/IeTUihw.png'}}
          />
          <View style={{marginTop: 17, marginLeft: 20}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{userInfo.name}</Text>
            <Text style={{color: 'black', fontSize: 12}}>{userInfo.email}</Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: 'orange', marginTop: 5}}>XEM THÔNG TIN</Text>
          </View>
        </View>
        <Text style={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}></Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Image
            style={{width: 20, height: 20, resizeMode: 'contain', marginLeft: 20, tintColor: 'orange'}}
            source={{uri : 'https://i.imgur.com/ZsWlrIi.png'}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 14, color: 'black', marginLeft: 15}}>0 credit</Text>
        </View>
      </View>

      <View style={{marginTop: 20, flexDirection: 'row', flexWrap: "wrap",}}>
        {listItem.map(( item,index ) =>
        <TouchableOpacity key={index} 
          style={{alignItems: 'center', height: 100, width: '30%', marginRight: 10, marginTop: 20}}
          onPress={() => becomeOwner(item.key) }>
          <Image 
            style={{width: 35, height: 35, resizeMode: 'contain'}}
            source={{uri : item.img}}
          />
          <Text style={{fontWeight: '500', color: 'black', fontSize: 14.5, marginTop: 5, textAlign: 'center'}}>{item.title}</Text>
          <Text style={{color: 'gray', fontSize: 13}}>{item.detail}</Text>
        </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity onPress = {() => handleLogout() } className='rounded-xl mx-5 py-16'>
          <ButtonLinearSizeSM text={'ĐĂNG XUẤT'} />
      </TouchableOpacity>
    </ScrollView> 

    
  )
}

export {SettingScreen}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})