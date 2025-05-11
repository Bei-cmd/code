import {
  ITEM_INFO,
  ITEM_RECOMMEND,
  ITEM_PAY,
  ITEM_COLLECTION
} from "@/constants/item";

const INITIAL_STATE = {
  itemInfo: {},
  itemPay: {},
  collection: ""
};

export default function item(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ITEM_INFO: {
      return {
        ...state,
        itemInfo: action.payload
      };
    }
    case ITEM_RECOMMEND: {
      return { ...state };
    }
    case ITEM_PAY: {
      return {
        ...state,
        itemPay: action.payload
      };
    }
    case ITEM_COLLECTION: {
      return {
        ...state,
        collection: action.payload
      };
    }
    default:
      return state;
  }
}
