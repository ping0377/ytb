<template>
  <div>
    <div v-show="wj_page">
      <div class="price_top">
        <el-input type="text" class="input_" placeholder="请输入..." v-model="inputvalue"></el-input>
        <p>
          <el-button type="success" icon="el-icon-search" @click="click_search">搜索</el-button>
        </p>
      </div>
      <div class="tabs_div">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsh">
          <div class="table_header">
            <table class="table">
              <thead>
                <tr>
                  <th width="30%">订单信息</th>
                  <th width="10%">订单件数</th>
                  <th width="10%">订单总额</th>
                  <th width="10%">交易状态</th>
                  <th width="20%">收货人</th>
                  <th width="10%">操作</th>
                </tr>
              </thead>
            </table>
          </div>
          <el-tab-pane :label="'全部'+allnumber" name="first">
            <div class="table_infor">
              <table class="table">
                <tbody>
                  <tr>
                    <td width="30%">
                      <img src="static/img/u665.svg" alt /> 2018.09.19 11:20 单号：5678577
                    </td>
                    <td width="10%">共1件</td>
                    <td width="10%">￥19.9</td>
                    <td width="10%">待付款</td>
                    <td width="20%">张家辉13856996969</td>
                    <td width="10%">
                      <el-tooltip content="详情" placement="top" class="operate">
                        <img @click="order_detail" src="static/img/u673.png" />
                      </el-tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'待发货'+number" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="待付款" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="退款中" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="未评价" name="five">定时任务补偿</el-tab-pane>
          <el-tab-pane label="已完成" name="six">定时任务补偿</el-tab-pane>
          <el-tab-pane label="已关闭" name="seven">定时任务补偿</el-tab-pane>
          <el-tab-pane label name></el-tab-pane>
          <el-tab-pane label name></el-tab-pane>
          <el-tab-pane label name></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <router-view v-show="!wj_page"></router-view>
  </div>
</template>
  <script>
// debugger
export default {
  data() {
    return {
      inputvalue: "",
      number: 123,
      allnumber: 32,
      activeName: "first", //tab标签页
      wj_page: true
    };
  },
  methods: {
    click_search() {
      // 搜索点击事件
      this.$message("点击了搜索按钮,开始搜索...");
    },
    add() {
      this.$router.push({ path: "/wj_price_editor" });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      this.$message({
        message: "点击了" + tab.label,
        duration: 1000
      });
    },
    order_detail() {
      this.$router.push({ path: "/washOrder_details" });
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/wash_order") {
          this.wj_page = true;
          sessionStorage.removeItem("watchItem3");
        } else {
          this.wj_page = false;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.operate {
  cursor: pointer;
}
.is-top {
  padding-left: 20px;
}
.table_infor {
  height: 70px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgba(247, 248, 252, 1);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.349019607843137);
  margin-bottom: 20px;
  td {
    vertical-align: middle;
  }
  td:not(:last-child) {
    border-right: 1px solid rgba(205, 239, 241, 1);
  }
}
.table_header {
  height: 30px;
  color: #999999;
  margin-bottom: 20px;
  position: absolute;
  width: 100%;
  top: -50px;
  th:not(:last-child) {
    border-right: 1px solid;
  }
}
.price_top {
  width: 94%;
  margin: 20px auto;
  height: 72px;
  line-height: 72px;
  padding-left: 20px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  p {
    width: 200px;
    display: inline-block;
  }
}
.tabs_div {
  width: 94%;
  min-height: 300px;
  text-align: center;
  margin: 0 auto;
  // border: 1px solid rgba(215, 215, 215, 1);
  // box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
}
</style>
<style lang="less">
.price_top .el-input__inner {
  width: 85%;
}
.price_top .el-input {
  width: 44%;
}
.table_infor {
  .table > tbody > tr > td {
    padding: 0 8px;
  }
}
</style>