import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import { ScreensName, DashboardOwnerRouteScreenProps} from '@src/routes/types'
import i18n from '@src/ultis/i18n';
 import CalendarPicker from 'react-native-calendar-picker';
import { date_date, date_month } from '@src/services/config';

const CalendarScreen: React.FC<
  DashboardOwnerRouteScreenProps<ScreensName.CalendarScreen>> = () => {

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const minDate = new Date();
  const onDateChange = (date, type) => {
    
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };
  
  return (
   <SafeAreaView style={styles.container}>
      <ScrollView style={{}}>
        <Text style={styles.titleStyle}>
          React Native Calendar Picker
        </Text>
        <CalendarPicker
          startFromMonday={true}
          //allowRangeSelection={true}
          minDate={new Date(2020, 6, 3)}
          //minDate={minDate}
          maxDate={new Date(2050, 6, 3)}
          weekdays={date_date}
          months={date_month}
          previousTitle="< Trước"
          nextTitle="Tiếp >"
          todayBackgroundColor="gray"
          selectedDayColor="#FFFFFF"
          // selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Roboto',
            color: '#000000',
          }}
          
          /* disabledDates={date => {
            var startDate = new Date(2023, 5, 8);
            var endDate = new Date(2023, 5, 10);
            return date.isBetween(startDate, endDate);
          }} */
          disabledDates={[new Date(2023, 5, 28),new Date(2023, 5, 9)]}
          disabledDatesTextStyle={{color: 'white', backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 7,  borderRadius: 15,}}
          /* selectedDisabledDatesTextStyle={{color: 'white', backgroundColor: 'red', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15}} */
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export { CalendarScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
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