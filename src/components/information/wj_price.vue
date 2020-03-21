<template>
  <div>
    <div v-show="wj_page">
      <div class="price_top">
        <el-input type="text" class="input_" placeholder="请输入..." v-model="inputvalue"></el-input>
        <p>
          <el-button type="success" icon="el-icon-search" @click="click_search">搜索</el-button>
          <el-button type="success" @click="add" icon="el-icon-circle-plus-outline">添加</el-button>
        </p>
      </div>
      <div class="tab_div">
        <el-table :data="tableData" border>
          <el-table-column width="110">
            <template slot-scope="scope">
              <img :src="scope.row.goodsImg" width="82" />
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="商品" width="240"></el-table-column>
          <el-table-column prop="categoriesName" label="物件分类"></el-table-column>
          <el-table-column prop="price" @click="editor(scope)" sortable label="价格">
            <template slot-scope="scope">
              <span sortable v-if="scope.row.isSpecialGoods">{{scope.row.specialValue}}</span>
              <span sortable v-else>{{scope.row.goodsPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isSale">上架</span>
              <span v-else>已下架</span>
            </template>
          </el-table-column>
          <el-table-column label="是否特价">
            <template slot-scope="scope">
              <span v-if="scope.row.isSpecialGoods">特价</span>
              <span v-else>非特价</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip
                :key="index"
                :content="item.name"
                v-for="(item,index) in imgs"
                placement="top"
                class="operate"
              >
                <img :src="item.img1" @click="editor(scope.row,item.name)" style="margin-top: 25px" />
              </el-tooltip>
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
    <router-view></router-view>
  </div>
</template>
  <script>
// debugger
import * as axios from "@/http/http.js";
export default {
  data() {
    return {
      inputvalue:'',
      total: 1, // 总条数，根据接口获取数据长度
      tableData: [], //全部数据记录
      current_page: 1, //当前页数
      wj_page: true,
      parent_nr: "",
      imgs: [
        { img1: "static/img/u1973.png", name: "编辑" },
        { img1: "static/img/u1981.png", name: "下架" }
      ],
      tableData: [
        {
          imgUrl: "static/img/u1963.svg",
          date: "钱包女短款折叠学生可爱韩版",
          name: "时尚包包",
          address: "￥55",
          one: "上架",
          two: "非特价",
          three: [
            { img1: "static/img/u1973.png", name: "编辑" },
            { img1: "static/img/u1981.png", name: "下架" }
          ]
        },
        {
          imgUrl: "static/img/u1963.svg",
          date: "钱包女短款折叠学生可爱韩版",
          name: "时尚包包",
          address: "￥65.30",
          one: "上架",
          two: "非特价",
          three: ""
        }
      ]
    };
  },
  beforeMount() {
    this.wj_page = true;
  },
  mounted() {
    this.loading_page();
  },
  methods: {
    click_search(){
      //搜索按钮点击
      this.$message('点击搜索按钮,开始搜索...')
    },
    loading_page() {
      axios.Query_price().then(res => {
        console.log(res);
        if (res.data.status == "200") {
          this.tableData = res.data.data.goodsList;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    add() {
      this.$router.push({ path: "/wj_price_editor" });
    },
    editor(item, name) {
      console.log(item, name);
      if (name == "编辑") {
        this.$router.push({ path: "/wj_price_editor", query: { data: item } });
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // console.log(val,oldval)
        if (this.$route.path == "/wj_price") {
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
.operate {
  cursor: pointer;
}
.price_top {
  width: 94%;
  margin: 20px auto;
  height: 72px;
  line-height: 72px;
  padding-left: 20px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  p {
    width: 200px;
    display: inline-block;
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
</style>
  <style lang="less">
.price_top .el-input__inner {
  width: 85%;
}
.price_top .el-input {
  width: 44%;
}

.el-table th.is-leaf {
  text-align: center;
}
.el-table--border td {
  text-align: center;
}
</style>