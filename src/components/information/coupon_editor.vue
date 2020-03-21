<template>
  <div>
    <div class="coupon_div">
      <p class="p_title">领取和使用规则</p>
      <table class="table">
        <tbody>
          <tr>
            <td>
              <span>*</span>优惠券名称:
            </td>
            <td>
              <el-input v-model="coupon_name"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>发放总量:
            </td>
            <td>
              <el-input v-model="coupon_num"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>优惠内容:
            </td>
            <td class="input_min">
              订单满
              <el-input v-model="full_money" size="mini"></el-input>元减
              <el-input v-model="minus_money" size="mini"></el-input>元
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>用券时间:
            </td>
            <td class="input_min">
              领券当日起
              <el-input size="mini" v-model="coupon_day"></el-input>天内可用
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>截止领取时间:
            </td>
            <td>
              <el-date-picker
                v-model="time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="00:00:00"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>优惠券店铺:
            </td>
            <td>
              <el-select v-model="coupon_shop" placeholder="请选择">
                <el-option
                  v-for="item in check_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="coupon_div">
      <p class="p_title">领取和使用规则</p>
      <table class="table">
        <tbody>
          <tr>
            <td style="vertical-align: top;">
              <span>*</span>使用门槛:
            </td>
            <td>
              <el-radio v-model="radio1" label="1">不限制，所有人可领</el-radio>
              <br />
              <el-radio v-model="radio1" label="2">指定会员等级可领</el-radio>
              <br />
              <el-select v-show="show_select" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>每人限领次数:
            </td>
            <td class="input_min">
              限领
              <el-input size="mini" v-model="limit_num"></el-input>次
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top;">
              <span>*</span>使用说明:
            </td>
            <td>
              <el-input
                type="textarea"
                autocomplete="off"
                v-model="textarea"
                rows="5"
                placeholder="请输入优惠券的说明"
              ></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center">
        <el-button type="success" @click="save">保存</el-button>
        <el-button @click="$router.back(-1)">取消</el-button>
      </p>
    </div>
  </div>
</template>
<script>
import * as axios from "@/http/http.js";
export default {
  inject: ["reload"],
  data() {
    return {
      radio1: "1",
      time: "", //截止时间
      coupon_name: "", //优惠券名称
      couponNo: "", //优惠券编号
      coupon_num: "", //优惠券发行数量
      show_select: false,
      full_money: "", //满
      minus_money: "", //减
      coupon_day: "", //用券时间
      limit_num: "", //限领次数
      textarea: "", //使用说明
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }, //设置禁止选择今天之前的时间
      check_options: [
        {
          value: "0",
          label: "商品销售店铺"
        },
        {
          value: "1",
          label: "洗护服务店铺"
        }
      ],
      coupon_shop: "", //选择的优惠券
      options: [
        {
          value: "选项1",
          label: "有卡用户"
        },
        {
          value: "选项2",
          label: "无卡用户"
        }
      ],
      value: ""
    };
  },
  mounted() {
    this.page_loading();
    this.resetSetItem("watchItem3", this.$route.path);
  },
  updated() {
    if (this.radio1 == "2") {
      this.show_select = true;
    } else {
      this.show_select = false;
    }
  },
  methods: {
    // 优惠券编辑保存
    save() {
      this.$message('保存优惠券编辑信息')
      let time = this.moment(this.time).format("YYYY-MM-DD HH:mm:ss");
      console.log(time);
      let data = {
        couponName: this.coupon_name,
        num: this.coupon_num,
        endTime: time,
        fullPrice: this.full_money,
        money: this.minus_money,
        collect: this.limit_num,
        details: this.textarea,
        validityDays: this.coupon_day,
        isDelete: false,
        isRacking: true,
        couponType: this.coupon_shop
      };
      if (this.coupon_shop == "0") {
        data.fkBusinessNo = sessionStorage.getItem("shopNo");
      } else {
        data.fkBusinessNo = sessionStorage.getItem("washNo");
      }
      // console.log(data);
      if (this.$route.query.data != undefined) {
        data.couponNo = this.couponNo;
        axios.update_coupon(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.$message.success("修改成功");
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        axios.add_coupon(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.$message.success("添加成功");
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    //@blur校验金钱格式
    h(money) {
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (reg.test(money)) {
        return true;
      } else {
        this.$message.error("价格设置不合理,小数点后有两位");
      }
    },
    page_loading() {
      console.log(this.$route.query.data);
      let page_data = this.$route.query.data;
      if (page_data) {
        this.time = page_data.endTime; //截止时间
        this.coupon_name = page_data.couponName; //优惠券名称
        this.coupon_num = page_data.num; //优惠券发行数量
        this.full_money = page_data.fullPrice; //满
        this.minus_money = page_data.money; //减
        this.coupon_day = page_data.validityDays; //用券时间
        this.limit_num = page_data.collect; //限领次数
        this.textarea = page_data.details; //使用说明
        this.couponNo = page_data.couponNo; //优惠券编号
        // if(page_data.couponType=="0"){
        this.coupon_shop = String(page_data.couponType);
        // }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.coupon_div {
  width: 94%;
  margin: 20px auto;
  .p_title {
    height: 50px;
    line-height: 50px;
    background-color: #f2f2f2;
    padding-left: 20px;
    font-weight: 700;
  }
  td span {
    color: red;
  }
  td {
    p {
      padding-left: 25px;
      color: #0000ff;
      height: 20px;
      line-height: 20px;
    }
  }
  table {
    width: 60%;
    tr td:nth-child(1) {
      width: 22%;
      text-align: right;
      vertical-align: middle;
    }
  }
  .input_min .el-input {
    width: 15%;
    padding: 0 5px;
    text-align: center;
  }
}
</style>
<style lang="less">
.coupon_div {
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5;
    text-align: center;
  }
  .el-table {
    max-height: 318px;
    overflow: auto;
  }
  .el-input--mini .el-input__inner {
    padding: 0 5px;
  }
  .el-button {
    width: 10%;
  }
  .el-button--success {
    margin-right: 10%;
  }
}
</style>