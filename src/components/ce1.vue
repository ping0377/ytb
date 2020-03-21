<template>
  <div>
    <el-button type="text" @click="dialogVisible1 = true">点击打开 Dialog</el-button>
    <DialogFramework top="32vh" title="修改密码" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <el-input value="请输入附加服务名称"></el-input>
          <el-input value="请输入附加服务名称"></el-input>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible1 = false" icon="el-icon-circle-plus-outline">取消</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline">确定</el-button>
        </div>
      </span>
    </DialogFramework>
  </div>
</template>
<script>
import DialogFramework from "../components/alert/dialog_modal";
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      dialogVisible1: false
    };
  },
  methods: {}
};
</script>
<style lang="" scoped>
 .modal_center {
    width: 340px;
    height: 170px;
    width: 320px;
    margin: auto;
  }
  .modal_center .el-input__inner {
    margin: auto;
  }
  .modal_center .el-input {
    width: 90%;
    margin: 20px 5%;
  }
</style>