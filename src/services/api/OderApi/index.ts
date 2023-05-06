import {ApiUtils} from '..';
import {PATH} from '../path';

export const oderApi = async (data: object) => {
  return await ApiUtils.post(PATH.add_oder, data);
}

export const listOderApi = async () => {
  return await ApiUtils.request(PATH.list_oder);
}

export const oderByIdApi = async (id: string) => {
  return await ApiUtils.request(PATH.oder_byId + id);
}

export const oderByUserApi = async (id: string) => {
  return await ApiUtils.request(PATH.oder_byUser + id);
}
