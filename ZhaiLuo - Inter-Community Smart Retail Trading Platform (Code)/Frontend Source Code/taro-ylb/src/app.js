import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";

import configStore from "./store";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/home/home",
      "pages/cate/cate",
      "pages/cate-sub/cate-sub",
      "pages/cart/cart",
      "pages/user/user",
      "pages/user/map/index",
      "pages/user/seller/index",
      "pages/user-login/user-login",
      "pages/user-login-email/user-login-email",
      "pages/item/item",
      "pages/webview/webview",
      "pages/community/community",
      "pages/user/realauth/index",
      "pages/user/seller/add/index",
      "pages/user/order/index",
      "pages/crowd/crowd",
      "pages/crowd/item/index",
      "pages/pay/pay",
      "pages/community/add/index",
      "pages/collection/collection"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "易邻邦",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#666",
      selectedColor: "#F3B340",
      backgroundColor: "#fafafa",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/home/home",
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/home-active.png",
          text: "首页"
        },
        {
          pagePath: "pages/crowd/crowd",
          iconPath: "./assets/tab-bar/cate.png",
          selectedIconPath: "./assets/tab-bar/cate-active.png",
          text: "众筹"
        },
        {
          pagePath: "pages/community/community",
          iconPath: "./assets/tab-bar/cart.png",
          selectedIconPath: "./assets/tab-bar/cart-active.png",
          text: "社区"
        },
        {
          pagePath: "pages/user/user",
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/user-active.png",
          text: "个人"
        }
      ]
    },
    plugins: {
      routePlan: {
        version: "1.0.3",
        provider: "wx50b5593e81dd937a"
      }
    },
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于小程序定位"
      }
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
