<template>
  <div>
    <div class="top_img" v-show="wj_page">
      <span
        class="unactive"
        v-for="(list,index) in img_list"
        :key="index"
        @click="check_img(list,index)"
        :class="{'active':index==ischeck}"
      >{{list}}</span>
      <div class="price_top">
        <el-input type="text" class="input_search" v-model="input_velue" placeholder="请输入..."  clearable></el-input>
        <p>
          <el-button type="success" icon="el-icon-search" @click="click_search">搜索</el-button>
          <el-button type="success" @click="add" icon="el-icon-circle-plus-outline">添加</el-button>
        </p>
      </div>
    </div>
    <div class="activity" v-show="wj_page">
      <div class="activitys">
        <div class="btns">
          <span class="activity_compile" @click="activity_compile">编辑</span>
          <!-- dialog 活动编辑 -->
          <span class="activity_delete" @click="activity_delete">删除</span>
        </div>
        <!-- 活动信息详情 -->
        <div class="activity_msg">
          <p>
            <span class="activity_name">名称:</span>
            <span></span>
          </p>
          <p>
            <span>商品数量:</span>
            <span></span>
          </p>
          <p>
            <span>起始时间:</span>
            <span></span>
          </p>
          <p>
            <span>结束时间:</span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
    <router-view></router-view>
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
      input_velue:"", //搜索框的输入内容
      dialogVisible1: false,
      goodsSpecName: "", //输入的名称
      ischeck: "0", //选择的img_list
      wj_page: true,
      img_list: ["秒杀活动", "拼团活动", "优惠券"],
      add_server: "", //查询的数据
      modal_title: "", //标题
      goodsSpecNo: "", //编号
      inp_modal: true,
      index: "", //删除的索引
      //分页相关
      val: true, //只有一页时不分页
      total: 1, // 总条数，根据接口获取数据长度
      current_page: 1 //当前页数
    };
  },
  mounted() {
    that = this;
    this.Query_page();
  },

  methods: {
    inputchange(){
      console.log(this.input_velue)
      if(!this.input_velue==""){
        this.input_velue=this.input_velue.toFixed(2)
      }
      // console.log(this.input_velue)
    },
    click_search() {
      this.$message("点击搜索按钮,搜索中...");
    },
    add() {
      //活动添加
      this.$router.push({
        path: "/activity_compile"
      });
    },
    // 活动编辑
    activity_compile() {
      console.log("activity_compile");
      this.$router.push({
        path: "/activity_compile"
      });
    },
    activity_delete() {
      //活动删除
      console.log("activity_delete");
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
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

    handleCurrentChange(val) {
      this.current_page = val;
      that.Query_page();
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/activity_set") {
          // console.log(this.$route.path);
          this.wj_page = true;
          sessionStorage.removeItem("watchItem3");
        } else {
          this.wj_page = false;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.input_search {
  width: 40%;
}
.activity_name {
  font-size: 18px;
}
.activity_msg {
  // 活动信息详情
  width: 100%;
  height: 70%;
  background-color: #001d3e;
  color: #fff;
  padding-left: 20px;
  p {
    span {
      margin-top: 20px;
    }
  }
}
.btns {
  //活动编辑和删除
  height: 50px;
  background-color: #eaeaea;
  text-align: right;
}
.activity {
  width: 94%;
  height: 500px;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
}
.activitys {
  width: 25%;
  height: 150px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  margin: 25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.activity_compile {
  //活动编辑
  display: inline-block;
  width: 60px;
  height: 35px;
  background-color: #23c8ad;
  color: #fff;
  text-align: center;
  line-height: 35px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
}
.activity_delete {
  //活动删除
  display: inline-block;
  width: 60px;
  height: 35px;
  background-color: #e8934f;
  color: #fff;
  text-align: center;
  line-height: 35px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 15px;
  margin-right: 10px;
  cursor: pointer;
}
.price_top {
  width: 94%;
  height: 72px;
  line-height: 50px;
  margin: 0 auto;
  p {
    width: 200px;
    display: inline-block;
  }
}
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
  padding-left: 10px;
  height: 190px;
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
    }
    span:nth-child(4) {
      width: 18.4%;
      background-color: rgba(255, 168, 71, 1);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
  