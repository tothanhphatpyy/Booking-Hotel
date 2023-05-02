import {ApiUtils} from '..';
import {PATH} from '../path';

export const loginApi = async () => {
  return await ApiUtils.post(PATH.login);
}

export const listUserApi = async () => {
  return await ApiUtils.request(PATH.list_user);
}
