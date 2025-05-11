import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView, Radio, RadioGroup } from "@tarojs/components";
import "./index.scss";

class collectionList extends Component {
  static defaultProps = {
    collectionItem: []
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
    const { collectionItem } = this.props;
    console.log("collectionItem", collectionItem);
    return (
      <View className="collection__list">
        <RadioGroup>
          {collectionItem &&
            collectionItem.map((item, index) => {
              return (
                <View className="collection__item" taroKey={index}>
                  <Radio
                    className="collection__item-radio"
                    checked={false}
                  ></Radio>
                  <Image
                    src={item.img}
                    className="collection__item-img"
                    mode="widthFix"
                  />
                  <View className="collection__item_data">
                    <Text className="collection__item_data-name">
                      {item.name}
                    </Text>
                    <Text className="collection__item_data-tipsNumber">
                      {item.tips}
                    </Text>
                    <Text className="collection__item_data-price">
                      总价￥{item.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </RadioGroup>
      </View>
    );
  }
}
export default collectionList;
