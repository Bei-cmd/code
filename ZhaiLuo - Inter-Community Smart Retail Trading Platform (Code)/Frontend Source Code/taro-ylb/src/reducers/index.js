import { combineReducers } from "redux";
import cate from "./cate";
import cart from "./cart";
import home from "./home";
import item from "./item";
import user from "./user";
import community from "./community";
import crowd from "./crowd";

export default combineReducers({
  home,
  cate,
  cart,
  item,
  user,
  community,
  crowd
});
