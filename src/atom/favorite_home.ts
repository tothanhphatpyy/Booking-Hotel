import {atom, useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';

const FAVORITE_ROOM_HOME_LIST = atom({
  key: 'FAVORITE_HOME_STATE', // unique ID (with respect to other atoms/selectors)
  default: {
    loading: false,
  }, // default value (aka initial value)
});

export const useFavoriteHomeListState = () => {
  return useRecoilState(FAVORITE_ROOM_HOME_LIST);
};

export const useFavoriteHomeListStateValue = () => {
  return useRecoilValue(FAVORITE_ROOM_HOME_LIST);
};

export const useSetFavoriteHomeListState = () => {
  return useSetRecoilState(FAVORITE_ROOM_HOME_LIST);
};
