import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Input, ScrollView } from "@tarojs/components";
import "./index.scss";

class RealAuth extends Component {
  config = {
    navigationBarTitleText: "个人信息"
  };
  stats = {};
  changeInfo() {
    Taro.showToast({
      title: "修改成功",
      icon: "success",
      duration: 2000
    });
  }
  render() {
    return (
      <View className="realAuth">
        <View className="realAuth_list">
          <View className="realAuth_list-name realAuth_item">
            <Text className="realAuth_item-column">姓名: </Text>
            <Input type="text" placeholder="" value={"Pyman"} />
          </View>
          <View className="realAuth_list-id realAuth_item">
            <Text className="realAuth_item-column">身份证: </Text>
            <Input
              type="idcard"
              placeholder="身份证输入键盘"
              value={"420105200001090813"}
            />
          </View>
          <View className="realAuth_list-address realAuth_item">
            <Text className="realAuth_item-column">地址: </Text>
            <Input type="text" placeholder="" value={"XX小区XX幢XXX"} />
          </View>
        </View>
        <View className="realAuth__change" onClick={this.changeInfo.bind(this)}>
          修改
        </View>
      </View>
    );
  }
}
