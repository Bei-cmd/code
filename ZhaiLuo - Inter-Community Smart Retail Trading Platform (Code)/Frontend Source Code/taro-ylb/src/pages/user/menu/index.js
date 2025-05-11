import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import jump from "@utils/jump";
import classNames from "classnames";
import "./index.scss";

const MENU_LIST = [
  {
    key: "map",
    text: "配送查询",
    img: require("./assets/order.png")
  },
  {
    key: "credit",
    text: "众筹商品",
    img: require("./assets/credit.png")
  },
  {
    key: "location",
    text: "地址管理",
    img: require("./assets/location.png")
  },
  {
    key: "safe",
    text: "账号安全",
    img: require("./assets/safe.png")
  },
  {
    key: "contact",
    text: "联系客服",
    img: require("./assets/contact.png")
  },
  {
    key: "help",
    text: "帮助中心",
    url: "http://m.you.163.com/help",
    img: require("./assets/help.png")
  }
];
const COUNT_LINE = 2;

export default class Menu extends Component {
  handleClick = menu => {
    // NOTE 时间关系，此处只实现帮助中心，用于演示多端 webview
    if (menu.key === "help") {
      jump({ url: menu.url, title: menu.text });
    } else {
      Taro.navigateTo({
        url: `/pages/user/${menu.key}/index`
      });
    }
  };

  render() {
    return (
      <View className="user-menu">
        {MENU_LIST.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          const nth = (index + 1) % COUNT_LINE === 0;
          const topLine = index > 1;
          const lastLine =
            parseInt(index / COUNT_LINE) ===
            parseInt(MENU_LIST.length / COUNT_LINE);
          return (
            <View
              key={menu.key}
              className={classNames(
                "user-menu__item",
                topLine && "user-menu__item--top",
                nth && "user-menu__item--nth",
                lastLine && "user-menu__item--last"
              )}
              onClick={this.handleClick.bind(this, menu)}
            >
              <Image className="user-menu__item-img" src={menu.img} />
              <Text className="user-menu__item-txt">{menu.text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
