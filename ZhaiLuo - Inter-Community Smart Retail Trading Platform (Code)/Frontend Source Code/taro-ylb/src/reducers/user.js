import {
  USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REAL_AUTH,
  USER_REGISTER,
  USER_DISTANCE
} from "@/constants/user";

const INITIAL_STATE = {
  userInfo: {},
  sellerInfo: [],
  distanceInfo: ""
};

export default function user(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: {
          ...action.payload,
          login: true
        }
      };
    }
    case USER_LOGIN: {
      return { ...state };
    }
    case USER_LOGOUT: {
      return {
        ...INITIAL_STATE
      };
    }
    case "ADD": {
      return {
        ...state,
        sellerInfo: state.sellerInfo.concat(action.payload)
      };
    }
    case USER_DISTANCE: {
      return {
        ...state,
        distanceInfo: action.payload.distance
      };
    }
    default:
      return state;
  }
}
