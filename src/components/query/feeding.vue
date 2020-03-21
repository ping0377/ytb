<template>
  <!-- <div id="myChart" :style="{width: '50%', height: '300px'}"></div> -->
  <div>
    <div class="first">
      <Tabs v-model="active_key" active_key="0" @on-click="tab_click()" class="tabs_tab" size="small">
        <Tab-pane label="收取" key="0">
          <div class="tab_table">
            <el-table style="width: 70%">
              <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
              <el-table-column prop="address" label="地址" align="center"></el-table-column>
            </el-table>
          </div>
        </Tab-pane>
        <Tab-pane label="送出" key="1">
          <div class="tab_table">
            <el-table style="width: 70%">
              <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
              <el-table-column prop="address" label="地址" align="center"></el-table-column>
            </el-table>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>
  <script>
import echarts from "echarts";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      active_key: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    tab_click() {
      this.$message("tab click"+this.active_key);
    }
  }
};
</script>
<style lang="" scoped>
.tabs_tab{
  width: 100%;
}
.first {
  width: 94%;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  height: 200px;
  padding: 20px;
}
.schart {
  width: 50%;
  height: 300px;
}
</style>