import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

export default Province = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState(['Chọn tỉnh/ thành phố']);
  const [wards, setWards] = useState(['Chọn thành phố, phường']);

  const citiesDropdownRef = useRef();

  useEffect(() => {
    const fetchData = async () =>{
      const {data} = await axios.get('https://provinces.open-api.vn/api/?depth=2')
      setCountries(data);
    }
    fetchData();
  }, []);
  const handleDistrict = async(district) => {
    const {data} = await axios.get(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`)
    setWards(data.wards);
  }
  return (
    <View style={styles.viewContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        >
        <View style={styles.dropdownsRow}>
          <Text style={{color: 'red', marginLeft: 10}}>*</Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Tỉnh/ thành phố :</Text>
          <View style={{position: 'absolute', left: 150, top: 6, }}>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              citiesDropdownRef.current.reset();
              setCities([]);
              setWards([]);
              setCities(selectedItem.districts);
            }}
            defaultButtonText={'Chọn tỉnh/ thành phố'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowTextStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown2searchInputStyleStyle}
            searchPlaceHolder={'Nhập gì đó..'}
            searchPlaceHolderColor={'gray'}
            renderSearchInputLeftIcon={() => {
            return <FontAwesome name={'search'} color={'gray'} size={18} />;
          }}
          />
          </View>
        </View>
        <View style={styles.dropdownsRow}>
          <Text style={{color: 'red', marginLeft: 10}}>*</Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Quận/ huyện :</Text>
          <View style={{position: 'absolute', left: 150, top: 6, }}>
            <SelectDropdown
            ref={citiesDropdownRef}
            data={cities}
            onSelect={(selectedItem, index) => {
              setWards([]);
              handleDistrict(selectedItem);
            }}
            defaultButtonText={'Chọn quận/ huyện'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            selectedRowTextStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown2searchInputStyleStyle}
            searchPlaceHolder={'Nhập gì đó..'}
            searchPlaceHolderColor={'gray'}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={'search'} color={'gray'} size={18} />;
            }}
            />
          </View>
        </View>

        <View style={styles.dropdownsRow}>
          <Text style={{color: 'red', marginLeft: 10}}>*</Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Phường/ xã :</Text>
          <View style={{position: 'absolute', left: 150, top: 6, }}>
            <SelectDropdown
            /* ref={citiesDropdownRef} */
            data={wards}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem);
            }}
            defaultButtonText={'Chọn phường/ xã'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            selectedRowTextStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown2searchInputStyleStyle}
            searchPlaceHolder={'Nhập gì đó..'}
            searchPlaceHolderColor={'gray'}
            renderSearchInputLeftIcon={() => {
              return <FontAwesome name={'search'} color={'gray'} size={18} />;
            }}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {flex: 1, width},

  dropdownsRow: {flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 0.5, borderBottomColor: '#DCDCDC', },
  dropdown1SelectedRowStyle: { color: 'orange', fontWeight: 'bold'},
  dropdown1BtnStyle: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize : 14, marginLeft: -5},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left', fontSize : 15},
  dropdown2BtnStyle: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize : 14, marginLeft: -5},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF', borderBottomLeftRadius: 12, borderBottomRightRadius: 12},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left', fontSize : 15},
  dropdown2searchInputStyleStyle: {
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
});