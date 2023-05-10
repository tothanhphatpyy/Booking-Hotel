import {ApiUtils} from '.';
import {PATH} from './path';

export const addFavoriteRoomApi = async (data: object) => {
  return await ApiUtils.post(PATH.add_favorite_room_byUser, data);
}

export const listFavoriteRoomApi = async (id: string) => {
  return await ApiUtils.request(PATH.list_favorite_room_byUser + id);
}

export const deleteFavoriteRoomApi = async (data: object) => {
  return await ApiUtils.post(PATH.delete_favorite_room_byUser, data);
}

