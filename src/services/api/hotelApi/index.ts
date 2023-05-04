import {ApiUtils} from '..';
import {PATH} from '../path';

export const HotelByLocationApi = async (id: string) => {
  return await ApiUtils.request(PATH.hotel_by_locationId + id);
}
