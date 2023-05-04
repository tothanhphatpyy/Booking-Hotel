import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, {useState,useEffect} from 'react'
import { ScreensName, InsideRouteScreenProps} from '@src/routes/types'
import { useRequest } from 'ahooks';
import { HotelById, HotelByLocationApi } from '@src/services/api/hotelApi';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RoomInfoScreen: React.FC<
InsideRouteScreenProps<ScreensName.RoomInfoScreen>> = () => {
  const [styleText, setstyleText] = useState(0)
  const [hideText, sethideText] = useState(false)
  const [changeColor, setchangeColor] = useState(false)
  const [detailRoom, setDetailRoom] = useState([])
  /* const [loading, setLoading] = useState(true); */

  const { params }: any = useRoute();
  const idRoomSuggest = params.idRoomSuggest;
  const hideBottom = params.hideBottom;

  const idRoom = (idRoomSuggest.replace(/[^0-9]/g , '')).slice(0,5)

  /* useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);
        try {
          const {data: response} = await axios.get(`${BASE_URL}/list-hotel?hotelID=${idRoomSuggest}`);
          setDetailRoom(response);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      }
      fetchData();
    }, []); */
    
  const listSuggest = [
      {
          name: 'Chi tiết'
      },
      {
          name: 'Đánh giá'
      },
      {
          name: 'Chính sách'
      },
      {
          name: 'Đề xuất'
      },
  ]

  const { data : dataHotel, loading, runAsync} = useRequest(async () => 
  HotelById(idRoomSuggest),{ debounceWait: 300, manual: true });

  useEffect(() => {
    runAsync();
  }, []);


  return (
    <View style={{}}>
      {/* Tab Top */}
      <View 
          style={{backgroundColor: '#F8F8F8',height: 50, width: '100%', flexDirection: 'row',
                alignItems: 'center' , borderBottomColor: '#DCDCDC', borderBottomWidth: 1, justifyContent: 'space-between'}}>
          <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 20}}
                            onPress={() => navigation.goBack()}>
              <Image
                  style={{resizeMode: 'contain', width: 30, height: 30, tintColor: 'orange'}} 
                  source= {{uri: 'https://i.imgur.com/0oDjrbE.png'}}
              />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
              <TouchableOpacity style={{}}>
                  <Image 
                      style={{resizeMode: 'contain', width: 34, height: 34, tintColor: '#484848',}} 
                      source= {{uri: 'https://i.imgur.com/GGw3lNc.png'}} 
                  />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 20,}}
                              onPress ={() => {
                              setchangeColor(!changeColor)
                              }}>
                  {changeColor ? 
                      <Image 
                      style={{resizeMode: 'contain', width: 30, height: 30, tintColor: '#FF4500'}} 
                      source= {{uri:'https://i.imgur.com/nqv7cS5.png'}} /> 
                      :
                      <Image 
                      style={{resizeMode: 'contain', width: 28, height: 28, tintColor: '#484848'}} 
                      source= {{uri:'https://i.imgur.com/bwCX5QJ.png'}} /> 
                  }
              </TouchableOpacity>
          </View>
          
      </View>

      <ScrollView style={{ backgroundColor: '#F9F9F9'}}>
          {loading && (
            <View style={{justifyContent: 'center', marginTop: 30, flexDirection: 'row'}}>
              <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
              <ActivityIndicator size="large" color="orange" />
            </View>
          )}
          {!loading && ( 
          <View>
              <Image source={{uri: dataHotel?.img}}
                      style={{resizeMode: "cover", width: windowWidth, height: 180}}/>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 0}}>
                  <Image source={{uri: 'https://cdn.luxstay.com/users/329302/gZYx2s7zKDzsfvTSPeAuSy5H.jpg'}}
                  style={{resizeMode: "contain", width: (windowWidth / 3) - 2, height: 85}} />
                  <Image source={{uri: 'https://cdn.luxstay.com/users/212330/_u6_2mlErCNgj4eOwf2QAl6D.jpg'}}
                  style={{resizeMode: "contain", width: (windowWidth / 3) - 2, height: 85}} />
                  <Image source={{uri: 'https://cdn.luxstay.com/users/329302/MQpA9aZKFtBvMNlFv8yS4-FL.jpg'}}
                  style={{resizeMode: "contain", width: (windowWidth / 3) - 2, height: 85}} />
              </View>

              
              <View style={{marginHorizontal: 20}}>
                  {/* Name and detail */}
                  <Text style={{fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 14, color: 'black', marginTop: 5}}>{dataHotel?.typeRoom}</Text>
                  <View style={{position: 'absolute', right: 0, alignItems: 'center'}}>
                      <Image style={{width: 60, height: 50, tintColor:'#FFE4C4'}} source={{uri: 'https://i.imgur.com/gHwgr3O.png'}}/>
                      <Text style={{position: 'absolute', fontSize: 10, fontWeight: '500', top: 2, color: '#FF6633'}}>Mã chỗ ở</Text>
                      <Text style={{position: 'absolute', fontSize: 10, fontWeight: '500', top: 18, color: '#FF6633'}}>{idRoom}</Text>
                  </View>
                  <View style={{marginTop: 5, maxWidth: 270,}}>
                      <Text style={{fontFamily: 'Roboto', fontWeight: 'bold', 
                                      fontSize: 19, color: 'black',}}>{dataHotel?.nameRoom}</Text>
                      
                      <View style={{marginTop: 10, flexDirection: 'row'}}>
                          <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9'}} 
                                  source={{uri: 'https://i.imgur.com/OILahL1.png'}}/>
                          <Text style={{fontSize: 13, color: 'gray', marginLeft: 2}}>{dataHotel?.detailLocation}</Text>
                      </View>
                  </View>
                  {/* numberNoiThatRoom */}
                  <View style={{height: 90, backgroundColor: '#F7F7F7', marginTop: 25, marginRight: 15}}>
                      <View style={{marginTop: 10, marginLeft: 20}}>
                          <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                                  source={{uri: 'https://i.imgur.com/QfbNL3x.png'}}/>
                          <Text style={{position: 'absolute', fontSize: 13, color: 'gray', left: 25}}>{dataHotel?.typeRoom}</Text>
                      </View>
                      <View style={{marginTop: 10, marginLeft: 20}}>
                          <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                                  source={{uri: 'https://i.imgur.com/Vbs6Qof.png'}}/>
                          <Text style={{position: 'absolute', fontSize: 13, color: 'gray', left: 25}}>{`${dataHotel?.numberBathRoom} phòng tắm`}</Text>
                      </View>
                      <View style={{marginTop: 10, marginLeft: 20}}>
                          <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                                  source={{uri: 'https://i.imgur.com/pl3Yy1K.png'}}/>
                          <Text style={{position: 'absolute', fontSize: 13, color: 'gray', left: 25}}>{`${dataHotel?.numberPeople} khách (tối đa ${Number(dataHotel?.numberPeople) + 1 } khách)`}</Text>
                      </View>
                      <View style={{position: 'absolute', left: 200, flexDirection: 'row', top: 10,}}>
                          <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                                  source={{uri: 'https://i.imgur.com/vNp0aTC.png'}}/>
                          <Text style={{fontSize: 13, color: 'gray',marginLeft: 5}}>{`${dataHotel?.numberBedRoom} phòng ngủ`}</Text>
                      </View>
                      <View style={{position: 'absolute', left: 200, flexDirection: 'row', top: 35}}>
                          <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                                  source={{uri: 'https://i.imgur.com/8Oyx4Vr.png'}}/>
                          <Text style={{fontSize: 13, color: 'gray',marginLeft: 5}}>{`${dataHotel?.numberBed} giường`}</Text>
                      </View>
                  </View>
                  {/* DetailRoom */}
                  <View style={{marginTop: 20}}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-around',
                                  borderBottomColor: '#E0E0E0', borderBottomWidth: 0.5}}>
                          {listSuggest.map((item,index) =>
                              <Text key={index} 
                                  style={{fontWeight: styleText==index ? 'bold' : 'normal', fontSize: styleText==index ? 15 : 14.5, paddingVertical: 8,
                                          borderBottomColor: styleText==index ? '#FF4500' : 'white', borderBottomWidth: 2, color: styleText==index ? 'black' : 'gray'}}
                                  onPress={() => setstyleText(index)}
                              >{item.name}</Text>
                          )}
                      </View>

                      <View style={{marginTop: 30}}>
                          <View style={{}}>
                              <Text numberOfLines={hideText? null : 4} style={{ color: 'black', fontFamily: 'Roboto', fontSize: 14.5,}}>
                                  {dataHotel?.detailRoom}
                              </Text>
                              <TouchableOpacity style={{marginTop: 10,}}>
                                  <Text style={{color: '#FF4500', fontSize: 14.5,}}
                                      onPress={() =>{
                                          sethideText(!hideText)
                                      }}>
                                      {hideText? 'Thu gọn' : 'Xem thêm'}
                                  </Text>
                              </TouchableOpacity>
                          </View>
                          
                          {/* Owner */}
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

                          {/* Tiện Nghi */}
                          <Text style={{marginTop: 30, fontWeight: 'bold', color: 'black',fontSize: 18}}>Tiện Nghi</Text>
                          <View style={{marginTop: 20}}>
                              <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>Tiện ích</Text>
                              <View style={{}}>
                                  <View style={{flexDirection: 'row',marginTop: 20}}>
                                      <Image style={{resizeMode: 'contain', width: 16, height: 20,}} 
                                              source={{uri: 'https://i.imgur.com/e2NdwUR.png'}} /> 
                                      <Text style={{marginLeft: 10,color: 'black'}}>Wifi</Text>
                                  </View>
                                  <View style={{flexDirection: 'row',marginTop: 20}}>
                                      <Image style={{resizeMode: 'contain', width: 20, height: 20,}} 
                                          source={{uri: 'https://i.imgur.com/Qhu1G6B.png'}} /> 
                                      <Text style={{marginLeft: 10,color: 'black', fontSize: 13}}>Điều hòa</Text>
                                  </View>
                                  <View style={{flexDirection: 'row',marginTop: 20}}>
                                      <Image style={{resizeMode: 'contain', width: 16, height: 20,}} 
                                          source={{uri: 'https://i.imgur.com/GWVeKKE.png'}} /> 
                                      <Text style={{marginLeft: 10,color: 'black', fontSize: 13}}>Dầu gội</Text>
                                  </View>
                                  <View style={{flexDirection: 'row',marginTop: 20}}>
                                      <Image style={{resizeMode: 'contain', width: 13, height: 20,}} 
                                              source={{uri: 'https://i.imgur.com/y1PyK5z.png'}} /> 
                                      <Text style={{marginLeft: 10,color: 'black', fontSize: 13}}>Máy giặt</Text>
                                  </View>
                                  <View style={{position: 'absolute', left: 200}}>
                                      <View style={{flexDirection: 'row',marginTop: 20}}>
                                          <Image style={{resizeMode: 'contain', width: 16, height: 20,}} 
                                                  source={{uri: 'https://i.imgur.com/M67D12Z.png'}} /> 
                                          <Text style={{marginLeft: 10,color: 'black', fontSize: 13}}>Khăn tắm</Text>
                                      </View>
                                      <View style={{flexDirection: 'row',marginTop: 20}}>
                                          <Image style={{resizeMode: 'contain', width: 16, height: 20,}} 
                                                  source={{uri: 'https://i.imgur.com/ouKLlGZ.png'}} /> 
                                          <Text style={{marginLeft: 10,color: 'black', fontSize: 13}}>Xà phòng</Text>
                                      </View>
                                      <View style={{flexDirection: 'row',marginTop: 20}}>
                                          <Image style={{resizeMode: 'contain', width: 20, height: 25,}} 
                                                  source={{uri: 'https://i.imgur.com/gU8E4Bf.png'}} /> 
                                          <Text style={{marginLeft: 10,color: 'black', fontSize: 13}}>TV</Text>
                                      </View>                    
                                  </View>     
                              </View>
                          </View>

                          {/* Price */}
                          <Text style={{marginTop: 40, fontWeight: 'bold', color: 'black',fontSize: 18}}>Giá phòng</Text>
                          <View style={{marginTop: 10}}>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#E8E8E8',
                                          padding: 10, borderRadius: 6
                                          }}>
                                  <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Thứ Hai - Thứ Năm</Text>
                                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{dataHotel?.priceMon_Fri}đ̲</Text>
                              </View>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                                  <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Thứ Sáu - Chủ Nhật</Text>
                                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{dataHotel?.priceWeb_Sun}đ̲</Text>
                              </View>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#E8E8E8',
                                          padding: 10, borderRadius: 6
                                          }}>
                                  <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Phí trẻ em tăng thêm</Text>
                                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>125.500đ̲ (sau 2 khách)</Text>
                              </View>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10}}>
                                  <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Thuê theo tháng</Text>
                                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>8.00%</Text>
                              </View>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#E8E8E8',
                                          padding: 10, borderRadius: 6
                                          }}>
                                  <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Số đêm tối thiểu</Text>
                                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>1 đêm</Text>
                              </View>
                              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10}}>
                                  <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Số đêm tối đa</Text>
                                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>90 đêm</Text>
                              </View>                
                          </View>

                          {/* Rules */}
                          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black', marginTop: 20}}>Nội quy chỗ ở</Text>
                          <View style={{marginTop: 10}}>  
                                  <Text style={{color: 'black', fontFamily: 'Roboto', fontSize: 14, marginTop: 3}}>
                                      {dataHotel?.detailRules}
                                  </Text>
                          </View>   
                          {/* Thời gian nhận trả phòng  */}                
                          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black', marginTop: 20
                                      }}>Thời gian nhận phòng
                          </Text>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#E8E8E8',
                                          padding: 10, borderRadius: 6
                                      }}>
                              <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Ngày đến</Text>
                              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>02:00 pm</Text>
                          </View>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 10 }}>
                              <Text style={{color: 'black', fontWeight: '400', fontSize: 14}}>Ngày đi</Text>
                              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>12:00 pm</Text>
                          </View>
                      </View>   
                  </View>
                      
                      <View style={{height: 200}}></View>
              </View> 
          </View>
          )}
          
      </ScrollView>

      {/*  Tab Bottom */}
      {hideBottom? null :
      <View style={{ position: 'absolute', height: 90, left: 0, top: windowHeight - 90, width: windowWidth,
      borderTopWidth: 1.5, borderTopColor: '#DCDCDC', backgroundColor: 'white', }}>
          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <Text style={{fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 8
                  }}>{dataHotel?.priceMon_Fri}đ̲</Text>
              <Text style={{fontFamily: 'Roboto', marginTop: 13, color: 'gray' }}>x 1 đêm</Text>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}
                          onPress ={() => navigation.navigate('Đặt phòng', {idRoomOder : idRoomSuggest})}>  
              <LinearGradient
              colors={['#FF4500', '#FF6347', '#FF8C00']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 1}}
              style={{alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row'}}
              >
              <Image 
              source={{uri: 'https://i.imgur.com/KFwOsZ6.png'}}  
              style={{resizeMode: 'contain', height: 20, width: 20}}
              />
              <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', color:'black', fontSize: 14, marginLeft: 10}}>
                  Đặt phòng nhanh</Text>
              </LinearGradient>
          </TouchableOpacity>
          </View>
      </View>
      }                              
    </View>
   )
}

export {RoomInfoScreen}

const styles = StyleSheet.create({})