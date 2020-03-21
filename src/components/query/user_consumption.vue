<template>
  <!-- <div id="myChart" :style="{width: '50%', height: '300px'}"></div> -->
  <div class="big">
    <div class="shop_top">
      <el-input type="text" class="input_search" placeholder="请输入..." v-model="inputvalue"></el-input>
      <el-select v-model="value" clearable placeholder="请选择" @change="choice_change(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <p>
        <el-button type="success" icon="el-icon-search" @click="click_search">搜索</el-button>
        <el-button type="success" @click="add" icon="el-icon-circle-plus-outline">添加</el-button>
      </p>
    </div>

    <div class="activity_table">
      <el-table style="width: 100%" :data="tabledata" border>
        <el-table-column prop="name" label="活动名称" width="180" align="center"></el-table-column>
        <el-table-column prop="number" label="销售总量" width="180" align="center"></el-table-column>
        <el-table-column prop="price" label="销售额" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="click_details(scope)">详情</el-button>
            <el-dialog title="产品销售详情" :visible.sync="activity_msg_show" align="left">
              <el-table :data="gridData">
                <el-table-column property="goods" label="商品" width="150" align="center"></el-table-column>
                <el-table-column property="number" label="销售量" width="200" align="center"></el-table-column>
                <el-table-column property="price" label="销售额" align="center"></el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  <script>
import echarts from "echarts";
export default {
  data() {
    return {
      gridData: [
        //dialog中表格数据
        {
          goods: "哈根达斯",
          number: 200,
          price: 5000
        },
        {
          goods: "小火锅",
          number: 200,
          price: 5000
        }
      ],
      activity_msg_show: false, //是否显示表格详情
      tabledata: [
        //活动表格数据
        {
          name: "秒杀",
          number: "200",
          price: 10000
        }
      ],
      msg: "Welcome to Your Vue.js App",
      value: "",
      inputvalue: "",
      options: [
        {
          value: "秒杀活动",
          label: "秒杀活动"
        },
        {
          value: "拼团活动",
          label: "拼团活动"
        },
        {
          value:'优惠券',
          label:'优惠券'
        }
      ]
    };
  },
  created() {},
  mounted() {
    // this.drawLine();
  },
  methods: {
    click_search() {
      this.$message("搜索中...");
    },
    add() {
      this.$message("添加中...");
    },
    choice_change(value) {
      // select选项变化  头部活动种类选择搜索功能
      this.$message("选中了" + value);
    },
    click_details(scope) {
      // 列表中详情按钮
      this.activity_msg_show = true;
      this.$message("点击了表格中的详情按钮" + scope);
      console.log(scope);
    }
  }
};
</script>
<style lang="less" scoped>
.big {
  width: 94%;
  margin: 20px auto;
}
.input_search {
  width: 30%;
}
.shop_top {
  width: 100%;
  margin: 0 auto;
  height: 72px;
  line-height: 72px;
  padding-left: 20px;
  border: 1px solid #d7d7d7;
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.34901961);
  p {
    width: 200px;
    display: inline-block;
    margin-left: 50px;
  }
}
.activity_table {
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
  text-align: center;
}
</style>