import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { dispatchCollectionItem } from "@actions/item";
import searchIcon from "@assets/search.png";
import CollectionList from "./list/index";
import "./collection.scss";

const COLLECTION_LIST = [
  {
    key: "1",
    status: "交易中",
    shop: "小院店铺",
    name: "早控油，晚美白；分时洁面，科学有效！",
    tips: "男士500ml",
    img: require("@assets/shopping/ximiannai.jpg"),
    price: "199",
    number: "45566"
  },
  {
    key: "2",
    status: "交易完成",
    shop: "小键店铺",
    name: "迷你彩灯紧凑机械键盘RGB幻彩背光灯 84键",
    tips: "红轴标准版",
    img: require("@assets/shopping/keychron.jpg"),
    price: "669",
    number: "285"
  },
  {
    key: "3",
    status: "交易完成",
    shop: "小潮店铺",
    name: "男装 优质长绒格子衫(长袖)痞帅气潮2020新版流行韩潮",
    tips: "宽松版型",
    img: require("@assets/shopping/gezishan.jpg"),
    price: "129",
    number: "24856"
  }
];

@connect(
  state => state.item,
  { dispatchCollectionItem }
)
class Collection extends Component {
  config = {
    navigationBarTitleText: "收藏"
  };
  routerOnAdd() {
    this.props.dispatchCollectionItem(
      "早控油，晚美白；分时洁面，科学有效！"
    );
    Taro.navigateBack({
      delta: 1
    });
  }
  render() {
    return (
      <View className="collection">
        <View className="collection__search">
          <View
            className="collection__search-wrap"
            onClick={this.handlePrevent}
          >
            <Image className="collection__search-img" src={searchIcon} />
            <Text className="collection__search-txt">{`搜索订单`}</Text>
          </View>
        </View>
        <View className="collection__container">
          <CollectionList collectionItem={COLLECTION_LIST}></CollectionList>
        </View>
        <View className="collection__btn" onClick={this.routerOnAdd.bind(this)}>
          <Text>选择</Text>
        </View>
      </View>
    );
  }
}
