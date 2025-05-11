import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import searchIcon from "@assets/search.png";
import OrderList from "./list/index";
import "./index.scss";

const ORDER_LIST = [
  {
    key: "1",
    status: "交易中",
    shop: "小院店铺",
    name: "【浙江专供】一次性日常防护口罩，满足日常防护需求",
    tips: "E款 50片/盒",
    img: require("@assets/shopping/kouzhao.png"),
    price: "128.45",
    number: "45566"
  },
  {
    key: "2",
    status: "交易完成",
    shop: "小键店铺",
    name: "keychron迷你彩灯紧凑机械键盘RGB幻彩背光灯 84键",
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
  state => state.user,
  actions
)
class Order extends Component {
  config = {
    navigationBarTitleText: "商品订单"
  };
  componentDidMount() {
    if (this.props.sellerInfo.length == 0) {
      this.props.dispatchAddPro(ORDER_LIST);
    }
    this.setState({});
  }
  render() {
    const { sellerInfo } = this.props;
    return (
      <View className="order">
        <View className="order__search">
          <View className="order__search-wrap" onClick={this.handlePrevent}>
            <Image className="order__search-img" src={searchIcon} />
            <Text className="order__search-txt">{`搜索订单`}</Text>
          </View>
        </View>
        <View className="order__container">
          <OrderList orderItem={sellerInfo}></OrderList>
        </View>
      </View>
    );
  }
}
