<template>
  <div>
    <div class="first">
      <!-- 第一层的账号金额显示 -->
      <h2>出入账列表信息</h2>
      <table class="table">
        <tr>
          <td>账户余额:</td>
          <td>520</td>
        </tr>
        <tr>
          <td>入账:</td>
          <td>100</td>
        </tr>
        <tr>
          <td>出账:</td>
          <td>200</td>
        </tr>
      </table>
      <el-button type="primary" class="click_get_money" @click=click_get_money>提现</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: ""
    };
  },
  mounted() {},
  methods: {
    click_get_money(){
      this.$message('钱都花完了，不能提现了')
    }
  }
};
</script>
<style scoped>
.first {
  width: 94%;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  height: 300px;
  padding: 20px;
} 
.table {
  margin-top: 20px;
  width: 30%;
  margin-left: 20px;
}
.table tr td:nth-child(1) {
  font-size: 16px;
  line-height: 30px;
  width: 30%;
  text-align: right;
}
.table tr td:nth-child(2) {
  padding-left: 20px;
  background-color: #F2F2F2;
}
.click_get_money{
  margin-left: 80px;
}
</style>