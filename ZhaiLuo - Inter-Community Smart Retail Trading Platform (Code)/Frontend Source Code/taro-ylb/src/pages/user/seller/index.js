import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import "./index.scss";
import activity from "./assets/activity.png";

const SELLER_LIST = [
  {
    key: "1",
    name: "男装 优质长绒格子衫(长袖)痞帅气潮2020新版流行韩潮",
    tips: "宽松版型",
    img: require("./assets/gezishan.jpg"),
    price: "129",
    number: "24856"
  }
];
@connect(
  state => state.user,
  actions
)
class Seller extends Component {
  config = {
    navigationBarTitleText: "商铺"
  };
  state = {};
  componentDidMount() {
    if (this.props.sellerInfo.length == 0) {
      this.props.dispatchAddPro(SELLER_LIST);
    }
    this.setState({});
  }
  navToAddList() {
    Taro.navigateTo({
      url: "/pages/user/seller/add/index"
    });
  }
  render() {
    const { sellerInfo } = this.props;
    return (
      <View className="Seller">
        <View className="Seller__activity">
       
          <Text className="Seller__activity-text">小</Text>
        </View>
        <View className="Seller__title">
          <Text className="Seller__title-active">所有宝贝</Text>
          <Text className="Seller__title-normal">热销</Text>
          <Text className="Seller__title-normal">暂无货源</Text>
        </View>
        <View className="Seller__list">
          {sellerInfo &&
            sellerInfo.map((item, index) => {
              return (
                <View className="Seller__item" taroKey={item.key}>
                  <Image
                    src={item.img}
                    className="Seller__item-img"
                    mode="widthFix"
                  />
                  <View className="Seller__item_data">
                    <Text className="Seller__item_data-name">{item.name}</Text>
                    <Text className="Seller__item_data-tipsNumber">
                      {item.tips}|剩余:{item.number}
                    </Text>
                    <Text className="Seller__item_data-price">
                      ￥{item.price}
                    </Text>
                    <Text className="Seller__item_data-set">
                      修改{"   "}删除
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
        <View className="Seller__add" onClick={this.navToAddList.bind(this)}>
          添加商品
        </View>
      </View>
    );
  }
}
export default Seller;
