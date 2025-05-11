import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import { dispatchCartNum } from "@actions/cart";
import { getWindowHeight } from "@utils/style";
import Profile from "./profile";
import Menu from "./menu";
import navBar from "./navMenu";
import Activity from "./activity";
import "./user.scss";

@connect(
  state => state.user,
  { ...actions, dispatchCartNum }
)
class User extends Component {
  config = {
    navigationBarTitleText: "个人中心"
  };

  componentDidShow() {
    this.props.dispatchInfo({
      id: 1234,
      type: "info",
      subtype: "get",
      data: {
        token: Taro.getStorageSync("token")
      }
    });
  }

  handleLogin = () => {
    Taro.navigateTo({
      url: "/pages/user-login/user-login"
    });
  };

  signOut = () => {
    Taro.removeStorageSync("token");
  };

  render() {
    const { userInfo } = this.props;

    return (
      <View className="user">
        <ScrollView
          scrollY
          className="user__wrap"
          style={{ height: getWindowHeight() }}
        >
          <Profile userInfo={userInfo} />
          <navBar />
          <Menu />
          {userInfo.login && (
            <View className="user__logout" onClick={this.handleLogin}>
              <Text className="user__logout-txt">切换账号</Text>
            </View>
          )}
          {userInfo.login && (
            <View className="user__logout" onClick={this.signOut}>
              <Text className="user__logout-txt">退出登录</Text>
            </View>
          )}
          <View className="user__empty" />
        </ScrollView>
      </View>
    );
  }
}

export default User;
