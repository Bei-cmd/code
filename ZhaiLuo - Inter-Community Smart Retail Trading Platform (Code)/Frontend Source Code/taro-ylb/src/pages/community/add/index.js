import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Image, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { dispatchCommunityPublish } from "@actions/community";
import "./index.scss";

@connect(
  state => state.community,
  { dispatchCommunityPublish }
)
@connect(state => state.item)
class Add extends Component {
  state = {
    key: "2",
    content: "",
    tips: "",
    listPicUrl: "",
    price: "",
    nickname: "Pyman",
    add_time: 1589976581.0,
    update_time: 1589299920.0
  };
  addStoreItem(param, e) {
    console.log(param);
    if (param == "name") {
      this.setState({
        content: e.detail.value
      });
    } else if (param == "tips") {
      this.setState({
        tips: e.detail.value
      });
    } else if (param == "price") {
      this.setState({
        price: e.detail.value
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
          listPicUrl: tempFilePaths
        });
      }
    });
  }
  navToAddList() {
    const {
      update_time,
      add_time,
      content,
      nickname,
      price,
      listPicUrl
    } = this.state;
    this.props.dispatchCommunityPublish({
      update_time,
      add_time,
      content,
      user: { nickname },
      price,
      item: { listPicUrl }
    });
    Taro.navigateBack({ delta: 1 });
  }
  routerToCollection() {
    Taro.navigateTo({
      url: "/pages/collection/collection"
    });
  }
  render() {
    const { content, tips, price, listPicUrl } = this.state;
    const { collection } = this.props;
    return (
      <View>
        <ScrollView style="height: 700px;">
          <Image
            src="http://www.amikara.com/303676395.jpg"
            className="add__img"
          />
          <View className="add">
            <View className="add-item">
              <Label>标题:</Label>
              <Input
                value={content}
                className="add-item__input"
                onInput={this.addStoreItem.bind(this, "name")}
              ></Input>
            </View>
            <View className="add-item">
              <Label>内容:</Label>
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
              <Label>商品:</Label>
              <View
                className="add-item__check"
                onClick={this.routerToCollection.bind(this)}
              >
                {collection}
              </View>
            </View>
            <View className=""></View>
            <View className="add-item">
              <Label>图片:</Label>
              <View
                className="add-item__image"
                onClick={this.openImage.bind(this)}
              >
                {!!listPicUrl && (
                  <Image
                    className="add-item__image__img"
                    mode="widthFix"
                    src={listPicUrl}
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
