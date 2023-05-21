import {atom, useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';

const REGIS_HOTEL_INFO = atom({
  key: 'REGIS_HOTEL_STATE', // unique ID (with respect to other atoms/selectors)
  default: {
    user : '', 
    location : '',
    imageLocation: '',
    nameRoom : '', 
    type : '', 
    detailLocation : '', 
    districtLocation: '',
    typeRoom : '', 
    numberBedRoom : '', 
    numberBathRoom : '', 
    numberBed : '', 
    numberPeople : '', 
    detailRoom : '', 
    priceMon_Fri : '', 
    priceWeb_Sun : '', 
    priceDiscount : '', 
    detailRules : '', 
    status : '',
  }, // default value (aka initial value)
});

export const useRegisHotelInfoState = () => {
  return useRecoilState(REGIS_HOTEL_INFO);
};

export const useRegisHotelInfolValue = () => {
  return useRecoilValue(REGIS_HOTEL_INFO);
};

export const useSetRegisHotelInfoState = () => {
  return useSetRecoilState(REGIS_HOTEL_INFO);
};
