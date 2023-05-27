import {ApiUtils} from '.';
import {PATH} from './path';

export const HotelByOwnerApi = async (id: string) => {
  return await ApiUtils.request(PATH.list_hotel_byOwner + id);
}
