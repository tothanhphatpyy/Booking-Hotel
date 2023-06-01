import {SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
 import CalendarPicker from 'react-native-calendar-picker';
import { date_date, date_month } from '@src/services/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

const CalendarOfRoomScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.CalendarOfRoomScreen>> = () => {
  const { params }: any = useRoute();
  const roomInfo = params.roomInfo;
  console.log(roomInfo);
  return (
   <SafeAreaView style={styles.container}>
      <ScrollView style={{}}>
        <TouchableOpacity 
          style={{backgroundColor: 'pink'}}
          onPress={() => goBack()}>
          <View style={{ height: 50, backgroundColor: '#E6E6E6', alignItems: 'center', 
                      flexDirection: 'row', }}>
            <Image
              style={{marginLeft: 20, resizeMode: 'contain', width: 20, height: 30, tintColor: 'orange', }}
              source= {{uri: 'https://i.imgur.com/1RCGweh.png'}}
            />
            <Text style={{marginLeft: 10, color: 'black', fontWeight: '500', fontSize: 16}}>Quản lý chỗ ở và lịch đặt phòng</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 15, backgroundColor: '#F7F7F7', borderRadius: 10,
                        shadowColor: "#696969",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,                                 
                    }}>

          <Text style={{marginTop: 10,marginLeft: 20,fontWeight: '700', fontSize: 16.5, color: '#FF8C00'}}>
              {roomInfo.nameRoom}
          </Text> 
          <Text className='w-20 mt-1 text-center' style={{marginLeft: 20,fontSize: 13, fontWeight: '400',
                    paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#E8E8E8', borderRadius: 10, color: '#606060'}}>
            {roomInfo.typeRoom}
          </Text> 
          <View style={{marginTop: 10, flexDirection: 'row', marginHorizontal: 15}}>
            <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9'}} 
                    source={{uri: 'https://i.imgur.com/OILahL1.png'}}/>
            <Text style={{fontSize: 13, color: 'gray', marginLeft: 2}}>{roomInfo.districtLocation}</Text>
          </View>
          <View style={{height: 90, backgroundColor: '#F3F3F3', marginTop: 10, marginHorizontal: 15}}>
            <View style={{marginTop: 10, marginLeft: 20}}>
                <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                        source={{uri: 'https://i.imgur.com/QfbNL3x.png'}}/>
                <Text style={{position: 'absolute', fontSize: 13, color: 'gray', left: 25}}>{roomInfo.typeRoom}</Text>
            </View>
            <View style={{marginTop: 10, marginLeft: 20}}>
                <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                        source={{uri: 'https://i.imgur.com/Vbs6Qof.png'}}/>
                <Text style={{position: 'absolute', fontSize: 13, color: 'gray', left: 25}}>{`${roomInfo.numberBathRoom} phòng tắm`}</Text>
            </View>
            <View style={{marginTop: 10, marginLeft: 20}}>
                <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                        source={{uri: 'https://i.imgur.com/pl3Yy1K.png'}}/>
                <Text style={{position: 'absolute', fontSize: 13, color: 'gray', left: 25}}>{`${roomInfo.numberPeople} khách (tối đa ${Number(roomInfo.numberPeople) + 1 } khách)`}</Text>
            </View>
            <View style={{position: 'absolute', left: 200, flexDirection: 'row', top: 10,}}>
                <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                        source={{uri: 'https://i.imgur.com/vNp0aTC.png'}}/>
                <Text style={{fontSize: 13, color: 'gray',marginLeft: 5}}>{`${roomInfo.numberBedRoom} phòng ngủ`}</Text>
            </View>
            <View style={{position: 'absolute', left: 200, flexDirection: 'row', top: 35}}>
                <Image style={{resizeMode: 'contain',width: 15, height: 15, tintColor:'#A9A9A9',}} 
                        source={{uri: 'https://i.imgur.com/8Oyx4Vr.png'}}/>
                <Text style={{fontSize: 13, color: 'gray',marginLeft: 5}}>{`${roomInfo.numberBed} giường`}</Text>
            </View>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', marginLeft: 20}}>
              <Text style={{fontSize: 14, color: '#606060'}}>Số lần phòng được đặt: </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>{roomInfo.numberBooking}</Text>
              <Text style={{fontSize: 14, marginLeft: 20, color: '#606060'}}>Hủy phòng </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>0% </Text>
          </View>
          <TouchableOpacity style={{marginTop: 15, backgroundColor: '#E8E8E8',paddingVertical: 10, alignItems: 'center', 
                                    marginHorizontal: 30, borderRadius: 15, marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>  
            <Image
              style={{resizeMode: 'contain', width: 27, height: 27}}
              source= {{uri: 'https://i.imgur.com/GvAuhUx.png'}}/>
            <Text style={{ fontWeight: '600', color: 'black', fontSize: 14,
                        }}>Chỉnh sửa thông tin phòng
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={{backgroundColor: 'white', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 20,
                                      shadowColor: "#000",
                                      shadowOffset: {
                                        width: 0,
                                        height: 6,
                                      },
                                      shadowOpacity: 0.37,
                                      shadowRadius: 7.49,
                                      elevation: 12,}}>
          <Text style={{color: '#FF6633', fontSize: 18, fontWeight: 'bold', marginBottom: 15}}>
            Phòng 1
          </Text>
          <CalendarPicker
            startFromMonday={true}
            minDate={new Date(2020, 6, 3)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={date_date}
            months={date_month}
            previousTitle="< Trước"
            previousTitleStyle={{color: 'orange', marginLeft: 10}}
            nextTitle="Tiếp >"
            nextTitleStyle={{color: 'orange', marginRight: 10}}
            todayBackgroundColor="#FFFFFF"
            selectedDayColor="#FFFFFF"
            scaleFactor={375}
            textStyle={{
              fontFamily: 'Roboto',
              color: '#000000',
            }}
            disabledDates={[new Date(2023, 5, 28),new Date(2023, 5, 9)]}
            disabledDatesTextStyle={{color: 'white', backgroundColor: 'orange', paddingVertical: 5, paddingHorizontal: 7,  borderRadius: 15,}}
            /* selectedDisabledDatesTextStyle={{color: 'white', backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15}} */
          />
        </View>
        
        <View style={{height: 300}}></View>
       
      </ScrollView>
    </SafeAreaView>
  )
}

export { CalendarOfRoomScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  textStyle: {
    marginTop: 10,
     color: 'black',
  },
  titleStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
})