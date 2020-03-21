<template>
  <div>
    <div class="detail_div">
      <div class="detail_top">
        <span>当前订单状态:</span>
        <el-select size="medium" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="success">接受订单</el-button>
        <el-button type="success" v-show="false">清点完成</el-button>
        <el-button type="success" v-show="false">退款</el-button>
        <el-button>取消订单</el-button>
      </div>
      <el-button-group v-for="(list,index) in btn_list" :key="index">
        <el-button @click="check_express(list,index)" :class="{'active':index==ischeck}">{{list}}</el-button>
      </el-button-group>
    </div>
    <div v-show="order_show">
      <div class="detail_center">
        <p class="title_p">买家信息</p>
        <table class="table" width="60%">
          <tbody>
            <tr>
              <td>用户名：胡慧</td>
              <td>手机号码：17397372717</td>
              <td>所在地区：浙江杭州</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="detail_bottom">
        <p class="title_p">订单信息</p>
        <table class="table">
          <tbody>
            <tr>
              <td>订单编号：5317459134</td>
              <td>订单类型：普通订单</td>
              <td>
                实付款：
                <span>￥59.80</span>
              </td>
              <td>
                订单总价：
                <span>￥59.80</span>
              </td>
            </tr>
            <tr>
              <td>创建时间：2018-11-08 18：54</td>
              <td>付款时间：2018-11-08 18：54</td>
              <td>总配送费：10元</td>
              <td>附加费用：10元</td>
            </tr>
            <tr>
              <td>交易号：20181108002544525587547</td>
              <td>支付方式：支付宝</td>
              <td>支付流水：201811080022365456523</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="detail_footer">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column label="商品信息" width="230">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="62" />
              <span>{{scope.row.name1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name2" label="单价"></el-table-column>
          <el-table-column prop="name3" label="附加费"></el-table-column>
          <el-table-column prop="name4" label="颜色"></el-table-column>
          <el-table-column prop="name5" label="瑕疵" width="150"></el-table-column>
          <el-table-column prop="name6" label="附件"></el-table-column>
          <el-table-column prop="name7" label="品牌"></el-table-column>
          <el-table-column prop="name8" label="附加服务" width="150"></el-table-column>
        </el-table>
        <p>含运费：100元</p>
      </div>
    </div>
    <div v-show="take_show">
      <div class="take_div">
        <p class="title_p">收取信息</p>
        <div style="padding: 3px 50px;">
          <p>收货地址： 胡慧，15222585624，浙江省杭州市西湖区XX阿里云大厅，000000</p>
          <p>运送方式：店铺配送</p>
          <p>配送人姓名：124521312</p>
          <p>配送人联系方式：124521312</p>
        </div>
        <p class="title_p">收取进度记录</p>
        <div>
          <table class="table">
            <tbody>
              <tr>
                <td>2019-10--20 20：30</td>
                <td>接受收取任务</td>
              </tr>
              <tr>
                <td>2019-10--20 20：30</td>
                <td>已到客户地点，并完成衣物收取</td>
              </tr>
              <tr>
                <td>2019-10--20 20：30</td>
                <td>已到店，将衣物交付到店家，完成收取</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="take_div">
        <p class="title_p">收取信息</p>
        <div style="padding: 3px 50px;">
          <p>收货地址： 胡慧，15222585624，浙江省杭州市西湖区XX阿里云大厅，000000</p>
          <p>运送方式：店铺配送</p>
          <p>配送人姓名：124521312</p>
          <p>配送人联系方式：124521312</p>
        </div>
        <p class="title_p">收取进度记录</p>
        <div>
          <table class="table">
            <tbody>
              <tr>
                <td>2019-10--20 20：30</td>
                <td>接受收取任务</td>
              </tr>
              <tr>
                <td>2019-10--20 20：30</td>
                <td>已到客户地点，并完成衣物收取</td>
              </tr>
              <tr>
                <td>2019-10--20 20：30</td>
                <td>已到店，将衣物交付到店家，完成收取</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-show="customer_show">
      <div class="customer_div">
        物品评价
        <el-rate v-model="pj_value"></el-rate>物品评价
        <el-rate v-model="pj_value"></el-rate>物品评价
        <el-rate v-model="pj_value"></el-rate>
        <el-input type="textarea" :rows="5" placeholder="请输入回复内容"></el-input>
        <p class="text-right">
          <el-button type="success">回复评价</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "已下单(待付款)"
        },
        {
          value: "选项2",
          label: "已下单(已付款)"
        },
        {
          value: "选项3",
          label: "已接单(收取中)"
        },
        {
          value: "选项4",
          label: "已接单(回店中)"
        },
        {
          value: "选项5",
          label: "洗涤中(待清点)"
        }
      ],
      value: "",
      tableData: [
        {
          imgUrl: "../../static/img/u1963.svg",
          name1: "儿童服装花点棉衣",
          name2: "45.00",
          name3: "11.00",
          name4: "白色",
          name5: "瑕疵1，瑕疵2，瑕疵3，瑕疵4，瑕疵5",
          name6: "1附件",
          name7: "品牌",
          name8: "附加服务1，附加服务2"
        },
        {
          imgUrl: "../../static/img/u1963.svg",
          name1: "发的发快递今飞",
          name2: "45.00",
          name3: "11.00",
          name4: "白色",
          name5: "瑕疵1，瑕疵2，瑕疵3，瑕疵4，瑕疵5",
          name6: "1附件",
          name7: "品牌",
          name8: "附加服务1，附加服务2"
        }
      ],
      multipleSelection: [],
      //按钮组
      btn_list: ["订单详情", "取配信息", "顾客评价"],
      ischeck: "0",
      //切换
      order_show: true,
      customer_show: false,
      take_show: false,
      //评价
      pj_value: null
    };
  },
  mounted(){
this.resetSetItem("watchItem3", this.$route.path);
  },
  methods: {
    check_express(list, index) {
      this.ischeck = index;
      console.log(list);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  updated() {
    if (this.ischeck == "0") {
      this.order_show = true;
      this.customer_show = false;
      this.take_show = false;
    } else if (this.ischeck == "1") {
      this.order_show = false;
      this.customer_show = false;
      this.take_show = true;
    } else if (this.ischeck == "2") {
      this.order_show = false;
      this.customer_show = true;
      this.take_show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.detail_center,
.detail_div,
.detail_bottom,
.detail_footer,
.take_div,
.customer_div {
  width: 94%;
  margin: 20px auto;
}
.detail_div {
  width: 94%;
  margin: 20px auto;
  height: 150px;
  border: 2px solid rgba(253, 229, 197, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  background-color: rgba(255, 247, 236, 1);
  padding-left: 30px;
  .active {
    background-color: rgb(26, 188, 156);
    color: #fff;
  }
  .detail_top {
    height: 80px;
    line-height: 80px;
    span {
      font-weight: 700;
    }
    .el-select {
      margin-right: 50px;
    }
  }
}
.detail_center {
  border-bottom: 3px dashed #f2f2f2;
  padding-left: 20px;
  height: 70px;
}
.title_p {
  font-weight: 700;
  padding-left: 10px;
  border-left: 5px solid rgba(243, 171, 71, 1);
}
.detail_bottom {
  padding-left: 20px;
  height: 135px;
  .table {
    tr td:nth-child(1) {
      padding-left: 20px;
    }
  }
}
.detail_footer {
  p {
    line-height: 100px;
    text-align: right;
    padding-right: 30px;
  }
}
.take_div {
  border: 2px solid rgba(38, 202, 172, 1);
  padding: 15px;
  padding-bottom: 0;
  div {
    padding-left: 40px;
    p {
      line-height: 24px;
    }
    .table tr td:nth-child(1) {
      width: 20%;
    }
  }
}
.customer_div {
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
}
</style>


<style lang="less">
.detail_div {
  .el-button-group > .el-button {
    margin: 10px 3px;
  }
  .el-button-group > .el-button:first-child:last-child {
    border-radius: 20px;
  }
}
.detail_center {
  .table > tbody > tr > td {
    text-align: center;
  }
  .table {
    width: 60%;
  }
}
.detail_footer {
  .el-table td,
  .el-table th.is-leaf {
    text-align: center;
  }
  .el-table th > .cell {
    color: #000;
  }
}
.take_div {
  .table > tbody > tr > td {
    padding: 2px;
  }
}
.customer_div {
  .el-rate {
    display: inline-block;
    margin-right: 30px;
    margin-left: 15px;
  }
  .el-textarea {
    margin: 10px 0px;
  }
}
</style>