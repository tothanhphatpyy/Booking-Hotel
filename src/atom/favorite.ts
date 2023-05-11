import {atom, useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';

const FAVORITE_ROOM_LIST = atom({
  key: 'FAVORITE_STATE', // unique ID (with respect to other atoms/selectors)
  default: {
    loading: false,
  }, // default value (aka initial value)
});

export const useFavoriteListState = () => {
  return useRecoilState(FAVORITE_ROOM_LIST);
};

export const useFavoriteListStateValue = () => {
  return useRecoilValue(FAVORITE_ROOM_LIST);
};

export const useSetFavoriteListState = () => {
  return useSetRecoilState(FAVORITE_ROOM_LIST);
};
