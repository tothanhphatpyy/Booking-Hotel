import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StepRegisOwner = ({step}) => {
  return (
    <View className={`flex-row mx-2.5 w-full mt-7`}>
      <View className='-mt-3 flex flex-row justify-end mr-5 items-center'>
        <View className={`${step == 1 ? 'bg-orange-400' : 'bg-gray-400'} w-[26px] h-[26px] rounded-full items-center justify-center`}>
          <Text className='text-white text-center'>1</Text>
        </View>
        <Text className={`${step == 1 ? 'text-orange-400' : 'text-gray-400'} ml-1 font-extrabold text-xs`}>Đăng ký chỗ ở</Text>
        <Text className='text-gray-500 mx-2'>━━</Text>
        <View className={`${step == 2 ? 'bg-orange-400' : 'bg-gray-400'} w-[26px] h-[26px] rounded-full items-center justify-center`}>
          <Text className='text-white text-center'>2</Text>
        </View>
        <Text className={`${step == 2 ? 'text-orange-400' : 'text-gray-400'} ml-1 font-extrabold text-xs`}>Đăng tải phòng</Text>
        <Text className='text-gray-500 mx-2'>━━</Text>
        <View className={`${step == 3 ? 'bg-orange-400' : 'bg-gray-400'} w-[26px] h-[26px] rounded-full items-center justify-center`}>
          <Text className='text-white text-center'>3</Text>
        </View>
        <Text className={`${step == 3 ? 'text-orange-400' : 'text-gray-400'} ml-1 font-extrabold text-xs`}>Xác nhận</Text>
      </View>
    </View>
  )
}

export {StepRegisOwner}

const styles = StyleSheet.create({})