<template>
  <div>
    <div class="editor_top">
      <P class="title_p" @click="show_tableli">商品的基本信息</P>
      <div>
        <table class="table table1" style="width:100%;">
          <tbody>
            <tr>
              <td>
                <span>*</span>商品规格:
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td style="background: rgba(249, 249, 249, 1);">
                <div class="add_table">
                  <p class="tab_title">
                    规格及价格设定：
                    <el-input v-model="tj_money" v-show="tj_inp" placeholder="请输入特价价格"></el-input>
                    <el-input v-model="categories_name" placeholder="请输入规格类别"></el-input>
                    <el-button
                      type="success"
                      v-show="!tj_inp"
                      @click="add_fj()"
                      icon="el-icon-circle-plus-outline"
                    >添加</el-button>
                  </p>
                  <div class="gg_div" v-for="(list,index) in category_list" :key="index">
                    <ul>
                      <li>{{list.name}}</li>
                      <li>
                        <el-button
                          type="success"
                          @click="add_li(index)"
                          size="small"
                          icon="el-icon-circle-plus-outline"
                        >添加颜色</el-button>
                      </li>
                      <li style="width:16%" v-for="(li,index) in li_list[index]" :key="index">
                        <el-input style="padding:0 10px;" size="small" v-model="li.name"></el-input>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <table class="table table-bordered">
                      <tbody @click="show_data" v-for="(item,index) in students" :key="index">
                        <!-- <tr v-for="(li,index) in li_list[0]" :key="index">
                          <td v-for="(trs_td,index) in trs3" :key="index">{{li.name}}</td>
                          <td>价格</td>
                          <td>库存</td>
                        </tr>-->
                        <tr v-for="(m,i) in item.courses" :key="i">
                          <!-- 第1列每个学生只需要展示1次 -->
                          <td v-if="i==0" :rowspan="item.courses.length">{{item.name}}</td>
                          <!-- 第2列每个学生只需要展示1次 -->
                          <td>{{m.name}}</td>
                          <td>
                            <table class="table table-bordered">
                              <tbody>
                                <tr>
                                  <td>1</td>
                                </tr>
                                <tr>
                                  <td>123</td>
                                </tr>
                                <tr>
                                  <td>451</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td>价格</td>
                          <td>库存</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
let that;
import * as axios from "@/http/http.js";
export default {
  data() {
    return {
      //添加大类别
      categories_name: "", //规格类别名称
      category_list: [{ name: "颜色" }, { name: "尺码" }],
      //添加大类别中的td
      td_list: "",
      li_list: [[], [], [], []],
      trs4: "",
      trs3: "",
      trs2: "",

      //添加表格数据
      tab1_data: [],
      tab2_data: [],
      radio: "0", //单选框内容
      options: "", //下拉框数据
      value: "", //下拉框的内容
      tj_inp: false,
      wj_name: "",
      tj_money: "",
      buy_num: "",
      students: [
        {
          name: "张三",
          courses: [
            {
              name: "语文",
              score: "100"
            },
            {
              name: "数学",
              score: "90"
            },
            {
              name: "英语",
              score: "80"
            },
            {
              name: "英语",
              score: "80"
            },
            {
              name: "英语",
              score: "80"
            }
          ]
        },
        {
          name: "李四",
          courses: [
            {
              name: "语文",
              score: "100"
            },
            {
              name: "数学",
              score: "90"
            },
            {
              name: "英语",
              score: "80"
            },
            {
              name: "英语",
              score: "80"
            },
            {
              name: "英语",
              score: "80"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    that = this;
  },
  updated() {},
  methods: {
    //添加div ul
    add_fj() {
      if (this.category_list.length > 3) {
        this.$message.error("规格类别超出");
        return;
      }
      if (this.categories_name != "") {
        this.category_list.push({ name: this.categories_name });
        this.categories_name = "";
      } else {
        this.$message.error("请输入规格类别");
      }
    },
    //添加li
    add_li(index) {
      console.log(index);
      this.li_list[index].push({ name: "白色" });
      if (this.li_list.length > 9) {
        this.$message.error("规格类别超出");
        return;
      }
    },
    show_tableli() {
      //需要合并的tr数字
      // let trs3 = this.li_list[3].length * this.li_list[2].length;
      // let trs2 = this.li_list[3].length;
      // let trs1 = this.li_list[2].length;
      // let trs0 = this.li_list[2].length;
      //
      if (this.li_list[3] != "" && this.li_list[2] != "") {
        this.trs3 = this.li_list[3].concat(this.li_list[2]);
      } else if (this.li_list[2] != "" && this.li_list[1] != "") {
        this.trs3 = this.li_list[2].concat(this.li_list[1]);
      } else if (this.li_list[1] != "" && this.li_list[0] != "") {
        this.trs3 = this.li_list[1].concat(this.li_list[0]);
      } else {
        this.trs3 = this.li_list[0];
      }
      // console.log(trs3);
      console.log(this.trs3);
    },
    show_data() {
      console.log(this.category_list);
      console.log(this.li_list);
    }
  }
};
</script>
<style lang="less" scoped>
.editor_top {
  width: 94%;
  margin: 20px auto;
  min-height: 900px;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;

  .table1 tr td {
    vertical-align: middle;
  }

  td span {
    color: red;
  }
  .add_table {
    width: 80%;
    button {
      float: right;
    }
    td {
      text-align: center;
    }
    .table2 tr td {
      text-align: center;
      button {
        float: right;
      }
    }
    .gg_div ul li {
      float: left;
      height: 35px;
      line-height: 35px;
      text-align: center;
    }
    .gg_div {
      clear: both;
      width: 123%;
      height: 35px;
      margin-top: 10px;
      li:nth-child(1) {
        width: 80px;
        font-size: 16px;
        font-weight: bold;
      }
      li:nth-child(8) {
        margin-left: 19.91%;
      }
    }
  }
}
.title_p {
  border-left: 4px solid #f5bc10;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(26, 188, 156);
}
.express_div {
  width: 94%;
  height: 165px;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
  .active {
    background-color: rgb(26, 188, 156);
    color: #fff;
  }
}
.after_div {
  width: 94%;
  height: 120px;
  margin: 20px auto;
  border: 1px solid rgba(215, 215, 215, 1);
  box-shadow: 0px 0px 6px rgba(102, 102, 102, 0.349019607843137);
  padding: 20px;
  p:nth-child(2) {
    padding: 20px;
  }
}
.bottom_div {
  width: 94%;
  margin: 20px auto;
  button {
    margin-left: 47%;
  }
}
</style>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.tab_title {
  font-weight: 700;
  line-height: 50px;
  .el-input {
    width: 30%;
  }
}
</style>