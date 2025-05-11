import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import {
  dispatchCommunityList,
  dispatchCommunityPublish
} from "@actions/community";
import List from "./list";
import add from "./assets/add.png";
import "./community.scss";

@connect(
  state => state.community,
  { dispatchCommunityList, dispatchCommunityPublish }
)
class Commounity extends Component {
  config = {
    navigationBarTitleText: "社区"
  };
  state = {
    active: "List"
  };
  addCommunityList() {
    Taro.navigateTo({
      url: "/pages/community/add/index"
    });
  }
  componentDidMount() {
    this.props.dispatchCommunityList({
      id: 1234,
      type: "community",
      subtype: "list",
      data: {
        latitude: 30.22625,
        longitude: 120.03185
      }
    });
  }
  changeList(param) {
    this.setState({
      active: param
    });
  }
  render() {
    const { communityList } = this.props;
    return (
      <View className="community">
        <View className="community_checkBox">
          <Text
            className="community_checkBox-item"
            onClick={this.changeList.bind(this, "List")}
          >
            推荐
          </Text>
          <Text className="community_checkBox-item">关注</Text>
          <Text
            className="community_checkBox-item"
            onClick={this.changeList.bind(this, "zhongchou")}
          >
            众筹
          </Text>
        </View>
        <View>
          {
            {
              ["List"]: <List communityList={communityList}></List>,
              ["zhongchou"]: <View>众筹</View>
            }[this.state.active]
          }
        </View>
        <Image
          src={add}
          className="community__addIcon"
          onClick={this.addCommunityList.bind(this)}
        />
      </View>
    );
  }
}
export default Commounity;
