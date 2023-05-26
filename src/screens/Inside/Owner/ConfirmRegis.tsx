import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions, TextInput } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ScreensName, OwnerRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoState } from '@src/atom/user';
import { ButtonLinear } from '@src/components/ButtonLinear';
import * as Animatable from 'react-native-animatable';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { StepRegisOwner } from '@src/components/StepRegisOwner';
import Modal from "react-native-modal";
import { useRegisHotelInfoState, useRegisHotelInfoValue } from '@src/atom/regis_hotel';
import {BASE_URL_APP} from '@env';

const windowWidth = Dimensions.get('window').width;


const RegisConfirmScreen: React.FC<
  OwnerRouteScreenProps<ScreensName.RegisHotelScreen>> = () => {
  
  const { navigate, goBack } : any = useNavigation();
  const [userInfo, setUserInfo] = useUserInfoState(); 
  const [changeImg, setchangeImg] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [regisHotelInfo, setRegisHotelInfo] = useRegisHotelInfoState();
 
  
  const handleRegis = async() => {
    setRegisHotelInfo(({...regisHotelInfo,
        status: 0,
        user: userInfo.id,
    }))
    console.log(regisHotelInfo);
   /*  try {
      const formData = new FormData();
      
      const dataHotel = {
        user: '62e3f40a1c26529bfeab6778',
        location: '62bc563074566b1417c880e4',
        nameRoom: 'Test Hotel upload Image'
      }
      formData.append('pstay', regisHotelInfo.imageLocation1);
      formData.append('pstay', regisHotelInfo.imageLocation2);
      formData.append('dataHotel', JSON.stringify(dataHotel));
      await fetch('https://booking-hotel-phat.herokuapp.com/add-hotel', {
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
          console.log("Loi",err);
        })
      });
        
      
    } catch (error) {
      console.error(error.message);
    } */
    
    //navigate('InsideRoute', {screen : ScreensName.OwnerRoute, params: {screen: ScreensName.DashboardOwnerScreen}})
  }

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
        <Text style={{color: 'black', fontWeight: '500', marginLeft: 10, fontSize: 17}}>Xác nhận</Text>
      </View>
      <ScrollView className=''>
        <View className='mt-2 flex justify-center items-center'>
          <StepRegisOwner step={3}/>
          <Animatable.Image
            animation="zoomIn"
            className='h-60 w-60 mt-10'
            source={{uri: 'https://i.imgur.com/9U0hjEv.png'}}
          />
          <Text style={{marginTop: 20, color: 'black',fontSize: 19, marginHorizontal: 20, textAlign: 'center'}}>Cùng nhau biến mọi thứ nằm trong thế giới của bạn</Text>
        </View>
        
        
        
        <TouchableOpacity className='rounded-xl mt-12 mx-6' onPress={() => setModalVisible(!isModalVisible)}>
            <ButtonLinear text={'Bắt đầu ngay'}/>
        </TouchableOpacity>
        <View style={{height: 100}}></View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        propagateSwipe={true}
        scrollOffset={50}
      >
        <ScrollView style={{ backgroundColor: '#F7F7F7', borderRadius: 10, marginVertical: 30}}>
          <Text className='font-bold text-orange-500 text-center mx-8 text-xl mt-5'>Thỏa thuận hợp tác với chủ nhà – Điều kiện và Điều khoản</Text>
          <View className='flex items-center'>
          <Image
              className='h-40 w-40 mt-8'
              source={{uri: 'https://i.imgur.com/9U0hjEv.png'}}
            />
          </View>
          <Text style={{color: 'black', lineHeight: 24, marginHorizontal: 20}}>{`PSTAY cung cấp dịch vụ đặt chỗ nghỉ trực tuyến. Chúng tôi đóng vai trò trung gian (đại lý) giữa khách muốn đặt chỗ nghỉ và khách sạn, chỗ nghỉ hoặc nhà nghỉ dưỡng/thuê vãng lai của Quý vị. Loại mô hình này còn được gọi là "mô hình đại lý".

Xin lưu ý rằng thỏa thuận được thực hiện trực tiếp giữa Quý vị và khách hàng. Khác với các trang web đặt chỗ nghỉ khác, Booking.com không phải bên lập ra hợp đồng trong giao dịch giữa chỗ nghỉ Quý vị và khách hàng. Bằng cách này, Quý vị có toàn quyền kiểm soát giá và tình trạng phòng trống, cũng như cung cấp cho khách quy tắc chung, chính sách và các ưu đãi chung rõ ràng hơn.

Khách hàng sẽ thanh toán giá đặt phòng với Quý vị sau kỳ nghỉ của họ, hoặc trước trong trường hợp đặt phòng không hoàn tiền. Quý vị có thỏa thuận với Booking.com để sử dụng kênh đặt phòng trực tuyến và cần phải thanh toán cho Booking.com khoản hoa hồng đã đưa ra cho tất cả các kỳ lưu trú đã xác nhận, đặt phòng không hoàn tiền và đặt phòng hoàn tiền một phần được thực hiện trên trang web của chúng tôi. Quý vị sẽ nhận được hóa đơn chi tiết về khoản phí hoa hồng cần trả vào mỗi tháng.

Chúng tôi sẽ không thay đổi giá của Quý vị. Khác với các kênh khác có thêm phụ phí khi hiển thị đến khách hàng, giá Quý vị cài đặt sẽ là giá chúng tôi để trên Booking.com. Ngoài ra, Quý vị sẽ chỉ cần thanh toán nếu chúng tôi mang khách hàng đến Quý vị – không phí đăng ký hay phí đăng chỗ nghỉ.`}</Text>
        <View style={{marginLeft: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', paddingBottom: 30}}>
          <TouchableOpacity onPress={() => setchangeImg(!changeImg)}>
            {changeImg?
            <Image source={{uri: 'https://i.imgur.com/5buUh7G.png'}}
                    style={{resizeMode: 'contain', width: 21, height: 22,}} />
              :
              <Image source={{uri: 'https://i.imgur.com/1TKsw1G.png'}}
                    style={{resizeMode: 'contain', width: 21, height: 22}} />
            }
          </TouchableOpacity>
          <View className='flex flex-row items-center w-4/5'>
            <Text style={{color:'black', fontWeight: 'bold', marginLeft: 10, fontSize: 14, marginTop: 5}}>Tôi đã đọc và đồng ý những quy định và thỏa thuận</Text>
          </View>
        </View>
        <TouchableOpacity className='rounded-xl mt-3 mx-6 pb-5' onPress={() => handleRegis() }>
            <ButtonLinear text={'Đăng ký ngay'}/>
        </TouchableOpacity>
        </ScrollView> 
      </Modal>

    </View>
  )
}

export {RegisConfirmScreen}

const styles = StyleSheet.create({})