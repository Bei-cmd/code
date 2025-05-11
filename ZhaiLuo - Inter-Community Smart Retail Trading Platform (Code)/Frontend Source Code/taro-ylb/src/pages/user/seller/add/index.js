import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Image, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import "./index.scss";

@connect(
  state => state.user,
  actions
)
class Add extends Component {
  state = {
    key: "2",
    name: "",
    tips: "",
    img: "",
    price: "",
    number: ""
  };
  addStoreItem(param, e) {
    console.log(param);
    if (param == "name") {
      this.setState({
        name: e.detail.value
      });
    } else if (param == "tips") {
      this.setState({
        tips: e.detail.value
      });
    } else if (param == "price") {
      this.setState({
        price: e.detail.value
      });
    } else if (param == "number") {
      this.setState({
        number: e.detail.value
      });
    }
  }
  openImage() {
    let that = this;
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setState({
          img: tempFilePaths
        });
      }
    });
  }
  navToAddList() {
    const { key, name, tips, price, number, img } = this.state;
    this.props.dispatchAddPro({ key, name, tips, price, number, img });
    Taro.navigateBack({ delta: 1 });
  }
  render() {
    const { name, tips, price, number, img } = this.state;
    return (
      <View>
        <ScrollView style="height: 700px;">
          <Image
            src="http://www.amikara.com/169683231.jpg"
            className="add__img"
          />
          <View className="add">
            <View className="add-item">
              <Label>名称:</Label>
              <Input
                value={name}
                className="add-item__input"
                onInput={this.addStoreItem.bind(this, "name")}
              ></Input>
            </View>
            <View className="add-item">
              <Label>款型:</Label>
              <Input
                value={tips}
                className="add-item__input"
                onInput={this.addStoreItem.bind(this, "tips")}
              ></Input>
            </View>
            <View className="add-item">
              <Label>价格:</Label>
              <Input
                value={price}
                className="add-item__input"
                onInput={this.addStoreItem.bind(this, "price")}
              ></Input>
            </View>
            <View className="add-item">
              <Label>数量:</Label>
              <Input
                value={number}
                className="add-item__input"
                onInput={this.addStoreItem.bind(this, "number")}
              ></Input>
            </View>
            <View className="add-item">
              <Label>商品图片:</Label>
              <View
                className="add-item__image"
                onClick={this.openImage.bind(this)}
              >
                {!!img && (
                  <Image
                    className="add-item__image__img"
                    mode="widthFix"
                    src={img}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="add__add" onClick={this.navToAddList.bind(this)}>
          添加
        </View>
      </View>
    );
  }
}
export default Add;
