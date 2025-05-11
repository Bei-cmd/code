import { CROWD_SPONSOR, CROWD_LIST } from "@/constants/crowd";

const INITIAL_STATE = {
  crowdList: {}
};

export default function crowd(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CROWD_LIST: {
      return {
        ...state,
        crowdList: action.payload
      };
    }
    case CROWD_SPONSOR: {
      return { ...state };
    }
    default:
      return state;
  }
}
