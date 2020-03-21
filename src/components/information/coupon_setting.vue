<template>
  <div>
    <div v-show="coupon_page">
      <div class="price_top">
        <el-input type="text" class="input_" placeholder="请输入..." v-model="inputvalue"></el-input>
        <p>
          <el-button type="success" icon="el-icon-search" @click="click_search">搜索</el-button>
          <el-button type="success" @click="add" icon="el-icon-circle-plus-outline">添加</el-button>
        </p>
      </div>
      <div class="coupon_div">
        <div class="coupon_top">
          <!-- v-for="(item,index) in coupon_data" :key=index -->
          <div class="c_top">
            <span @click="editor()">编辑</span>
            <span @click="dele_modal()">删除</span>
          </div>
          <div class="all">
            <div class="c_left">
              <p>
                ￥
                <span>{{}}元</span>
                <br />
                满{{}}元可用
              </p>
            </div>
            <div class="c_right">
              <p>{{}}</p>
              <p>指定商品可用(详细查看详情)</p>
              <p>指定用户可领取（详细查看详情）</p>
              <p>有效期天数：{{}}天</p>
            </div>
          </div>
          <!-- <div class="circle"></div> -->
          <span class="circle"></span>
        </div>
      </div>
      <el-pagination
        background
        :hide-on-single-page="val"
        :current-page="current_page"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next,jumper"
        :total="total"
        :page-size="6"
      ></el-pagination>
    </div>

    <DialogFramework top="32vh" title="优惠券删除" :visible.sync="dialogVisible" width="30%">
      <div style="width: 100%;">
        <div class="modal_center" style="line-heigth:170px;text-algin:center;color:#BF3A00">
          <p>确定删除该优惠券吗？</p>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="dele()" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>
    <router-view v-show="!coupon_page"></router-view>
  </div>
</template>
  <script>
// debugger
import DialogFramework from "@/components/alert/dialog_modal";
import * as axios from "@/http/http.js";
let that;
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      inputvalue: "",
      coupon_page: true,
      dialogVisible: false,
      coupon_data: [1, 2, 3], //请求到的优惠券
      //分页相关
      val: false, //只有一页时不分页
      total: 1, // 总条数，根据接口获取数据长度
      current_page: 1 //当前页数
    };
  },
  mounted() {
    that = this;
    this.page_loading();
  },
  methods: {
    click_search() {
      // 点击搜索按钮，开始搜索
      this.$message("点击搜索按钮,开始搜索...");
    },
    add() {
      // 添加优惠券，点击事件，去添加页面
      this.$router.push({ path: "/coupon_editor" });
    },
    page_loading() {
      axios.Query_coupon(this.current_page).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.coupon_data = res.data.data.coupon;
          this.total = res.data.data.count;
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    editor(list) {
      // 编辑
      this.$router.push({ path: "/coupon_editor", query: { data: list } });
    },
    dele_modal() {
      // 删除
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      this.current_page = val;
      that.page_loading();
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/coupon_setting") {
          this.coupon_page = true;
          sessionStorage.removeItem("watchItem3");
        } else {
          this.coupon_page = false;
        }
      }
    }
  }
};
</script>
  <style lang="less" scoped>
.circle {
  width: 30%;
}
.circle {
  width: 50px;
  height: 50px;
  z-index: 999;
  display: inline-block;
  background-color: white;
  border: 2px solid #c8428a;
  border-radius: 100%;
  position: relative;
  left: 50%;
  top: -74px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 0px;
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
.coupon_div {
  width: 94%;
  height: 60rem;
  margin: 20px auto;
  border: 1px solid rgb(112, 111, 111);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349);

  .coupon_top {
    width: 36%;
    height: 150px;
    display: inline-block;
    margin: 20px 35px;
    text-align: center;
    .c_top {
      height: 50px;
      background-color: #f7f7f7;
      text-align: right;
      span {
        display: inline-block;
        height: 36px;
        width: 70px;
        color: #fff;
        line-height: 36px;
        text-align: center;

        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      span:hover {
        cursor: pointer;
      }
      span:nth-child(1) {
        background-color: rgba(35, 200, 173, 1);
      }
      span:nth-child(2) {
        background-color: rgba(232, 147, 79, 1);
      }
    }
  }
  .all {
    background: url("../../../static/img/u2458.svg") no-repeat;
  }
  .c_left,
  .c_right {
    float: left;
    height: 100px;
  }
  .c_left {
    width: 30%;
    background: #f7f7f7;
    box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.34901961);
    p {
      margin-top: 25%;
      span {
        color: #c8428a;
        font-size: 18px;
      }
    }
  }
  .c_right {
    width: 70%;
    background: url("../../../static/img/u2458.svg") no-repeat;
    color: #fff;
    text-align: left;
    padding-left: 20px;
    box-shadow: 7px 0px 6px rgba(2, 2, 2, 0.34901961) inset;
    p:nth-child(1) {
      line-height: 25px;
      font-size: 16px;
      font-weight: 700;
      padding-top: 16px;
    }
    p {
      font-size: 13px;
    }
  }
}
</style>
<style lang="less">
.price_top .el-input__inner {
  width: 85%;
}
.price_top .el-input {
  width: 44%;
}
</style>