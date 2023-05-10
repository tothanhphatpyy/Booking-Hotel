import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, StatusBar, TouchableHighlight, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStateValue } from '@src/atom/user';
import i18n from '@src/ultis/i18n';
import { listLocationApi } from '@src/services/api/LocationApi';
import { HotelByLocationApi } from '@src/services/api/HotelApi';
import { useRequest } from 'ahooks';
import { HomeRouteScreenProps, ScreensName } from '@src/routes/types';
import {BASE_URL_APP} from '@env';
import { addFavoriteRoomApi, deleteFavoriteRoomApi, listFavoriteRoomApi } from '@src/services/api/FavoriteRoomAPI';


const HomeScreen: React.FC<
HomeRouteScreenProps<ScreensName.HomeScreen>
> = () => {
  const { navigate }: any = useNavigation();
  const [colorEvent, setColorEvent] = useState(6);
  const [locationEvent, setLocationEvent] = useState('62bc561974566b1417c880e2');
  const [listRoomSuggest, setListRoomSuggest] = useState([]);
  const [listRoomFavourite, setListRoomFavourite] = useState([]);
  
  const userInfo = useUserInfoStateValue();
  const setNameUser = useRef(userInfo.name.split(" "));

  const { data : dataLocation , loading: loadingLocation} = useRequest(async () => 
  listLocationApi(),{ debounceWait: 300 }
  );

  const { loading: loadingRoom, runAsync} = useRequest(async () => 
  HotelByLocationApi(locationEvent),{ debounceWait: 300, manual: true });

  const { runAsync: getRoomFavorite} = useRequest(async () => 
  listFavoriteRoomApi(userInfo.id),{ debounceWait: 300, manual: true });

  
  useEffect(() => {
    const fetchData = async () =>{
      await runAsync().then((res: any) => {
        setListRoomSuggest(res);
        renderRoomFavorite();
      }).catch((error) => {
        console.log(error);
      })
    }

    fetchData();
  }, []);

  const renderRoomFavorite = async() => {
    await getRoomFavorite().then((res: any) => {
      let listRoom : any = [];
      res.map((item) => {
        listRoom.push(item._id)
      })
      setListRoomFavourite(listRoom);
    }).catch((error) => {
      console.log(error);
    })
  }

  const renderHotel = async (idLocation: string) => {
    setLocationEvent(idLocation);
    await runAsync().then((res: any) => {
      setListRoomSuggest(res);
      renderRoomFavorite();
    }).catch((error) => {
      console.log(error);
    })

    
  }
  const setRoomFavourite = async (hotel_id : string) => {
    
    let checkIndex = listRoomFavourite.indexOf(hotel_id);
    let newArray = [...listRoomFavourite];
    if (checkIndex !== -1){
      listRoomFavourite.splice(checkIndex, 1);
      newArray = [...listRoomFavourite];
      setListRoomFavourite(newArray);
      try {
        const {data : res} = await deleteFavoriteRoomApi({
          hotel : hotel_id, 
          user : userInfo.id
        });
      } catch (error) {
        console.error(error.message);
      } 
      
    }
    else{
      newArray.push(hotel_id);
      setListRoomFavourite(newArray);
      try {
        const {data : res} = await addFavoriteRoomApi({
          hotel : hotel_id, 
          user : userInfo.id
        });
      } catch (error) {
        console.error(error.message);
      } 
    }
  }
 
  const listVoucher =[
    {
      name: 'Momo',
      image: 'https://i.imgur.com/TIM5KjW.jpg'
    },

    {
      name: 'Zalo',
      image: 'https://i.imgur.com/YmDUI99.png'
    },

    {
      name: 'Airpay',
      image: 'https://i.imgur.com/rdlcqoI.jpg'
    },
  ];
  const listLocationSuggest =[
    {
      image: 'https://i.imgur.com/paj3fJE.jpg',
      title: 'Vi vu ngoại thành Hà Nội',
      note: 'Trải nghiệm không gian thoáng đãng cho chuyến đi ngay gần Hà Nội',
    },

    {
      image: 'https://i.imgur.com/rvVeD0J.jpg',
      title: 'Vũng Tàu Biệt thự hồ bơi',
      note: 'Những biệt thự có hồ bơi dành cho kỳ nghỉ của bạn tại Vũng Tàu',
    },

    {
      image: 'https://i.imgur.com/KHhs6cm.jpg',
      title: 'Sài gòn cần là có ngay',
      note: 'Những căn homestay có 01 phòng ngủ tại Sài Gòn có thể đặt nhanh chóng',
    },

    {
      image: 'https://i.imgur.com/Y2dARDm.jpg',
      title: 'Bể bơi & BBQ',
      note: 'Trải nghiệm đẳng cấp tại những căn homestay có bể bơi đẹp và khu vực BBQ ấm cúng',
    }
  ];
 

  return (
    <View style={styles.container}>
       <StatusBar
        animated={true}
        backgroundColor="black" />
      <ScrollView style={styles.scrollView}>
        <View className='flex flex-row items-center -ml-2 mt-1'>
          <Image
            className='object-contain h-16 w-16'
            source = {require('@src/assets/images/app/logo.png')}
          />
          <Text className='text-[#FF8C00] font-bold text-xl'>
          {i18n.t('app_name')}
          </Text>
        </View>
        <Text style={styles.textAnswer}>Bạn muốn đi đâu, {setNameUser.current[setNameUser.current.length -1]} ?</Text>
      
        <TouchableOpacity style={styles.search} onPress={() => navigate('AppScreen', {screen : 'FindInput', params: {listLocation}})}>
          <Image
              style= {styles.imgIc_search}
              source = {{uri: 'https://i.imgur.com/kUTuRfi.png'}}  
          />
          <Text style={styles.findInput}>Thử tìm kiếm Hà Nội</Text>
        </TouchableOpacity>

        {/* location */}
        <View>
          {loadingLocation && (
              <View style={{justifyContent: 'center', marginTop: 30, flexDirection: 'row'}}>
              <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
              <ActivityIndicator size="small" color="orange" />
              </View>
          )}
          <ScrollView style={styles.location} 
            horizontal 
            showsHorizontalScrollIndicator={false}>
              {dataLocation?.map((item:any, index:number) => 
                  <TouchableOpacity key={index} style={{ alignItems: 'center', paddingRight: 25}} 
                                    onPress={() => navigate('InsideRoute', {screen : ScreensName.RoomOfLocationScreen, params: {idLocation : item._id, nameLocation: item.name}})}
                                    /* navigate('AppScreen', {screen: 'Danh sách phòng', params: {idLocation : item._id, nameLocation: item.name}})} */>
                    <Image 
                      style={styles.itemImage}
                      source={{uri: item.image}} />
                    <Text
                      numberOfLines={1} 
                      style={{marginTop: 10, color: 'black', fontSize : 12, fontWeight : '500'}}>{item.name.length > 9 ? `${item.name.slice(0,10)}...` : item.name}</Text>
                  </TouchableOpacity>
              )} 
          </ScrollView>
        </View>

        {/* Service */}
        <ScrollView 
          style={{flexDirection: 'row',}}
          horizontal 
          showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ 
              width: '40%',
              borderWidth: 1,
              borderColor: '#E2E2E2',
              borderRadius: 10,
              paddingBottom: 10,
            }}>
              <Image 
                style={{height: 100, borderTopLeftRadius: 7, borderTopRightRadius: 7}}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwDAGqSd3F8vuVO4VXWmWzdGB1C_JBDfTSxg&usqp=CAU'}} />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold', color:'black', paddingVertical: 4, fontSize: 16}}>Homestay</Text>
                <Text numberOfLines={1} style={{fontSize: 13, color: '#484848'}}>Căn hộ dịch vụ đặc biệt dành cho các bạn trẻ</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ 
              width: '40%',
              borderWidth: 1,
              borderColor: '#E2E2E2',
              borderRadius: 10,
              paddingBottom: 10,
              marginLeft: 15}}>
              <Image 
                style={{height: 100, borderTopLeftRadius: 7, borderTopRightRadius: 7}}
                source={{uri: 'https://khuvuichoi.com/wp-content/uploads/2020/10/cong-vien-nuoc-thanh-long-1.jpg'}} />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold', color:'black', paddingVertical: 4, fontSize: 16}}>Vé tham quan</Text>
                <Text numberOfLines={1} style={{fontSize: 13,color: '#484848'}}>Mua vé thật dễ dàng</Text>
              </View>
            </TouchableOpacity>
        </ScrollView>

        {/* Sale */}
        <View style={{marginTop: 30,}}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Ưu đãi độc quyền</Text>
            <Text style={{color: '#707070', marginTop: 5}}>Chỉ có tại Luxstay, hấp dẫn và hữu hạn, book ngay!</Text>
          </View>
          <ScrollView
            style={{ marginTop : 20}}
            horizontal 
            showsHorizontalScrollIndicator={false}>
            {listVoucher.map((item, index) => 
            <TouchableOpacity key={index}
                              onPress={() => navigate('AppScreen', {screen : 'Voucher'})}>
              <Image key={index} style={{flex: 1,resizeMode: 'contain', height: 160, width: 320, borderRadius: 10, marginRight: 10 }}  source={{uri : item.image}} />
            </TouchableOpacity>
                
            )}
          </ScrollView>
        </View>

        {/* Suggest */}
        <View style={{marginTop: 30,marginRight: 10,}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Gợi ý từ Luxstay</Text>
          <ScrollView 
            horizontal
            style={{}}
            showsHorizontalScrollIndicator={false}>
              
              {listLocationSuggest.map((item, index) =>   
              <TouchableOpacity 
                key={index} 
                style={{marginTop: 20, marginRight: 10,elevation: 1.5, }}>
              <Image 
                  style={{resizeMode: 'contain', height: 200, width: 310, borderTopLeftRadius: 10,borderTopRightRadius: 10 }}
                  source={{uri : item.image}} />
              <View style={{ marginLeft: 5}}>
                <Text style={{marginTop: 8,fontWeight: 'bold', color: 'black', fontSize: 17}}>{item.title}</Text>
                <Text style={{marginTop: 2,color: '#484848', maxWidth: 280}}>{item.note}</Text>
              </View>
              </TouchableOpacity>
              )}
             
             
          </ScrollView>
        </View>

        {/* Suggest Location */}
        <View style={{marginRight: 10}}>
          <View style={{marginTop: 30,}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>Trải nghiệm đáng nhớ</Text>
            <Text style={{color: 'gray', marginTop: 5}}>Ở mỗi thành phố xa xôi, giữ lại cho mình một chốn dừng chân ấm áp</Text>
          </View>
          <ScrollView 
            style={{marginTop: 25, flex: 1, paddingVertical:5 }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {dataLocation?.map((item, index) => 
              <TouchableOpacity key={index} disabled={index == colorEvent? true : false} onPress={() => {
                setColorEvent(index);
                renderHotel(item._id);          
               }}>
              <Text 
                style={{flex: 1, marginRight: 20, borderWidth: 0.5, borderColor: 'gray', fontWeight: 'bold', color: index == colorEvent ? 'white'  : 'black',
                        backgroundColor: index == colorEvent ? 'orange'  : 'white', paddingHorizontal: 15, paddingVertical: 3, textAlign: 'center', fontSize: 13,
                        borderRadius: 15, }}
                       >
                {item.name}
              </Text>
              </TouchableOpacity>   
            )}  
          </ScrollView>

          {/* SuggetRoom */}
          <View style={{flex: 1}}>
            {loadingRoom && (
              <View style={{justifyContent: 'center', marginTop: 30, flexDirection: 'row'}}>
              <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
              <ActivityIndicator size="large" color="orange" />
              </View>
            )}
            {!loadingRoom && ( 
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginRight: 10}}>
                {listRoomSuggest.map((item, index) => 
                  <TouchableOpacity 
                    style={{marginTop: 20, width: '45%'}}
                    key={index}
                    onPress={() => navigate('InsideRoute', {screen : ScreensName.RoomInfoScreen, params: {idRoomSuggest : item._id}})}
                    >              
                      <Image style={{ height: 110, width: '100%', resizeMode: 'contain', borderRadius: 7}} 
                              source= {{uri: `${item.img}`}} />  

                        <TouchableOpacity style={{position: 'absolute', right: 12, top: 10}}
                                          onPress={() => setRoomFavourite(item._id)}>
                          
                        {listRoomFavourite?.map((pre, key) =>
                          <Image key={key} style={{resizeMode:'contain' ,height: 30, width: 30, position: 'absolute', right: 0, top: 0}}
                                    source={{ uri: pre == item._id ? 'https://i.imgur.com/FQWenLd.png' : 'https://i.imgur.com/f4EgdYH.png'}} /> 
                          )}
                        {listRoomFavourite.length == 0 &&
                          <View style={{position: 'absolute',right: 0, top: 0,}}>
                          <TouchableOpacity onPress={() => setRoomFavourite(item._id)}>
                          <Image style={{resizeMode:'contain', height: 30, width: 30}} 
                                  source={{uri : 'https://i.imgur.com/7pYW2IM.png'}} />
                          </TouchableOpacity>
                        </View>
                        }
                      
                        
                        </TouchableOpacity>
                        
                          
                      <View style={{ marginTop: 5,width: '100%'}}> 
                        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 10, color:'gray'}}>{item.type}</Text>
                        {(item.type =='CĂN HỘ STUDIO 21m²' || item.type =='CĂN HỘ STUDIO 45m²'|| item.type =='BIỆT THỰ 120m²') 
                          ? <Image style={{position: 'absolute', height: 30, width: 35, right: 0, resizeMode: 'contain'}} 
                                 source={{uri : 'https://i.imgur.com/MgnYDVV.png'}} /> 
                          : <Text style={{position: 'absolute'}}></Text>
                        } 
                        {(item.type =='BIỆT THỰ 120m²')?
                          <Text style={{position: 'absolute', fontFamily: 'Roboto', fontSize: 11, 
                                fontWeight: 'bold', color: 'white', height: 20, width: 40, right: -20, top: 5}}>8%
                          </Text>
                          :
                          <Text style={{position: 'absolute', fontFamily: 'Roboto', fontSize: 11, 
                                fontWeight: 'bold', color: 'white', height: 20, width: 40, right: -20, top: 5}}>5%
                          </Text>
                        }
                        <Text numberOfLines={2} style={{marginLeft: 12, marginTop: 5, fontWeight: 'bold', fontSize: 13, color: 'black'}}>{item.nameRoom}</Text>
                        <Image style={{position: 'absolute',resizeMode:'contain' , height: 15, width: 35, left:-13, top: 27}} 
                               source={{uri : 'https://i.imgur.com/YgsvlvC.png'}} />
                        <Text numberOfLines={1} style={{color: '#484848', fontSize: 11, marginLeft: 5}}>
                          {item.numberPeople} khách • {item.numberBedRoom} phòng ngủ • {item.numberBathRoom} phòng tắm
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 5}}>
                            <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 13, color: 'black'}}>
                              {item.priceMon_Fri}đ̲
                            </Text>
                            {(item.type =='CĂN HỘ STUDIO 21m²' || item.type =='CĂN HỘ STUDIO 45m²'|| item.type =='BIỆT THỰ 120m²')
                              ?<Text numberOfLines={1} style={{textDecorationLine: 'line-through', fontWeight: 'bold', fontSize: 12, color: 'gray', marginLeft: 10}}>
                                {item.priceDiscount}đ̲
                              </Text>
                              : null}
                        </View>
                        <View style={{flexDirection: 'row',marginTop: 5}}>
                          <Image style={{marginRight:2, resizeMode:'contain', height: 15, width: 15}} source={{uri : 'https://i.imgur.com/uKuzGT8.png'}} />
                          <Image style={{marginRight:2, resizeMode:'contain', height: 15, width: 15}} source={{uri : 'https://i.imgur.com/uKuzGT8.png'}} />
                          <Image style={{marginRight:2, resizeMode:'contain', height: 15, width: 15}} source={{uri : 'https://i.imgur.com/uKuzGT8.png'}} />
                          <Image style={{marginRight:2, resizeMode:'contain', height: 15, width: 15}} source={{uri : 'https://i.imgur.com/uKuzGT8.png'}} />
                          <Image style={{marginRight:2, resizeMode:'contain', height: 15, width: 15}} source={{uri : 'https://i.imgur.com/uKuzGT8.png'}} />
                          {(item.type =='BIỆT THỰ 120m²')
                            ?<Text style={{marginLeft: 10 , fontSize: 11, color: '#484848'}}>7</Text>
                            :null}
                          {(item.type =='CĂN HỘ DỊCH VỤ 62m²')?<Text style={{marginLeft: 10 , fontSize: 11, color: '#484848'}}>21</Text> : null}
                          {(item.type =='CĂN HỘ STUDIO 21m²')?<Text style={{marginLeft: 10 , fontSize: 11, color: '#484848'}}>32</Text> : null}
                          {(item.type =='CĂN HỘ STUDIO 45m²')?<Text style={{marginLeft: 10 , fontSize: 11, color: '#484848'}}>28</Text> : null}
                          {(item.type =='CĂN HỘ DỊCH VỤ 35m²')?<Text style={{marginLeft: 10 , fontSize: 11, color: '#484848'}}>45</Text> : null}

                        </View>
                      </View> 
                  </TouchableOpacity>
                )}
            </View>
            )}
          </View>
          <View style={{height: 50}}></View>
        </View>
      </ScrollView>
    </View>
  )
}

export {HomeScreen}

const styles = StyleSheet.create({
    container: {
      flex : 1,
      paddingLeft: 15,
      backgroundColor: 'white',
    },

    imgLogo: {
      //aspectRatio: 0.65  , 
      backgroundColor: 'pink',
      resizeMode: 'cover',
      height: 100,
      width: 200,
      marginLeft: -30,
    },

    textAnswer: {
      marginBottom: 10,
      color: 'black',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 22,
      marginTop: 10,
    },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',
      borderColor: 'gray',
      shadowColor: "gray",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 1.22,

      elevation: 1.5,
      marginTop: 10
    },

    imgIc_search: {
      // aspectRatio: 0.3  , 
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: '#D3D3D3',
      marginLeft: 20,
    },

    findInput:{
      paddingVertical: 17,
      fontFamily: 'Roboto',
      marginLeft: 20,
      fontWeight: 'bold',
      fontSize: 14.5,
      color: 'gray',
    },

    location: {
      marginTop: 10,
      flexDirection: 'row',
      paddingVertical: 20,
    },

    img_list: {
      flex: 1,
      height : 60,
      width: 60,
      marginRight: 25,
   },
    itemImage: {
      flex: 1,
      width: 50, height: 50, resizeMode: 'contain',
    },


    

})