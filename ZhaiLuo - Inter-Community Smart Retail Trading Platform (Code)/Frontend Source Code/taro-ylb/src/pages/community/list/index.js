import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import hot from "./assets/hot.png";
import "./index.scss";

const LIST_MENU = [
  {
    community_id: 3,
    user: {
      username: "wlc",
      nickname: "ThinBallFish"
    },
    content: "疫情期间大家一定要注意安全！推荐这款口罩，保障你的出行健康",
    item: {
      id: "3990811",
      name: "99%细菌过滤，儿童一次性医用口罩 10枚",
      simpleDesc: null,
      listPicUrl:
        "https://yanxuan-item.nosdn.127.net/aa436fa42dc09938c7f985c071503569.png",
      retailPrice: 49.0,
      activityPrice: 35.0
    },
    add_time: 1589299920.0,
    update_time: 1589299920.0
  }
];
class List extends Component {
  state = {};
  static defaultProps = {
    communityList: []
  };
  routerToItem() {
    Taro.navigateTo({
      url: "/pages/item/item?itemId=3990811"
    });
  }
  render() {
    const { communityList } = this.props;
    return (
      <View className="List">
        {communityList.map((listItem, index) => {
          const lastIndex = index == 0;
          const { item = {}, user = {} } = listItem;
          return (
            <View>
              <View
                className="List__item"
                taroKey={listItem.community_id}
                onClick={this.routerToItem.bind(this)}
              >
                <Image
                  className="List__item-img"
                  src={item.listPicUrl}
                  mode="aspectFill"
                />
                <View className="List__item-data">
                  <View>
                    {index == 0 && (
                      <Image
                        src={hot}
                        className="List__item-data-hotIcon"
                      ></Image>
                    )}
                    <Text className="List__item-data-content">
                      {listItem.content}
                    </Text>
                  </View>
                  <View className="List__item-data-info">
                    <Text className="List__item-data-user">
                      作者:{user.nickname}
                    </Text>
                    <Text className="List__item-data-time">
                      {new Date(listItem.add_time * 1000).getFullYear() +
                        "-" +
                        (new Date(listItem.add_time * 1000).getMonth() + 1) +
                        "-" +
                        new Date(listItem.add_time * 1000).getDate()}
                    </Text>
                  </View>
                </View>
              </View>
              {lastIndex && (
                <View className="List__item-end">- - E N D - -</View>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
export default List;
