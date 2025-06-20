import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";
import { HCinfo, HCcamera, Navbar } from "./HCcamera";

import "./realAuth.sass";

@inject("userStore")
@observer
class realAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      hadRealAuth: Boolean
    };
  }
  config = {
    navigationStyle: "custom"
  };
  hadRealAuth() {
    const {
      userStore: {
        user: { ID }
      }
    } = this.props;
    if (ID) {
      this.setState({
        hadRealAuth: true
      });
    } else {
      this.setState({
        hadRealAuth: false
      });
    }
  }
  /**
   * 跳转到下一步
   */
  changeCurrent() {
    this.setState({
      current: this.state.current + 1
    });
  }
  componentDidMount() {
    this.hadRealAuth();
  }
  render() {
    const items = [
      {
        title: "身份证验证"
      },
      {
        title: "人脸认证"
      }
    ];
    const { current, hadRealAuth } = this.state;
    return (
      <View className="ra_container">
        <Navbar title="实名认证" weight={true}></Navbar>
        <View className="topbar">
          <AtSteps className="stepText" items={items} current={current} />
          <View>
            {
              {
                0: (
                  <HCinfo
                    nextBtn={this.changeCurrent.bind(this)}
                    detailAuth={hadRealAuth}
                  ></HCinfo>
                ),
                1: <HCcamera></HCcamera>
              }[current]
            }
          </View>
        </View>
      </View>
    );
  }
}

export default realAuth;
