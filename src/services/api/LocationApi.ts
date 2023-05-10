import {ApiUtils} from '.';
import {PATH} from './path';

export const listLocationApi = async () => {
  return await ApiUtils.request(PATH.list_location);
}
