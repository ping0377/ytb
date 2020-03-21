<template>
  <div>
    <div v-show="wj_page">
      <div class="shop_top">
        <el-input type="text" class="input_" placeholder="请输入..." v-model="inputvalue"></el-input>
        <el-select v-model="value" clearable placeholder="请选择" @change="choice_change(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <p>
          <el-button type="success" icon="el-icon-search" @click="click_search">搜索</el-button>
          <el-button type="success" @click="add" icon="el-icon-circle-plus-outline">添加</el-button>
        </p>
      </div>
      <div class="tab_div">
        <el-table :data="tableData" border>
          <el-table-column width="110" prop="commLogo" label="Logo">
            <!-- <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="82" />
            </template>-->
          </el-table-column>
          <el-table-column prop="commName" label="商品" width="120"></el-table-column>
          <el-table-column prop="categoriesName" label="商品分类" width="80"></el-table-column>
          <el-table-column prop="price" label="单价" width="80"></el-table-column>
          <el-table-column prop="name3" label="库存" width="80"></el-table-column>
          <el-table-column prop="name4" label="销售量" width="80"></el-table-column>
          <el-table-column prop="name5" label="状态" width="83"></el-table-column>
          <el-table-column prop="state" label="审核状态" width="100">
            <template slot-scope="scope">
              <span
                class="span"
                v-if="scope.row.state.stateNo=='1'"
                style="background:rgba(90, 212, 138, 1)"
              >已通过</span>
              <span
                class="span"
                v-else-if="scope.row.state.stateNo=='2'"
                style="background:rgba(255, 186, 66, 1)"
              >待审核</span>
              <span class="span" v-else style="background: rgba(239, 113, 113, 1)">未通过</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button type="primary" @click="click_bj(scope)">编辑</el-button>
              <el-button type="info" @click="click_kc">库存</el-button>
              <el-button type="danger" @click="click_xj">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
        :current-page="current_page"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next,jumper"
        :total="total"
        ></el-pagination>-->
      </div>
    </div>
    <router-view v-show="!wj_page"></router-view>
  </div>
</template>
  <script>
// debugger
import * as axios from "@/http/http.js";
export default {
  data() {
    return {
      inputvalue: "",
      total: 1, // 总条数，根据接口获取数据长度
      tableData: [], //全部数据记录
      stateNo: [],
      current_page: 1, //当前页数
      wj_page: true, //路由的显隐
      time_value: "",
      options: [
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        },
        {
          value: "巾金制卡",
          label: "巾金制卡"
        }
      ],
      value: ""
    };
  },
  beforeMount() {
    this.wj_page = true;
  },
  mounted() {
    // 获取表格数据
    this.loading_page();
  },
  methods: {
    choice_change(value){
      // 顶部select选择框
      this.$message('选择了'+value)
    },
    click_search(){
      // 点击搜索按钮事件
      this.$message('点击搜索按钮,开始搜索...')
    },
    click_bj(scope) {
      // 编辑
      this.$message("编辑");
      console.log(scope.row);
    },
    click_kc() {
      // 库存
      this.$message("库存");
    },
    click_xj() {
      // 下架
      this.$message("下架");
    },
    add() {
      this.$router.push({ path: "/commodity_editor" });
    },
    loading_page() {
      axios.goods_list().then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.tableData = res.data.data;
          // console.log(this.tableData);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/commodity_management") {
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
.operation {
  cursor: pointer;
}
.shop_top {
  width: 94%;
  margin: 20px auto;
  height: 72px;
  line-height: 72px;
  padding-left: 20px;
  border: 1px solid #d7d7d7;
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.34901961);
  p {
    width: 200px;
    display: inline-block;
    margin-left: 50px;
  }
}
.tab_div {
  width: 94%;
  min-height: 200px;
  text-align: center;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
}
.span {
  color: #fff;
  display: inline-block;
  border-radius: 15px;
  width: 100%;
}
</style>
  <style lang="less">
.shop_top {
  .el-date-editor,
  .el-select {
    width: 200px;
  }
  .inp_div {
    width: 18%;
    margin: 20px 0px 0px 10px;
  }
  .input_div {
    margin: 20px 0px 0px 10px;
  }
  .input_ {
    width: 26%;
  }
}
.el-table th.is-leaf {
  text-align: center;
}
.el-table--border td {
  text-align: center;
}
</style>