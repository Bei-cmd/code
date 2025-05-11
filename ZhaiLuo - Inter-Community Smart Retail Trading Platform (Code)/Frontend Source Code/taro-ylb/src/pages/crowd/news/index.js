import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import newsLogo from "../assets/news.png";
import "./index.scss";
const NEWS_LIST = [
  {
    key: 1,
    name: "大量招聘996码农，无保险和公积金!",
    img: "http://www.amikara.com/125247281.jpg",
    author: "Amikara",
    time: "2小时前"
  },
  {
    key: 2,
    name: "加强运输安全，疫情期间坚持保障安全",
    img: "http://www.amikara.com/131011134.jpg",
    author: "Pyman",
    time: "3小时前"
  },
  {
    key: 3,
    name: "新型快速购物模式帮助您更好地生活，快来加入我们吧",
    img: "http://www.amikara.com/159910141.jpg",
    author: "Amikara",
    time: "4小时前"
  },
  {
    key: 4,
    name: "邻里购买配送让您享受高质量购物体验",
    img: "http://www.amikara.com/169683231.jpg",
    author: "lwx",
    time: "4小时前"
  }
];

export default class News extends Component {
  render() {
    return (
      <View className="news">
        <View className="news__bar">
          <View className="news__bar-title">
            <Image src={newsLogo} className="news__bar-title-img" />
            <Text className="news__bar-title-name">众筹新闻</Text>
          </View>
          <Text className="news__bar-tips">第一手新闻资讯 ></Text>
        </View>
        <View className="news__list">
          {NEWS_LIST &&
            NEWS_LIST.map((item, index) => {
              const listOrder = index;
              return (
                <View className="news__list-item" taroKey={index}>
                  {listOrder == 0 ? (
                    <View className="news__list-item-first">
                      <Image
                        src={item.img}
                        mode="widthFix"
                        className="news__list-item-first-img"
                      />
                      <Text className="news__list-item-first-name">
                        {item.name}
                      </Text>
                    </View>
                  ) : (
                    <View className="news__list-item-normal">
                      <Image
                        src={item.img}
                        mode="widthFix"
                        className="news__list-item-normal-img"
                      />
                      <View className="news__list-item-normal-content">
                        <Text className="news__list-item-normal-content-name">
                          {item.name}
                        </Text>
                        <View className="news__list-item-normal-content-info">
                          <Text className="news__list-item-normal-content-info-user">
                            {item.author}
                          </Text>
                          <Text className="news__list-item-normal-content-info-time">
                            {item.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}
