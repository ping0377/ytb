<template>
  <div>
    <div class="modal fade" id="myModal">
      <div class="modal_div">
        <div class="modal_headers">
          <span>附加服务添加</span>
          <span @click="modal_h">
            <img src="static/img/u2306.svg" alt />
          </span>
        </div>
        <div class="modal_center">
          <el-input value="请输入附加服务名称"></el-input>
          <el-input value="请输入附加服务名称"></el-input>
        </div>
        <div class="modal_footer">
          <el-button @click="modal_h" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" icon="el-icon-circle-check">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  inject: ["reload"],
  data() {
    return {
      show_d: true
    };
  },
  mounted() {},
  methods: {
    modal_h() {
      $("#myModal").modal("hide");
    }
  }
};
</script>
  <style lang="less">
.modal_div {
  width: 340px;
  height: 280px;
  background-color: #fff;
  margin: calc((100vh - 300px) / 2) auto;
  border-radius: 10px;

  .modal_headers {
    width: 320px;
    margin: auto;
    border-bottom: 1px dashed #02bda6;
    color: #02bda6;
    height: 40px;
    line-height: 40px;
    img {
      position: relative;
      top: -7px;
      left: 180px;
    }
  }
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
  .modal_footer {
    border-top: 1px dashed #02bda6;
    height: 60px;
    line-height: 60px;
    text-align: right;
    width: 320px;
    margin: auto;
  }
}
</style>