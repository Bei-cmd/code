import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import "./index.scss";

class orderList extends Component {
  static defaultProps = {
    orderItem: []
  };
  checkOrder(param) {
    if (param == "交易完成") {
      Taro.showToast({
        title: "配送完成",
        duration: 2000
      });
    } else {
      Taro.navigateTo({
        url: "/pages/user/map/index"
      });
    }
  }
  render() {
    const { orderItem } = this.props;
    return (
      <View className="orderList__list">
        {orderItem &&
          orderItem.map((item, index) => {
            return (
              <View className="orderList__item" taroKey={item.key}>
                <Text className="orderList__item-shop">{item.shop}</Text>
                <Image
                  src={item.img}
                  className="orderList__item-img"
                  mode="widthFix"
                />
                <View className="orderList__item_data">
                  <Text className="orderList__item_data-status">
                    {item.status}
                  </Text>
                  <Text className="orderList__item_data-name">{item.name}</Text>
                  <Text className="orderList__item_data-tipsNumber">
                    {item.tips}
                  </Text>
                  <Text className="orderList__item_data-price">
                    总价￥{item.price},优惠￥{(item.price / 16).toFixed(2)}
                    ,实付款￥
                    {(item.price - item.price / 16).toFixed(2)}
                  </Text>
                  <View className="orderList__item_data-set">
                    <Text className="orderList__item_data-set-item">
                      售后客服
                    </Text>
                    <Text className="orderList__item_data-set-item">
                      追加评价
                    </Text>
                    <Text
                      className="orderList__item_data-set-item"
                      onClick={this.checkOrder.bind(this, item.status)}
                    >
                      查看物流
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}
export default orderList;
