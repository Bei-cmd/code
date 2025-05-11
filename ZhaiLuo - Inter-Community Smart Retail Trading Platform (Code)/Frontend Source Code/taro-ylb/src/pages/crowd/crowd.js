import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { dispatchCrowdList, dispatchCrowdSponsor } from "@actions/crowd";
import News from "./news";
import crowdList from "./list";
import "./crowd.scss";

@connect(
  state => state.crowd,
  { dispatchCrowdList, dispatchCrowdSponsor }
)
class Crowd extends Component {
  config = {
    navigationBarTitleText: "众筹"
  };
  render() {
    return (
      <View className="crowd">
        <View>
          <News></News>
          <crowdList></crowdList>
        </View>
      </View>
    );
  }
}
