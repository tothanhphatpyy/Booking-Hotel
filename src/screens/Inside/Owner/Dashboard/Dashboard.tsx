import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ScreensName, DashboardOwnerRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
import { useUserInfoState } from '@src/atom/user';
import { useNavigation } from '@react-navigation/native';
import { ButtonLinearGray, ButtonLinearSizeSM } from '@src/components/ButtonLinear';
import { useRequest } from 'ahooks';
import { HotelByOwnerApi } from '@src/services/api/OwnerAPI';
import Loading from '@src/components/Loading';

const HomeOwnerScreen: React.FC<
  DashboardOwnerRouteScreenProps<ScreensName.HomeOwnerScreen>> = () => {
  
  const [userInfo, setUserInfo] = useUserInfoState();
  const {navigate} : any = useNavigation();

  const { data : dataHotel, loading, runAsync} = useRequest(async () => 
  HotelByOwnerApi(userInfo.id),{ debounceWait: 300, manual: true });

  useEffect(() => {
    runAsync();
  }, []);
  
  return (
    <ScrollView>
      {loading && <Loading loading={loading}/>}
      <TouchableOpacity 
          style={{backgroundColor: 'pink'}}
          onPress={() => goBack()}>
        <View style={{ height: 50, backgroundColor: '#E6E6E6', alignItems: 'center', 
                    flexDirection: 'row', }}>
          <Image
            style={{marginLeft: 20, resizeMode: 'contain', width: 20, height: 30, tintColor: 'orange', }}
            source= {{uri: 'https://i.imgur.com/1RCGweh.png'}}
          />
          <Text style={{marginLeft: 10, color: 'black', fontWeight: '500', fontSize: 16}}>Quản lí chỗ ở</Text>
        </View>
      </TouchableOpacity>
      <View style={{ paddingBottom: 20,marginTop: 10, borderBottomColor: '#E6E6E6', borderBottomWidth: 2, 
            marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 17, marginLeft: 20}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{userInfo.name}</Text>
            <Text style={{color: 'black', fontSize: 12}}>{userInfo.email}</Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: 'orange', marginTop: 5}}>CÀI ĐẶT THANH TOÁN</Text>
          </View>
        </View>
        <TouchableOpacity className='rounded-xl mt-5'>
          <ButtonLinearSizeSM text={'+ Thêm mới chỗ ở'} />
        </TouchableOpacity>
      </View>
      <Text className='text-black font-semibold text-base mt-5 ml-5'>Danh sách chỗ ở của bạn</Text>
      <View style={{marginTop: 10}}>
        {dataHotel?.map((item, index) => 
          <View key={index} style={{paddingBottom: 20,}}> 
              <TouchableOpacity style={{marginTop: 15, paddingBottom: 15, marginHorizontal: 20, backgroundColor: 'white', borderRadius: 10,
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: 6,
                                      },
                                      shadowOpacity: 0.37,
                                      shadowRadius: 7.49,
                                      elevation: 12,}}
                                onPress= {() => navigate('InsideRoute', {screen : ScreensName.RoomInfoScreen, params: {idRoomSuggest : item._id}})}> 
                <Image
                  style={{resizeMode: 'cover', width: '100%', height: 170, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                  source= {{uri: item.imgDetail1}}
                  />
                <TouchableOpacity style={{position: 'absolute', right: 20, top: 10}}
                                onPress= {() => setColorEvent(!colorEvent) }>
                  <Image
                    style={{resizeMode: 'contain', width: 35, height: 35,}}
                    source= {{uri: 'https://i.imgur.com/ZFoaMK8.png'}}/>
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
              <Text style={{color: '#383838', fontSize: 13, marginLeft: 10, marginRight: 30}}>
                {item.detailLocation}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 20}}>
              <Image
                      style={{resizeMode: 'contain', width: 13, height: 20, tintColor: '#6B6B6B' }}
                      source= {{uri: 'https://i.imgur.com/QfbNL3x.png'}}/>
              <Text style={{color: '#383838', fontSize: 13, marginLeft: 7, marginRight: 30}}>
                {item.numberPeople} khách • {item.numberBedRoom} phòng ngủ • {item.numberBathRoom} phòng tắm
              </Text>
            </View>
            
            <View style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15, justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>{item.priceMon_Fri}đ̲ </Text>
              
              <Text style={{color: 'orange', fontWeight: 'bold', fontSize: 14, borderBottomColor: 'orange', borderBottomWidth: 1}}>Xem chi tiết</Text>
            </View>
            
            <View style={{flexDirection: 'row', marginTop: 15, marginHorizontal: 15, justifyContent: 'center'}}>
              
              <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#E8E8E8', paddingHorizontal: 30, paddingVertical: 10, alignItems: 'center', borderRadius: 15}}
                                  onPress={() =>{
                                   console.log('click');
                                   navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.CalendarOfRoomScreen, params: {roomInfo : item}}})}
                                   } >
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14, marginLeft: 5}}>Quản lý chỗ ở và lịch đặt phòng</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          </View>
        )}        
      </View>
      
      <View style={{height: 200}}></View>
    </ScrollView>
  )
}

export {HomeOwnerScreen}

const styles = StyleSheet.create({})