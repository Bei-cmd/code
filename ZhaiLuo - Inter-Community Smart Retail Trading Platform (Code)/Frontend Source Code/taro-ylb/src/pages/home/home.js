import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { Loading } from "@components";
import { connect } from "@tarojs/redux";
import * as actions from "@actions/home";
import { dispatchCartNum } from "@actions/cart";
import { getWindowHeight } from "@utils/style";
import Banner from "./banner";
import Policy from "./policy";
import Pin from "./pin";
import Operation from "./operation";
import Manufactory from "./manufactory";
import FlashSale from "./flash-sale";
import Popular from "./popular";
import Category from "./category";
import Recommend from "./recommend";
import Menu from "./menu";
import searchIcon from "@assets/search.png";
import locationIcon from "./assets/location.png";
import "./home.scss";

const RECOMMEND_SIZE = 20;

@connect(
  state => state.home,
  { ...actions, dispatchCartNum }
)
class Home extends Component {
  config = {
    navigationBarTitleText: "易邻邦"
  };

  state = {
    loaded: false,
    loading: false,
    lastItemId: 0,
    hasMore: true,
    address: "获取定位中"
  };

  componentDidMount() {
    this.props.dispatchHome().then(() => {
      this.setState({ loaded: true });
    });
    this.props.dispatchCartNum();
    this.props.dispatchSearchCount();
    this.props.dispatchPin({ orderType: 4, size: 12 });
    this.loadRecommend();

    const address = Taro.getStorageSync("location");
    if (address) {
      this.setState({
        address: address
      });
    } else {
      this.getLocation();
    }
  }

  loadRecommend = () => {
    if (!this.state.hasMore || this.state.loading) {
      return;
    }

    const payload = {
      id: 1234,
      type: "recommend",
      subtype: "index",
      data: {
        limit: 10
      }
    };
    this.setState({ loading: true });
    this.props
      .dispatchRecommend(payload)
      .then(res => {
        const lastItem = res.rcmdItemList[res.rcmdItemList.length - 1];
        this.setState({
          loading: false,
          hasMore: res.hasMore,
          lastItemId: lastItem && lastItem.id
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  getLocation() {
    Taro.getLocation({
      type: "gcj02",
      success: res => {
        const lat = res.latitude;
        const lon = res.longitude;
        Taro.chooseLocation({
          latitude: lat,
          longitude: lon,
          success: res => {
            console.log(res);
            this.setState({
              address: res.name
            });
            Taro.setStorage({
              key: "location",
              data: res.name
            });
          }
        });
      },
      fail: err => {
        console.log(err);
      }
    });
  }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: "目前只可点击底部推荐商品",
      icon: "none"
    });
  };

  render() {
    if (!this.state.loaded) {
      return <Loading />;
    }

    const { homeInfo, searchCount, recommend, pin } = this.props;
    console.log(recommend);
    return (
      <View className="home">
        <View className="home__address" onClick={this.getLocation.bind(this)}>
          <Image className="home__address-img" src={locationIcon} />
          <Text className="home__address-txt">{this.state.address}</Text>
        </View>
        <View className="home__search">
          <View className="home__search-wrap" onClick={this.handlePrevent}>
            <Image className="home__search-img" src={searchIcon} />
            <Text className="home__search-txt">{`搜索更多你喜欢的商品`}</Text>
          </View>
        </View>
        <ScrollView
          scrollY
          className="home__wrap"
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight() }}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={homeInfo.focus} />
            <Policy list={homeInfo.policyDesc} />

            {/* 免费拼团 */}
            {/* <Pin banner={homeInfo.newUserExclusive} list={pin} /> */}

            {/* 不知道叫啥 */}
            {/* <Operation
              list={homeInfo.operationCfg}
              sale={homeInfo.saleCenter}
            /> */}

            {/* 品牌制造 */}
            {/* <Manufactory
              data={homeInfo.manufactory}
              boss={homeInfo.dingBossRcmd}
            /> */}

            {/* 限时购 */}
            {/* <FlashSale data={homeInfo.flashSale} /> */}

            {/* 人气推荐 */}
            {/* <Popular data={homeInfo.popularItems} /> */}

            {/* 类目热销榜 */}
            {/* <Category data={homeInfo.hotCategory} /> */}
          </View>

          {/* 为你推荐 */}
          <Menu />
          <Recommend list={recommend} />

          {this.state.loading && (
            <View className="home__loading">
              <Text className="home__loading-txt">正在加载中...</Text>
            </View>
          )}
          {!this.state.hasMore && (
            <View className="home__loading home__loading--not-more">
              <Text className="home__loading-txt">更多内容，敬请期待</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Home;
