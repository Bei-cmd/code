import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import { ButtonItem } from "@components";
import { CDN, qiniu } from "@/constants/api";
// NOTE 使用统一接口的多端文件进行跨端处理
// auth 中有 index.js/index.weapp.js/index.alipay.js
// 若是编译微信，则实际引入的是 index.weapp.js
// 若是编译 H5，因为不存在 index.h5.js，所以引入的是默认的 index.js
import Auth from "./auth";
import "./user-login.scss";

// const LOGO = `${CDN}/a7ba557fde54270c71656222c7837396.png`
const LOGO = `${qiniu}/LOGONOBACK.png`;

// TODO 由于 RN 的 app.js 中 initPxTransform 执行顺序关系，不能在 class 外用到 Taro.pxTransform
// const BUTTON = {
//   marginTop: Taro.pxTransform(30)
// }

@connect(
  state => state.user,
  actions
)
class UserLogin extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  handleClick = type => {
    Taro.navigateTo({
      url: "/pages/user-login-email/user-login-email"
    });
  };

  render() {
    const BUTTON = {
      marginTop: Taro.pxTransform(30)
    };

    return (
      <View className="user-login">
        <View className="user-login__logo">
          <Image src={LOGO} className="user-login__logo-img" />
        </View>
        {/* <Auth /> */}
        <ButtonItem
          type="primary"
          text="账号登录"
          compStyle={BUTTON}
          onClick={this.handleClick.bind(this, "telephone")}
        />
        <View className="user-login__reg">
          <Text className="user-login__reg-txt">{"快捷注册>"}</Text>
        </View>
      </View>
    );
  }
}

export default UserLogin;
