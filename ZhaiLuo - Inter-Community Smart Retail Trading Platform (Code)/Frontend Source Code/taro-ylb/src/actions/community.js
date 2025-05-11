import Taro from "@tarojs/taro";
import {
  COMMUNITY_DELETE,
  COMMUNITY_LIST,
  COMMUNITY_PUBLISH,
  COMMUNITY_UPDATE
} from "@/constants/community";
import {
  API_COMMUNITY_DELETE,
  API_COMMUNITY_UPDATE,
  API_COMMUNITY_PUBLISH,
  API_COMMUNITY_LIST
} from "@/constants/api";
import { createAction } from "@utils/redux";

//获取社区列表
export const dispatchCommunityList = payload =>
  createAction({
    url: API_COMMUNITY_LIST + Taro.getStorageSync("token"),
    method: "POST",
    type: COMMUNITY_LIST,
    payload
  });

//新增社区数据
export const dispatchCommunityPublish = payload => ({
  type: COMMUNITY_PUBLISH,
  payload
});
