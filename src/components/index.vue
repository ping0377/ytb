<template>
  <div class="index_div">
    <div class="left_div">
      <div class="left_logo" v-popover:popover2>
        <img src="../../static/img/u957.png" width="82" alt />
        <p>{{name}}</p>
      </div>
      <div class="left_bottom">
        <ul v-for="(list,index) in li_list" :key="index">
          <li @click="checked_li(list,index)" :class="{'active':index==active}">
            <img src="../../static/img/u934.svg" />
            <img class="point_img" src="../../static/img/u935.svg" />
            {{list.li_name}}
          </li>
        </ul>
        <el-popover ref="popover2" placement="top-start" trigger="click">
          <table class="table" style="margin-bottom:0">
            <!-- <tr>
              <td>
                <img src="../../static/img/u61.png" alt width="15" />
              </td>
              <td>修改密码</td>
            </tr>-->
            <tr style="cursor: pointer;">
              <td>
                <img src="../../static/img/u280.png" alt />
              </td>
              <td @click="exit">安全退出</td>
            </tr>
          </table>
        </el-popover>
      </div>
    </div>
    <div class="right_div">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// debugger
var that = this;
import Vue from "vue";
export default {
  inject: ["reload"],
  data() {
    return {
      active: 0,
      name: "user", //登陆者
      li_list: [
        { li_name: "主页" },
        { li_name: "订单" },
        { li_name: "资料" },
        { li_name: "财务" },
        { li_name: "查询" },
        { li_name: "商户" }
      ]
    };
  },
  mounted() {
    //刷新页面时，检测之前的点击内容
    if (sessionStorage.getItem("index")) {
      let index = sessionStorage.getItem("index");
      let li_name = sessionStorage.getItem("watchItem1");
      this.active = index;
      if (index == 0) {
        this.$router.push({ path: "/home" });
      } else {
        this.$router.push({
          path: "/second_list"
        });
      }
    }
    this.other_index();
  },
  methods: {
    //选择的列表内容
    checked_li(list, index) {
      this.active = index;
      this.resetSetItem("show_div", 1);
      if (list.li_name == sessionStorage.getItem("watchItem1")) {
        this.other_index();
        // this.reload()
      } else {
        sessionStorage.removeItem("watchItem2");
        sessionStorage.removeItem("watchItem3");
        sessionStorage.removeItem("index2");
        sessionStorage.setItem("index", index);
        this.resetSetItem("watchItem1", list.li_name);
        if (index == 0) {
          this.$router.push({ path: "/home" });
        } else {
          this.other_index();
        }
      }
    },
    //判断所处页面
    other_index() {
      let two_router = sessionStorage.getItem("watchItem1");
      let three_router = sessionStorage.getItem("watchItem2");
      let url = sessionStorage.getItem("watchItem3");
      if (url) {
        this.$router.push({ path: url });
        return;
      }
      if (three_router) {
        if (three_router == "物件分类") {
          this.$router.push({
            path: "/wj_fl"
          });
        } else if (three_router == "物件价格") {
          this.$router.push({
            path: "/wj_price"
          });
        } else if (three_router == "附加服务") {
          this.$router.push({
            path: "/add_service"
          });
        } else if (three_router == "通用资料") {
          this.$router.push({
            path: "/ty_information"
          });
        } else if (three_router == "优惠券设置") {
          this.$router.push({
            path: "/coupon_setting"
          });
        } else if (three_router == "活动设置") {
          this.$router.push({
            path: "/activity_set"
          });
        } else if (three_router == "商品分类") {
          this.$router.push({
            path: "/shop_fl"
          });
        } else if (three_router == "商品管理") {
          this.$router.push({
            path: "/commodity_management"
          });
        } else if (three_router == "洗护订单") {
          this.$router.push({
            path: "/wash_order"
          });
        } else if (three_router == "总入账") {
          this.$router.push({
            path: "/all_money"
          });
        } else if (three_router == "洗护统计") {
          this.$router.push({
            path: "/wash_statistical"
          });
        } else if (three_router == "商品统计") {
          this.$router.push({
            path: "/shop_statistical"
          });
        } else if (three_router == "客户消费统计") {
          this.$router.push({
            path: "/customer_statistical"
          });
        } else if (three_router == "客户消费查询") {
          this.$router.push({
            path: "/user_consumption"
          });
        } else if (three_router == "历史订单查询") {
          this.$router.push({
            path: "/history_order"
          });
        } else if (three_router == "收送查询") {
          this.$router.push({
            path: "/feeding"
          });
        } else if (three_router == "商户信息") {
          this.$router.push({
            path: "/business_infor"
          });
        } else if (three_router == "运费设置") {
          this.$router.push({
            path: "/freight_set"
          });
        } else if (three_router == "店铺评价") {
          this.$router.push({
            path: "/shop_evaluation"
          });
        }
      } else if (two_router) {
        if (two_router == "订单") {
          this.$router.push({
            path: "/wash_order"
          });
        } else if (two_router == "资料") {
          this.$router.push({
            path: "/wj_price"
          });
        } else if (two_router == "财务") {
          this.$router.push({
            path: "/all_money"
          });
        } else if (two_router == "查询") {
          this.$router.push({
            path: "/user_consumption"
          });
        } else if (two_router == "商户") {
          this.$router.push({
            path: "/business_infor"
          });
        }
      }
    },
    exit() {
      sessionStorage.clear();
      this.$router.push({ path: "/log" });
    }
  }
};
</script>
<style lang="less" scoped>
.left_div {
  // border: 1px solid red;
  font-size: 14px;
}

