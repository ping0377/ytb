<template>
  <div id="app">
    <router-view v-if="IsRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      IsRouterAlive: true
    };
  },
  methods: {
    //刷新当前页面
    reload() {
      this.IsRouterAlive = false;
      this.$nextTick(() => {
        this.IsRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="less">
.el-pagination{
  text-align: center;
}
.el-upload__input {
  display: none;
}
input[type="file"] {
  display: none;
}

.el-upload--picture-card {
  width: 80px;
  height: 80px;
}
.el-upload-list--picture-card .el-upload-list__item {
  width: 80px;
  height: 80px;
}
.el-upload--picture-card i {
  position: relative;
  top: -35%;
}
/* 设置上传框 */
.hide .el-upload--picture-card {
  display: none;
}
.hide {
  display: block !important;
}
/*  */
/* 设置文本框禁止拖动 */
.el-textarea .el-textarea__inner{
  resize: none;
}
textarea {
  resize: none;
}
a {
  color: #666 !important;
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
li:hover {
  cursor: pointer;
}
* {
  font-family: "Arial Negreta", "Arial";
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-size: 14px;
}
.router-link-active {
  text-decoration: none;
}
.el-breadcrumb__inner {
  font-size: 16px;
  display: inline-block;
  line-height: 20px;
}
.el-breadcrumb__item {
  float: none;
}
/* .el-button--success{
  background-color: rgba(26, 188, 156, 1);
  border-color: rgba(26, 188, 156, 1);
}
.el-button--success:hover{
  background-color: rgba(26, 188, 156, 1);
  border-color: rgba(26, 188, 156, 1);
}
.el-button--success:focus{
  background-color: rgba(26, 188, 156, 1);
  border-color: rgba(26, 188, 156, 1);
} */

.table > tbody > tr > td {
  border-top: 0;
}
.el-button-group > .el-button:not(:last-child) {
  margin: 20px;
}
.el-button-group > .el-button:not(:first-child) {
  margin: 20px;
}
.el-button-group > .el-button {
  float: left;
  position: relative;
  margin: 20px;
}

.el-tabs__item {
  width: 10%;
  font-weight: 700;
  font-size: 15px;
  padding: 0;
}
.el-tabs__nav {
  width: 100%;
}
.el-tabs__header {
  border: 1px solid rgba(215, 215, 215, 1);
  height: 110px;
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
}
.table > thead > tr > th {
  text-align: center;
}
.table > thead > tr > th {
  border: 0;
}
.table > thead > tr > th {
  padding: 0;
}
.el-tabs__content {
  overflow: inherit;
}
.modal_center {
  width: 340px;
  height: 170px;
  width: 320px;
  margin: auto;
  p {
    color: rgb(191, 58, 0);
    line-height: 170px;
    text-align: center;
    font-size: 20px;
  }
}
.modal_center .el-input__inner {
  margin: auto;
}
.modal_center {
  .el-select {
    width: 100%;
  }
}
.modal_center .el-input {
  width: 90%;
  margin: 20px 5%;
}
.tab_div {
  .el-table__row td:nth-child(7),
  .el-table__row td:nth-child(9) {
    .cell {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
