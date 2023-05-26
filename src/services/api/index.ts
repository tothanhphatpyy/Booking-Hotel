import {BASE_URL_APP} from '@env';
import axios, {AxiosError, AxiosResponse, ResponseType} from 'axios';

interface CustomHeaders {
  isAuth?: boolean;
  [k: string]: any;
}
const UNAUTHORIZED = 'UNAUTHORIZED';

const REQ_TIMEOUT = 25 * 1000;
export const __DEV__ =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/* console.log('🚀 BASE_URL_APP:', BASE_URL_APP); */
export const instance = axios.create({
  baseURL: BASE_URL_APP,
  timeout: REQ_TIMEOUT,
});

const initHeader: CustomHeaders = {isAuth: true};

export const getHeader = async (customHeaders?: CustomHeaders) => {
  const header: any = customHeaders || {};
  const initCustomHeader = customHeaders ? customHeaders : initHeader;

  if (!initCustomHeader?.isAuth) {
    delete header.Authorization;
  } else {
    const authToken = ''; // token lay tu asyncStorage
    header.Authorization = `Bearer ${authToken}`;
  }
  return {...header};
};

instance.interceptors.response.use(
  (response: any) => successHandler(response),
  (error: any) => errorHandler(error),
);

let isRefreshing = false;
const refreshSubscribers: any[] = [];
function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: any) {
  refreshSubscribers.map(cb => cb(token));
}

const errorHandler = (error: AxiosError) => {
  const resError: AxiosResponse<any> | undefined = error.response;
  const originalRequest: any = error.config;

  // check code = UNAUTHORIZED or token expire
  if (resError?.data?.code === UNAUTHORIZED) {
    if (!isRefreshing) {
      isRefreshing = true;
      // xử lý refresh token
    }
    const retryOrigReq = new Promise((resolve, reject) => {
      subscribeTokenRefresh(async (token: string) => {
        originalRequest.headers['Authorization'] = 'Bearer ' + token;
        resolve(instance.request(originalRequest));
      });
    });
    return retryOrigReq;
  }

  if (__DEV__) {
    /* console.log(`Response API:`, resError?.data); */
  }

  return Promise.reject({...resError?.data});
};

const successHandler = async (response: AxiosResponse) => {
  if (__DEV__) {
    /* console.log(`Response API: ${response.config.url}`, response.data); */
  }
  const data: any = response.data;
  if (!data || data.status === 'INVALID_TOKEN' || data.code === UNAUTHORIZED) {
    return;
  }
  return data;
};

async function request<ReqType, ResType>(
  url: string,
  params?: ReqType,
  customHeaders?: CustomHeaders,
  responseType?: ResponseType,
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.get(url, {params, headers, responseType});
}

async function post<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders,
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.post(url, {...data}, {headers});
}

async function postForm<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders,
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.post(url, data, {headers});
}

async function put<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders,
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.put(url, {...data}, {headers});
}

async function remove<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders,
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.delete(url, {data: {...data}, headers: {...headers}});
}

const ApiUtils = {request, post, put, postForm, remove};
export {ApiUtils};
