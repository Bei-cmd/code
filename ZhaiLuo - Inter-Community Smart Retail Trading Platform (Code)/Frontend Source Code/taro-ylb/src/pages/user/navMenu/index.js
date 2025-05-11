import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import jump from "@utils/jump";
import classNames from "classnames";
import "./index.scss";

const MENU_LIST = [
  {
    key: "order",
    text: "我的订单",
    img: require("./assets/order.png")
  },
  {
    key: "seller",
    text: "我的店铺",
    img: require("./assets/seller.png")
  },
  {
    key: "realauth",
    text: "个人信息",
    img: require("./assets/buyer.png")
  },
  {
    key: "collection",
    text: "我的收藏",
    img: require("./assets/like.png")
  }
];
const COUNT_LINE = 4;

export default class navBar extends Component {
  handleClick = menu => {
    // NOTE 时间关系，此处只实现帮助中心，用于演示多端 webview
    if (menu.key === "help") {
      jump({ url: menu.url, title: menu.text });
    } else if (menu.key === "collection") {
      Taro.navigateTo({
        url: `/pages/collection/collection`
      });
    } else {
      Taro.navigateTo({
        url: `/pages/user/${menu.key}/index`
      });
    }
  };

  render() {
    return (
      <View className="navbar-menu">
        {MENU_LIST.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          const nth = (index + 1) % COUNT_LINE === 0;
          const topLine = index > 2;
          const lastLine =
            parseInt(index / COUNT_LINE) ===
            parseInt(MENU_LIST.length / COUNT_LINE);
          return (
            <View
              key={menu.key}
              className={classNames(
                "navbar-menu__item",
                topLine && "navbar-menu__item--top",
                nth && "navbar-menu__item--nth",
                lastLine && "navbar-menu__item--last"
              )}
              onClick={this.handleClick.bind(this, menu)}
            >
              <Image className="navbar-menu__item-img" src={menu.img} />
              <Text className="navbar-menu__item-txt">{menu.text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
