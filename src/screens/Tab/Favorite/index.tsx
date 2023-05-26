import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import React, {useState,useEffect} from 'react'
import { ScreensName, FavoriteRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import { deleteFavoriteRoomApi, listFavoriteRoomApi } from '@src/services/api/FavoriteRoomAPI';
import { useUserInfoStateValue } from '@src/atom/user';
import { useFavoriteListStateValue} from '@src/atom/favorite';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import { ButtonConfirmLinear } from '@src/components/ButtonLinear';
import { useFavoriteHomeListState } from '@src/atom/favorite_home';

const FavoriteScreen: React.FC<
  FavoriteRouteScreenProps<ScreensName.FavoriteScreen>> = () => {

  const { navigate, goBack } : any = useNavigation();
  const userInfo = useUserInfoStateValue();
  const loadingFavorite = useFavoriteListStateValue();
  const [loadingFavoriteHome, setLoadingFavoriteHome] = useFavoriteHomeListState();
  const [roomFavorite, setRoomFavourite] = useState();
  const [roomDelete, setRoomDelete] = useState({modalVisible : false, index : null, hotel_id: null});

  const { loading, runAsync} = useRequest(async () => 
  listFavoriteRoomApi(userInfo.id),{ debounceWait: 300, manual: true });

  useEffect(() => {
    const fetchData = async () =>{
      await runAsync().then((res: any) => {
        setRoomFavourite(res);
      }).catch((error) => {
        /* console.log(error); */
      })
    }
    fetchData();
  }, [loadingFavorite]);

  const deleteRoomFavorite = (index, hotel_id) => {
    setRoomDelete(room => ({...room, 
      modalVisible: !roomDelete.modalVisible, 
      index,
      hotel_id,
    }))
  }
  const deleteConfirm = async() => {
    console.log(roomDelete.index, roomDelete.hotel_id);
    let newArray = [...roomFavorite];
    newArray.splice(roomDelete.index , 1);
    setRoomFavourite(newArray);
    {setRoomDelete(room => ({...room, 
      modalVisible: !roomDelete.modalVisible, 
    }))}
    setLoadingFavoriteHome(loading => ({...loading, 
      loading: !loadingFavoriteHome.loading
    }))
    const {data : res} = await deleteFavoriteRoomApi({
      hotel : roomDelete.hotel_id, 
      user : userInfo.id
    });
    
  }
  return (
    <View style={{}}>
      {/* Header */}
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
        <Text style={{color: 'black', fontWeight: '500', marginLeft: 10, fontSize: 15}}>Yêu thích</Text>
      </View>

    {/* Body */}
    {loading && (
      <View style={{justifyContent: 'center', marginTop: 30, flexDirection: 'row'}}>
        <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
        <ActivityIndicator size="large" color="orange" />
      </View>
    )}
    {roomFavorite?.length == 0 && (
      <View>
        <Text style={{color: 'black', textAlign: 'center', marginTop: 30}}>Danh sách yêu thích trống</Text>
      </View>
    )}
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Modal isVisible={roomDelete.modalVisible}>
      <View style={{ backgroundColor: '#F5F5F5', borderWidth: 1.5, borderColor: '#DCDCDC', borderRadius: 10, 
                      marginHorizontal: 10, alignItems: 'center', paddingBottom: 20}}>
        <TouchableOpacity style={{position: 'absolute', right: 20,top: 10}}
                        onPress={() => {setRoomDelete(room => ({...room, 
                          modalVisible: !roomDelete.modalVisible, 
                        }))}}>
          <Image source={{uri: 'https://i.imgur.com/dIsk0MM.png'}}
                style={{resizeMode: 'contain', width: 15, height: 15, }} 
          />
        </TouchableOpacity>

        <Text style={{color: 'black', marginTop: 30, fontSize: 20, fontWeight: 'bold', color: '#FF4500'}}>Xóa khỏi danh sách yêu thích!</Text>
        <Image source={{uri: 'https://i.imgur.com/s1Cyoz4.png'}} 
                style={{resizeMode: 'contain', width: 150, height: 150, marginTop: 10}}
        />
        <TouchableOpacity style={{}}
                          onPress={() => deleteConfirm()}>    
          <ButtonConfirmLinear text={'Hủy yêu thích'}/>
        </TouchableOpacity>
          
      </View>
    </Modal>
    </View>
    
      <ScrollView>
      {!loading && (
        <View>
          {roomFavorite?.map((item, index) => 
            <View key={index} style={{ paddingBottom: 20}}> 
              <TouchableOpacity style={{marginTop: 15, marginHorizontal: 20, backgroundColor: 'white', borderRadius: 10,
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
                  source= {{uri: item.img}}/>
                <TouchableOpacity style={{position: 'absolute', right: 20, top: 15}}
                                  onPress= {() => deleteRoomFavorite(index, item._id) }>
                   <Image
                    style={{resizeMode: 'contain', width: 32, height: 32,}}
                    source= {{uri: 'https://i.imgur.com/FQWenLd.png'}}/>
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
        <View style={{height: 100}}></View>
          </View>
      )}
        
    </ScrollView>
  </View>
  )
}

export {FavoriteScreen}

const styles = StyleSheet.create({
  shadow: {
    marginTop: 10, backgroundColor: 'white', borderRadius: 7, alignItems: 'center', flexDirection: 'row',
    paddingHorizontal: 10, paddingVertical: 2,
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