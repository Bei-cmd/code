import {
  HOME_INFO,
  HOME_SEARCH_COUNT,
  HOME_RECOMMEND,
  HOME_PIN,
  HOME_RECOMMEND_INDEX
} from "@/constants/home";

const INITIAL_STATE = {
  homeInfo: {},
  searchCount: 0,
  pin: [],
  recommend: [],
  recommendIndex: []
};

export default function home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_INFO: {
      return {
        ...state,
        homeInfo: action.payload
      };
    }
    case HOME_SEARCH_COUNT: {
      return {
        ...state,
        searchCount: action.payload.count
      };
    }
    case HOME_PIN: {
      // 每3个分成一组
      const pin = [];
      action.payload.forEach((item, index) => {
        const groupIndex = parseInt(index / 3);
        if (!pin[groupIndex]) {
          pin[groupIndex] = [];
        }
        pin[groupIndex].push(item);
      });
      return { ...state, pin };
    }
    case HOME_RECOMMEND: {
      return {
        ...state,
        recommend: state.recommend.concat(action.payload.rcmdItemList)
      };
    }
    case HOME_RECOMMEND_INDEX: {
      return {
        ...state,
        recommendIndex: state.recommend.concat(action.payload.rcmdItemList)
      };
    }
    default:
      return state;
  }
}
