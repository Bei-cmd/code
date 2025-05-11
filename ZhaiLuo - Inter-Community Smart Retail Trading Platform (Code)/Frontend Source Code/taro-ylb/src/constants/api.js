/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST;
export const hostM = HOST_M;
/* eslint-enable */

// pic
export const CDN = "https://yanxuan.nosdn.127.net";
export const qiniu = "http://cdn.amikara.com";

// home
export const API_HOME = `${host}/xhr/index/index.json`;
export const API_HOME_SEARCH_COUNT = `${host}/xhr/search/displayBar.json`;
export const API_HOME_PIN = `${hostM}/pin/min/item/recommend.json`;
export const API_HOME_RECOMMEND = `https://guosai.zustmanong.cn/api/v2/recommend/?token=`;

// cate
export const API_CATE = `${host}/xhr/list/category.json`;
export const API_CATE_SUB = `${host}/xhr/list/subCate.json`;
export const API_CATE_SUB_LIST = `${host}/xhr/list/l2Items2.json`;

// cart
export const API_CART = `${host}/xhr/promotionCart/getCarts.json`;
export const API_CART_NUM = `${host}/xhr/promotionCart/getMiniCartNum.json`;
export const API_CART_RECOMMEND = `http://guosai.zustmanong.cn/api/v2/recommend/?token=`;
export const API_CART_ADD = `${host}/xhr/promotionCart/add.json`;
export const API_CART_UPDATE = `${host}/xhr/promotionCart/update.json`;
export const API_CART_UPDATE_CHECK = `${host}/xhr/promotionCart/updateCheck.json`;

// user
export const API_USER = `https://guosai.zustmanong.cn/api/v1/user/get?token=`;
export const API_USER_LOGIN = `https://guosai.zustmanong.cn/api/v1/user/login`;
export const API_USER_REAL_AUTH =
  "https://guosai.zustmanong.cn/api/v1/realAuth/getRealAuth?token=";
export const API_CHECK_LOGIN = `${host}/xhr/u/checkLogin.json`;
export const API_USER_REGINSTER =
  "https://guosai.zustmanong.cn/api/v1/user/register";

//community
export const API_COMMUNITY_LIST = `https://guosai.zustmanong.cn/api/v2/community/?token=`;
export const API_COMMUNITY_PUBLISH = `https://guosai.zustmanong.cn/api/v2/community/?token=`;
export const API_COMMUNITY_UPDATE = `https://guosai.zustmanong.cn/api/v2/community/?token=`;
export const API_COMMUNITY_DELETE = `https://guosai.zustmanong.cn/api/v2/community/?token=`;

//crowd
export const API_CROWD_LIST = `https://guosai.zustmanong.cn/api/v1/crowdFundingItems/query?token=`;
export const API_CROWD_SPONSOR = `https://guosai.zustmanong.cn/api/v1/crowdFundingItems/sponsor?token=`;
export const API_CROWD_CHECK = `https://guosai.zustmanong.cn/api/v1/crowdFundingItems/checkResult?token=`;

// item
export const API_ITEM = `${host}/xhr/item/detail.json`;
export const API_ITEM_RECOMMEND = `${host}/xhr/rcmd/itemDetail.json`;

//map
export const API_IPLOCATION = `https://apis.map.qq.com/ws/location/v1/ip`;
export const API_DISTANCE = `https://guosai.zustmanong.cn/api/v2/distance/`;
