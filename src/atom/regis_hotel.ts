import {atom, useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';

const REGIS_HOTEL_INFO = atom({
  key: 'REGIS_HOTEL_STATE', // unique ID (with respect to other atoms/selectors)
  default: {
    user : '', 
    location : '',
    imageLocation1: {
      uri : 'https://i.imgur.com/UeRC1pK.png',
      name: '',
      type: '',
    },
    imageLocation2: {
      uri : 'https://i.imgur.com/UeRC1pK.png',
      name: '',
      type: '',
    },
    imageLocation3: {
      uri : 'https://i.imgur.com/UeRC1pK.png',
      name: '',
      type: '',
    },
    imageLocation4: {
      uri : 'https://i.imgur.com/UeRC1pK.png',
      name: '',
      type: '',
    },
    nameRoom : '', 
    type : '', 
    detailLocation : '', 
    districtLocation: '',
    typeRoom : '', 
    numberBedRoom : 1, 
    numberBathRoom : 1, 
    numberBed : 1, 
    numberPeople : 1, 
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

export const useRegisHotelInfoValue = () => {
  return useRecoilValue(REGIS_HOTEL_INFO);
};

export const useSetRegisHotelInfoState = () => {
  return useSetRecoilState(REGIS_HOTEL_INFO);
};
