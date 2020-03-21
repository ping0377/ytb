<template>
  <div class="orderList_div">
    <div class="order_left" v-show="show_div">
      <div class="order_top">
        <span>{{list_name}}</span>
        <span @click="show">
          <img src="../../static/img/u70.svg" alt />
        </span>
      </div>
      <ul v-for="(list,index) in li2_list" :key="index">
        <li @click="checked(list,index)" :class="{'active':index==active}">{{list}}</li>
      </ul>
    </div>
    <div class="order_right">
      <div class="right_top">
        <p>
          <span>
            <img src="../../static/img/u1005.svg" alt />
          </span>
        </p>
        <div class="tab_header">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(item,index) in currentPath"
              :key="index"
              :to="{ path: item.path }"
            >{{item.meta.title}} </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="order_bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
// debugger;
var that = this;
export default {
  inject: ["reload"],
  data() {
    return {
      active: 0,
      list_name: "", //一级路由传递参数
      show_div: true, //控制左侧栏
      li2_list: [],
      currentPath: [],
      w: ""
    };
  },
  created() {
    window.addEventListener("setItem", () => {
      // console.log(sessionStorage.getItem("watchItem1"));
      this.show_list();

      this.show_div = Number(sessionStorage.getItem("show_div"));
      if (sessionStorage.getItem("index2")) {
        let index = sessionStorage.getItem("index2");
        let li_name = sessionStorage.getItem("li_name2");
        this.active = index;
      } else {
        this.active = 0;
      }
    });
  },
  mounted() {
    this.b();
    this.show_list();
    this.list_name = sessionStorage.getItem("watchItem1");
    if (sessionStorage.getItem("index2")) {
      let index = sessionStorage.getItem("index2");
      let li_name = sessionStorage.getItem("li_name2");
      this.active = index;
    } else {
      this.active = 0;
    }
  },
  methods: {
    show() {
      sessionStorage.setItem("show_div", 0);
      this.show_div = Number(sessionStorage.getItem("show_div"));
      // this.show_div=false
      console.log(this.show_div);
    },
    //判断传递参数显示列表
    show_list() {
      this.active = 0;
      this.list_name = sessionStorage.getItem("watchItem1");
      if (this.list_name == "订单") {
        this.li2_list.length = 0;
        this.li2_list.push("洗护订单");
        this.li2_list.push("商场订单");
      } else if (this.list_name == "资料") {
        this.li2_list.length = 0;
        this.li2_list.push("物件价格");
        this.li2_list.push("物件分类");
        this.li2_list.push("附加服务");
        this.li2_list.push("通用资料");
        this.li2_list.push("优惠券设置");
        this.li2_list.push("活动设置");
        this.li2_list.push("商品分类");
        this.li2_list.push("商品管理");
      } else if (this.list_name == "财务") {
        this.li2_list.length = 0;
        this.li2_list.push("总入账");
        this.li2_list.push("洗护统计");
        this.li2_list.push("商品统计");
        this.li2_list.push("客户消费统计");
      } else if (this.list_name == "查询") {
        this.li2_list.length = 0;
        this.li2_list.push("客户消费查询");
        this.li2_list.push("历史订单查询");
        this.li2_list.push("收送查询");
      } else if (this.list_name == "商户") {
        this.li2_list.length = 0;
        this.li2_list.push("商户信息");
        this.li2_list.push("运费设置");
        this.li2_list.push("店铺评价");
      }
    },
    //选择列表
    checked(list, index) {
      sessionStorage.setItem("index2", index);
      sessionStorage.removeItem("watchItem3")
      this.resetSetItem("watchItem2", list);
      this.active = index;
      if (this.list_name == "资料") {
        if (index == 0) {
          this.$router.push({
            path: "/wj_price"
          });
        }
        if (index == 1) {
          this.$router.push({
            path: "/wj_fl"
          });
        }
        if (index == 2) {
          this.$router.push({
            path: "/add_service"
          });
        }
        if (index == 3) {
          this.$router.push({
            path: "/ty_information"
          });
        }
        if (index == 4) {
          this.$router.push({
            path: "/coupon_setting"
          });
        }
        if (index == 5) {
          this.$router.push({
            path: "/activity_set"
          });
        }
        if (index == 6) {
          this.$router.push({
            path: "/shop_fl"
          });
        }
        if (index == 7) {
          this.$router.push({
            path: "/commodity_management"
          });
        }
      } else if (this.list_name == "订单") {
        if (index == 0) {
          this.$router.push({
            path: "/wash_order"
          });
        }
        if (index == 1) {
          this.$router.push({
            path: "/market_order"
          });
        }
      } else if (this.list_name == "财务") {
        if (index == 0) {
          this.$router.push({
            path: "/all_money"
          });
        }
        if (index == 1) {
          this.$router.push({
            path: "/wash_statistical"
          });
        }
        if (index == 2) {
          this.$router.push({
            path: "/shop_statistical"
          });
        }
        if (index == 3) {
          this.$router.push({
            path: "/customer_statistical"
          });
        }
      } else if (this.list_name == "查询") {
        if (index == 0) {
          this.$router.push({ path: "/user_consumption" });
        } else if (index == 1) {
          this.$router.push({ path: "/history_order" });
        } else if (index == 2) {
          this.$router.push({ path: "/feeding" });
        }
      } else if (this.list_name == "商户") {
        if (index == 0) {
          this.$router.push({ path: "/business_infor" });
        } else if (index == 1) {
          this.$router.push({ path: "/freight_set" });
        } else if (index == 2) {
          this.$router.push({ path: "/shop_evaluation" });
        }
      }
    },
    b() {
      this.currentPath = [];
      for (let i = 2; i < this.$route.matched.length; i++) {
        this.currentPath.push(this.$route.matched[i]);
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // console.log(this.$route.matched);
        // console.log(this.$route.matched);
        this.b();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.orderList_div {
  width: calc(100vw - 122px);
  display: flex;

  .order_left {
    min-width: 108px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 1);
    text-align: center;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.349019607843137);
    z-index: 1;

    .active {
      line-height: 50px;
      background-color: rgba(252, 248, 214, 1);
      border-right: 4px solid rgba(242, 175, 0, 1);
      color: rgb(6, 145, 140);
    }

    ul {
      background-color: #fff;
    }

    li {
      line-height: 50px;
    }
  }
  .order_bottom {
    height: calc(100vh - 54px);
    overflow-y: auto;
    overflow-y: scroll;
    min-width: 1000px;
  }
  .order_bottom::-webkit-scrollbar {
    display: none;
  }
}

.order_top {
  line-height: 54px;
  height: 54px;
  color: #18b193;
  box-shadow: 0px 5px 5px rgba(204, 204, 204, 0.349019607843137);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(242, 242, 242, 1) 0%,
    rgba(228, 228, 228, 1) 100%,
    rgba(255, 255, 255, 1) 100%
  );
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: space-around;

  span {
    display: inline-block;
  }
}

.order_right {
  width: 100vw;

  .right_top {
    line-height: 54px;
    height: 54px;
    background-color: rgba(242, 242, 242, 1);
    box-shadow: 0px 5px 5px rgba(204, 204, 204, 0.349019607843137);

    p {
      line-height: 54px;
      width: 54px;
      display: inline-block;
      span {
        padding-left: 10px;
      }
    }
    .tab_header {
      border-left: 3px solid #00e6e6;
      line-height: 54px;
      display: inline-block;
      font-size: 16px !important;
      font-weight: 700;
      line-height: 19px;
      padding-left: 10px;
    }
  }
}
</style>