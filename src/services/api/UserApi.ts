import {ApiUtils} from '.';
import {PATH} from './path';

export const loginApi = async (data: any) => {
  return await ApiUtils.post(PATH.login, data);
}

export const listUserApi = async () => {
  return await ApiUtils.request(PATH.list_user);
}
