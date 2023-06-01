import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, TextInput, Switch, ActivityIndicator} from 'react-native'
import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker'
import CountryPicker from 'react-native-country-picker-modal'
import LinearGradient from 'react-native-linear-gradient'
import { ScreensName, InsideRouteScreenProps} from '@src/routes/types'
import { Container } from '@src/components/Container';
import i18n from '@src/ultis/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useRequest } from 'ahooks'
import { HotelById } from '@src/services/api/HotelApi'
import { useUserInfoStateValue } from '@src/atom/user'
import { oderApi } from '@src/services/api/OderApi';
import Loading from '@src/components/Loading';
import {ButtonLinear} from '@src/components/ButtonLinear';
import { useOderListState } from '@src/atom/oder';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ConfirmRoomScreen: React.FC<
  InsideRouteScreenProps<ScreensName.ConfirmRoomScreen>> = () => {
  const { params }: any = useRoute();
  const { navigate, goBack} : any = useNavigation();
  const userInfo = useUserInfoStateValue();
  const [loadingOder, setLoadingOder] = useOderListState();

  const getNextDay = useMemo(() => { 
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }, []);

  const [date, setDate] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(getNextDay);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [changeImg, setchangeImg] = useState(false);
  const [showCountry, setshowCountry] = useState('VN');
  const [callingCode, setcountryCode] = useState('84');
  const [hideSwitch, sethideSwitch] = useState(false);
  const [modalAccess, setmodalAccess] = useState(false);

  const [numberOfPeople, setnumberOfPeople] = useState(1)
  const [numberOfChildren, setnumberOfChildren] = useState(0)
  const [numberOfInfant, setnumberOfInfant] = useState(0)

  const idRoomOder = params.idRoomOder;

  const checkNumberPeople =(number) =>{
    if(number > 1){
      setnumberOfPeople((number) => number -1)
    }
  }
  const checkNumberChildren =(number) =>{
    if(number > 0){
      return number -1
    }
    return 0;
  }
  const changeDay =(change) =>{
    if(change ===1 ){
      return change = 'Thứ Hai'
    }
    if(change ===2){
      return change = 'Thứ Ba'
    }
    if(change ==3){
      return change = 'Thứ Tư'
    }
    if(change ==4){
      return change = 'Thứ Năm'
    }
    if(change ==5){
      return change = 'Thứ Sáu'
    }
    if(change ==6){
      return change = 'Thứ Bảy'
    }
    if(change ==0){
      return change = 'Chủ Nhật'
    }
  }
  const { data : infoRoomOder , loading, runAsync} = useRequest(async () => 
  HotelById(idRoomOder),{ debounceWait: 300, manual: true });

  const {  runAsync: runRequestOder, loading: loadingRequestOder } = useRequest(async () => 
    oderApi({
      totalPrice : totalPrice(), 
      dayOder: getDay,
      dayReturn: getDayReturn,
      dateOder : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`, 
      dateReturn: `${dateReturn.getFullYear()}-${dateReturn.getMonth()+1}-${dateReturn.getDate()}`,  
      numberOfPeople, 
      numberOfChildren,
      hotel : idRoomOder, 
      user: userInfo.id,
    }),{ debounceWait: 300, manual: true});

  useEffect(() => {
    runAsync();
  }, []);

  
  const submitOder = async() => {
    await runRequestOder().then((res: any) => {
      setmodalAccess(true);
      setLoadingOder(loadingOder => ({...loadingOder, 
        loading: !loadingOder.loading,         
      }))
    }).catch((error) => {
      console.log(error);
    })
  }

  const getDay = changeDay(date.getDay());
  const getDayReturn = changeDay(dateReturn.getDay());

  const toggleSwitch = () => sethideSwitch(previousState => !previousState);

  const totalPrice =() => {
    const changeMilisecondToDate = 0.000000011574074074074 * (dateReturn.getTime()- date.getTime()); // đổi miligiay sang ngay
    const numberDate = Math.round(changeMilisecondToDate);
    const priceMon_Fri = (infoRoomOder?.priceMon_Fri)?.split(',').join('');
    const priceWeb_Sun = (infoRoomOder?.priceWeb_Sun)?.split(',').join('');
    const priceDiscount = (infoRoomOder?.priceDiscount)?.split(',').join(''); //xử lí discount

    //Trường hợp số ngày ở nhỏ hơn 7
    let sum = 0 ;
    for(let i = 0; i < numberDate % 7; i++) { 
      // Trường hợp rơi vào thứ 6,7,CN)
      if( (date.getDay() + i == 5 ) || (date.getDay() + i == 6 || (date.getDay() + i == 7 ))){
        sum += Number(priceMon_Fri) + ( Number(priceWeb_Sun) - Number(priceMon_Fri) ); //chênh lệch số tiền phòng cuỗi tuần
      }
      else sum+= Number(priceMon_Fri);
    }
    
    //Trường hợp số ngày ở lớn hơn 7
    for(let i = 0 ; i < Math.floor(numberDate /7) ; i++){
      sum += (Number(priceMon_Fri)*4 + Number(priceWeb_Sun)*3)
    }
    let totalPrice = sum + Number((numberOfPeople -1) * 50000);
    let totalPriceConvert = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return totalPriceConvert;
  }
  
  // Xử lí ngày ở bằng ngày đi -> ngày đi + 1
  const validateDateReturn=(dateValue) => {
    if(dateReturn.getDate() == dateValue.getDate()){
      let nextDay = new Date(dateValue);
      nextDay.setDate(dateValue.getDate() + 1);
      setDateReturn(nextDay);
    }
  }

  return (
    <View style={{flex: 1}}>
      {loadingRequestOder && <Loading loading={loadingRequestOder}/>}
      {/* Tab Top */}
        <View style={{backgroundColor: '#F8F8F8', width: '100%', borderBottomColor: '#DCDCDC', borderBottomWidth: 1, height: 80}}>
          <View style={{alignItems: 'center', flexDirection: 'row',justifyContent: 'center', height: 50, marginTop: 5}}>
              <TouchableOpacity style={{position: 'absolute', left: 0, paddingVertical: 10, paddingHorizontal: 20,}}
                                        onPress={() => goBack()}>
                  <Image
                      style={{resizeMode: 'contain', width: 25, height: 25, left: -5, tintColor: 'orange'}} 
                      source= {{uri: 'https://i.imgur.com/0oDjrbE.png'}}/>
              </TouchableOpacity>
              <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>Thông tin khách hàng</Text>
          </View>
          <View style={{position: 'absolute', right: 20, top: 12}}>
                <Image style={{ resizeMode: 'contain', width: 180, height:100 }} source={{uri: 'https://i.imgur.com/h0Ew1v2.png'}} />
            </View>
        </View>
        
        {/* InfoRoom */}
        {loading && (
              <View style={{justifyContent: 'center', marginTop: 30, flexDirection: 'row'}}>
              <Text style={{color: 'black', marginTop: 10}}>Loading...</Text>
              <ActivityIndicator size="large" color="orange" />
              </View>
        )}
        {!loading && ( 
        <ScrollView style={{backgroundColor: '#F8F9F9'}}>
          <View style={{marginTop: 20, marginLeft: 20, marginRight: 20,}}>
            {infoRoomOder ? ( 
              <Image 
              style={{ resizeMode: 'cover', width: 80, height : 80, borderRadius: 7}} 
              source={{uri: infoRoomOder.img}} />
            ): null}
            <Text numberOfLines={1} style={{position: 'absolute', left: 90, fontWeight: 'bold', fontSize: 15, color: 'black', width: windowWidth - 130}}>
              {infoRoomOder?.nameRoom}
            </Text>
            <View style={{position: 'absolute', left: 90,}}>
              <Text style={{top: 25, fontSize: 13, color: 'gray' }}>
                {infoRoomOder?.numberPeople} khách • {infoRoomOder?.numberBedRoom} phòng ngủ • {infoRoomOder?.numberBathRoom} phòng tắm
              </Text>
              <Text style={{top: 30, fontSize: 12, color: 'gray'}}>
                {infoRoomOder?.detailLocation}
              </Text>
            </View>

            {/* Date Room */}
            <View style={{height: 190, marginTop: 20, backgroundColor:'#F3F3F3', borderRadius: 10}}>
             <Text style={{color:'black', fontWeight: 'bold', marginLeft: 20, marginTop: 10}}>Ngày đặt phòng</Text>
             <TouchableOpacity style={{height: 35, width: 250, marginTop: 10, borderRadius: 7, flexDirection: 'row', alignItems: 'center',
                               backgroundColor:'#EBF5FF',marginLeft: 10,}}
                               onPress ={() => setModalVisible(true)}>
                <Text style={{color:'black', marginLeft:10, fontSize:13}}>{getDay} , </Text>
                <Text style={{color:'black', marginLeft:2, fontSize:13}}>{date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}</Text>
                <Image source={{uri: 'https://i.imgur.com/qdSigYs.png'}} 
                       style={{resizeMode: 'contain', width: 15, height: 15, marginLeft: 75, tintColor: '#484848'}} />           
             </TouchableOpacity>
             <Text style={{color: 'gray', textAlign: 'center', fontSize:11}}>Ngày đến 02:00 pm</Text>
              <View style={{marginLeft: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity onPress={() => setchangeImg(!changeImg)}>
                  {changeImg?
                  <Image source={{uri: 'https://i.imgur.com/5buUh7G.png'}}
                          style={{resizeMode: 'contain', width: 19, height: 20,}} />
                    :
                    <Image source={{uri: 'https://i.imgur.com/1TKsw1G.png'}}
                          style={{resizeMode: 'contain', width: 15, height: 15}} />
                  }
                </TouchableOpacity>
                <Text style={{color:'black', fontWeight: 'bold', marginLeft: 10}}>Ngày trả phòng</Text>
              </View>
              <View style={{marginLeft: 10}}>
                {changeImg? 
                  <View>
                  <TouchableOpacity style={{height: 35, width: 250, marginTop: 10, borderRadius: 7, 
                                    backgroundColor:'#EBF5FF',}}
                                    onPress ={() => {
                                      setModalVisible2(!modalVisible2);
                                    }}> 
                      <View style={{flexDirection: 'row',height: 35, alignItems: 'center'}}>
                        <Text style={{color:'black', marginLeft:10, fontSize:13}}>{getDayReturn} , </Text>
                        <Text style={{color:'black', marginLeft:2, fontSize:13}}>{dateReturn.getDate()}-{dateReturn.getMonth()+1}-{dateReturn.getFullYear()}</Text>
                        <Image source={{uri: 'https://i.imgur.com/qdSigYs.png'}} 
                              style={{resizeMode: 'contain', width: 15, height: 15, marginLeft: 75, tintColor: '#484848'}} />
                      </View> 
                  </TouchableOpacity>
                  <Text style={{color: 'gray', textAlign: 'center', fontSize:11}}>Ngày đi 12:00 pm</Text>
                  </View>
                  :
                  <View>
                    <Text style={{color:'black', marginLeft:10, fontSize:13, marginTop: 10}}>Liên hệ quầy lễ tân để trả phòng</Text>
                  </View>
                  
              }
              </View>
            </View>
            
            {/* Modal */}
            <Modal
              animationType= "slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <View style={{overflow: 'hidden'}}>
                  <View style={{ borderTopWidth: 1.5, borderTopColor: '#DCDCDC', backgroundColor: 'white',
                                 height: 200, marginTop: windowHeight-200, alignItems: 'center' }}>
      
                    <DatePicker 
                      date={date} 
                      onDateChange={(dateValue) => {
                        setDate(dateValue);
                        //setDateReturn(dateValue);
                        validateDateReturn(dateValue);
                        }}
                      mode= "date" 
                      androidVariant = 'nativeAndroid'
                      textColor="black"
                      />
                      <TouchableOpacity style={{position: 'absolute', right: 15,top: 10}}
                                      onPress={() => {setModalVisible(!modalVisible)}}>
                        <Image source={{uri: 'https://i.imgur.com/dIsk0MM.png'}}
                          style={{resizeMode: 'contain', width: 15, height: 15, }} 
                        />
                      </TouchableOpacity>
                  </View>
                  
                </View>
            </Modal>

            <Modal
              animationType= "slide"
              transparent={true}
              visible={modalVisible2}
              onRequestClose={() => setModalVisible2(!modalVisible2)}
              >
                <View style={{overflow: 'hidden'}}>
                  <View style={{ borderTopWidth: 1.5, borderTopColor: '#DCDCDC', backgroundColor: 'white',
                                 height: 200, marginTop: windowHeight-200, alignItems: 'center' }}>
      
                    <DatePicker 
                      date={dateReturn} 
                      onDateChange={setDateReturn}
                      mode= "date" 
                      androidVariant = 'nativeAndroid'
                      textColor="black"
                    />
                    <TouchableOpacity style={{position: 'absolute', right: 15,top: 10}}
                                        onPress={() => {setModalVisible2(!modalVisible2)}}>
                      <Image source={{uri: 'https://i.imgur.com/dIsk0MM.png'}}
                               style={{resizeMode: 'contain', width: 15, height: 15, }} 
                      />
                    </TouchableOpacity>
                  </View>
                  
                </View>
            </Modal>
            
            {/* Infomation */}
            <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: '#DCDCDC',}}>

              <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color:'black', fontSize: 14}}>Người lớn</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 10}}>
                  {
                    <Text style={{ color: numberOfPeople >1? 'orange' : 'gray', fontSize: 44, paddingLeft: 20, paddingRight: 20}}
                          onPress={() => 
                            checkNumberPeople(numberOfPeople)                        
                          }>
                    -</Text>
                  }
                    <Text style={{ color:'black', fontSize: 16}}>{numberOfPeople}</Text>
                    <Text style={{ color:'gray', fontSize: 12, color: 'orange',fontSize: 24,paddingLeft: 20, paddingRight: 20}}
                          onPress={() =>
                            setnumberOfPeople(numberOfPeople +1)}
                          >
                    +</Text>       
                </View>
              </View>
              <View style={{marginTop: 30, backgroundColor:'#F3F3F3', borderRadius: 5}}>
                  <Text style={{padding : 10, color: 'gray', fontSize: 13}}>Chỗ ở sẽ thu thêm phí từ khách thứ 2, tối đa là 3 khách. Phí thêm khách là 50.000đ/ người</Text>
              </View>

              <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color:'black', fontSize: 14}}>Trẻ em</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 10}}>
                  {
                     <Text style={{ color: numberOfPeople >1? 'orange' : 'gray', fontSize: 44, paddingLeft: 20, paddingRight: 20}}
                          onPress={() => 
                            setnumberOfChildren(checkNumberChildren(numberOfChildren))                    
                          }>
                    -</Text>
                  }
                    <Text style={{ color:'black', fontSize: 16}}>{numberOfChildren}</Text>
                    <Text style={{ color:'gray', fontSize: 12, color: 'orange', fontSize: 24,paddingLeft: 20, paddingRight: 20}}
                          onPress={() =>
                            setnumberOfChildren(numberOfChildren +1)}
                          >
                    +</Text>       
                </View>
              </View>
              <View style={{marginTop: 30, backgroundColor:'#F3F3F3', borderRadius: 5}}>
                  <Text style={{padding : 10, color: 'gray', fontSize: 13}}>Chỗ ở sẽ thu thêm phí từ khách thứ 2, tối đa là 3 khách. Phí thêm khách là 0đ/ người</Text>
              </View>

              <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color:'black', fontSize: 14}}>Trẻ sơ sinh</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 10}}>
                  {
                    <Text style={{ color: numberOfPeople >1? 'orange' : 'gray', fontSize: 44, paddingLeft: 20, paddingRight: 20}}
                          onPress={() => 
                            setnumberOfInfant(checkNumberChildren(numberOfInfant))                    
                          }>
                    -</Text>
                  }
                    <Text style={{ color:'black', fontSize: 16}}>{numberOfInfant}</Text>
                    <Text style={{ color:'gray', fontSize: 12, color: 'orange', fontSize: 24,paddingLeft: 20, paddingRight: 20}}
                          onPress={() =>
                            setnumberOfInfant(numberOfInfant +1)}
                          >
                    +</Text>       
                </View>
              </View>
              <View style={{marginTop: 30, backgroundColor:'#F3F3F3', borderRadius: 5}}>
                  <Text style={{padding : 10, color: 'gray', fontSize: 13}}>Chỗ ở sẽ thu thêm phí từ khách thứ 2, tối đa là 3 khách. Phí thêm khách là 0đ/ người</Text>
              </View>
            </View>
          </View>

          {/*  InFo Customer  */}
          <View style={{marginTop: 30, marginLeft: 20}}>
            <View style={{flexDirection: 'row',paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC',  }}>
              <Text style={{color: 'red'}}>*</Text>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Tên khách hàng</Text>
              <TextInput
                style={{position: 'absolute', left: 150, top: 6, color: '#303030'}}
                placeholderTextColor={'gray'}
                //placeholder="Nhập tên của bạn          "
                value={userInfo.name}
              />
            </View>
            <View style={{flexDirection: 'row',paddingVertical: 17, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC', alignItems: 'center'}}>
              <Text style={{color: 'red'}}>*</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center',}}>
                <CountryPicker
                    withFilter
                    countryCode={showCountry}
                    withFlag
                    withAlphaFilter={false}
                    withCurrencyButton={false}
                    withCallingCode
                    onSelect= {country => {
                      const {cca2, callingCode} = country;
                      setshowCountry(cca2);
                      setcountryCode(callingCode);
                      
                    }}
                    containerButtonStyle= {{paddingRight: 30}}
                  />   
                  <Text style={{position: 'absolute', left: 30, color: 'black', fontSize: 14, fontWeight: 'bold'}}>+{callingCode}</Text>
                  <Text style={{color: 'black', marginTop: 10, fontSize: 7}}>◢</Text>
              </View>
              <View style={{position: 'absolute', left: 150, flexDirection: 'row', alignItems: 'center'}}>        
                <TextInput
                  style={{ color: '#303030'}}
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                  //placeholder="Nhập số điện thoại          "
                  value={userInfo.username}
                />
              </View>          
             
            </View>
            <View style={{flexDirection: 'row',paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC',  }}>
              <Text style={{color: 'red'}}>*</Text>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Địa chỉ Email</Text>
              <TextInput
                style={{position: 'absolute', left: 150, top: 6, color: '#303030',}}
                placeholderTextColor={'gray'}
                //placeholder="Nhập email của bạn          "
                value={userInfo.email}
              />
            </View>
          </View>     

          <View style={{marginTop: 10, height: 5, backgroundColor: '#F3F3F3'}}></View>
          <View style={{marginTop: 10, marginLeft: 20}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Mã giảm giá</Text>
              <View style={{position: 'absolute', right: 30}}>
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
              style={{marginTop: 15, borderTopColor: '#DCDCDC', borderTopWidth: 0.5, color: 'black',}}
              placeholderTextColor={'gray'}
              placeholder="Nhập mã giảm giá              "
            />
            : null}
            <View style={{marginTop: 10, marginLeft: -20, height: 5, backgroundColor: '#F3F3F3'}}></View>
          </View> 

        {/* TotalPrice */}
        <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>Tổng tiền</Text>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{totalPrice()}đ</Text>
        </View>

        <TouchableOpacity onPress = {() => {submitOder()} } className='rounded-xl mx-5 mt-10'>
          <ButtonLinear text={'Đặt phòng'}/>
        </TouchableOpacity>
        

        <Modal isVisible={modalAccess}>
          <View style={{overflow: 'hidden'}}>
            <View style={{ backgroundColor: '#F5F5F5', borderWidth: 1.5, borderColor: '#DCDCDC', borderRadius: 10, 
                            marginHorizontal: 10, alignItems: 'center', paddingBottom: 20}}>

                
                  <TouchableOpacity style={{position: 'absolute', right: 20,top: 10}}
                                  onPress={() => {setmodalAccess(!modalAccess)}}>
                  <Image source={{uri: 'https://i.imgur.com/dIsk0MM.png'}}
                        style={{resizeMode: 'contain', width: 15, height: 15, }} 
                        />
                </TouchableOpacity>

                <Text style={{color: 'black', marginTop: 30, fontSize: 20, fontWeight: 'bold', color: '#FF4500'}}>Đặt phòng thành công!</Text>
                <Image source={{uri: 'https://i.imgur.com/s1Cyoz4.png'}} 
                        style={{resizeMode: 'contain', width: 150, height: 150, marginTop: 10}}
                />
                <TouchableOpacity style={{}}
                                  onPress={() => navigate('TabRoute', {screen : ScreensName.OderRoute})}>
                  <LinearGradient
                    colors={['#F08080', '#FF6347', '#FF4500']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 1}}
                    
                    style={{alignItems: 'center', marginHorizontal: 20, paddingVertical: 10, 
                            paddingHorizontal: 20, borderRadius: 10, marginTop: 20,}}>
                    <Text style={{ fontSize: 15, fontWeight:'bold', color: 'white', paddingHorizontal: 20, paddingVertical: 0}}
                      >Xem phòng đã đặt</Text>
                  </LinearGradient>      
                </TouchableOpacity>
                
            </View>
            
          </View>
        </Modal>
          
        <View style={{height: 50}}></View>
          
        </ScrollView>
        )}
  
    </View>
  )
}

export {ConfirmRoomScreen}

const styles = StyleSheet.create({})
