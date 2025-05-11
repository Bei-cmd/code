import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Text,
  ScrollView,
  Image,
  Radio,
  RadioGroup
} from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/item";
import coupon from "./assets/coupon.png";
import zfb from "./assets/zfb.png";
import wx from "./assets/wx.png";
import "./pay.scss";
const LIST = {
  key: "1",
  name: "新疆原产葡萄，不甜包赔",
  activityPrice: "78",
  number: "2",
  listPicUrl: "http://www.amikara.com/timg.jpeg",
  author: "lxy",
  time: "2020-5-20",
  coupo: "40",
  gpd: "9.9",
  text:
    "这里主要种无核白葡萄，还有马奶子、红葡萄、喀什喀尔、百加干、琐琐等13个品种。其果实成球形、卵形。椭园形等，有的葡萄晶莹如珍珠，有的鲜似玛瑙，而有的绿若翡翠。那五光十色、翠绿欲滴的鲜葡萄，令人垂涎不止。用无核白鲜葡萄晾制的葡萄干，含糖量高达60%，被人们视为葡萄中的珍品，新疆葡萄栽培历史悠久，品种资源十分丰富，约600多个品种。有无核白、马奶子、百家干、木纳格、黑葡萄、和田红、喀什哈尔、粉红太妃等，尤以无核白最为名贵，皮薄肉嫩，汁多味甜，素有“珍珠”美称，"
};

@connect(
  state => state.item,
  ...actions
)
class Pay extends Component {
  payNavToOrder() {
    Taro.showToast({
      title: "支付成功",
      icon: "success",
      duration: 2000
    });
    setTimeout(function() {
      Taro.navigateTo({
        url: "/pages/user/order/index"
      });
    }, 2000);
  }
  render() {
    const { itemPay } = this.props;
    return (
      <View className="pay">
        <View className="pay__address">
          <View className="pay__address-info">
            <Text className="pay__address-info-name">lxy</Text>
            <Text className="pay__address-info-phone">13858181317</Text>
          </View>
          <View className="pay__address-tips">
            <Text className="pay__address-tips-item">默认</Text>
            <Text className="pay__address-tips-item">学校</Text>
          </View>
          <View className="pay__address-detail">
            <Text>浙江省 杭州市 西湖区 浙江科技学院</Text>
          </View>
        </View>
        <View className="pay__comList">
          <View className="pay__comList-item">
            <Image src={itemPay.listPicUrl} className="pay__comList-item-img" />
            <View className="pay__comList-item-content">
              <View className="pay__comList-item-content-name">
                <Text>{itemPay.name}</Text>
              </View>
              <View className="pay__comList-item-content-info">
                <Text className="pay__comList-item-content-info-price">
                  单价：￥{itemPay.activityPrice}
                </Text>
                <Text className="pay__comList-item-content-info-number">
                  数量：×{2}
                </Text>
              </View>
              <View className="pay__comList-item-content-finalPrice">
                <Text className="pay__comList-item-content-finalPrice-column">
                  实付金额：
                </Text>
                <Text className="pay__comList-item-content-finalPrice-item">
                  ￥{itemPay.activityPrice * 2}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="pay__info">
          <View className="pay__info-item">
            <Text className="pay__info-item-column">商品金额</Text>
            <Text className="pay__info-item-content">
              ￥{itemPay.activityPrice * 2}
            </Text>
          </View>
          <View className="pay__info-item">
            <View className="pay__info-item-package">
              <Image className="pay__info-item-img" src={coupon} />
              <Text className="pay__info-item-column">优惠券</Text>
            </View>
            <Text className="pay__info-item-content">
              -￥{((itemPay.activityPrice * 2) / 16).toFixed(2)}
            </Text>
          </View>
          <View className="pay__info-item">
            <Text className="pay__info-item-column">团购优惠</Text>
            <Text className="pay__info-item-content">
              -￥{((itemPay.activityPrice * 2) / 50).toFixed(2)}
            </Text>
          </View>
          <View className="pay__info-item pay__info-other">
            <Text className="pay__info-item-column">应付金额</Text>
            <Text className="pay__info-item-content">
              ￥
              {(
                itemPay.activityPrice * 2 -
                (itemPay.activityPrice * 2) / 50 -
                (itemPay.activityPrice * 2) / 16
              ).toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="pay__mode">
          <RadioGroup>
            <Label className="pay__mode-item">
              <View className="pay__mode-item-package">
                <Image className="pay__mode-item-img" src={zfb} />
                <Text className="pay__mode-item-column">支付宝</Text>
              </View>
              <View>
                <Radio className="pay__mode-item-radio" checked={true}></Radio>
              </View>
            </Label>
            <Label className="pay__mode-item pay__mode-other">
              <View className="pay__mode-item-package">
                <Image className="pay__mode-item-img" src={wx} />
                <Text className="pay__mode-item-column">微信</Text>
              </View>
              <View className="pay__mode-item-package">
                <Radio className="pay__mode-item-radio" checked={false}></Radio>
              </View>
            </Label>
          </RadioGroup>
        </View>
        <View className="pay__btn" onClick={this.payNavToOrder.bind(this)}>
          支付
        </View>
      </View>
    );
  }
}
