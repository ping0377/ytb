<template>
  <div class id>
    <!-- 最大的框-->
    <div class="compile">
      <p class="choice_product">选择一口价物品:</p>
      <div class="msg">
        <!-- 第一行选择商品图片和名称 -->
        <div class="first">
          <div class="img_name" @click="one_click">
            <span>+</span>
            <p>名称</p>
          </div>
          <div class="img_name" @click="one_click">
            <span>+</span>
            <p>名称</p>
          </div>
        </div>
        <!-- table信息 -->
        <div class="table_div">
          <el-table style="width: 100%" border align="center">
            <el-table-column prop="date" label="物品名称" width="180" align="center"></el-table-column>
            <el-table-column prop="name" label="物品价格" width="180" align="center"></el-table-column>
            <el-table-column prop="address" label="数量" align="center"></el-table-column>
          </el-table>
        </div>
        <!-- 第三行时间和活动名称 -->
        <div class="time_name">
          <!-- 名称和时间 -->
          <div class="name">
            <span>活动名称:</span>
            <el-input v-model="inputvalue" placeholder="请输入内容"></el-input>
          </div>
          <div class="time">
            <span>时间起止:</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="起"
              end-placeholder="止"
              class="date"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <p class="add">
        <el-button type="primary" @click="add">保存编辑</el-button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      inputvalue:'巾金制卡'
    };
  },
  methods:{
    one_click(){
      // 第一个加号点击事件
      this.$message('添加活动商品...')
    },
      add(){
        // 底部保存活动编辑
          this.$message('保存活动编辑')
      }
  }
};
</script>
<style scoped>
.compile {
  /* 外层最大的框 */
  width: 94%;
  height: 700px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  margin: 20px auto;
  padding-left: 50px;
}
.choice_product {
  /* 选择一口价商品 */
  border-left: 1px solid rgba(215, 215, 215, 1);
  padding-left: 40px;
  font-size: 16px;
  height: 30px;
  font-weight: 700;
  margin-top: 30px;
  color: #c0c0c0;
  line-height: 30px;
}
.msg {
  /* 优惠商品信息 */
  width: 80%;
  height: 500px;
  /* border: 1px solid rgba(215, 215, 215, 1); */
  margin: 0 auto;
  margin-top: 10px;
}
.first {
  /* 第一行2个添加按钮 */
  display: flex;
  justify-content: space-between;
  width: 40%;
  padding-left: 120px;
}
.img_name span {
  /* 2个加号 */
  display: inline-block;
  width: 90px;
  height: 90px;
  background-color: #f2f2f2;
  line-height: 80px;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  border-radius: 10px;
}
.img_name{
  margin-left: 20px;
}
.img_name p {
  /* /* 商品名称 */
  text-align: center;
}
.table_div {
  /* table信息 */
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
}
.table {
  text-align: center;
}
.time_name {
  /* 时间和活动名称外框 */
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
}
.name {
  /* 活动名称*/
  width: 90%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}
.name span {
  /* 活动名称 */
  display: inline-block;
  width: 90px;
  font-size: 16px;
}
.time {
  /* 活动时间 */
  margin-top: 30px;
  width: 75%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}
.time span {
  font-size: 16px;
  width: 90px;
}
.add {
  /* 底层按钮  保存编辑 */
  display: inline-block;
  width: 94%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0;
}
.date {
  cursor: pointer;
}
</style>
