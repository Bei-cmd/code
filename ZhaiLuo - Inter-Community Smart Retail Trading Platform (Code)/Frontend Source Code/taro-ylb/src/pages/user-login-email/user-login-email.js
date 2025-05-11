import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import md5 from "blueimp-md5";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/user";
import { ButtonItem, InputItem } from "@components";
import { CDN, qiniu } from "@/constants/api";
import "./user-login-email.scss";

const LOGO = `${qiniu}/LOGONOBACK.png`;
const EMAIL_SUFFIX = [
  "163.com",
  "126.com",
  "yeah.net",
  "vip.163.com",
  "vip.126.com"
];

@connect(
  state => state.user,
  actions
)
class UserLoginEmail extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  state = {
    username: "",
    password: "",
    isShowSuggest: false,
    loading: false
  };

  componentDidMount() {}

  handleInput = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSuggest = value => {
    this.handleInput("username", value);
  };

  handleLogin = () => {
    const payload = {
      id: 1234,
      type: "login",
      subtype: "password",
      data: {
        username: this.state.username,
        password: this.state.password,
        enduring: 1
      }
    };
    this.setState({ loading: true });
    this.props
      .dispatchLogin(payload)
      .then(() => {
        this.setState({ loading: false });
        this.props.dispatchInfo({
          id: 1234,
          type: "info",
          subtype: "get",
          data: {
            token: Taro.getStorageSync("token")
          }
        });
        Taro.navigateBack({ delta: 2 });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { username, password, isShowSuggest, loading } = this.state;
    const isBtnDisabled = !username || !password;

    // XXX 暂未实现 input 的 autoFocus 的逻辑
    return (
      <View className="user-login-email">
        <View className="user-login-email__logo">
          <Image src={LOGO} className="user-login-email__logo-img" />
        </View>
        <View className="user-login-email__wrap">
          <InputItem
            value={username}
            placeholder="账号"
            onInput={this.handleInput.bind(this, "username")}
          />
          <InputItem
            password
            value={password}
            placeholder="密码"
            onInput={this.handleInput.bind(this, "password")}
          />
        </View>
        <View className="user-login-email__btn">
          <ButtonItem
            text="登录"
            disabled={isBtnDisabled}
            loading={loading}
            onClick={this.handleLogin}
            compStyle={{
              background: "#b59f7b",
              borderRadius: Taro.pxTransform(4)
            }}
            textStyle={{
              color: isBtnDisabled ? "rgba(255, 255, 255, 0.4)" : "#ffffff"
            }}
          />
        </View>
      </View>
    );
  }
}

export default UserLoginEmail;
