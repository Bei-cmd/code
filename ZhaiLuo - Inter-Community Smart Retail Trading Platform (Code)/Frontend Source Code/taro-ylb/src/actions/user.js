import Taro from "@tarojs/taro";
import {
  USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOCATION,
  USER_REGINSTER,
  USER_REAL_AUTH,
  USER_DISTANCE
} from "@/constants/user";
import {
  API_USER,
  API_USER_LOGIN,
  API_IPLOCATION,
  API_USER_REGINSTER,
  API_USER_REAL_AUTH,
  API_DISTANCE
} from "@/constants/api";
import { createAction } from "@utils/redux";

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = payload =>
  createAction({
    url: API_USER_LOGIN,
    method: "POST",
    type: USER_LOGIN,
    payload
  });

/**
 * 获取用户信息
 * @param {*} payload
 */
export const dispatchInfo = payload =>
  createAction({
    url: API_USER + Taro.getStorageSync("token"),
    method: "POST",
    type: USER_INFO,
    payload
  });
/**
 * 用户注册
 * @param {*} payload
 */
export const dispatchReginster = payload =>
  createAction({
    url: API_USER_REGINSTER,
    type: USER_REGINSTER,
    payload
  });
/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT });

/**
 * 添加商品
 */
export const dispatchAddPro = payload => ({ type: "ADD", payload });

/**
 * 获取用户真实信息
 */
export const dispatchGetRealAuth = () =>
  createAction({
    url: API_USER_REAL_AUTH + Taro.getStorageSync("token"),
    type: USER_REAL_AUTH,
    method: "POST",
    payload
  });

/**
 * 配送服务
 */
export const dispatchLocation = payload =>
  createAction({ url: API_IPLOCATION, type: USER_LOCATION, payload });

/**
 * 距离计算
 */
export const dispatchDistance = payload =>
  createAction({ url: API_DISTANCE, type: USER_DISTANCE, payload });
