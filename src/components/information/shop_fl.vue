<template>
  <div>
    <div class="fenlei_div">
      <el-button type="success" @click="add_fl" icon="el-icon-circle-plus-outline">添加</el-button>
    </div>
    <div class="fenlei_center">
      <div v-for="(list,index) in fuwu_data" :key="index">
        <p>{{list.categoryName}}</p>
        <p>
          <b>商品</b>
          <br />已有个数
          <br />
          <b>{{list.commNum}}</b>
        </p>
        <p>
          <span @click="editor_fl(list)">编辑</span>
          <span @click="dele_modal(list,index)">删除</span>
        </p>
      </div>
    </div>
    <DialogFramework top="32vh" :title="modal_title" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <el-input v-model="categoryName" placeholder="请选择商品分类名称"></el-input>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible1 = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="add(modal_title)" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>
    <DialogFramework top="32vh" title="删除分类" :visible.sync="dialogVisible" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <p>确定删除该分类吗？</p>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="dele" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>
  </div>
</template>
  <script>
// debugger
let that;
import DialogFramework from "@/components/alert/dialog_modal";
import * as axios from "@/http/http.js";
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      dialogVisible1: false, //添加模态框
      dialogVisible: false,
      modal_title: "",
      options: [
        {
          value: "百货",
          label: "百货"
        },
        {
          value: "上衣",
          label: "上衣"
        },
        {
          value: "鞋子",
          label: "鞋子"
        },
        {
          value: "内衣",
          label: "内衣"
        },
        {
          value: "外套",
          label: "外套"
        }
      ],
      categoryName: "", //商品分类名称
      categoryNo: "", //商品分类编号
      index: "",
      fuwu_data: "222"
    };
  },
  mounted() {
    that = this;
    this.loading_page();
  },
  methods: {
    loading_page() {
      console.log(111)
        console.log(sessionStorage.getItem("token"))
      axios.Query_GoodsSpec().then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.fuwu_data = res.data.data;
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    add_fl() {
      this.dialogVisible1 = true;
      this.modal_title = "分类添加";
    },
    editor_fl(list) {
      this.dialogVisible1 = true;
      this.modal_title = "分类编辑";
      this.categoryNo = list.categoryNo;
      this.categoryName = list.categoryName;
    },
    add(title) {
      let data = {
        fkBusinessNo: "123",
        categoryName: this.categoryName
      };
      console.log(data);
      if (title == "分类添加") {
        axios.add_GoodsSpec(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.dialogVisible1 = false;
            this.loading_page();
          } else if (res.data.status == "588") {
            this.$message.error(res.data.msg);
            this.$router.push({ path: "/log" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else if (title == "分类编辑") {
        data.categoryNo = this.categoryNo;
        axios.update_GoodsSpec(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.dialogVisible1 = false;
            this.loading_page();
          } else if (res.data.status == "588") {
            this.$message.error(res.data.msg);
            this.$router.push({ path: "/log" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
      this.dialogVisible1 = false;
    },
    dele_modal(list, index) {
      this.dialogVisible = true;
      this.categoryNo = list.categoryNo;
      this.index = index;
    },
    dele() {
      let data = {
        categoryNo: this.categoryNo
      };
      axios.delete_GoodsSpec(data).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.fuwu_data.splice(that.index, 1);
          this.$message.success("删除分类成功");
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
  <style lang="less" scoped>
.fenlei_div {
  width: 94%;
  margin: 20px auto;
  padding-left: 20px;
  height: 72px;
  line-height: 72px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
}
.fenlei_center {
  width: 94%;
  min-height: 550px;
  border: 1px solid rgba(215, 215, 215, 1);
  margin: 20px auto;
  padding-top: 50px;
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  div {
    width: 22%;
    height: 100px;
    border: 3px solid;
    border-radius: 10px;
    display: inline-block;
    margin: 2% 5.6%;
    p {
      float: left;
      height: 94px;
      text-align: center;
    }
    p:nth-child(1) {
      border-radius: 5px;
      width: 39%;
      line-height: 94px;
      background-color: #fc7497;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
    }
    p:nth-child(2) {
      width: 37%;
      line-height: 30px;
      b {
        font-size: 20px;
      }
    }
    p:nth-child(3) {
      width: 23%;
      span {
        width: 103%;
        display: inline-block;
        height: 47px;
        line-height: 47px;
        text-align: center;
        cursor: pointer;
      }
      span:nth-child(1) {
        border-left: 2px solid rgba(0, 128, 128, 1);
        color: #008080;
        border-top-left-radius: 5px;
      }
      span:nth-child(2) {
        border-left: 2px solid rgba(163, 0, 20, 1);
        border-top: 2px solid rgba(163, 0, 20, 1);
        color: #a30014;
        border-bottom-left-radius: 5px;
      }
    }
  }
}
</style>
<style lang="less">
.modal_center {
  .el-select {
    width: 100%;
  }
}
</style>

