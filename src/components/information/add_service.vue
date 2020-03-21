<template>
  <div>
    <div class="fenlei_div">
      <el-button type="success" @click="add_modal" icon="el-icon-circle-plus-outline">添加</el-button>
    </div>
    <div class="fenlei_center">
      <div v-for="(list,index) in add_server" :key="index">
        <span>
          <b>{{list.price}}</b>
        </span>
        <span>{{list.serviceName}}</span>
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
      :page-size="12"
    ></el-pagination>
    <DialogFramework top="32vh" :title="title" :visible.sync="dialogVisible1" width="30%">
      <div style="width: 100%;">
        <div class="modal_center">
          <el-input maxlength="7" v-model="server_name" placeholder="请输入附加服务名称"></el-input>
          <el-input
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="server_price"
            placeholder="请输入附加服务价格"
          ></el-input>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible1 = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="add(title)" icon="el-icon-circle-check">确定</el-button>
        </div>
      </span>
    </DialogFramework>
    <DialogFramework top="32vh" title="附加服务删除" :visible.sync="dialogVisible" width="30%">
      <div style="width: 100%;">
        <div class="modal_center" style="line-heigth:170px;text-algin:center;color:#BF3A00">
          <p>确定删除该分类吗？</p>
        </div>
      </div>
      <span slot="footer">
        <div class="modal_footer">
          <el-button @click="dialogVisible = false" icon="el-icon-circle-close">取消</el-button>
          <el-button type="success" @click="dele()" icon="el-icon-circle-check">确定</el-button>
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
      dialogVisible: false,
      server_price: "",
      server_name: "",
      attachServiceNo: "", //附加服务编号
      index: "", //删除的索引
      title: "",
      add_server: [],
      //分页相关
      val: true, //只有一页时不分页
      total: 1, // 总条数，根据接口获取数据长度
      current_page: 1 //当前页数
    };
  },
  mounted() {
    that = this;
    this.loading_page();
  },
  methods: {
    loading_page() {
      axios.Query_addservices(this.current_page).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.add_server = res.data.data.list;
          that.total = res.data.data.total;
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    add_modal() {
      this.server_name = "";
      this.server_price = "";
      this.dialogVisible1 = true;
      this.title = "附加服务添加";
    },
    editor_modal(list) {
      console.log(list);
      this.dialogVisible1 = true;
      this.title = "附加服务修改";
      this.server_name = list.serviceName;
      this.server_price = list.price;
      this.attachServiceNo = list.attachServiceNo;
    },
    add(title) {
      let data = {
        serviceName: this.server_name,
        price: this.server_price,
        fkBusinessNo: "123"
      };
      if (title == "附加服务添加") {
        axios.add_addservices(data).then(res => {
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
      } else {
        data.attachServiceNo = this.attachServiceNo;
        axios.update_addservices(data).then(res => {
          console.log(res, "修改");
          if (res.data.status == "200") {
            that.dialogVisible1 = false;
            that.loading_page();
          } else if (res.data.status == "588") {
            this.$message.error(res.data.msg);
            this.$router.push({ path: "/log" });
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    dele_modal(list, index) {
      this.dialogVisible = true;
      this.attachServiceNo = list.attachServiceNo;
      this.index = index;
    },
    dele() {
      let data = {
        attachServiceNo: this.attachServiceNo
      };
      axios.delete_addservices(data).then(res => {
        console.log(res);
        if (res.data.status == "200") {
          // this.loading_page()
          that.add_server.splice(that.index, 1);
          this.$message.success("删除分类成功");
          this.dialogVisible = false;
        } else if (res.data.status == "588") {
          this.$message.error(res.data.msg);
          this.$router.push({ path: "/log" });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.current_page = val;
      that.loading_page();
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
  height: 66rem;
  border: 1px solid rgba(215, 215, 215, 1);
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  div {
    width: 30%;
    border: 3px solid;
    height: 50px;
    border-radius: 10px;
    display: inline-block;
    margin: 14px;
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
      width: 36.2%;
      color: #000;
    }
    span:nth-child(3) {
      width: 16.4%;
      background-color: rgba(0, 192, 192, 1);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      cursor: pointer;
    }
    span:nth-child(4) {
      width: 16.4%;
      background-color: rgba(255, 168, 71, 1);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
