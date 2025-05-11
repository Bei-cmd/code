import {
  ITEM_INFO,
  ITEM_RECOMMEND,
  ITEM_PAY,
  ITEM_COLLECTION
} from "@/constants/item";
import { API_ITEM, API_ITEM_RECOMMEND } from "@/constants/api";
import { createAction } from "@utils/redux";

/**
 * 首页数据
 * @param {*} payload
 */
export const dispatchItem = payload =>
  createAction({
    url: API_ITEM,
    type: ITEM_INFO,
    payload
  });

/**
 * 推荐商品
 * @param {*} payload
 */
export const dispatchItemRecommend = payload =>
  createAction({
    url: API_ITEM_RECOMMEND,
    type: ITEM_RECOMMEND,
    payload
  });

/**
 * 购买商品
 */
export const dispatchItemPay = payload => ({
  type: ITEM_PAY,
  payload
});

/**
 * 选择收藏的商品
 */
export const dispatchCollectionItem = payload => ({
  type: ITEM_COLLECTION,
  payload
});
