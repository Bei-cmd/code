import Taro, { Component } from "@tarojs/taro";
// 引入 map 组件
import { Map } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import "./index.scss";

const key = "7SZBZ-RPF3P-MLJDP-LNH3C-OBKD6-PMFUG";
const MAP_LIST = {
  key: "2",
  status: "交易中",
  shop: "小院店铺",
  name: "【浙江专供】一次性日常防护口罩，满足日常防护需求",
  tips: "E款 50片/盒",
  price: "128.45",
  number: "45566"
};

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          iconPath: require("./assets/qishou.png"),
          id: 0,
          latitude: 30.22625,
          longitude: 120.03185,
          width: 30,
          height: 30,
          callout: {
            content: `距离您${432}米`,
            bgColor: "lightgray",
            borderRadius: 10,
            borderWidth: 1,
            padding: 3,
            color: "black",
            fontSize: 10,
            display: "ALWAYS"
          }
        }
      ],
      polyline: [
        {
          points: [
            {
              longitude: 120.03182,
              latitude: 30.22628
            },
            {
              longitude: 120.033,
              latitude: 30.229
            }
          ],
          color: "#000000",
          width: 1,
          borderColor: "yellow",
          dottedLine: true
        }
      ]
    };
  }

  // regionchange(e) {
  //   console.log(e.type);
  // }
  // markertap(e) {
  //   console.log(e.detail.markerId);
  // }
  // controltap(e) {
  //   console.log(e.detail.controlId);
  // }
  render() {
    const { polyline, markers } = this.state;
    return (
      <View className="map">
        <Map
          longitude="120.03185"
          latitude="30.2262500"
          scale="17"
          markers={markers}
          polyline={polyline}
          className="map-map"
        />
        <View className="map-list">
          <View className="map-list_item">
            <Text className="map-list_item_shop">
              您的
              {MAP_LIST.name}正在配送
            </Text>
          </View>
          <View className="map-list_item">
            <Text className="map-list_item_column">送达时间</Text>
            <Text className="map-list_item_info">尽快送达</Text>
          </View>
          <View className="map-list_item">
            <Text className="map-list_item_column">地址</Text>
            <Text className="map-list_item_info">西和公寓</Text>
          </View>
          <View className="map-list_item">
            <Text className="map-list_item_column">配送方式</Text>
            <Text className="map-list_item_info">人工配送</Text>
          </View>
          <View className="map-list_item">
            <Text className="map-list_item_column">订单编号id:</Text>
            <Text className="map-list_item_info">76G4J84FHF845</Text>
          </View>
        </View>
      </View>
    );
  }
}
