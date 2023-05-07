import {atom, useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';

const ODER_LIST = atom({
  key: 'ODER_STATE', // unique ID (with respect to other atoms/selectors)
  default: {
    loading: false,
  }, // default value (aka initial value)
});

export const useOderListState = () => {
  return useRecoilState(ODER_LIST);
};

export const useOderListStateValue = () => {
  return useRecoilValue(ODER_LIST);
};

export const useSetOderListState = () => {
  return useSetRecoilState(ODER_LIST);
};
