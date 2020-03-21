<template>
  <div>
    <div v-show="wj_page">
      <div class="shop_top">
        <el-date-picker
          class="input_div"
          v-model="time_value"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
        <el-date-picker
          v-model="time_value"
          type="datetime"
          class="input_div"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
        <el-input type="text" class="inp_div" placeholder="请输入商品名称"></el-input>
        <el-input type="text" class="inp_div" placeholder="请输入商家名称"></el-input>
        <el-button type="success" style="margin-left:7%" icon="el-icon-search">搜索</el-button>
        <el-select class="input_div" v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select class="input_div" v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="tab_div">
        <el-table :data="tableData" border>
          <el-table-column width="110">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="82" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品" width="220"></el-table-column>
          <el-table-column prop="name1" label="商品分类"></el-table-column>
          <el-table-column prop="name2" label="单价"></el-table-column>
          <el-table-column prop="name3" label="库存"></el-table-column>
          <el-table-column prop="name4" label="销售量"></el-table-column>
          <el-table-column prop="name5" label="状态" width="70"></el-table-column>
          <el-table-column prop="name6" label="审核状态">
            <template slot-scope="scope">
              <span
                class="span"
                v-if="scope.row.name6=='审核通过'"
                style="background:rgba(90, 212, 138, 1)"
              >审核通过</span>
              <span
                class="span"
                v-else-if="scope.row.name6=='待审核'"
                style="background:rgba(255, 186, 66, 1)"
              >待审核</span>
              <span class="span" v-else style="background: rgba(239, 113, 113, 1)">审核未通过</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-tooltip
                :key="index"
                :content="item.name"
                v-for="(item,index) in scope.row.name7"
                placement="top"
              >
                <img :src="item.img1" style="margin-top: 25px" />
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
    <router-view v-show="!wj_page"></router-view>
  </div>
</template>
  <script>
// debugger
import * as axios from "@/http/http.js";
export default {
  data() {
    return {
      total: 1, // 总条数，根据接口获取数据长度
      tableData: [], //全部数据记录
      current_page: 1, //当前页数
      wj_page: true,
      time_value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [
        {
          imgUrl: "static/img/u1963.svg",
          name: "钱包女短款折叠学生可爱韩版",
          name1: "时尚包包",
          name2: "￥50.00",
          name3: "35205",
          name4: "63251",
          name5: "上架",
          name6: "审核通过",
          name7: [
            { img1: "static/img/u1973.png", name: "编辑" },
            { img1: "static/img/u2643.png", name: "库存" },
            { img1: "static/img/u1981.png", name: "下架" }
          ]
        },
        {
          imgUrl: "static/img/u1963.svg",
          name: "钱包女短款折叠学生可爱韩版",
          name1: "时尚包包",
          name2: "￥50.00",
          name3: "35205",
          name4: "63251",
          name5: "上架",
          name6: "待审核"
        },
        {
          imgUrl: "static/img/u1963.svg",
          name: "钱包女短款折叠学生可爱韩版",
          name1: "时尚包包",
          name2: "￥50.00",
          name3: "35205",
          name4: "63251",
          name5: "上架",
          name6: "审核未通过"
        }
      ]
    };
  },
  beforeMount() {
    this.wj_page = true;
  },
  mounted() {
    // this.loading_page()
  },
  methods: {
    add() {
      this.$router.push({ path: "/wj_price_editor" });
    }
    // loading_page(){
    //   axios.Query_price().then(res=>{
    //     console.log(res)
    //     if(res.data.status=="200"){

    //     }else if(res.data.status == "588"){
    //   this.$message.error(res.data.msg);
    //   this.$router.push({path:"/log"})
    // } else {
    //   this.$message.error(res.data.msg);
    // }
    //   })
    // }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$route.path == "/commodity_management") {
          this.wj_page = true;
          sessionStorage.removeItem("watchItem3")
        } else {
          this.wj_page = false;
        }
      }
    }
  }
};
</script>
  <style lang="less" scoped>
.shop_top {
  width: 94%;
  margin: 20px auto;
  height: 150px;
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
}
.el-table th.is-leaf {
  text-align: center;
}
.el-table--border td {
  text-align: center;
}
</style>