import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import jump from "@utils/jump";
import classNames from "classnames";
import "./index.scss";

const MENU_LIST = [
  {
    key: "Vegetables",
    text: "时令蔬菜",
    img: require("./assets/shucai.png")
  },
  {
    key: "egg",
    text: "鸡蛋生鲜",
    img: require("./assets/shengxianshuguo.png")
  },
  {
    key: "milk",
    text: "零食乳饮",
    img: require("./assets/jiushuiruyin.png")
  },
  {
    key: "rice",
    text: "米面粮油",
    img: require("./assets/mimianganguo.png")
  },
  {
    key: "papper",
    text: "纸品洗护",
    img: require("./assets/xihu.png")
  },
  {
    key: "digital",
    text: "数码家电",
    img: require("./assets/shuma.png")
  },
  {
    key: "Beauty makeup",
    text: "美妆个护",
    img: require("./assets/meizhuang.png")
  },
  {
    key: "baby",
    text: "宝宝用品",
    img: require("./assets/baobao.png")
  }
];
const COUNT_LINE = 4;

export default class Menu extends Component {
  handleClick = menu => {
    // NOTE 时间关系，此处只实现帮助中心，用于演示多端 webview
    if (menu.key === "help") {
      jump({ url: menu.url, title: menu.text });
    } else {
      Taro.showToast({
        title: "目前只实现了帮助中心~",
        icon: "none"
      });
    }
  };

  render() {
    return (
      <View className="home-menu">
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
                "home-menu__item",
                topLine && "home-menu__item--top",
                nth && "home-menu__item--nth",
                lastLine && "home-menu__item--last"
              )}
              onClick={this.handleClick.bind(this, menu)}
            >
              <Image className="home-menu__item-img" src={menu.img} />
              <Text className="home-menu__item-txt">{menu.text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
