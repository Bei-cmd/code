import {
  COMMUNITY_DELETE,
  COMMUNITY_PUBLISH,
  COMMUNITY_UPDATE,
  COMMUNITY_LIST
} from "@/constants/community";

const INITIAL_STATE = {
  communityList: []
};

export default function community(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMUNITY_LIST: {
      return {
        ...state,
        communityList: state.communityList.concat(action.payload.list)
      };
    }
    case COMMUNITY_PUBLISH: {
      return {
        ...state,
        communityList: state.communityList.concat(action.payload)
      };
    }
    default:
      return state;
  }
}