.index_div {
  height: 100vh;
  min-width: 106.5rem;

  // border: 1px solid green;
  .left_div {
    float: left;
    width: 122px;
    height: 100vh;
    background-color: rgba(0, 28, 34, 1);
    font-weight: 700;
    color: #ffffff;

    .left_logo {
      text-align: center;
      // border-bottom: 2px dashed yellow;
      border-bottom-width: 50%;
      p{
        cursor: pointer;
      }
      img:nth-child(1) {
        margin-top: 10px;
      }

      p {
        background: url("../../static/img/u958.svg") no-repeat center;
        height: 30px;
      }
    }

    .left_bottom {
      margin-top: 80px;

      table img {
        width: 30px;
      }

      li:hover {
        cursor: pointer;
      }

      li {
        line-height: 52px;
        text-align: center;

        .point_img {
          position: relative;
          left: -1.6rem;
        }
      }

      .active {
        background: linear-gradient(
          270deg,
          rgba(51, 227, 192, 1) 0%,
          rgba(51, 227, 192, 1) 0%,
          rgba(24, 177, 147, 1) 100%,
          rgba(24, 177, 147, 1) 100%
        );
        font-size: 16px;
        color: #000;
        border-left: 3px solid #db9e00;
      }
    }
  }
  // .right_div::-webkit-scrollbar{
  // 				display: none;
  // 			}

  .right_div {
    float: left;
    width: calc(100vw - 140px);
    height: calc(100vh - 50px);
    // overflow-y: auto;
    // overflow-y: scroll;
    .right_top {
      line-height: 54px;
      height: 54px;
      background-color: rgba(242, 242, 242, 1);
      box-shadow: 0px 5px 5px rgba(204, 204, 204, 0.349019607843137);

      p {
        height: 36px;
      }

      span {
        display: inline-block;
        padding-left: 10px;
      }

      span:nth-child(1) {
        padding-right: 6px;
      }

      span:nth-child(2) {
        border-left: 3px solid rgba(0, 128, 128, 1);
        font-size: 16px;
        font-weight: 700;
        line-height: 19px;
      }
    }
  }
}
</style>
<style lang="less">
.el-popover {
  min-width: 110px;
  padding: 5px;

  img {
    width: 30px;
  }
}
</style>