import Taro from "@tarojs/taro";
import { CROWD_CHECK, CROWD_SPONSOR, CROWD_LIST } from "@/constants/crowd";
import {
  API_CROWD_CHECK,
  API_CROWD_SPONSOR,
  API_CROWD_LIST
} from "@/constants/api";
import { createAction } from "@utils/redux";

/**
 * 获取众筹商品列表
 * @param {*} payload
 */
export const dispatchCrowdList = payload => ({
  type: CROWD_LIST,
  payload
});

/**
 * 发布众筹商品
 * @param {*} payload
 */
export const dispatchCrowdSponsor = payload =>
  createAction({
    url: API_CROWD_SPONSOR + Taro.getStorageSync("token"),
    type: CROWD_SPONSOR,
    payload
  });
