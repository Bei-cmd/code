import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView, Progress } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { dispatchCrowdList, dispatchCrowdSponsor } from "@actions/crowd";
import "./index.scss";

const LIST = [
  {
    key: "1",
    name: "新疆原产葡萄，不甜包赔",
    activityPrice: "78",
    targetPrice: "7800",
    hasPrice: "2800",
    reach: "36",
    listPicUrl: "http://www.amikara.com/timg.jpeg",
    author: "lxy",
    time: "2020-5-20",
    text:
      "这里主要种无核白葡萄，还有马奶子、红葡萄、喀什喀尔、百加干、琐琐等13个品种。其果实成球形、卵形。椭园形等，有的葡萄晶莹如珍珠，有的鲜似玛瑙，而有的绿若翡翠。那五光十色、翠绿欲滴的鲜葡萄，令人垂涎不止。用无核白鲜葡萄晾制的葡萄干，含糖量高达60%，被人们视为葡萄中的珍品，新疆葡萄栽培历史悠久，品种资源十分丰富，约600多个品种。有无核白、马奶子、百家干、木纳格、黑葡萄、和田红、喀什哈尔、粉红太妃等，尤以无核白最为名贵，皮薄肉嫩，汁多味甜，素有“珍珠”美称，"
  },
  {
    key: "2",
    name: "俄罗斯低脂吐司，让您和家人更加健康",
    activityPrice: "28",
    targetPrice: "2800",
    hasPrice: "280",
    reach: "10",
    listPicUrl:
      "https://guosai-1251848017.cos.ap-shanghai.myqcloud.com/citem/9953260085/portrait/9953260085.citem",
    author: "lxy",
    time: "2020-5-20",
    text:
      "这里主要种无核白葡萄，还有马奶子、红葡萄、喀什喀尔、百加干、琐琐等13个品种。其果实成球形、卵形。椭园形等，有的葡萄晶莹如珍珠，有的鲜似玛瑙，而有的绿若翡翠。那五光十色、翠绿欲滴的鲜葡萄，令人垂涎不止。用无核白鲜葡萄晾制的葡萄干，含糖量高达60%，被人们视为葡萄中的珍品，新疆葡萄栽培历史悠久，品种资源十分丰富，约600多个品种。有无核白、马奶子、百家干、木纳格、黑葡萄、和田红、喀什哈尔、粉红太妃等，尤以无核白最为名贵，皮薄肉嫩，汁多味甜，素有“珍珠”美称，"
  }
];
@connect(
  state => state.crowd,
  { dispatchCrowdList, dispatchCrowdSponsor }
)
export default class crowdList extends Component {
  checkInfo(param) {
    console.log(param);
    this.props.dispatchCrowdList(param);
    Taro.navigateTo({
      url: `/pages/crowd/item/index`
    });
  }
  render() {
    return (
      <View className="crowdList">
        {LIST &&
          LIST.map((item, index) => (
            <View
              className="crowdList__item"
              taroKey={index}
              onClick={this.checkInfo.bind(this, item)}
            >
              <Image
                className="crowdList__item-img"
                src={item.listPicUrl}
                mode="widthFix"
              />
              <View className="crowdList__item-content">
                <View className="crowdList__item-content-namePrice">
                  <Text className="crowdList__item-content-namePrice-name">
                    {item.name}
                  </Text>
                  <Text className="crowdList__item-content-namePrice-price">
                    ￥{item.activityPrice}
                  </Text>
                </View>
                <Progress
                  percent={item.reach}
                  className="crowdList__item-content-progress"
                  strokeWidth={3}
                  active
                />
                <View className="crowdList__item-content-info">
                  <Text className="crowdList__item-content-info-item">
                    <Text className="crowdList__item-content-info-column">
                      目标金额:
                    </Text>
                    ￥{item.targetPrice}
                  </Text>
                  <Text className="crowdList__item-content-info-item">
                    <Text className="crowdList__item-content-info-column">
                      已筹金额:
                    </Text>
                    ￥{item.hasPrice}
                  </Text>
                  <Text className="crowdList__item-content-info-item">
                    <Text className="crowdList__item-content-info-column">
                      目标金额:
                    </Text>
                    {item.reach}%
                  </Text>
                  <Text className="crowdList__item-content-info-item">
                    <Text className="crowdList__item-content-info-column">
                      发起人:
                    </Text>
                    {item.author}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </View>
    );
  }
}
