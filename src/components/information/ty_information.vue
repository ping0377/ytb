<template>
  <div>
    <div class="top_img">
      <span
        class="unactive"
        v-for="(list,index) in img_list"
        :key="index"
        @click="check_img(list,index)"
        :class="{'active':index==ischeck}"
      >{{list}}</span>
    </div>
    <div class="fenlei_div">
      <el-button type="success" @click="add_modal" icon="el-icon-circle-plus-outline">添加</el-button>
    </div>
    <div class="fenlei_center">
      <div v-for="(list,index) in add_server" :key="index">
        <span>
          <b v-if="list.fkSpecTypesNo=='0'">ys</b>
          <b v-if="list.fkSpecTypesNo=='1'">pp</b>
          <b v-if="list.fkSpecTypesNo=='2'">fj</b>
          <b v-if="list.fkSpecTypesNo=='3'">xc</b>
        </span>
        <span>{{list.goodsSpecName}}</span>
        <span @click="editor_modal(list)">编辑</span>
        <span @click="dele_modal(list,index)">删除</span>
      </div>
    </div>
    <el-pagination
      background
      :hide-on-single-page="val"
      :current-page="current_page"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next,jumper"
      :total="total"
      :page-size="18"
    ></el-pagination>
    <DialogFramework top="32vh" :title="modal_title" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <el-input v-show="inp_modal" v-model="goodsSpecName" placeholder="请输入通用规格名称"></el-input>
          <p v-show="!inp_modal">确定删除该分类吗？</p>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible1 = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="add" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>
  </div>
</template>
  <script>
let that;
import DialogFramework from "@/components/alert/dialog_modal";
import * as axios from "@/http/http.js";
export default {
  components: {
    DialogFramework
  },
  data() {
    return {
      dialogVisible1: false,
      goodsSpecName: "", //输入的名称
      ischeck: "0", //选择的img_list
      img_list: ["颜色", "品牌", "附件", "瑕疵"],
      add_server: "", //查询的数据
      modal_title: "", //标题
      goodsSpecNo: "", //编号
      inp_modal: true,
      index: "", //删除的索引
      //分页相关
      val:true,//只有一页时不分页
      total: 1, // 总条数，根据接口获取数据长度
      current_page: 1 ,//当前页数
    };
  },
  mounted() {
    that = this;
    this.Query_page();
  },
  methods: {
    Query_page() {
      let data = {
        fkSpecTypesNo: this.ischeck
      };
      console.log(data);
      axios.Query_general(data, this.current_page).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          that.add_server = res.data.data.list;
          that.total = res.data.data.total;
          console.log(that.total);
        }
      });
    },
    check_img(list, index) {
      this.ischeck = index;
      this.Query_page();
      console.log(list);
    },
    add_modal() {
      this.goodsSpecName = "";
      this.dialogVisible1 = true;
      this.inp_modal = true;
      this.modal_title = "通用规格的添加";
    },
    editor_modal(list) {
      this.dialogVisible1 = true;
      this.inp_modal = true;
      this.modal_title = "通用规格的修改";
      this.goodsSpecName = list.goodsSpecName;
      this.goodsSpecNo = list.goodsSpecNo;
    },
    dele_modal(list, index) {
      this.dialogVisible1 = true;
      this.modal_title = "通用规格的删除";
      this.inp_modal = false;
      this.goodsSpecNo = list.goodsSpecNo;
      this.index = index;
    },
    add() {
      let data = {
        goodsSpecName: this.goodsSpecName
      };
      if (this.modal_title == "通用规格的修改") {
        data.goodsSpecNo = this.goodsSpecNo;
        axios.update_general(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.dialogVisible1 = false;
            this.Query_page();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else if (this.modal_title == "通用规格的添加") {
        data.fkBusinessNo = "123";
        data.fkSpecTypesNo = this.ischeck;
        console.log(data);
        axios.add_general(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.dialogVisible1 = false;
            this.Query_page();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        data.goodsSpecNo = this.goodsSpecNo;
        axios.delete_general(data).then(res => {
          console.log(res);
          if (res.data.status == "200") {
            this.add_server.splice(this.index, 1);
            this.$message.success("删除分类成功");
            this.dialogVisible1 = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.current_page = val;
      that.Query_page();
    }
  }
};
</script>
  <style lang="less" scoped>
.unactive {
  position: relative;
  top: -14px;
  width: 73px;
  line-height: 71px;
  display: inline-block;
  background: url(../../../static/img/u58.svg) no-repeat;
  background-size: 100%;
  color: #fff;
  text-align: center;
  margin: 0 20px;
}
.active {
  background: url(../../../static/img/u59.svg) no-repeat;
  background-size: 100%;
  position: relative;
  top: -20px;
  width: 94px;
  line-height: 91px;
  line-height: 100px;
  display: inline-block;
  background-size: 100%;
  color: #fff;
  text-align: center;
  margin: 0 20px;
}
.top_img {
  width: 94%;
  margin: 40px auto 20px;
  padding-left: 40px;
  height: 85px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  span:hover {
    cursor: pointer;
  }
}
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
  height: 55rem;
  border: 1px solid rgba(215, 215, 215, 1);
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  div {
    width: 29%;
    border: 3px solid;
    height: 50px;
    border-radius: 10px;
    display: inline-block;
    margin: 14px 2%;
    span {
      display: block;
      line-height: 44px;
      color: #fff;
      text-align: center;
      float: left;
    }
    span:nth-child(1) {
      width: 31%;
      height: 44px;
      background-color: #fc7497;
      border-radius: 5px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    span:nth-child(2) {
      width: 32.2%;
      color: #000;
    }
    span:nth-child(3) {
      width: 18.4%;
      background-color: rgba(0, 192, 192, 1);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      cursor: pointer;
    }
    span:nth-child(4) {
      width: 18.4%;
      background-color: rgba(255, 168, 71, 1);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
  