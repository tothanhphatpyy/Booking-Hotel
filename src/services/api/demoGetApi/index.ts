import {ApiUtils} from '..';
import {PATH} from '../path';

export const demoGetApi = async () => {
  return await ApiUtils.request(PATH.app);
};
