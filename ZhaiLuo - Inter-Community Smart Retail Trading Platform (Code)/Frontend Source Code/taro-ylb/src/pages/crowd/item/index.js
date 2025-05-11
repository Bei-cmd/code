import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView, Progress } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { dispatchCrowdList, dispatchCrowdSponsor } from "@actions/crowd";
import { dispatchItemPay } from "@actions/item";
import like from "../assets/like.png";
import comment from "../assets/comment.png";
import "./index.scss";
@connect(
  state => state.crowd,
  { dispatchCrowdList, dispatchCrowdSponsor }
)
@connect(
  state => state.item,
  { dispatchItemPay }
)
export default class crowdItem extends Component {
  config = {
    navigationBarTitleText: "详情"
  };
  constructor(props) {
    super(props);
    this.itemId = this.props.crowdList;
  }
  pay() {
    this.props.dispatchItemPay(this.itemId);
    Taro.navigateTo({
      url: "/pages/pay/pay"
    });
  }
  render() {
    const { itemId } = this;

    return (
      <View className="crowdItem">
        <Image className="crowdItem__img" src={itemId.listPicUrl} />
        <View className="crowdItem__content">
          <View className="crowdItem__content-name">
            <Text>{itemId.name}</Text>
          </View>
          <View className="crowdItem__content-user">
            <Text>{itemId.author}</Text>
            <Text className="crowdItem__content-auth">实名认证</Text>
          </View>
          <Progress
            percent={itemId.reach}
            className="crowdItem__content-progress"
            strokeWidth={3}
            active
          />
          <View className="crowdItem__content-info">
            <Text className="crowdItem__content-info-item">
              <Text className="crowdItem__content-info-column">目标金额:</Text>
              ￥{itemId.targetPrice}
            </Text>
            <Text className="crowdItem__content-info-item">
              <Text className="crowdItem__content-info-column">已筹金额:</Text>
              ￥{itemId.hasPrice}
            </Text>
            <Text className="crowdItem__content-info-item">
              <Text className="crowdItem__content-info-column">结束时间:</Text>
              {itemId.time}
            </Text>
          </View>

          <View className="crowdItem__content-detail">
            <View className="crowdItem__content-detail-bar">
              <Text className="crowdItem__content-detail-bar-title">
                项目详情
              </Text>
              <Text className="crowdItem__content-detail-bar-tips">
                查看详情 {"   "}>
              </Text>
            </View>
            <View className="crowdItem__content-detail-text">
              {"  "}
              {itemId.text}
            </View>
          </View>
        </View>
        <View className="crowdItem__tabbar">
          <View className="crowdItem__tabbar-icon">
            <View className="crowdItem__tabbar-icon-item">
              <Image src={like} className="crowdItem__tabbar-icon-item-img" />
              <Text className="crowdItem__tabbar-icon-item-name">关注</Text>
            </View>
            <View className="crowdItem__tabbar-icon-item">
              <Image
                src={comment}
                className="crowdItem__tabbar-icon-item-img"
              />
              <Text className="crowdItem__tabbar-icon-item-name">评论</Text>
            </View>
          </View>
          <View className="crowdItem__tabbar-btn">
            <Text
              className="crowdItem__tabbar-btn-text"
              onClick={this.pay.bind(this)}
            >
              立即支持
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
